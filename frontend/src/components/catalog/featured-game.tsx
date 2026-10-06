import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Game } from "@/types/game";
import { GameImage } from "@/components/game-image";
import { Container } from "@/components/ui/container";

export function FeaturedGame({ game }: { game?: Game }) {
  if (!game) return null;
  return (
    <section>
      <Container>
        <Link
          href={`/jogos/${game.id}`}
          className="group relative isolate block h-[400px] overflow-hidden rounded-[13px] bg-panel tablet:h-[450px] desktop:h-[460px] wide:h-[510px]"
        >
          <GameImage
            src={game.rawgImageUrl || game.giantbombImageUrl}
            alt={`Universo de ${game.name}`}
            eager
            className="absolute inset-0 -z-30 size-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.025]"
          />
          <div className="absolute inset-0 -z-20 bg-hero-mobile tablet:bg-hero" />
          <div className="relative flex h-full flex-col items-start justify-end p-[25px] tablet:max-w-[660px] tablet:px-[46px] tablet:py-[39px]">
            <span className="mb-auto inline-flex items-center gap-2 rounded border border-white/20 bg-white/5 px-[11px] py-[9px] text-[9px] tracking-[1.7px] text-[#dfe9d9]">
              <Sparkles size={14} /> ESCOLHA PARA EXPLORAR
            </span>
            <p className="mb-3.5 mt-[25px] text-[9px] uppercase tracking-[2px] text-accent tablet:mt-7 tablet:text-[10px]">
              {game.genre.slice(0, 3).join(" / ")}
            </p>
            <h2 className="mb-[15px] text-[38px] font-[750] leading-[1.03] tracking-[-1.8px] tablet:text-[clamp(33px,4.2vw,54px)]">
              {game.name}
            </h2>
            <p className="mb-[23px] line-clamp-2 max-w-[440px] text-xs leading-[1.7] text-[#bfc7bd] tablet:text-[13px]">
              {game.description}
            </p>
            <span className="inline-flex items-center gap-6 rounded-[5px] bg-accent px-[21px] py-3.5 text-xs font-bold text-[#19200f] transition-colors group-hover:bg-[#d5ff86]">
              Conhecer o jogo <ArrowUpRight size={18} />
            </span>
          </div>
          <span className="absolute bottom-[37px] right-[39px] hidden flex-col gap-2.5 text-right text-[9px] tracking-[2px] text-[#c8cec3] tablet:flex">
            EM DESTAQUE{" "}
            <span className="text-[13px] tracking-[1px] text-white">
              01 / 01
            </span>
          </span>
        </Link>
      </Container>
    </section>
  );
}
