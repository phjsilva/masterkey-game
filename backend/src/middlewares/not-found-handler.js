export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: {
      message: `Rota ${req.method} ${req.originalUrl} não encontrada.`,
    },
  });
};
