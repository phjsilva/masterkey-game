import { createApp } from "./src/app.js";
import { env } from "./src/config/env.js";
import { prisma } from "./src/config/prisma.js";

const app = createApp();

const server = app.listen(env.port, () => {
  console.log(`API iniciada na porta ${env.port}.`);
});

const shutdown = async () => {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
