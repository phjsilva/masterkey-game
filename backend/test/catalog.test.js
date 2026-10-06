import "dotenv/config";
import test from "node:test";
import assert from "node:assert/strict";
import {
  validateGameId,
  validateCreateGamePayload,
  validateUpdateGamePayload,
} from "../src/validators/game.validator.js";

const payload = {
  name: "Teste de catálogo",
  description: "Descrição de integração",
  empresa: "Estúdio teste",
  genre: ["RPG"],
  plataforma: ["PC"],
  lancamento: "2024-01-01",
  destaque: true,
  highlights: [{ title: "Exploração", description: "Um mundo aberto" }],
  requirements: [
    {
      system: "Windows",
      processor: "CPU",
      memory: "8 GB",
      graphics: "GPU",
      storage: "10 GB",
    },
  ],
};
test("catalog payload no longer requires commercial fields", () => {
  assert.doesNotThrow(() => validateCreateGamePayload(payload));
  assert.throws(() => validateCreateGamePayload({ ...payload, price: 10 }));
  assert.throws(() => validateUpdateGamePayload({ name: null }));
  assert.throws(() => validateUpdateGamePayload({ size: -1 }));
  assert.throws(() => validateUpdateGamePayload({ size: Infinity }));
  assert.throws(() =>
    validateUpdateGamePayload({
      highlights: [{ ...payload.highlights[0], gameId: "injected" }],
    }),
  );
  assert.throws(() =>
    validateUpdateGamePayload({ rawgImageUrl: "javascript:alert(1)" }),
  );
});
test("IDs accept migrated ObjectIds and new UUIDs", () => {
  assert.equal(
    validateGameId("507f1f77bcf86cd799439011"),
    "507f1f77bcf86cd799439011",
  );
  assert.equal(
    validateGameId("00000000-0000-4000-8000-000000000001"),
    "00000000-0000-4000-8000-000000000001",
  );
  assert.throws(() => validateGameId("1"));
});
test(
  "PostgreSQL CRUD, relationships, filtering, errors and cascade",
  { skip: !process.env.DATABASE_URL },
  async () => {
    const { createApp } = await import("../src/app.js");
    const { prisma } = await import("../src/config/prisma.js");
    const server = createApp().listen(0, "127.0.0.1");
    await new Promise((resolve) => server.once("listening", resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    const request = (path, method = "GET", data) =>
      fetch(base + path, {
        method,
        headers: { "Content-Type": "application/json" },
        body: data === undefined ? undefined : JSON.stringify(data),
      });
    let id;
    try {
      assert.equal((await request("/health")).status, 200);
      const created = await request("/games", "POST", payload);
      assert.equal(created.status, 201);
      const game = await created.json();
      id = game.id;
      assert.equal(game.highlights.length, 1);
      assert.equal(game.requirements.length, 1);
      assert.equal(game.price, undefined);
      assert.equal(
        (await (await request(`/games/${id}`)).json()).name,
        payload.name,
      );
      assert.ok(
        (await (await request("/games/genero/RPG?limit=100")).json()).some(
          (row) => row.id === id,
        ),
      );
      const updated = await request(`/games/${id}`, "PATCH", {
        highlights: [],
        requirements: [],
        size: 25,
      });
      assert.equal(updated.status, 200);
      assert.equal((await updated.json()).highlights.length, 0);
      assert.equal(
        await prisma.requirements.count({ where: { gameId: id } }),
        0,
      );
      assert.equal(
        (await request(`/games/${id}`, "PATCH", { price: 10 })).status,
        400,
      );
      assert.equal((await request("/games?limit=-1")).status, 400);
      assert.equal((await request("/games/invalid")).status, 400);
      assert.equal(
        (await request("/games/00000000-ffff-4000-8000-000000000099")).status,
        404,
      );
      assert.equal(
        (
          await fetch(base + "/games", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: "{",
          })
        ).status,
        400,
      );
      await request(`/games/${id}`, "PATCH", {
        highlights: payload.highlights,
        requirements: payload.requirements,
      });
      assert.equal((await request(`/games/${id}`, "DELETE")).status, 204);
      assert.equal(await prisma.highlight.count({ where: { gameId: id } }), 0);
      assert.equal(
        await prisma.requirements.count({ where: { gameId: id } }),
        0,
      );
      assert.equal((await request(`/games/${id}`)).status, 404);
    } finally {
      if (id) await prisma.game.deleteMany({ where: { id } });
      await new Promise((resolve) => server.close(resolve));
      await prisma.$disconnect();
    }
  },
);
