import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import { corsOptions } from './config/cors.js';
import { env } from './config/env.js';
import { loggerStream } from './config/logger.js';
import { errorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/notfound.middleware.js';
import { apiRateLimiter } from './middleware/ratelimit.middleware.js';
import routes from './routes/index.js';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', env.nodeEnv === 'production' ? 1 : false);

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev', { stream: loggerStream }));
app.use(compression());
app.use(hpp());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
app.use('/api', apiRateLimiter, routes);

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: env.nodeEnv,
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
