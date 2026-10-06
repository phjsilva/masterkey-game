import type { Game } from "@/types/game";

export type CatalogSearchParams = Record<string, string | string[] | undefined>;
export type CatalogQuery = Partial<
  Record<"q" | "genero" | "plataforma" | "ordem" | "colecao" | "pagina", string>
>;
const queryKeys = [
  "q",
  "genero",
  "plataforma",
  "ordem",
  "colecao",
  "pagina",
] as const;
const pageSize = 12;
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function buildCatalogView(all: Game[], params: CatalogSearchParams) {
  const query: CatalogQuery = Object.fromEntries(
    queryKeys
      .filter((key) => typeof params[key] === "string")
      .map((key) => [key, params[key]]),
  );
  const filtered = all
    .filter(
      (game) =>
        (!query.q ||
          normalize(`${game.name} ${game.empresa}`).includes(
            normalize(query.q.trim()),
          )) &&
        (!query.genero || game.genre.includes(query.genero)) &&
        (!query.plataforma || game.plataforma.includes(query.plataforma)) &&
        (query.colecao !== "destaques" || game.destaque),
    )
    .sort((a, b) =>
      query.ordem === "recentes"
        ? Date.parse(b.lancamento) - Date.parse(a.lancamento)
        : a.name.localeCompare(b.name, "pt-BR"),
    );
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(
    pages,
    Math.max(1, Math.floor(Number(query.pagina) || 1)),
  );
  return {
    query,
    page,
    pages,
    total: all.length,
    matches: filtered.length,
    games: filtered.slice((page - 1) * pageSize, page * pageSize),
    genres: [...new Set(all.flatMap((game) => game.genre))].sort(),
    platforms: [...new Set(all.flatMap((game) => game.plataforma))].sort(),
    featured:
      all
        .filter((game) => game.destaque)
        .sort(
          (a, b) => Date.parse(b.lancamento) - Date.parse(a.lancamento),
        )[0] ?? all[0],
  };
}
export type CatalogView = ReturnType<typeof buildCatalogView>;

export function catalogPageUrl(query: CatalogQuery, page: number) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value && key !== "pagina") params.set(key, value);
  });
  params.set("pagina", String(page));
  return `/?${params}#catalogo`;
}
