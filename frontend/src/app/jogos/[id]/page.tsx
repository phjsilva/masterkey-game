import { Container } from "@/components/ui/container";
import { GameHero } from "@/components/game/game-hero";
import { GameOverview } from "@/components/game/game-overview";
import { GameRequirements } from "@/components/game/game-requirements";
import { getGamePageData } from "@/lib/catalog-data";

export const dynamic = "force-dynamic";

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const game = await getGamePageData((await params).id);
  return (
    <main>
      <Container className="pt-[30px]">
        <GameHero game={game} />
        <GameOverview game={game} />
        <GameRequirements requirements={game.requirements} />
      </Container>
    </main>
  );
}
