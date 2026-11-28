export interface Env { DB: D1Database; MEDIA: R2Bucket; CF_ACCESS_TEAM_DOMAIN: string; CF_ACCESS_AUD: string; DEPLOY_HOOK_URL: string; DEV_ADMIN_EMAIL?: string }
export type Role = 'admin' | 'editor';
export interface Data extends Record<string, unknown> { email: string; role: Role }
export type Handler = PagesFunction<Env, string, Data>;

export const json = (body: unknown, status = 200) => Response.json(body, { status });
export const fail = (message: string, status = 400) => json({ error: message }, status);
export const now = () => new Date().toISOString();
