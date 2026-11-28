'use client';

import { useCallback, useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { api, send } from './api';
import type { Me } from './types';

const roles = ['editor', 'admin'];

function RoleSelect({ value, disabled, label, onChange }: { value: string; disabled?: boolean; label: string; onChange: (role: string) => void }) {
  return <Select value={value} disabled={disabled} onValueChange={onChange}>
    <SelectTrigger className="w-32" aria-label={label}><SelectValue/></SelectTrigger>
    <SelectContent>{roles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}</SelectContent>
  </Select>;
}

export function UsersTab({ me }: { me: Me }) {
  const [users, setUsers] = useState<Me[]>([]);
  const [draft, setDraft] = useState({ email: '', role: 'editor' });
  const [removing, setRemoving] = useState<Me>();
  const load = useCallback(() => api<Me[]>('users').then(setUsers).catch(err => toast.error(err.message)), []);
  useEffect(() => { load(); }, [load]);
  const run = (action: Promise<unknown>) => action.then(load).catch(err => toast.error(err.message));

  return <section className="max-w-3xl space-y-4">
    <div>
      <h2 className="text-lg font-semibold">Người dùng</h2>
      <p className="text-sm text-muted-foreground">Email cũng phải nằm trong policy Cloudflare Access để đăng nhập được. admin: mọi quyền + quản lý người dùng; editor: sửa nội dung, upload, Publish.</p>
    </div>
    <form className="flex flex-wrap gap-2" onSubmit={event => { event.preventDefault(); run(api('users', send('PUT', draft)).then(() => setDraft({ email: '', role: 'editor' }))); }}>
      <Input type="email" required placeholder="email@domain.com" className="w-72" value={draft.email} onChange={event => setDraft({ ...draft, email: event.target.value })} aria-label="Email"/>
      <RoleSelect value={draft.role} label="Quyền" onChange={role => setDraft({ ...draft, role })}/>
      <Button type="submit"><Plus/> Thêm</Button>
    </form>
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader><TableRow><TableHead>Email</TableHead><TableHead>Quyền</TableHead><TableHead className="w-24 text-right">Thao tác</TableHead></TableRow></TableHeader>
        <TableBody>{users.map(user => <TableRow key={user.email}>
          <TableCell>{user.email}</TableCell>
          <TableCell><RoleSelect value={user.role} disabled={user.email === me.email} label={`Quyền của ${user.email}`} onChange={role => run(api('users', send('PUT', { ...user, role })))}/></TableCell>
          <TableCell className="text-right">{user.email !== me.email && <Button variant="outline" size="sm" className="text-destructive" onClick={() => setRemoving(user)}><Trash2/> Xoá</Button>}</TableCell>
        </TableRow>)}</TableBody>
      </Table>
    </div>
    <AlertDialog open={!!removing} onOpenChange={open => !open && setRemoving(undefined)}>
      <AlertDialogContent>
        <AlertDialogHeader><AlertDialogTitle>Xoá quyền của {removing?.email}?</AlertDialogTitle>
          <AlertDialogDescription>Người này sẽ không vào được trang quản trị nữa.</AlertDialogDescription></AlertDialogHeader>
        <AlertDialogFooter><AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={() => removing && run(api(`users?email=${encodeURIComponent(removing.email)}`, { method: 'DELETE' }))}>Xoá</AlertDialogAction></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </section>;
}
