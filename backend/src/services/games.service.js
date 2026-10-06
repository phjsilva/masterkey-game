import { AppError } from "../errors/app-error.js";
import {
  gameCardSelect,
  gamesRepository,
} from "../repositories/games.repository.js";
import { parseLimit } from "../utils/pagination.js";
import { getGameImages } from "./game-images.service.js";

const mapGamePayload = (payload) => {
  const { highlights, requirements, lancamento, ...game } = payload;

  return {
    ...game,
    lancamento: lancamento ? new Date(lancamento) : undefined,
    highlights: highlights
      ? {
          create: highlights,
        }
      : undefined,
    requirements: requirements
      ? {
          create: requirements,
        }
      : undefined,
  };
};

const mapGameUpdatePayload = (payload) => {
  const data = mapGamePayload(payload);

  if (payload.highlights) {
    data.highlights = {
      deleteMany: {},
      create: payload.highlights,
    };
  }

  if (payload.requirements) {
    data.requirements = {
      deleteMany: {},
      create: payload.requirements,
    };
  }

  return data;
};

export const gamesService = {
  list(query) {
    const limit = parseLimit(query.limit, 9);
    return gamesRepository.findCards({ limit });
  },

  listAll() {
    return gamesRepository.findAll();
  },

  listRecent(query) {
    const limit = parseLimit(query.limit);
    return gamesRepository.findCards({
      limit,
      orderBy: { lancamento: "desc" },
      select: {
        ...gameCardSelect,
        lancamento: true,
      },
    });
  },

  listFeatured(query) {
    const limit = parseLimit(query.limit);
    return gamesRepository.findCards({
      limit,
      where: { destaque: true },
      orderBy: { lancamento: "desc" },
      select: {
        ...gameCardSelect,
        giantbombImageUrl: true,
        lancamento: true,
        destaque: true,
      },
    });
  },

  listByGenre(genre, query) {
    const limit = parseLimit(query.limit, 21);

    return gamesRepository.findCards({
      limit,
      where: {
        genre: {
          has: genre,
        },
      },
      orderBy: { id: "desc" },
      select: {
        ...gameCardSelect,
        lancamento: true,
        genre: true,
      },
    });
  },

  async getById(id) {
    const game = await gamesRepository.findById(id);

    if (!game) {
      throw new AppError("Jogo não encontrado.", 404);
    }

    return game;
  },

  async create(payload) {
    const images = await getGameImages(payload.name);

    return gamesRepository.create({
      ...images,
      ...mapGamePayload(payload),
    });
  },

  async update(id, payload) {
    const game = await gamesRepository.exists(id);

    if (!game) {
      throw new AppError("Jogo não encontrado.", 404);
    }

    return gamesRepository.update(id, mapGameUpdatePayload(payload));
  },

  async delete(id) {
    const game = await gamesRepository.exists(id);

    if (!game) {
      throw new AppError("Jogo não encontrado.", 404);
    }

    await gamesRepository.delete(id);
  },
};
