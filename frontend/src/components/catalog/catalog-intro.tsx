import { ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export function CatalogIntro() {
  return (
    <section>
      <Container className="pb-[26px] pt-[35px] tablet:pb-[39px] tablet:pt-[58px]">
        <Eyebrow dot>SEU PRÓXIMO UNIVERSO COMEÇA AQUI</Eyebrow>
        <div className="tablet:flex tablet:items-end tablet:justify-between tablet:gap-8">
          <h1 className="text-[44px] font-[650] leading-[1.05] tracking-[-2px] tablet:text-[clamp(38px,4.6vw,65px)] tablet:tracking-[-3px]">
            Mais mundos.
            <br />
            <span className="text-[#9aa295]">Mais descobertas.</span>
          </h1>
          <p className="mt-[21px] text-xs leading-[1.8] text-[#aab0a7] tablet:mb-1 tablet:mt-0 tablet:max-w-[310px] tablet:text-[13px]">
            Explore histórias, descubra novos favoritos
            <br className="hidden tablet:block" /> e encontre o próximo jogo da
            sua lista.
            <a
              className="mt-[13px] flex items-center gap-3 text-xs text-foreground tablet:mt-[18px]"
              href="#catalogo"
            >
              Explore o catálogo <ArrowDown size={16} />
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
