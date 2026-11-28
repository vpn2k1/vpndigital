import { fail, json, now, type Handler } from '../_lib';

export const onRequestPut: Handler = async ({ env, request, data }) => {
  const slugs = await request.json<string[]>().catch(() => null);
  if (!Array.isArray(slugs) || slugs.some(slug => typeof slug !== 'string')) return fail('Body phải là mảng slug');
  await env.DB.batch(slugs.map((slug, sort) => env.DB.prepare('UPDATE products SET sort = ?, updated_at = ?, updated_by = ? WHERE slug = ?').bind(sort, now(), data.email, slug)));
  return json({ ok: true });
};
