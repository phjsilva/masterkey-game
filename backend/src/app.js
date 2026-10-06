import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/error-handler.js";
import { notFoundHandler } from "./middlewares/not-found-handler.js";
import { gamesRouter } from "./routes/games.routes.js";
import { healthRouter } from "./routes/health.routes.js";

export const createApp = () => {
  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:3002" }));
  app.use(express.json());

  app.use("/health", healthRouter);
  app.use("/games", gamesRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
