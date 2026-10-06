import test from "node:test";
import assert from "node:assert/strict";
import { gamePayloadFromForm } from "../src/lib/game-form.ts";

test("cadastro limpa espaços, separa listas e converte valores opcionais", () => {
  const form = new FormData();
  for (const [key, value] of Object.entries({
    name: " Jogo ",
    description: " Descrição ",
    empresa: " Estúdio ",
    genre: "RPG, Aventura, RPG, ,",
    plataforma: " PC, Switch ",
    lancamento: "2026-10-05",
    destaque: "on",
    size: "0",
    rawgImageUrl: " https://example.com/capa.jpg ",
  }))
    form.set(key, value);
  const payload = gamePayloadFromForm(form);
  assert.equal(payload.name, "Jogo");
  assert.deepEqual(payload.genre, ["RPG", "Aventura"]);
  assert.deepEqual(payload.plataforma, ["PC", "Switch"]);
  assert.equal(payload.size, 0);
  assert.equal(payload.destaque, true);
  assert.equal(payload.rawgImageUrl, "https://example.com/capa.jpg");
});

test("cadastro omite capa e tamanho vazios sem converter ausência em zero", () => {
  const payload = gamePayloadFromForm(new FormData());
  assert.equal(Object.hasOwn(payload, "size"), false);
  assert.equal(Object.hasOwn(payload, "rawgImageUrl"), false);
  assert.equal(payload.destaque, false);
  assert.deepEqual(payload.genre, []);
});
