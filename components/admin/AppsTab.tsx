'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Product } from '@/lib/product-schema';
import { cn } from '@/lib/utils';
import { AppForm } from './AppForm';
import { api, send } from './api';
import { enTemplate, tidy, viTemplate, type Entry } from './types';

export function AppsTab({ onChange }: { onChange: () => void }) {
  const [entries, setEntries] = useState<Entry[]>();
  const [editing, setEditing] = useState<{ original?: string; entry: Entry }>();
  const [saving, setSaving] = useState(false);
  const [pending, setPending] = useState<string>();
  const [removing, setRemoving] = useState<Entry>();
  const load = useCallback(() => api<Entry[]>('products').then(setEntries).catch(err => toast.error(err.message)), []);
  useEffect(() => { load(); }, [load]);

  /** Saves a single-field change straight away (optimistic); it goes live on the next Publish. */
  async function patch(entry: Entry, change: Partial<Product>, done: string) {
    const next = { ...entry, vi: { ...entry.vi, ...change } };
    const replace = (value: Entry) => setEntries(list => list?.map(item => item.slug === entry.slug ? value : item));
    setPending(entry.slug); replace(next);
    try { await api(`products/${entry.slug}`, send('PUT', next)); onChange(); toast.success(`${done} “${entry.vi.name}”. Bấm Publish để áp dụng lên web.`); }
    catch (err) { replace(entry); toast.error((err as Error).message); }
    finally { setPending(undefined); }
  }
  async function run(action: () => Promise<unknown>) {
    try { await action(); await load(); onChange(); return true; }
    catch (err) { toast.error((err as Error).message); return false; }
  }
  async function save() {
    if (!editing) return;
    const entry = { slug: editing.entry.vi.slug, vi: tidy(editing.entry.vi), en: tidy(editing.entry.en) };
    setSaving(true);
    const ok = await run(() => editing.original ? api(`products/${editing.original}`, send('PUT', entry)) : api('products', send('POST', entry)));
    setSaving(false);
    if (ok) { setEditing(undefined); toast.success('Đã lưu. Bấm Publish để áp dụng lên web.'); }
  }
  function reorder(index: number, step: number) {
    const slugs = entries!.map(entry => entry.slug);
    [slugs[index], slugs[index + step]] = [slugs[index + step], slugs[index]];
    run(() => api('products/reorder', send('PUT', slugs)));
  }

  if (editing) return <AppForm title={editing.original ? `Sửa: ${editing.original}` : 'Thêm app mới'} entry={editing.entry} saving={saving}
    onChange={entry => setEditing({ ...editing, entry })} onSave={save} onCancel={() => setEditing(undefined)}/>;
  if (!entries) return <p className="text-sm text-muted-foreground">Đang tải…</p>;

  return <section className="space-y-4">
    <div className="flex flex-wrap items-center gap-3">
      <div className="mr-auto">
        <h2 className="text-lg font-semibold">Apps ({entries.length})</h2>
        <p className="text-sm text-muted-foreground">Tắt “Hiển thị”: app biến khỏi trang chủ và danh mục, nhưng link trực tiếp và trang privacy vẫn mở (noindex).</p>
      </div>
      <Button onClick={() => setEditing({ entry: { slug: '', vi: { ...viTemplate }, en: { ...enTemplate } } })}><Plus/> Thêm app</Button>
    </div>
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader><TableRow>
          <TableHead className="w-24">Thứ tự</TableHead><TableHead>App</TableHead><TableHead>Danh mục</TableHead><TableHead>Trạng thái</TableHead>
          <TableHead>Hiển thị</TableHead><TableHead>Trang chủ</TableHead><TableHead className="text-right">Thao tác</TableHead>
        </TableRow></TableHeader>
        <TableBody>{entries.map((entry, index) => <TableRow key={entry.slug} className={cn(!entry.vi.visible && 'bg-muted/40')}>
          <TableCell><div className="flex">
            <Button variant="ghost" size="icon" disabled={!index} onClick={() => reorder(index, -1)} aria-label={`Đưa ${entry.vi.name} lên`}><ArrowUp/></Button>
            <Button variant="ghost" size="icon" disabled={index === entries.length - 1} onClick={() => reorder(index, 1)} aria-label={`Đưa ${entry.vi.name} xuống`}><ArrowDown/></Button>
          </div></TableCell>
          <TableCell><div className={cn('flex items-center gap-3', !entry.vi.visible && 'opacity-60')}>
            <img src={entry.vi.icon} alt="" width={40} height={40} className="size-10 rounded-lg border object-cover"/>
            <div><p className="font-medium">{entry.vi.name}</p><p className="text-xs text-muted-foreground">{entry.slug}</p></div>
          </div></TableCell>
          <TableCell>{entry.vi.category}</TableCell>
          <TableCell><Badge variant={entry.vi.status === 'released' ? 'default' : 'secondary'}>{entry.vi.status}</Badge></TableCell>
          <TableCell><div className="flex items-center gap-2">
            <Switch checked={entry.vi.visible} disabled={pending === entry.slug} aria-label={`Hiển thị ${entry.vi.name}`} onCheckedChange={visible => patch(entry, { visible }, visible ? 'Đã hiện' : 'Đã ẩn')}/>
            {!entry.vi.visible && <Badge variant="outline">Đã ẩn</Badge>}
          </div></TableCell>
          <TableCell><Switch checked={entry.vi.featured} disabled={pending === entry.slug} aria-label={`Hiện ${entry.vi.name} ở trang chủ`} onCheckedChange={featured => patch(entry, { featured }, featured ? 'Đã đưa lên trang chủ' : 'Đã gỡ khỏi trang chủ')}/></TableCell>
          <TableCell><div className="flex justify-end gap-1">
            <Button variant="outline" size="sm" onClick={() => setEditing({ original: entry.slug, entry: { ...entry, vi: { ...viTemplate, ...entry.vi }, en: { ...enTemplate, ...entry.en } } })}><Pencil/> Sửa</Button>
            <Button variant="outline" size="sm" className="text-destructive" onClick={() => setRemoving(entry)}><Trash2/> Xoá</Button>
          </div></TableCell>
        </TableRow>)}</TableBody>
      </Table>
    </div>
    <AlertDialog open={!!removing} onOpenChange={open => !open && setRemoving(undefined)}>
      <AlertDialogContent>
        <AlertDialogHeader><AlertDialogTitle>Xoá “{removing?.vi.name}”?</AlertDialogTitle>
          <AlertDialogDescription>Trang của app và trang privacy sẽ biến mất sau khi Publish. Link chính sách đã khai báo trên cửa hàng ứng dụng sẽ bị hỏng. Muốn chỉ ẩn app thì tắt “Hiển thị”.</AlertDialogDescription></AlertDialogHeader>
        <AlertDialogFooter><AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => removing && run(() => api(`products/${removing.slug}`, { method: 'DELETE' }))}>Xoá</AlertDialogAction></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </section>;
}
