import { Pool } from 'pg';

import { env } from '../config/env.js';

let pool;

export const getPool = () => {
  if (!pool) {
    pool = new Pool({
      connectionString: env.databaseUrl || undefined,
    });
  }

  return pool;
};

export const query = async (text, params) => {
  const client = getPool();
  return client.query(text, params);
};
