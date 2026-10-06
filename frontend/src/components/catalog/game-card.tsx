import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Game } from "@/types/game";
import { GameImage } from "@/components/game-image";

export function GameCard({ game }: { game: Game }) {
  return (
    <Link
      href={`/jogos/${game.id}`}
      className="group min-w-0 overflow-hidden rounded-[9px] border border-[#2b312b] bg-[#191d19] transition duration-200 hover:-translate-y-1 hover:border-[#7e9957]"
    >
      <div className="relative h-[125px] overflow-hidden bg-[#242c21] tablet:h-[167px] wide:h-[184px]">
        <GameImage
          src={game.rawgImageUrl || game.giantbombImageUrl}
          alt={game.name}
          className="size-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.06]"
        />
        {game.destaque && (
          <span className="absolute left-2 top-2 flex items-center gap-[5px] rounded border border-[#a7c77444] bg-[#111b11e8] p-[5px] text-[8px] text-accent tablet:left-3 tablet:top-3 tablet:px-2 tablet:py-1.5 tablet:text-[9px]">
            <Sparkles size={12} /> Destaque
          </span>
        )}
        <span className="absolute bottom-2 right-2 grid size-[25px] place-items-center rounded-full bg-black/80 text-white backdrop-blur-sm tablet:bottom-3 tablet:right-3 tablet:size-[30px]">
          <ArrowUpRight size={19} />
        </span>
      </div>
      <div className="px-[11px] py-[13px] tablet:px-[17px] tablet:pb-[19px] tablet:pt-[17px]">
        <div className="mb-[11px] flex justify-between gap-[5px] text-[8px] leading-normal text-accent tablet:gap-2 tablet:text-[9px]">
          {game.genre.slice(0, 2).join(" · ")}
          <span className="hidden text-muted tablet:inline">
            {new Date(game.lancamento).getUTCFullYear()}
          </span>
        </div>
        <h3 className="mb-3 text-sm font-semibold leading-[1.3] tracking-[-.3px] tablet:text-base">
          {game.name}
        </h3>
        <p className="text-[9px] leading-[1.6] text-muted tablet:text-[10px]">
          {game.plataforma.join(" / ")}
        </p>
      </div>
    </Link>
  );
}
