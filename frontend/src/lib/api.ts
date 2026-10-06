import type { Game, GameDetails } from "@/types/game";

const API_URL = process.env.API_URL ?? "http://localhost:3001";
export class ApiError extends Error {
  constructor(public status: number) {
    super(`Falha ao consultar catálogo (${status}).`);
  }
}
async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new ApiError(response.status);
  return response.json() as Promise<T>;
}
export const getGames = () => request<Game[]>("/games/todos");
export const getGameDetails = (id: string) =>
  request<GameDetails>(`/games/${encodeURIComponent(id)}`);
