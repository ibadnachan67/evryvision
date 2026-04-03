import app from './src/app.js';
import { env } from './src/config/env.js';
import { logger } from './src/config/logger.js';

const server = app.listen(env.port, () => {
  logger.info(`Server listening on port ${env.port}`);
});

process.on('SIGTERM', () => {
  logger.warn('SIGTERM received. Shutting down gracefully.');
  server.close(() => {
    logger.info('HTTP server closed.');
    process.exit(0);
  });
});
