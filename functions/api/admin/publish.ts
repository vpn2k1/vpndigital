import { fail, json, now, type Handler } from './_lib';

const lastChange = 'SELECT MAX(t) AS changed FROM (SELECT MAX(updated_at) AS t FROM products UNION ALL SELECT MAX(updated_at) FROM texts)';

export const onRequestGet: Handler = async ({ env }) => {
  const meta = await env.DB.prepare("SELECT json FROM texts WHERE key = 'meta'").first<{ json: string }>();
  const { changed } = (await env.DB.prepare(lastChange).first<{ changed: string | null }>()) ?? { changed: null };
  const publishedAt: string | null = meta ? JSON.parse(meta.json).publishedAt ?? null : null;
  return json({ publishedAt, changedAt: changed, pending: !!changed && (!publishedAt || changed > publishedAt) });
};

export const onRequestPost: Handler = async ({ env, data }) => {
  if (!env.DEPLOY_HOOK_URL) return fail('Chưa cấu hình DEPLOY_HOOK_URL', 500);
  const response = await fetch(env.DEPLOY_HOOK_URL, { method: 'POST' });
  if (!response.ok) return fail(`Deploy hook lỗi ${response.status}`, 502);
  const publishedAt = now();
  // Upsert without touching updated_at, so publishing itself does not count as a content change.
  await env.DB.prepare("INSERT INTO texts (key, json, updated_at, updated_by) VALUES ('meta', ?, NULL, ?) ON CONFLICT(key) DO UPDATE SET json = excluded.json")
    .bind(JSON.stringify({ publishedAt, by: data.email }), data.email).run();
  return json({ publishedAt });
};
