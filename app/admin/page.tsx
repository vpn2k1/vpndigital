'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Product, TranslatedProduct } from '@/lib/product-schema';
import { JsonForm } from '@/components/admin/JsonForm';
import { api, send } from '@/components/admin/api';

interface Entry { slug: string; vi: Product; en: TranslatedProduct }
interface Me { email: string; role: 'admin' | 'editor' }
interface PublishState { publishedAt: string | null; changedAt: string | null; pending: boolean }
type Tab = 'apps' | 'texts' | 'users';

// Every editable field, so optional ones missing from a product still show up in the form.
const viTemplate: Product = { slug: '', category: 'ung-dung', name: '', subtitle: '', summary: '', description: '', features: [''], platform: '', tags: [''], icon: '', splash: '', splashColor: '', screenshots: [], featured: false, visible: true, status: 'demo', web: '', ads: false, online: false, privacy: '', updated: new Date().toISOString().slice(0, 10) };
const enTemplate: TranslatedProduct = { name: '', subtitle: '', summary: '', description: '', features: [''], platform: '', tags: [''], screenshots: [], privacy: '' };
const optional = ['splash', 'splashColor', 'screenshots'] as const;
const tidy = <T extends object>(item: T) => Object.fromEntries(Object.entries(item).filter(([key, value]) => !(optional.includes(key as never) && (value === '' || (Array.isArray(value) && !value.length))))) as T;

export default function AdminPage() {
  const [me, setMe] = useState<Me>();
  const [tab, setTab] = useState<Tab>('apps');
  const [error, setError] = useState('');
  const [publish, setPublish] = useState<PublishState>();
  const refreshPublish = useCallback(() => api<PublishState>('publish').then(setPublish).catch(err => setError(err.message)), []);
  useEffect(() => { api<Me>('me').then(setMe).catch(err => setError(err.message)); refreshPublish(); }, [refreshPublish]);

  async function doPublish() {
    if (!confirm('Build lại website với dữ liệu hiện tại? Mất khoảng 1–3 phút.')) return;
    try { await api('publish', { method: 'POST' }); await refreshPublish(); alert('Đã gửi yêu cầu build. Website cập nhật sau vài phút.'); }
    catch (err) { setError((err as Error).message); }
  }

  if (!me) return <p className="admin-error">{error || 'Đang tải…'}</p>;
  return <>
    <header className="admin-header">
      <strong>VPN Digital · Quản trị</strong>
      <nav className="admin-row">
        {(['apps', 'texts', ...(me.role === 'admin' ? ['users'] : [])] as Tab[]).map(key =>
          <button key={key} aria-pressed={tab === key} onClick={() => setTab(key)}>{{ apps: 'Apps', texts: 'Nội dung web', users: 'Người dùng' }[key]}</button>)}
      </nav>
      <span className="admin-row">
        {publish?.pending && <small className="admin-badge">Có thay đổi chưa publish</small>}
        <button className="admin-primary" onClick={doPublish}>Publish</button>
        <small>{me.email} ({me.role})</small>
      </span>
    </header>
    {error && <p className="admin-error" role="alert">{error} <button onClick={() => setError('')}>Đóng</button></p>}
    {tab === 'apps' && <Apps onError={setError} onChange={refreshPublish}/>}
    {tab === 'texts' && <Texts onError={setError} onChange={refreshPublish}/>}
    {tab === 'users' && <Users me={me} onError={setError}/>}
  </>;
}

