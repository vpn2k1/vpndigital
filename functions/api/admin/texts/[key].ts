import { fail, json, now, type Handler } from '../_lib';

const keys = ['strings-vi', 'strings-en'];

export const onRequestGet: Handler = async ({ env, params }) => {
  if (!keys.includes(String(params.key))) return fail('Key không hợp lệ', 404);
  const row = await env.DB.prepare('SELECT json FROM texts WHERE key = ?').bind(params.key).first<{ json: string }>();
  return row ? new Response(row.json, { headers: { 'content-type': 'application/json' } }) : fail('Chưa có dữ liệu', 404);
};

export const onRequestPut: Handler = async ({ env, params, request, data }) => {
  if (!keys.includes(String(params.key))) return fail('Key không hợp lệ', 404);
  const value = await request.json().catch(() => null);
  if (!value || typeof value !== 'object' || Array.isArray(value)) return fail('Body phải là object JSON');
  // Both locales must keep the same shape: vi is typed against en (config/strings/vi.ts), so a missing key breaks the build.
  const other = await env.DB.prepare('SELECT json FROM texts WHERE key = ?').bind(params.key === 'strings-vi' ? 'strings-en' : 'strings-vi').first<{ json: string }>();
  if (other && shape(value) !== shape(JSON.parse(other.json))) return fail('Cấu trúc khác bản ngôn ngữ còn lại: không được thêm/xoá khoá');
  await env.DB.prepare('INSERT INTO texts (key, json, updated_at, updated_by) VALUES (?, ?, ?, ?) ON CONFLICT(key) DO UPDATE SET json = excluded.json, updated_at = excluded.updated_at, updated_by = excluded.updated_by')
    .bind(params.key, JSON.stringify(value), now(), data.email).run();
  return json({ ok: true });
};

/** Key structure only (array lengths may differ between languages). */
function shape(value: unknown): string {
  if (Array.isArray(value)) return `[${value.length ? shape(value[0]) : ''}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map(key => `${key}:${shape((value as Record<string, unknown>)[key])}`).join(',')}}`;
  return typeof value;
}
