import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getPool } from './client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.resolve(__dirname, '../../migrations');

const ensureMigrationsTable = async (client) => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT NOT NULL UNIQUE,
      executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
};

const getExecutedMigrationNames = async (client) => {
  const result = await client.query('SELECT filename FROM schema_migrations ORDER BY filename ASC');
  return new Set(result.rows.map((row) => row.filename));
};

const run = async () => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await ensureMigrationsTable(client);

    const entries = await fs.readdir(migrationsDir);
    const migrationFiles = entries.filter((entry) => entry.endsWith('.sql')).sort();
    const executedMigrationNames = await getExecutedMigrationNames(client);

    for (const fileName of migrationFiles) {
      if (executedMigrationNames.has(fileName)) {
        continue;
      }

      const filePath = path.join(migrationsDir, fileName);
      const sql = await fs.readFile(filePath, 'utf8');

      await client.query('BEGIN');
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [fileName]);
      await client.query('COMMIT');

      console.log(`Applied migration: ${fileName}`);
    }
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