function Apps({ onError, onChange }: { onError: (message: string) => void; onChange: () => void }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editing, setEditing] = useState<{ original?: string; entry: Entry }>();
  const load = useCallback(() => api<Entry[]>('products').then(setEntries).catch(err => onError(err.message)), [onError]);
  useEffect(() => { load(); }, [load]);

  async function run(action: () => Promise<unknown>) {
    try { await action(); await load(); onChange(); return true; }
    catch (err) { onError((err as Error).message); return false; }
  }
  async function save() {
    if (!editing) return;
    const entry = { slug: editing.entry.vi.slug, vi: tidy(editing.entry.vi), en: tidy(editing.entry.en) };
    if (await run(() => editing.original ? api(`products/${editing.original}`, send('PUT', entry)) : api('products', send('POST', entry)))) setEditing(undefined);
  }
  const reorder = (index: number, step: number) => {
    const slugs = entries.map(entry => entry.slug);
    [slugs[index], slugs[index + step]] = [slugs[index + step], slugs[index]];
    run(() => api('products/reorder', send('PUT', slugs)));
  };

  if (editing) return <section>
    <div className="admin-row admin-sticky">
      <h2>{editing.original ? `Sửa: ${editing.original}` : 'Thêm app mới'}</h2>
      <button className="admin-primary" onClick={save}>Lưu</button>
      <button onClick={() => setEditing(undefined)}>Huỷ</button>
    </div>
    <div className="admin-columns">
      <div><h3>Tiếng Việt</h3><JsonForm value={editing.entry.vi as never} folder={editing.entry.vi.slug} onChange={vi => setEditing({ ...editing, entry: { ...editing.entry, vi: vi as never } })}/></div>
      <div><h3>English</h3><JsonForm value={editing.entry.en as never} folder={editing.entry.vi.slug} onChange={en => setEditing({ ...editing, entry: { ...editing.entry, en: en as never } })}/></div>
    </div>
  </section>;

  return <section>
    <div className="admin-row"><h2>Apps ({entries.length})</h2>
      <button className="admin-primary" onClick={() => setEditing({ entry: { slug: '', vi: { ...viTemplate }, en: { ...enTemplate } } })}>+ Thêm app</button></div>
    <table className="admin-table">
      <thead><tr><th>#</th><th>App</th><th>Danh mục</th><th>Trạng thái</th><th>Hiện</th><th>Trang chủ</th><th/></tr></thead>
      <tbody>{entries.map((entry, index) => <tr key={entry.slug}>
        <td><div className="admin-row">
          <button disabled={!index} onClick={() => reorder(index, -1)} aria-label="Lên">↑</button>
          <button disabled={index === entries.length - 1} onClick={() => reorder(index, 1)} aria-label="Xuống">↓</button>
        </div></td>
        <td><div className="admin-row"><img src={entry.vi.icon} alt="" width={40} height={40}/><span>{entry.vi.name}<br/><small>{entry.slug}</small></span></div></td>
        <td>{entry.vi.category}</td><td>{entry.vi.status}</td><td>{entry.vi.visible ? '✓' : '—'}</td><td>{entry.vi.featured ? '★' : ''}</td>
        <td><div className="admin-row">
          <button onClick={() => setEditing({ original: entry.slug, entry: { ...entry, vi: { ...viTemplate, ...entry.vi }, en: { ...enTemplate, ...entry.en } } })}>Sửa</button>
          <button className="admin-danger" onClick={() => confirm(`Xoá app "${entry.vi.name}"? Trang của app sẽ biến mất sau khi publish.`) && run(() => api(`products/${entry.slug}`, { method: 'DELETE' }))}>Xoá</button>
        </div></td>
      </tr>)}</tbody>
    </table>
  </section>;
}

function Texts({ onError, onChange }: { onError: (message: string) => void; onChange: () => void }) {
  const [key, setKey] = useState<'strings-vi' | 'strings-en'>('strings-vi');
  const [value, setValue] = useState<unknown>();
  useEffect(() => { setValue(undefined); api(`texts/${key}`).then(setValue).catch(err => onError(err.message)); }, [key, onError]);
  async function save() {
    try { await api(`texts/${key}`, send('PUT', value)); onChange(); alert('Đã lưu'); }
    catch (err) { onError((err as Error).message); }
  }
  return <section>
    <div className="admin-row admin-sticky">
      <h2>Nội dung web</h2>
      <select value={key} onChange={event => setKey(event.target.value as typeof key)} aria-label="Ngôn ngữ">
        <option value="strings-vi">Tiếng Việt</option><option value="strings-en">English</option>
      </select>
      <button className="admin-primary" disabled={!value} onClick={save}>Lưu</button>
    </div>
    {value ? <JsonForm value={value as never} folder="site" onChange={setValue}/> : <p>Đang tải…</p>}
  </section>;
}

function Users({ me, onError }: { me: Me; onError: (message: string) => void }) {
  const [users, setUsers] = useState<Me[]>([]);
  const [draft, setDraft] = useState<Me>({ email: '', role: 'editor' });
  const load = useCallback(() => api<Me[]>('users').then(setUsers).catch(err => onError(err.message)), [onError]);
  useEffect(() => { load(); }, [load]);
  const run = (action: Promise<unknown>) => action.then(load).catch(err => onError(err.message));
  return <section>
    <h2>Người dùng</h2>
    <p><small>Email cũng phải được cho phép trong Cloudflare Access policy để đăng nhập được.</small></p>
    <form className="admin-row" onSubmit={event => { event.preventDefault(); run(api('users', send('PUT', draft)).then(() => setDraft({ email: '', role: 'editor' }))); }}>
      <input type="email" required placeholder="email@domain.com" value={draft.email} onChange={event => setDraft({ ...draft, email: event.target.value })} aria-label="Email"/>
      <select value={draft.role} onChange={event => setDraft({ ...draft, role: event.target.value as Me['role'] })} aria-label="Quyền"><option value="editor">editor</option><option value="admin">admin</option></select>
      <button className="admin-primary">Thêm</button>
    </form>
    <table className="admin-table"><tbody>{users.map(user => <tr key={user.email}>
      <td>{user.email}</td>
      <td><select value={user.role} disabled={user.email === me.email} onChange={event => run(api('users', send('PUT', { ...user, role: event.target.value })))} aria-label={`Quyền của ${user.email}`}>
        <option value="editor">editor</option><option value="admin">admin</option></select></td>
      <td>{user.email !== me.email && <button className="admin-danger" onClick={() => confirm(`Xoá quyền của ${user.email}?`) && run(api(`users?email=${encodeURIComponent(user.email)}`, { method: 'DELETE' }))}>Xoá</button>}</td>
    </tr>)}</tbody></table>
  </section>;
}
