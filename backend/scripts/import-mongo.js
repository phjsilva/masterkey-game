import "dotenv/config";
import { MongoClient } from "mongodb";
import { PrismaClient } from "@prisma/client";

// No writes are made to MongoDB. One transaction makes PostgreSQL import atomic.
const prisma = new PrismaClient();
const uri = process.env.MONGO_DATABASE_URL;
if (!uri)
  throw new Error("Defina MONGO_DATABASE_URL para importar o banco original.");
const mongo = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
const id = (value) => value?.toString();
const pick = (value, fields) =>
  Object.fromEntries(
    fields
      .filter((key) => value[key] !== undefined)
      .map((key) => [key, value[key]]),
  );
try {
  await mongo.connect();
  const db = mongo.db();
  const [games, highlights, requirements, users] = await Promise.all(
    ["Game", "Highlight", "Requirements", "User"].map((name) =>
      db.collection(name).find({}).toArray(),
    ),
  );
  const gameIds = new Set(games.map((game) => id(game._id)));
  if (
    [...highlights, ...requirements].some((row) => !gameIds.has(id(row.gameId)))
  ) {
    throw new Error(
      "Há relações órfãs no MongoDB. Corrija a origem antes de importar.",
    );
  }
  await prisma.$transaction(
    async (tx) => {
      for (const game of games) {
        const data = {
          ...pick(game, [
            "name",
            "title",
            "description",
            "destaque",
            "highlightsTitle",
            "closingDescription",
            "finalNote",
            "genre",
            "plataforma",
            "lancamento",
            "empresa",
            "size",
            "rawgImageUrl",
            "giantbombImageUrl",
          ]),
        };
        await tx.game.upsert({
          where: { id: id(game._id) },
          create: { id: id(game._id), ...data },
          update: data,
        });
        await tx.highlight.deleteMany({ where: { gameId: id(game._id) } });
        await tx.requirements.deleteMany({ where: { gameId: id(game._id) } });
      }
      for (const row of highlights) {
        await tx.highlight.create({
          data: {
            id: id(row._id),
            gameId: id(row.gameId),
            ...pick(row, ["title", "description"]),
          },
        });
      }
      for (const row of requirements) {
        await tx.requirements.create({
          data: {
            id: id(row._id),
            gameId: id(row.gameId),
            ...pick(row, [
              "system",
              "processor",
              "memory",
              "graphics",
              "directX",
              "storage",
              "other",
            ]),
          },
        });
      }
      for (const row of users) {
        const data = pick(row, ["email", "name", "password"]);
        await tx.user.upsert({
          where: { id: id(row._id) },
          create: { id: id(row._id), ...data },
          update: data,
        });
      }
    },
    { timeout: 120000 },
  );
  console.log(
    JSON.stringify({
      imported: {
        games: games.length,
        highlights: highlights.length,
        requirements: requirements.length,
        users: users.length,
      },
    }),
  );
} catch (error) {
  console.error(
    `Importação cancelada (${error.code ?? error.name}). Verifique a conexão e a integridade dos dados. Nenhuma alteração na origem.`,
  );
  process.exitCode = 1;
} finally {
  await mongo.close();
  await prisma.$disconnect();
}
