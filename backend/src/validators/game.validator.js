import { AppError } from "../errors/app-error.js";

const fieldLabels = {
  id: "identificador",
  JSON: "corpo da requisição",
  name: "nome",
  description: "descrição",
  empresa: "empresa",
  title: "título",
  highlightsTitle: "título dos destaques",
  closingDescription: "descrição final",
  finalNote: "observação final",
  genre: "gêneros",
  plataforma: "plataformas",
  lancamento: "data de lançamento",
  destaque: "destaque",
  size: "tamanho",
  rawgImageUrl: "endereço da imagem RAWG",
  giantbombImageUrl: "endereço da imagem Giant Bomb",
  highlights: "destaques",
  requirements: "requisitos",
  system: "sistema operacional",
  processor: "processador",
  memory: "memória",
  graphics: "placa de vídeo",
  directX: "DirectX",
  storage: "armazenamento",
  other: "observações",
};
const fail = (field) => {
  const label = field.split(".").map((part) => fieldLabels[part]);
  const message = label.every(Boolean)
    ? `Campo inválido: ${label.join(" / ")}.`
    : "A requisição contém um campo não permitido.";
  throw new AppError(message, 400, { field });
};
const strings = [
  "name",
  "description",
  "empresa",
  "title",
  "highlightsTitle",
  "closingDescription",
  "finalNote",
];
const required = [
  "name",
  "description",
  "empresa",
  "genre",
  "plataforma",
  "lancamento",
];
const allowed = [
  ...strings,
  "genre",
  "plataforma",
  "lancamento",
  "destaque",
  "size",
  "rawgImageUrl",
  "giantbombImageUrl",
  "highlights",
  "requirements",
];
export const validateGameId = (id) => {
  if (
    typeof id !== "string" ||
    !/^(?:[a-f\d]{24}|[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12})$/i.test(id)
  )
    fail("id");
  return id.toLowerCase();
};
export const validateGamePayload = (payload, create = false) => {
  if (
    !payload ||
    typeof payload !== "object" ||
    Array.isArray(payload) ||
    !Object.keys(payload).length
  )
    fail("JSON");
  for (const key of Object.keys(payload)) if (!allowed.includes(key)) fail(key);
  if (create)
    for (const key of required) if (payload[key] === undefined) fail(key);
  for (const key of strings) {
    if (
      payload[key] !== undefined &&
      (typeof payload[key] !== "string" ||
        (required.includes(key) && !payload[key].trim()))
    )
      fail(key);
  }
  for (const key of ["genre", "plataforma"]) {
    if (
      payload[key] !== undefined &&
      (!Array.isArray(payload[key]) ||
        !payload[key].length ||
        payload[key].some((v) => typeof v !== "string" || !v.trim()))
    )
      fail(key);
  }
  if (payload.destaque !== undefined && typeof payload.destaque !== "boolean")
    fail("destaque");
  if (
    payload.size !== undefined &&
    payload.size !== null &&
    (typeof payload.size !== "number" ||
      !Number.isFinite(payload.size) ||
      payload.size < 0)
  )
    fail("size");
  if (
    payload.lancamento !== undefined &&
    (typeof payload.lancamento !== "string" ||
      !/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(payload.lancamento) ||
      !Number.isFinite(Date.parse(payload.lancamento)))
  )
    fail("lancamento");
  for (const key of ["rawgImageUrl", "giantbombImageUrl"]) {
    const value = payload[key];
    if (
      value !== undefined &&
      value !== null &&
      (typeof value !== "string" || !/^(https?:\/\/|\/(?!\/))/.test(value))
    )
      fail(key);
  }
  for (const [key, fields, mandatory] of [
    ["highlights", ["title", "description"], ["title", "description"]],
    [
      "requirements",
      [
        "system",
        "processor",
        "memory",
        "graphics",
        "directX",
        "storage",
        "other",
      ],
      ["system", "processor", "memory", "graphics", "storage"],
    ],
  ]) {
    if (payload[key] === undefined) continue;
    if (!Array.isArray(payload[key])) fail(key);
    for (const item of payload[key]) {
      if (!item || typeof item !== "object" || Array.isArray(item)) fail(key);
      if (Object.keys(item).some((field) => !fields.includes(field))) fail(key);
      for (const field of mandatory)
        if (typeof item[field] !== "string" || !item[field].trim())
          fail(`${key}.${field}`);
      for (const field of fields)
        if (item[field] !== undefined && typeof item[field] !== "string")
          fail(`${key}.${field}`);
    }
  }
};
export const validateCreateGamePayload = (payload) =>
  validateGamePayload(payload, true);
export const validateUpdateGamePayload = (payload) =>
  validateGamePayload(payload);
