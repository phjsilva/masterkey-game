export type GameFormState = { error?: string; field?: string };

export function gamePayloadFromForm(form: FormData) {
  const text = (key: string) => String(form.get(key) ?? "").trim();
  const list = (key: string) => [
    ...new Set(
      text(key)
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  ];
  return {
    name: text("name"),
    title: text("title"),
    description: text("description"),
    empresa: text("empresa"),
    genre: list("genre"),
    plataforma: list("plataforma"),
    lancamento: text("lancamento"),
    destaque: form.get("destaque") === "on",
    ...(text("size") ? { size: Number(text("size")) } : {}),
    ...(text("rawgImageUrl") ? { rawgImageUrl: text("rawgImageUrl") } : {}),
  };
}
