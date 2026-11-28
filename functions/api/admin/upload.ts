import { MEDIA_URL } from '../../../lib/product-schema';
import { fail, json, type Handler } from './_lib';

const types: Record<string, string> = { 'image/webp': 'webp', 'image/png': 'png', 'image/jpeg': 'jpg' };
const maxBytes = 5 * 1024 * 1024;

export const onRequestPost: Handler = async ({ env, request }) => {
  const form = await request.formData().catch(() => null);
  const file = form?.get('file');
  const folder = String(form?.get('folder') ?? 'misc');
  if (!(file instanceof File)) return fail('Thiếu file');
  if (!types[file.type]) return fail('Chỉ nhận ảnh WebP, PNG hoặc JPEG');
  if (file.size > maxBytes) return fail('Ảnh tối đa 5 MB');
  if (!/^[a-z0-9-]{1,60}$/.test(folder)) return fail('Thư mục không hợp lệ');
  const key = `apps/${folder}/${crypto.randomUUID()}.${types[file.type]}`;
  await env.MEDIA.put(key, file.stream(), { httpMetadata: { contentType: file.type, cacheControl: 'public, max-age=31536000, immutable' } });
  return json({ url: `${MEDIA_URL}/${key}` }, 201);
};
