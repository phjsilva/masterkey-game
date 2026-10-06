import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { GameCreateIntro } from "@/components/game-form/game-create-intro";
import { GameCreateForm } from "@/components/game-form/game-create-form";

export const metadata: Metadata = { title: "Adicionar jogo" };

export default function NewGamePage() {
  return (
    <main>
      <Container className="max-w-[920px] py-9 tablet:py-14">
        <GameCreateIntro />
        <GameCreateForm />
      </Container>
    </main>
  );
}
