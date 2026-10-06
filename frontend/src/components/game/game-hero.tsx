import { ArrowLeft, ArrowDown } from "lucide-react";
import type { Game } from "@/types/game";
import { GameImage } from "@/components/game-image";
import { CatalogLink } from "@/components/catalog-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ActionLink } from "@/components/ui/action";

export function GameHero({ game }: { game: Game }) {
  return (
    <>
      <CatalogLink className="mb-6 inline-flex items-center gap-[9px] text-xs text-muted">
        <ArrowLeft size={16} /> Voltar ao catálogo
      </CatalogLink>
      <section className="group relative isolate h-[380px] overflow-hidden rounded-[13px] bg-panel tablet:h-[430px]">
        <GameImage
          src={game.rawgImageUrl || game.giantbombImageUrl}
          alt={game.name}
          eager
          className="absolute inset-0 -z-30 size-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.025]"
        />
        <div className="absolute inset-0 -z-20 bg-hero-mobile tablet:bg-hero" />
        <div className="relative flex h-full max-w-[820px] flex-col items-start justify-end p-[25px] tablet:px-[46px] tablet:py-[39px]">
          <Eyebrow>{game.genre.join(" / ")}</Eyebrow>
          <h1 className="mb-[15px] text-[38px] font-[750] leading-[1.03] tracking-[-1.8px] tablet:text-[clamp(32px,5vw,62px)]">
            {game.name}
          </h1>
          <p className="mb-[23px] line-clamp-2 max-w-[440px] text-xs leading-[1.7] text-[#bfc7bd] tablet:text-[13px]">
            {game.title}
          </p>
          <ActionLink href="#sobre">
            Explore este universo <ArrowDown size={17} />
          </ActionLink>
        </div>
      </section>
    </>
  );
}
