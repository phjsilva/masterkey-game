import { Monitor } from "lucide-react";
import type { GameDetails } from "@/types/game";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GameFacts } from "./game-facts";

export function GameOverview({ game }: { game: GameDetails }) {
  const details: [string, string][] = [
    ["Gêneros", game.genre.join(", ")],
    ["Plataformas", game.plataforma.join(", ")],
    [
      "Lançamento",
      new Date(game.lancamento).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
      }),
    ],
    ["Estúdio / empresa", game.empresa],
    ["Armazenamento", game.size ? `${game.size} GB` : "Não informado"],
  ];
  return (
    <div
      id="sobre"
      className="grid gap-5 pb-10 pt-[35px] tablet:grid-cols-[1fr_290px] tablet:gap-8 tablet:pt-14 desktop:grid-cols-[1fr_340px] desktop:gap-[70px]"
    >
      <article>
        <Eyebrow>CONHEÇA O JOGO</Eyebrow>
        <h2 className="mb-[23px] text-[30px] font-[650] tracking-[-1px]">
          Sobre este universo
        </h2>
        <p className="mb-4 whitespace-pre-line text-sm leading-[1.95] text-[#aab3a3]">
          {game.description}
        </p>
        {game.highlights.length > 0 && (
          <>
            <h3 className="mb-[22px] mt-[30px] text-lg">
              {game.highlightsTitle || "O que você vai encontrar"}
            </h3>
            <div>
              {game.highlights.map((item, index) => (
                <div
                  key={item.id}
                  className="flex gap-5 border-t border-line py-[22px]"
                >
                  <span className="pt-0.5 text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="mb-2.5 text-sm font-semibold">
                      {item.title}
                    </h4>
                    <p className="text-[13px] leading-[1.8] text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {game.closingDescription && (
          <p className="mb-4 whitespace-pre-line text-sm leading-[1.95] text-[#aab3a3]">
            {game.closingDescription}
          </p>
        )}
        {game.finalNote && (
          <p className="border-l-2 border-accent pl-[18px] text-[13px] leading-[1.8] text-[#b0bf9b]">
            {game.finalNote}
          </p>
        )}
      </article>
      <aside className="self-start rounded-[9px] border border-line bg-panel p-[27px]">
        <Monitor size={23} className="text-accent" />
        <h3 className="mb-[22px] mt-[15px] text-lg">Ficha do jogo</h3>
        <GameFacts items={details} />
      </aside>
    </div>
  );
}
