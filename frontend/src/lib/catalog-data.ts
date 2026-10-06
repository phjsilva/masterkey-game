import { notFound } from "next/navigation";
import { ApiError, getGames, getGameDetails } from "./api";
import { buildCatalogView, type CatalogSearchParams } from "./catalog";

export async function getCatalogView(params: CatalogSearchParams) {
  return buildCatalogView(await getGames(), params);
}
export async function getGamePageData(id: string) {
  try {
    return await getGameDetails(id);
  } catch (error) {
    if (error instanceof ApiError && [400, 404].includes(error.status))
      notFound();
    throw error;
  }
}
