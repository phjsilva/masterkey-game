import { Search, Sparkles } from "lucide-react";
import type { CatalogView } from "@/lib/catalog";
import { CatalogLink } from "@/components/catalog-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { EmptyState } from "@/components/ui/empty-state";
import { ActionLink } from "@/components/ui/action";
import { CatalogFilters } from "./catalog-filters";
import { GameCard } from "./game-card";
import { CatalogPagination } from "./catalog-pagination";

export function CatalogResults({ catalog }: { catalog: CatalogView }) {
  const { query, total, matches, games } = catalog;
  const tabs = [
    {
      label: "Todos os jogos",
      href: "/#catalogo",
      active: query.colecao !== "destaques",
    },
    {
      label: "Em destaque",
      href: "/?colecao=destaques#catalogo",
      active: query.colecao === "destaques",
    },
  ];
  return (
    <section id="catalogo">
      <Container className="pb-[45px] pt-[34px] tablet:pb-[75px] tablet:pt-14">
        <div className="mb-[27px] flex items-start justify-between gap-2 tablet:items-end tablet:gap-5">
          <div>
            <Eyebrow>EXPLORE SEM LIMITES</Eyebrow>
            <h2 className="text-[25px] font-[650] tracking-[-1px] tablet:text-[30px]">
              Catálogo de jogos<span className="text-accent">.</span>
            </h2>
          </div>
          <span className="mb-1 max-w-[75px] text-right text-[10px] leading-[1.6] text-muted tablet:max-w-none tablet:text-[11px]">
            {total} jogos para descobrir
          </span>
        </div>
        <CatalogFilters
          query={query}
          genres={catalog.genres}
          platforms={catalog.platforms}
        />
        <div className="my-5 flex items-center justify-between gap-3 tablet:mb-[23px] tablet:mt-[27px]">
          <div className="flex gap-[3px] tablet:gap-2">
            {tabs.map((tab, index) => (
              <CatalogLink
                key={tab.label}
                href={tab.href}
                aria-current={tab.active ? "page" : undefined}
                className={`flex items-center gap-[7px] rounded-[5px] border p-2 text-[10px] tablet:px-[13px] tablet:py-[9px] tablet:text-[11px] ${tab.active ? "border-accent/20 bg-accent/5 text-accent" : "border-transparent text-[#a1a99d]"}`}
              >
                {index === 1 && <Sparkles size={14} />} {tab.label}
              </CatalogLink>
            ))}
          </div>
          <span className="text-[9px] text-muted tablet:text-[10px]">
            {matches} {matches === 1 ? "resultado" : "resultados"}
          </span>
        </div>
        {games.length ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-3.5 tablet:grid-cols-3 tablet:gap-x-5 tablet:gap-y-[25px] desktop:grid-cols-4">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <EmptyState
            heading="h3"
            icon={<Search size={34} />}
            title={
              total ? "Nenhum jogo encontrado" : "Novos universos em breve"
            }
          >
            <p className="text-sm leading-[1.7] text-muted">
              {total
                ? "Tente outro nome ou uma combinação diferente de filtros."
                : "O catálogo ainda não tem jogos cadastrados."}
            </p>
            {total > 0 && (
              <ActionLink href="/#catalogo">Limpar filtros</ActionLink>
            )}
          </EmptyState>
        )}
        <CatalogPagination
          page={catalog.page}
          pages={catalog.pages}
          query={query}
        />
      </Container>
    </section>
  );
}
