import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";

export function GameCreateIntro() {
  return (
    <div className="mb-8">
      <Link
        href="/#catalogo"
        className="mb-9 inline-flex items-center gap-2 text-xs text-muted hover:text-accent"
      >
        <ArrowLeft size={15} />
        Voltar ao catálogo
      </Link>
      <Eyebrow>EXPANDA O CATÁLOGO</Eyebrow>
      <h1 className="mb-3 text-3xl font-semibold tracking-tight tablet:text-5xl">
        Um novo jogo.
        <br />
        <span className="text-accent">Mais descobertas.</span>
      </h1>
      <p className="max-w-xl text-sm leading-relaxed text-muted">
        Adicione um jogo à coleção e compartilhe um novo universo para explorar.
      </p>
    </div>
  );
}
