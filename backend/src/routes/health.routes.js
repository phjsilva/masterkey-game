import { Router } from "express";
import { prisma } from "../config/prisma.js";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok", database: "postgresql" });
  } catch {
    res.status(503).json({ status: "unavailable" });
  }
});
