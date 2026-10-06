import { Search, SlidersHorizontal } from "lucide-react";
import type { CatalogQuery } from "@/lib/catalog";
import type { ReactNode } from "react";

function FilterSelect({
  label,
  name,
  value,
  children,
}: {
  label: string;
  name: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-1 basis-[40%] flex-col gap-[7px] pl-1 tablet:basis-0 tablet:gap-1 tablet:border-l tablet:border-[#343b30] tablet:pl-2 desktop:pl-[13px]">
      <span className="text-[9px] text-muted">{label}</span>
      <select
        name={name}
        defaultValue={value}
        className="w-full max-w-full border-0 bg-transparent py-0.5 text-[11px] text-[#e4e9df] [&_option]:bg-panel [&_option]:text-foreground"
      >
        {children}
      </select>
    </label>
  );
}
export function CatalogFilters({
  query,
  genres,
  platforms,
}: {
  query: CatalogQuery;
  genres: string[];
  platforms: string[];
}) {
  return (
    <form
      action="/#catalogo"
      className="flex flex-wrap items-center gap-x-2.5 gap-y-4 rounded-[9px] border border-line bg-[#191d19] p-3 tablet:gap-3 tablet:p-[13px] desktop:flex-nowrap"
    >
      <label className="flex min-w-[130px] flex-[1.6] basis-full items-center gap-3 p-2.5 text-[#8d9887] desktop:basis-0 desktop:px-1.5 desktop:py-2">
        <Search size={19} />
        <span className="sr-only">Buscar jogos</span>
        <input
          name="q"
          defaultValue={query.q}
          placeholder="Busque por jogo ou estúdio..."
          className="min-w-0 w-full border-0 bg-transparent text-xs text-[#eceee5] placeholder:text-[#949b90]"
        />
      </label>
      <FilterSelect label="Gênero" name="genero" value={query.genero ?? ""}>
        <option value="">Todos os gêneros</option>
        {genres.map((genre) => (
          <option key={genre}>{genre}</option>
        ))}
      </FilterSelect>
      <FilterSelect
        label="Plataforma"
        name="plataforma"
        value={query.plataforma ?? ""}
      >
        <option value="">Todas as plataformas</option>
        {platforms.map((platform) => (
          <option key={platform}>{platform}</option>
        ))}
      </FilterSelect>
      <FilterSelect
        label="Ordenar por"
        name="ordem"
        value={query.ordem ?? "nome"}
      >
        <option value="nome">Nome: A–Z</option>
        <option value="recentes">Lançamentos</option>
      </FilterSelect>
      {query.colecao === "destaques" && (
        <input type="hidden" name="colecao" value="destaques" />
      )}
      <button
        type="submit"
        className="flex flex-1 items-center justify-center gap-2 self-end rounded-[5px] border border-[#3d4932] bg-[#28351d] p-[11px] text-[11px] text-accent hover:bg-[#3b4a2c] tablet:flex-none tablet:self-auto tablet:px-[18px] tablet:py-[13px]"
      >
        <SlidersHorizontal size={17} /> Filtrar
      </button>
    </form>
  );
}
