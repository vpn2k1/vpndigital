import { json, type Handler } from './_lib';

// Latest edits across apps and site texts (the 'meta' row only tracks publishing, so it is skipped).
const latest = `SELECT 'app' AS kind, slug AS target, updated_at AS at, updated_by AS by FROM products WHERE updated_at IS NOT NULL
UNION ALL SELECT 'text', key, updated_at, updated_by FROM texts WHERE key != 'meta' AND updated_at IS NOT NULL
ORDER BY at DESC LIMIT 8`;

export const onRequestGet: Handler = async ({ env }) => json((await env.DB.prepare(latest).all()).results);
