import test from "node:test";
import assert from "node:assert/strict";
import { getErrorResponse } from "../src/errors/error-response.js";
import { errorHandler } from "../src/middlewares/error-handler.js";
import {
  validateCreateGamePayload,
  validateUpdateGamePayload,
} from "../src/validators/game.validator.js";

test("traduz falhas de requisição e banco sem expor mensagens das bibliotecas", () => {
  const cases = [
    [
      { type: "entity.parse.failed" },
      400,
      "O corpo da requisição contém um JSON inválido.",
    ],
    [
      { type: "entity.too.large" },
      413,
      "O corpo da requisição excede o tamanho permitido.",
    ],
    [{ code: "P2002" }, 409, "Já existe um registro com esses dados."],
    [{ code: "P2025" }, 404, "O registro solicitado não foi encontrado."],
    [{ code: "P1001" }, 503, "Não foi possível conectar ao banco de dados."],
    [
      { name: "PrismaClientValidationError" },
      400,
      "Os dados informados são inválidos para esta operação.",
    ],
    [
      { name: "PrismaClientInitializationError" },
      503,
      "O banco de dados está indisponível no momento.",
    ],
  ];
  for (const [error, status, message] of cases) {
    assert.deepEqual(
      getErrorResponse({
        ...error,
        message: "Internal English error",
        stack: "Sensitive details",
      }),
      { status, message },
    );
  }
  assert.equal(
    getErrorResponse(new Error("Internal server error")).message,
    "Erro interno do servidor. Tente novamente em instantes.",
  );
});
test("validação usa nomes de campos em português e preserva a chave técnica nos detalhes", () => {
  assert.throws(
    () => validateCreateGamePayload({ description: "Exemplo" }),
    (error) =>
      error.message === "Campo inválido: nome." &&
      error.details.field === "name",
  );
  assert.throws(
    () => validateUpdateGamePayload({ requirements: [{ system: "Windows" }] }),
    (error) => error.message === "Campo inválido: requisitos / processador.",
  );
  assert.throws(
    () => validateUpdateGamePayload({ price: 5 }),
    (error) => error.message === "A requisição contém um campo não permitido.",
  );
});
test("middleware retorna a mensagem traduzida sem stack de erro", () => {
  let status, body;
  const res = {
    status(value) {
      status = value;
      return this;
    },
    json(value) {
      body = value;
    },
  };
  errorHandler(
    {
      type: "entity.parse.failed",
      message: "Unexpected token",
      stack: "English stack",
    },
    {},
    res,
    () => {},
  );
  assert.equal(status, 400);
  assert.equal(
    body.error.message,
    "O corpo da requisição contém um JSON inválido.",
  );
  assert.equal(body.error.stack, undefined);
});
