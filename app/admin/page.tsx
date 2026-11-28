'use client';

import { useCallback, useEffect, useState } from 'react';
import { FileText, LayoutDashboard, Smartphone, Users, type LucideIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AppsTab } from '@/components/admin/AppsTab';
import { DashboardTab } from '@/components/admin/DashboardTab';
import { PublishButton } from '@/components/admin/PublishButton';
import { TextsTab } from '@/components/admin/TextsTab';
import { UsersTab } from '@/components/admin/UsersTab';
import { api } from '@/components/admin/api';
import type { Me, PublishState } from '@/components/admin/types';
import { cn } from '@/lib/utils';

type Tab = 'dashboard' | 'apps' | 'texts' | 'users';
const nav: { key: Tab; label: string; icon: LucideIcon; adminOnly?: boolean }[] = [
  { key: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard },
  { key: 'apps', label: 'Apps', icon: Smartphone },
  { key: 'texts', label: 'Nội dung web', icon: FileText },
  { key: 'users', label: 'Người dùng', icon: Users, adminOnly: true },
];

export default function AdminPage() {
  const [me, setMe] = useState<Me>();
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>('dashboard');
  const [focus, setFocus] = useState<string>();
  const [publish, setPublish] = useState<PublishState>();
  const refreshPublish = useCallback(() => api<PublishState>('publish').then(setPublish).catch(err => toast.error(err.message)), []);
  useEffect(() => { api<Me>('me').then(setMe).catch(err => setError(err.message)); refreshPublish(); }, [refreshPublish]);
  const clearFocus = useCallback(() => setFocus(undefined), []);

  if (!me) return <p className={error ? 'text-destructive' : 'text-muted-foreground'}>{error || 'Đang tải…'}</p>;
  const items = nav.filter(item => !item.adminOnly || me.role === 'admin');
  return <div className="grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-[210px_minmax(0,1fr)]">
    <aside className="space-y-4 md:sticky md:top-4 md:self-start">
      <p className="px-2 font-semibold">VPN Digital<span className="block text-xs font-normal text-muted-foreground">Quản trị website</span></p>
      <nav aria-label="Menu quản trị" className="flex gap-1 overflow-x-auto md:flex-col">
        {items.map(({ key, label, icon: Icon }) => <Button key={key} variant={tab === key ? 'secondary' : 'ghost'} aria-current={tab === key ? 'page' : undefined}
          className={cn('justify-start', tab === key && 'font-semibold')} onClick={() => setTab(key)}><Icon/>{label}</Button>)}
      </nav>
      <p className="hidden break-all border-t px-2 pt-3 text-xs text-muted-foreground md:block">{me.email}<br/>Quyền: {me.role}</p>
    </aside>
    <div className="min-w-0 space-y-6">
      <header className="flex flex-wrap items-center gap-3 border-b pb-4">
        <h1 className="mr-auto text-xl font-semibold">{items.find(item => item.key === tab)?.label}</h1>
        {publish?.pending && <Badge variant="outline" className="border-amber-400 bg-amber-100 text-amber-900">Có thay đổi chưa publish</Badge>}
        <PublishButton onPublished={refreshPublish}/>
      </header>
      {tab === 'dashboard' && <DashboardTab publish={publish} onEditApp={slug => { setFocus(slug); setTab('apps'); }}/>}
      {tab === 'apps' && <AppsTab onChange={refreshPublish} focus={focus} onFocused={clearFocus}/>}
      {tab === 'texts' && <TextsTab onChange={refreshPublish}/>}
      {tab === 'users' && me.role === 'admin' && <UsersTab me={me}/>}
    </div>
  </div>;
}
