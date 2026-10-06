import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ActionLink } from "@/components/ui/action";

export default function NotFound() {
  return (
    <main>
      <Container>
        <EmptyState
          title="Este jogo não foi encontrado"
          icon={<Eyebrow>404 • FORA DO MAPA</Eyebrow>}
        >
          <p className="text-sm leading-[1.7] text-muted">
            Há outros universos esperando por você.
          </p>
          <ActionLink href="/#catalogo">Explorar o catálogo</ActionLink>
        </EmptyState>
      </Container>
    </main>
  );
}
