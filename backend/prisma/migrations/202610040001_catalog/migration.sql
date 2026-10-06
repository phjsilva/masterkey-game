-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "highlightsTitle" TEXT NOT NULL DEFAULT '',
    "closingDescription" TEXT NOT NULL DEFAULT '',
    "finalNote" TEXT NOT NULL DEFAULT '',
    "genre" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "plataforma" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "lancamento" TIMESTAMP(3) NOT NULL,
    "empresa" TEXT NOT NULL,
    "size" DOUBLE PRECISION,
    "rawgImageUrl" TEXT,
    "giantbombImageUrl" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Highlight" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "Highlight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requirements" (
    "id" TEXT NOT NULL,
    "system" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "memory" TEXT NOT NULL,
    "graphics" TEXT NOT NULL,
    "directX" TEXT NOT NULL DEFAULT '',
    "storage" TEXT NOT NULL,
    "other" TEXT NOT NULL DEFAULT '',
    "gameId" TEXT NOT NULL,

    CONSTRAINT "Requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Game_lancamento_idx" ON "Game"("lancamento");

-- CreateIndex
CREATE INDEX "Game_destaque_idx" ON "Game"("destaque");

-- CreateIndex
CREATE INDEX "Highlight_gameId_idx" ON "Highlight"("gameId");

-- CreateIndex
CREATE INDEX "Requirements_gameId_idx" ON "Requirements"("gameId");

-- AddForeignKey
ALTER TABLE "Highlight" ADD CONSTRAINT "Highlight_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirements" ADD CONSTRAINT "Requirements_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
