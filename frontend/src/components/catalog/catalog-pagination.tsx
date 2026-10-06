import { CatalogLink } from "@/components/catalog-link";
import { catalogPageUrl, type CatalogQuery } from "@/lib/catalog";

export function CatalogPagination({
  page,
  pages,
  query,
}: {
  page: number;
  pages: number;
  query: CatalogQuery;
}) {
  if (pages <= 1) return null;
  const linkClasses =
    "rounded-[5px] border border-line px-[15px] py-2.5 text-accent";
  return (
    <nav
      aria-label="Paginação"
      className="mt-8 flex items-center justify-center gap-[15px] text-[10px] text-muted tablet:gap-[29px] tablet:text-xs"
    >
      {page > 1 && (
        <CatalogLink
          className={linkClasses}
          href={catalogPageUrl(query, page - 1)}
        >
          ← Anterior
        </CatalogLink>
      )}
      <span>
        Página {page} de {pages}
      </span>
      {page < pages && (
        <CatalogLink
          className={linkClasses}
          href={catalogPageUrl(query, page + 1)}
        >
          Próxima →
        </CatalogLink>
      )}
    </nav>
  );
}
