export interface Game {
  id: string;
  name: string;
  title: string;
  description: string;
  destaque: boolean;
  genre: string[];
  plataforma: string[];
  lancamento: string;
  empresa: string;
  rawgImageUrl?: string | null;
  giantbombImageUrl?: string | null;
}
export interface GameDetails extends Game {
  size?: number | null;
  highlightsTitle: string;
  closingDescription: string;
  finalNote: string;
  highlights: { id: string; title: string; description: string }[];
  requirements: {
    id: string;
    system: string;
    processor: string;
    memory: string;
    graphics: string;
    directX: string;
    storage: string;
    other: string;
  }[];
}
