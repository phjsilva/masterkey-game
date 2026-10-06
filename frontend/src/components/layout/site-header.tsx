import Link from "next/link";
import { Plus } from "lucide-react";
import { CatalogLink } from "@/components/catalog-link";
import { Container } from "@/components/ui/container";
import { SiteBrand } from "./site-brand";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <Container className="flex h-[76px] items-center justify-between gap-5 tablet:h-[92px] tablet:justify-start tablet:gap-[35px] desktop:gap-[72px]">
        <SiteBrand />
        <nav
          aria-label="Navegação principal"
          className="flex gap-[18px] text-[11px] text-[#afb6ad] tablet:gap-[29px] tablet:text-[13px]"
        >
          <Link
            className="hidden transition-colors hover:text-accent tablet:block"
            href="/"
          >
            Descobrir
          </Link>
          <CatalogLink className="transition-colors hover:text-accent">
            Catálogo
          </CatalogLink>
          <CatalogLink
            className="hidden transition-colors hover:text-accent tablet:block"
            href="/?colecao=destaques#catalogo"
          >
            Em destaque
          </CatalogLink>
        </nav>
        <Link
          href="/jogos/novo"
          aria-label="Adicionar jogo"
          className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-md border border-accent/30 p-2 text-accent tablet:px-3"
        >
          <Plus size={16} />
          <span className="hidden text-xs tablet:inline">Adicionar jogo</span>
        </Link>
      </Container>
    </header>
  );
}
