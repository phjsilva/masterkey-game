import type { GameDetails } from "@/types/game";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GameFacts } from "./game-facts";

export function GameRequirements({
  requirements,
}: {
  requirements: GameDetails["requirements"];
}) {
  return (
    <section className="pb-[70px] pt-5">
      <Eyebrow>ANTES DE JOGAR</Eyebrow>
      <h2 className="mb-6 text-[25px] font-[650] tracking-[-1px] tablet:text-[30px]">
        Requisitos de sistema
      </h2>
      {requirements.length ? (
        <div className="grid gap-[22px] tablet:grid-cols-2">
          {requirements.map((requirement, index) => {
            const items: [string, string][] = [
              ["Sistema", requirement.system],
              ["Processador", requirement.processor],
              ["Memória", requirement.memory],
              ["Placa de vídeo", requirement.graphics],
              ["DirectX", requirement.directX],
              ["Armazenamento", requirement.storage],
              ["Observações", requirement.other],
            ];
            return (
              <article
                key={requirement.id}
                className="self-start rounded-[9px] border border-line bg-panel p-[27px]"
              >
                <h3 className="mb-4 mt-[15px] text-lg">
                  Configuração {index + 1}
                </h3>
                <GameFacts items={items.filter(([, value]) => value)} />
              </article>
            );
          })}
        </div>
      ) : (
        <p className="text-sm leading-[1.95] text-[#aab3a3]">
          Os requisitos deste jogo ainda não foram informados.
        </p>
      )}
    </section>
  );
}
