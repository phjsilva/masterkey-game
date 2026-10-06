import { Container } from "@/components/ui/container";
import { SiteBrand } from "./site-brand";

export function SiteFooter() {
  return (
    <footer>
      <Container className="flex flex-wrap items-center gap-[13px] border-t border-line py-[31px] tablet:flex-nowrap tablet:gap-6">
        <SiteBrand compact />
        <p className="ml-auto text-[10px] text-muted tablet:ml-0 tablet:text-[11px]">
          Um catálogo. Infinitos universos.
        </p>
        <span className="w-full text-[10px] text-[#747e6e] tablet:ml-auto tablet:w-auto">
          Explore. Descubra. Jogue.
        </span>
      </Container>
    </footer>
  );
}
