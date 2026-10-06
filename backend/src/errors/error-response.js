import { AppError } from "./app-error.js";

const databaseErrors = {
  P2002: [409, "Já existe um registro com esses dados."],
  P2003: [400, "O registro informado possui uma relação inválida."],
  P2025: [404, "O registro solicitado não foi encontrado."],
  P1000: [503, "Não foi possível autenticar a conexão com o banco de dados."],
  P1001: [503, "Não foi possível conectar ao banco de dados."],
  P1002: [503, "O banco de dados demorou demais para responder."],
  P2024: [503, "O banco de dados está ocupado. Tente novamente em instantes."],
};

export function getErrorResponse(error) {
  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      message: error.message,
      details: error.details,
    };
  }
  if (error.type === "entity.parse.failed")
    return {
      status: 400,
      message: "O corpo da requisição contém um JSON inválido.",
    };
  if (error.type === "entity.too.large")
    return {
      status: 413,
      message: "O corpo da requisição excede o tamanho permitido.",
    };
  if (["encoding.unsupported", "charset.unsupported"].includes(error.type))
    return {
      status: 415,
      message: "A codificação da requisição não é suportada.",
    };
  const database = databaseErrors[error.code];
  if (database) return { status: database[0], message: database[1] };
  if (error.name === "PrismaClientInitializationError")
    return {
      status: 503,
      message: "O banco de dados está indisponível no momento.",
    };
  if (error.name === "PrismaClientValidationError")
    return {
      status: 400,
      message: "Os dados informados são inválidos para esta operação.",
    };
  return {
    status: 500,
    message: "Erro interno do servidor. Tente novamente em instantes.",
  };
}
