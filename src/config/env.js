import dotenv from 'dotenv';

dotenv.config();

const parseNumber = (value, fallback) => {
  const parsedValue = Number.parseInt(value, 10);
  return Number.isNaN(parsedValue) ? fallback : parsedValue;
};

const requiredInProduction = ['DATABASE_URL', 'JWT_SECRET'];

const envConfig = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseNumber(process.env.PORT ?? process.env.port, 5000),
  databaseUrl: process.env.DATABASE_URL ?? '',
  jwtSecret: process.env.JWT_SECRET ?? 'change-me-in-production',
  corsOrigins: (process.env.CORS_ORIGINS ?? 'http://localhost:3000')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean),
};

if (envConfig.nodeEnv === 'production') {
  const missingKeys = requiredInProduction.filter((key) => !process.env[key]);

  if (missingKeys.length > 0) {
    throw new Error(`Missing required environment variables: ${missingKeys.join(', ')}`);
  }
}

export const env = envConfig;
