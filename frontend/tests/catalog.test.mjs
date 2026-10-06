import test from "node:test";
import assert from "node:assert/strict";
import { buildCatalogView, catalogPageUrl } from "../src/lib/catalog.ts";

const games = Array.from({ length: 26 }, (_, index) => ({
  id: String(index),
  name: `Jogo ${String(index).padStart(2, "0")}`,
  empresa: index === 0 ? "Estúdio Árvore" : "Outro estúdio",
  title: "",
  description: "",
  destaque: index % 2 === 0,
  genre: [index % 2 === 0 ? "RPG" : "Aventura"],
  plataforma: [index < 15 ? "PC" : "Nintendo Switch"],
  lancamento: new Date(Date.UTC(2020 + index, 0, 1)).toISOString(),
}));

test("combina busca sem acentos, gênero, plataforma e destaques", () => {
  const view = buildCatalogView(games, {
    q: "arvore",
    genero: "RPG",
    plataforma: "PC",
    colecao: "destaques",
  });
  assert.equal(view.matches, 1);
  assert.equal(view.games[0].id, "0");
  assert.equal(view.total, 26);
  assert.deepEqual(view.genres, ["Aventura", "RPG"]);
});
test("pagina sem duplicar jogos e limita páginas fora do intervalo", () => {
  const second = buildCatalogView(games, { pagina: "2" });
  assert.equal(second.pages, 3);
  assert.deepEqual(
    second.games.map((game) => game.id),
    Array.from({ length: 12 }, (_, i) => String(i + 12)),
  );
  assert.equal(buildCatalogView(games, { pagina: "999" }).games.length, 2);
  assert.equal(buildCatalogView(games, { pagina: "-1" }).page, 1);
});
test("ordena lançamentos sem modificar os dados de origem", () => {
  assert.equal(
    buildCatalogView(games, { ordem: "recentes" }).games[0].id,
    "25",
  );
  assert.equal(games[0].id, "0");
});
test("trata catálogo vazio, filtros sem resultado e parâmetros repetidos", () => {
  assert.equal(buildCatalogView([], {}).featured, undefined);
  assert.equal(buildCatalogView(games, { q: "inexistente" }).matches, 0);
  assert.equal(buildCatalogView(games, { q: ["a", "b"] }).matches, 26);
});
test("links preservam filtros e alteram somente a página", () => {
  const url = new URL(
    catalogPageUrl({ q: "ação", genero: "RPG", pagina: "1" }, 2),
    "http://localhost",
  );
  assert.equal(url.searchParams.get("q"), "ação");
  assert.equal(url.searchParams.get("genero"), "RPG");
  assert.equal(url.searchParams.get("pagina"), "2");
  assert.equal(url.hash, "#catalogo");
});
