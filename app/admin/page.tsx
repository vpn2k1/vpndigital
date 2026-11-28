'use client';

import { useCallback, useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppsTab } from '@/components/admin/AppsTab';
import { TextsTab } from '@/components/admin/TextsTab';
import { UsersTab } from '@/components/admin/UsersTab';
import { api } from '@/components/admin/api';
import type { Me, PublishState } from '@/components/admin/types';

export default function AdminPage() {
  const [me, setMe] = useState<Me>();
  const [error, setError] = useState('');
  const [publish, setPublish] = useState<PublishState>();
  const refreshPublish = useCallback(() => api<PublishState>('publish').then(setPublish).catch(err => toast.error(err.message)), []);
  useEffect(() => { api<Me>('me').then(setMe).catch(err => setError(err.message)); refreshPublish(); }, [refreshPublish]);

  async function doPublish() {
    try { await api('publish', { method: 'POST' }); await refreshPublish(); toast.success('Đã gửi yêu cầu build. Website cập nhật sau 1–3 phút.'); }
    catch (err) { toast.error((err as Error).message); }
  }

  if (!me) return <p className={error ? 'text-destructive' : 'text-muted-foreground'}>{error || 'Đang tải…'}</p>;
  return <Tabs defaultValue="apps" className="gap-6">
    <header className="flex flex-wrap items-center gap-3 border-b pb-4">
      <strong className="mr-2">VPN Digital · Quản trị</strong>
      <TabsList>
        <TabsTrigger value="apps">Apps</TabsTrigger>
        <TabsTrigger value="texts">Nội dung web</TabsTrigger>
        {me.role === 'admin' && <TabsTrigger value="users">Người dùng</TabsTrigger>}
      </TabsList>
      <div className="ml-auto flex flex-wrap items-center gap-3">
        {publish?.pending && <Badge variant="outline" className="border-amber-400 bg-amber-100 text-amber-900">Có thay đổi chưa publish</Badge>}
        <AlertDialog>
          <AlertDialogTrigger asChild><Button><Rocket/> Publish</Button></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>Publish lên website?</AlertDialogTitle>
              <AlertDialogDescription>Website sẽ được build lại với dữ liệu hiện tại, mất khoảng 1–3 phút.</AlertDialogDescription></AlertDialogHeader>
            <AlertDialogFooter><AlertDialogCancel>Huỷ</AlertDialogCancel><AlertDialogAction onClick={doPublish}>Publish</AlertDialogAction></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <span className="text-xs text-muted-foreground">{me.email} ({me.role})</span>
      </div>
    </header>
    <TabsContent value="apps"><AppsTab onChange={refreshPublish}/></TabsContent>
    <TabsContent value="texts"><TextsTab onChange={refreshPublish}/></TabsContent>
    {me.role === 'admin' && <TabsContent value="users"><UsersTab me={me}/></TabsContent>}
  </Tabs>;
}
