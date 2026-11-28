/** fetch wrapper for /api/admin: returns parsed JSON or throws the server's error message. */
export async function api<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try { response = await fetch(`/api/admin/${path}`, init); }
  // Access answers an expired session with a cross-origin redirect, which fetch reports as a network error.
  catch { throw new Error('Mất kết nối hoặc phiên đăng nhập hết hạn — tải lại trang.'); }
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error ?? `Lỗi ${response.status}`);
  return body as T;
}

export const send = (method: string, body: unknown): RequestInit => ({ method, headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
