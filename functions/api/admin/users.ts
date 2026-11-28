import { fail, json, type Handler } from './_lib';

// Admin-only: enforced in _middleware.ts.
export const onRequestGet: Handler = async ({ env }) => json((await env.DB.prepare('SELECT email, role FROM users ORDER BY email').all()).results);

export const onRequestPut: Handler = async ({ env, request, data }) => {
  const body = await request.json<{ email?: string; role?: string }>().catch(() => null);
  const email = body?.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('Email không hợp lệ');
  if (body?.role !== 'admin' && body?.role !== 'editor') return fail('Role phải là admin hoặc editor');
  if (email === data.email && body.role !== 'admin') return fail('Không thể tự hạ quyền của chính mình');
  await env.DB.prepare('INSERT INTO users (email, role) VALUES (?, ?) ON CONFLICT(email) DO UPDATE SET role = excluded.role').bind(email, body.role).run();
  return json({ email, role: body.role });
};

export const onRequestDelete: Handler = async ({ env, request, data }) => {
  const email = new URL(request.url).searchParams.get('email')?.toLowerCase();
  if (!email) return fail('Thiếu email');
  if (email === data.email) return fail('Không thể tự xoá chính mình');
  await env.DB.prepare('DELETE FROM users WHERE email = ?').bind(email).run();
  return json({ ok: true });
};
