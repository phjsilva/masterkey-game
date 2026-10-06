import { gamesService } from "../services/games.service.js";
import {
  validateCreateGamePayload,
  validateGameId,
  validateUpdateGamePayload,
} from "../validators/game.validator.js";

export const gamesController = {
  async list(req, res) {
    const games = await gamesService.list(req.query);
    res.status(200).json(games);
  },

  async listAll(_req, res) {
    const games = await gamesService.listAll();
    res.status(200).json(games);
  },

  async listRecent(req, res) {
    const games = await gamesService.listRecent(req.query);
    res.status(200).json(games);
  },

  async listFeatured(req, res) {
    const games = await gamesService.listFeatured(req.query);
    res.status(200).json(games);
  },

  async listRpg(req, res) {
    const games = await gamesService.listByGenre("RPG", req.query);
    res.status(200).json(games);
  },

  async listByGenre(req, res) {
    const games = await gamesService.listByGenre(req.params.genre, req.query);
    res.status(200).json(games);
  },

  async getById(req, res) {
    const id = validateGameId(req.params.id);
    const game = await gamesService.getById(id);
    res.status(200).json(game);
  },

  async create(req, res) {
    validateCreateGamePayload(req.body);
    const game = await gamesService.create(req.body);
    res.status(201).json(game);
  },

  async update(req, res) {
    const id = validateGameId(req.params.id);
    validateUpdateGamePayload(req.body);
    const game = await gamesService.update(id, req.body);
    res.status(200).json(game);
  },

  async delete(req, res) {
    const id = validateGameId(req.params.id);
    await gamesService.delete(id);
    res.status(204).send();
  },
};
