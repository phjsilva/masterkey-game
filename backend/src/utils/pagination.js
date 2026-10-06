import { AppError } from "../errors/app-error.js";

export const parseLimit = (value, defaultValue = 10, maxValue = 100) => {
  if (value === undefined) {
    return defaultValue;
  }

  const limit = Number(value);

  if (!Number.isInteger(limit) || limit < 1 || limit > maxValue) {
    throw new AppError(
      `O limite de resultados deve ser um número inteiro entre 1 e ${maxValue}.`,
      400,
    );
  }

  return limit;
};
