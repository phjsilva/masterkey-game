import { prisma } from "../config/prisma.js";

export const gameCardSelect = {
  id: true,
  name: true,
  title: true,
  description: true,
  destaque: true,
  rawgImageUrl: true,
  giantbombImageUrl: true,
  genre: true,
  plataforma: true,
  lancamento: true,
  empresa: true,
};
const include = { highlights: true, requirements: true };
export const gamesRepository = {
  findCards({
    limit = 9,
    where = {},
    orderBy = [{ name: "asc" }, { id: "asc" }],
    select = gameCardSelect,
  } = {}) {
    return prisma.game.findMany({ where, take: limit, orderBy, select });
  },
  findAll() {
    return prisma.game.findMany({
      select: gameCardSelect,
      orderBy: [{ name: "asc" }, { id: "asc" }],
    });
  },
  findById(id) {
    return prisma.game.findUnique({ where: { id }, include });
  },
  exists(id) {
    return prisma.game.findUnique({ where: { id }, select: { id: true } });
  },
  create(data) {
    return prisma.game.create({ data, include });
  },
  update(id, data) {
    return prisma.game.update({ where: { id }, data, include });
  },
  delete(id) {
    return prisma.game.delete({ where: { id } });
  },
};
