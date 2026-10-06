import { Router } from "express";
import { gamesController } from "../controllers/games.controller.js";
import { asyncHandler } from "../middlewares/async-handler.js";

export const gamesRouter = Router();

gamesRouter.get("/", asyncHandler(gamesController.list));
gamesRouter.get("/todos", asyncHandler(gamesController.listAll));
gamesRouter.get("/recentes", asyncHandler(gamesController.listRecent));
gamesRouter.get("/destaques", asyncHandler(gamesController.listFeatured));
gamesRouter.get("/rpg", asyncHandler(gamesController.listRpg));
gamesRouter.get("/genero/:genre", asyncHandler(gamesController.listByGenre));
gamesRouter.get("/:id", asyncHandler(gamesController.getById));

gamesRouter.post("/", asyncHandler(gamesController.create));
gamesRouter.post("/create", asyncHandler(gamesController.create));

gamesRouter.patch("/:id", asyncHandler(gamesController.update));
gamesRouter.patch("/update/:id", asyncHandler(gamesController.update));

gamesRouter.delete("/:id", asyncHandler(gamesController.delete));
gamesRouter.delete("/del/:id", asyncHandler(gamesController.delete));
