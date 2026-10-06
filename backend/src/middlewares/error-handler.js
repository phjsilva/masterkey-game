import { getErrorResponse } from "../errors/error-response.js";

export const errorHandler = (error, _req, res, _next) => {
  const { status, message, details } = getErrorResponse(error);
  if (status >= 500)
    console.error(message, { codigo: error.code ?? "ERRO_INTERNO" });
  res.status(status).json({ error: { message, details } });
};
