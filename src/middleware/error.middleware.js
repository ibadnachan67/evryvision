import { logger } from '../config/logger.js';

export const errorHandler = (err, _req, res, _next) => {
  logger.error(err.message, err.stack);

  const statusCode = err.statusCode ?? 500;

  res.status(statusCode).json({
    message: err.message || 'Internal server error',
    details: err.details ?? undefined,
  });
};
