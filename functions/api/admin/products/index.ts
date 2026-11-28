import { fail, json, now, type Handler } from '../_lib';
import { check, listEntries, type Entry } from './_store';

export const onRequestGet: Handler = async ({ env }) => json(await listEntries(env));

export const onRequestPost: Handler = async ({ env, request, data }) => {
  const entry = await request.json<Entry>().catch(() => null);
  if (!entry?.vi) return fail('Body không hợp lệ');
  entry.slug = entry.vi.slug;
  const entries = await listEntries(env);
  const error = check([...entries, entry]);
  if (error) return fail(error);
  await env.DB.prepare('INSERT INTO products (slug, sort, vi, en, updated_at, updated_by) VALUES (?, (SELECT COALESCE(MAX(sort), -1) + 1 FROM products), ?, ?, ?, ?)')
    .bind(entry.slug, JSON.stringify(entry.vi), JSON.stringify(entry.en), now(), data.email).run();
  return json(entry, 201);
};
