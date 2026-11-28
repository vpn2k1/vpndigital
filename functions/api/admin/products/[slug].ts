import { fail, json, now, type Handler } from '../_lib';
import { check, listEntries, type Entry } from './_store';

export const onRequestPut: Handler = async ({ env, request, params, data }) => {
  const entry = await request.json<Entry>().catch(() => null);
  if (!entry?.vi) return fail('Body không hợp lệ');
  entry.slug = entry.vi.slug;
  const entries = await listEntries(env);
  const index = entries.findIndex(item => item.slug === params.slug);
  if (index < 0) return fail('Không tìm thấy sản phẩm', 404);
  entries[index] = entry;
  const error = check(entries);
  if (error) return fail(error);
  await env.DB.prepare('UPDATE products SET slug = ?, vi = ?, en = ?, updated_at = ?, updated_by = ? WHERE slug = ?')
    .bind(entry.slug, JSON.stringify(entry.vi), JSON.stringify(entry.en), now(), data.email, params.slug).run();
  return json(entry);
};

export const onRequestDelete: Handler = async ({ env, params, data }) => {
  const { meta } = await env.DB.prepare('DELETE FROM products WHERE slug = ?').bind(params.slug).run();
  if (!meta.changes) return fail('Không tìm thấy sản phẩm', 404);
  // Deletions leave no row behind, so record the change time on meta for the "unpublished changes" badge.
  await env.DB.prepare("INSERT INTO texts (key, json, updated_at, updated_by) VALUES ('meta', '{}', ?, ?) ON CONFLICT(key) DO UPDATE SET updated_at = excluded.updated_at, updated_by = excluded.updated_by")
    .bind(now(), data.email).run();
  return json({ ok: true });
};
