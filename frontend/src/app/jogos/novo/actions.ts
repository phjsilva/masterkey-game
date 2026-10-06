"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { gamePayloadFromForm, type GameFormState } from "@/lib/game-form";

export async function createGameAction(
  _previous: GameFormState,
  form: FormData,
): Promise<GameFormState> {
  let id: string;
  try {
    const response = await fetch(
      `${process.env.API_URL ?? "http://localhost:3001"}/games`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gamePayloadFromForm(form)),
        signal: AbortSignal.timeout(30000),
      },
    );
    const result = await response.json();
    if (!response.ok)
      return {
        error:
          result.error?.message ??
          "Não foi possível cadastrar o jogo. Confira os dados e tente novamente.",
        field: result.error?.details?.field,
      };
    id = result.id;
    if (!id)
      return {
        error:
          "Não foi possível confirmar o cadastro. Confira o catálogo antes de tentar novamente.",
      };
  } catch {
    return {
      error:
        "Não foi possível confirmar o cadastro com o servidor. Seus dados continuam no formulário. Confira o catálogo antes de tentar novamente.",
    };
  }
  revalidatePath("/");
  redirect(`/jogos/${encodeURIComponent(id)}`);
}
