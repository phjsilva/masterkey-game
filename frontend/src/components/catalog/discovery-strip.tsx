import { ArrowRight, Compass } from "lucide-react";
import { Container } from "@/components/ui/container";

export function DiscoveryStrip() {
  return (
    <section>
      <Container className="flex items-center justify-between gap-[25px] border-b border-line py-[22px] tablet:py-[31px]">
        <div className="flex items-center gap-[17px]">
          <Compass
            size={22}
            className="box-content rounded-full border border-line p-2.5 text-accent tablet:p-[13px]"
          />
          <p className="text-xs leading-[1.8] text-[#a2aa9e]">
            Um novo jogo.
            <br />
            <strong className="font-medium text-foreground">
              Infinitas possibilidades.
            </strong>
          </p>
        </div>
        <p className="hidden text-[11px] leading-[1.7] text-muted tablet:block">
          RPG, aventura, estratégia e muito mais.
          <br />O próximo universo é você quem escolhe.
        </p>
        <a
          href="#catalogo"
          className="hidden items-center gap-[18px] text-[11px] text-accent tablet:flex"
        >
          Encontre sua próxima aventura <ArrowRight size={18} />
        </a>
      </Container>
    </section>
  );
}
