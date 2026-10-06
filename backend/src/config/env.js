import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 3001),
  rawgApiKey: process.env.RAWG_API_KEY,
  giantBombApiKey: process.env.GIANT_BOMB_API_KEY,
};
