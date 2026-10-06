import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Eyebrow } from "@/components/ui/eyebrow";

export default function Loading() {
  return (
    <main aria-live="polite">
      <Container>
        <EmptyState
          title="Carregando novos universos…"
          icon={<Eyebrow>MASTERKEY</Eyebrow>}
        />
      </Container>
    </main>
  );
}
