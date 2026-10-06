"use client";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { ActionButton } from "@/components/ui/action";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main>
      <Container>
        <EmptyState title="Não foi possível carregar o catálogo">
          <p className="text-sm leading-[1.7] text-muted">
            A conexão está indisponível no momento. Tente novamente em
            instantes.
          </p>
          <ActionButton onClick={reset}>Tentar novamente</ActionButton>
        </EmptyState>
      </Container>
    </main>
  );
}
