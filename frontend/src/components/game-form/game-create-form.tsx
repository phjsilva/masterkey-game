"use client";

import Link from "next/link";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Plus, LoaderCircle } from "lucide-react";
import { createGameAction } from "@/app/jogos/novo/actions";
import { ActionButton } from "@/components/ui/action";
import { FormField } from "./form-field";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <ActionButton
      type="submit"
      disabled={pending}
      className="w-full disabled:cursor-wait disabled:opacity-60 tablet:w-auto"
    >
      {pending ? (
        <LoaderCircle size={17} className="animate-spin" />
      ) : (
        <Plus size={17} />
      )}
      {pending ? "Cadastrando…" : "Adicionar jogo"}
    </ActionButton>
  );
}

export function GameCreateForm() {
  const [state, action] = useFormState(createGameAction, {});
  const [values, setValues] = useState<Record<string, string>>({});
  const [featured, setFeatured] = useState(false);
  const field = (name: string) => ({
    value: values[name] ?? "",
    onValueChange: (value: string) =>
      setValues((previous) => ({ ...previous, [name]: value })),
    invalid: state.field === name,
  });
  return (
    <form
      action={action}
      onReset={(event) => event.preventDefault()}
      className="rounded-xl border border-line bg-panel p-5 tablet:p-9"
    >
      <fieldset>
        <legend className="mb-1 text-xl font-semibold">
          Informações do jogo
        </legend>
        <p className="mb-7 text-xs leading-relaxed text-muted">
          Campos marcados com * são obrigatórios. Após salvar, você será levado
          à ficha do jogo.
        </p>
        <div className="grid gap-6 tablet:grid-cols-2">
          <FormField
            name="name"
            label="Nome do jogo"
            required
            placeholder="Ex.: Hollow Knight"
            {...field("name")}
          />
          <FormField
            name="empresa"
            label="Estúdio / empresa"
            required
            placeholder="Ex.: Team Cherry"
            {...field("empresa")}
          />
          <FormField
            name="description"
            label="Descrição"
            required
            multiline
            {...field("description")}
          />
          <FormField
            name="genre"
            label="Gêneros"
            required
            placeholder="Aventura, Metroidvania"
            hint="Separe os gêneros por vírgulas."
            {...field("genre")}
          />
          <FormField
            name="plataforma"
            label="Plataformas"
            required
            placeholder="PC, Nintendo Switch"
            hint="Separe as plataformas por vírgulas."
            {...field("plataforma")}
          />
          <FormField
            name="lancamento"
            label="Data de lançamento"
            type="date"
            required
            {...field("lancamento")}
          />
          <FormField
            name="size"
            label="Armazenamento (GB)"
            type="number"
            min="0"
            step="any"
            placeholder="Ex.: 9"
            {...field("size")}
          />
          <FormField
            name="title"
            label="Subtítulo"
            placeholder="Uma frase para apresentar o jogo"
            {...field("title")}
          />
          <FormField
            name="rawgImageUrl"
            label="URL da imagem de capa"
            type="url"
            placeholder="https://exemplo.com/capa.jpg"
            hint="Opcional. Use um endereço público começando com https:// ou http://."
            {...field("rawgImageUrl")}
          />
        </div>
        <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-lg border border-line p-4">
          <input
            type="checkbox"
            name="destaque"
            checked={featured}
            onChange={(event) => setFeatured(event.target.checked)}
            className="mt-0.5 h-4 w-4 accent-accent"
          />
          <span>
            <span className="block text-sm font-medium">
              Destacar este jogo
            </span>
            <span className="mt-1 block text-xs text-muted">
              Incluir na seleção de jogos em destaque do catálogo.
            </span>
          </span>
        </label>
      </fieldset>
      {state.error && (
        <p
          role="alert"
          className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200"
        >
          {state.error}
        </p>
      )}
      <div className="mt-8 flex flex-col-reverse items-center justify-between gap-5 border-t border-line pt-6 tablet:flex-row">
        <Link
          href="/#catalogo"
          className="text-sm text-muted hover:text-foreground"
        >
          Cancelar e voltar ao catálogo
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}
