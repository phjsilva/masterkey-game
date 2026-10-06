import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Optional demo content: only populates an empty database, never overwrites imported games.
const games = [
  [
    "Frostpunk 2",
    "2024-09-20",
    "11 bit studios",
    ["Estratégia", "Simulação"],
    ["PC"],
    "/assets/2.jpg",
    "Uma cidade. Um futuro incerto.",
    "Lidere uma metrópole em um mundo congelado. Explore os limites da sobrevivência, equilibre os interesses de diferentes facções e decida o futuro da sua cidade.",
  ],
  [
    "Baldur's Gate 3",
    "2023-08-03",
    "Larian Studios",
    ["RPG", "Aventura"],
    ["PC", "PlayStation 5", "Xbox Series"],
    "/img/bg3 1.png",
    "Sua história é escrita pelas suas escolhas.",
    "Reúna seu grupo e viaje pelos Reinos Esquecidos em uma aventura de amizade, traição e poder. Crie seu personagem e descubra uma história moldada por suas decisões.",
  ],
  [
    "Cyberpunk 2077",
    "2020-12-10",
    "CD Projekt Red",
    ["RPG", "Ação"],
    ["PC", "PlayStation 5", "Xbox Series"],
    "/img/cyber.webp",
    "Encontre seu lugar em Night City.",
    "Explore uma metrópole obcecada por poder, glamour e modificações corporais. Na pele de V, escolha seu caminho pelas ruas de Night City.",
  ],
  [
    "Warcraft I: Remastered",
    "2024-11-13",
    "Blizzard Entertainment",
    ["Estratégia"],
    ["PC"],
    "/img/war.webp",
    "Reviva o início de uma saga.",
    "Comande humanos e orcs em batalhas de estratégia em tempo real. Construa sua base, reúna recursos e conduza seu exército pelo mundo de Azeroth.",
  ],
  [
    "Metaphor: ReFantazio",
    "2024-10-11",
    "ATLUS",
    ["RPG", "Aventura"],
    ["PC", "PlayStation 5", "Xbox Series"],
    "/img/meta 1.png",
    "Desperte uma nova história.",
    "Viaje por um reino de fantasia, forme laços com seus companheiros e enfrente desafios em combates estratégicos.",
  ],
  [
    "Persona 3 Reload",
    "2024-02-02",
    "ATLUS",
    ["RPG"],
    ["PC", "PlayStation 5", "Xbox Series"],
    "/img/persona.jpg",
    "Descubra o que se esconde na Hora Sombria.",
    "Viva os dias de um estudante e explore uma realidade misteriosa à noite. Construa amizades e enfrente as sombras com seu grupo.",
  ],
  [
    "Persona 5 Royal",
    "2019-10-31",
    "ATLUS",
    ["RPG", "Aventura"],
    ["PC", "PlayStation 4", "Nintendo Switch"],
    "/img/persona5.jpg",
    "Mude o coração do mundo.",
    "Entre para os Phantom Thieves, explore Tóquio e descubra uma realidade onde desejos tomam forma. Equilibre a vida cotidiana com aventuras extraordinárias.",
  ],
];
try {
  if (await prisma.game.count()) {
    console.log("Catálogo já preenchido; seed não aplicado.");
  } else {
    await prisma.$transaction(
      games.map(
        (
          [
            name,
            date,
            empresa,
            genre,
            plataforma,
            rawgImageUrl,
            title,
            description,
          ],
          index,
        ) =>
          prisma.game.create({
            data: {
              id: `00000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
              name,
              lancamento: new Date(date),
              empresa,
              genre,
              plataforma,
              rawgImageUrl,
              title,
              description,
              destaque: index < 3,
            },
          }),
      ),
    );
    console.log(`${games.length} jogos de demonstração criados.`);
  }
} finally {
  await prisma.$disconnect();
}
