import { CatalogIntro } from "@/components/catalog/catalog-intro";
import { FeaturedGame } from "@/components/catalog/featured-game";
import { DiscoveryStrip } from "@/components/catalog/discovery-strip";
import { CatalogResults } from "@/components/catalog/catalog-results";
import { getCatalogView } from "@/lib/catalog-data";
import type { CatalogSearchParams } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<CatalogSearchParams>;
}) {
  const catalog = await getCatalogView(await searchParams);
  return (
    <main>
      <CatalogIntro />
      <FeaturedGame game={catalog.featured} />
      <DiscoveryStrip />
      <CatalogResults catalog={catalog} />
    </main>
  );
}
