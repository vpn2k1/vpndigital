import cloudflareAccess, { type PluginData } from '@cloudflare/pages-plugin-cloudflare-access';
import { fail, type Data, type Env, type Role } from './_lib';

const isLocal = (url: string) => ['localhost', '127.0.0.1'].includes(new URL(url).hostname);

// 1. Verify the Cloudflare Access JWT (Access already blocks at the edge; this rejects requests that bypass it).
const access: PagesFunction<Env, string, Data & Partial<PluginData>> = context => {
  if (context.env.DEV_ADMIN_EMAIL && isLocal(context.request.url)) return context.next();
  return cloudflareAccess({ domain: context.env.CF_ACCESS_TEAM_DOMAIN as `https://${string}.cloudflareaccess.com`, aud: context.env.CF_ACCESS_AUD })(context as never);
};

// 2. Map the verified email to a role stored in D1.
const authorize: PagesFunction<Env, string, Data & Partial<PluginData>> = async context => {
  const email = (context.data.cloudflareAccess?.JWT.payload.email ?? (isLocal(context.request.url) ? context.env.DEV_ADMIN_EMAIL : undefined))?.toLowerCase();
  if (!email) return fail('Chưa đăng nhập', 401);
  const row = await context.env.DB.prepare('SELECT role FROM users WHERE email = ?').bind(email).first<{ role: Role }>();
  if (!row) return fail('Tài khoản chưa được cấp quyền', 403);
  const path = new URL(context.request.url).pathname;
  if (path.startsWith('/api/admin/users') && row.role !== 'admin') return fail('Chỉ admin được quản lý người dùng', 403);
  context.data.email = email;
  context.data.role = row.role;
  return context.next();
};

export const onRequest = [access, authorize];
