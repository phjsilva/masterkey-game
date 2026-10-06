import axios from "axios";
import { env } from "../config/env.js";

const RAWG_URL = "https://api.rawg.io/api/games";
const GIANT_BOMB_URL = "https://www.giantbomb.com/api/search";

export const getGameImages = async (gameName) => {
  const images = {
    rawgImageUrl: null,
    giantbombImageUrl: null,
  };

  const requests = [];

  if (env.rawgApiKey) {
    requests.push(
      axios
        .get(RAWG_URL, {
          params: {
            key: env.rawgApiKey,
            page_size: 1,
            search: gameName,
          },
        })
        .then((response) => {
          images.rawgImageUrl =
            response.data.results?.[0]?.background_image ?? null;
        }),
    );
  }

  if (env.giantBombApiKey) {
    requests.push(
      axios
        .get(GIANT_BOMB_URL, {
          params: {
            api_key: env.giantBombApiKey,
            format: "json",
            query: gameName,
            resources: "game",
          },
          headers: {
            "User-Agent": "api-node/1.0",
          },
        })
        .then((response) => {
          images.giantbombImageUrl =
            response.data.results?.[0]?.image?.medium_url ?? null;
        }),
    );
  }

  const results = await Promise.allSettled(requests);
  results
    .filter((result) => result.status === "rejected")
    .forEach((result) =>
      console.error("Erro ao buscar imagem externa:", {
        codigo: result.reason?.code ?? "FALHA_NA_CONEXAO",
      }),
    );

  return images;
};
