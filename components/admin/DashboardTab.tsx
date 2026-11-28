'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, FileText, Info, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { categories } from '@/content/catalog';
import { api } from './api';
import { healthIssues, type Issue } from './health';
import type { Activity, Entry, PublishState } from './types';

const when = (iso: string | null) => iso ? new Date(iso).toLocaleString('vi-VN') : '—';
const ago = (iso: string) => {
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  const rtf = new Intl.RelativeTimeFormat('vi', { numeric: 'auto' });
  return Math.abs(minutes) < 60 ? rtf.format(-minutes, 'minute') : Math.abs(minutes) < 1440 ? rtf.format(-Math.round(minutes / 60), 'hour') : rtf.format(-Math.round(minutes / 1440), 'day');
};

function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return <Card className="gap-1 py-4"><CardHeader className="px-4 pb-0"><CardDescription>{label}</CardDescription></CardHeader>
    <CardContent className="px-4"><p className="text-3xl font-semibold tabular-nums">{value}</p>{hint && <p className="text-xs text-muted-foreground">{hint}</p>}</CardContent></Card>;
}

export function DashboardTab({ publish, onEditApp }: { publish?: PublishState; onEditApp: (slug: string) => void }) {
  const [entries, setEntries] = useState<Entry[]>();
  const [activity, setActivity] = useState<Activity[]>();
  useEffect(() => {
    api<Entry[]>('products').then(setEntries).catch(err => toast.error(err.message));
    api<Activity[]>('activity').then(setActivity).catch(err => toast.error(err.message));
  }, []);

  if (!entries) return <p className="text-sm text-muted-foreground">Đang tải…</p>;
  const visible = entries.filter(entry => entry.vi.visible);
  const featured = visible.filter(entry => entry.vi.featured).length;
  const issues = healthIssues(entries);
  const byApp = [...issues.reduce((map, issue) => map.set(issue.slug, [...(map.get(issue.slug) ?? []), issue]), new Map<string, Issue[]>())];
  const names = Object.fromEntries(entries.map(entry => [entry.slug, entry.vi.name]));

  return <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      <Stat label="Tổng số app" value={entries.length} hint={`${entries.filter(e => e.vi.status === 'released').length} released · ${entries.filter(e => e.vi.status === 'demo').length} demo`}/>
      <Stat label="Đang hiển thị" value={visible.length} hint="Có trên trang chủ và danh mục"/>
      <Stat label="Đang ẩn" value={entries.length - visible.length} hint="Link trực tiếp vẫn mở (noindex)"/>
      <Stat label="Trang chủ" value={`${featured}/3`} hint={featured > 3 ? 'Chỉ 3 app đầu được hiện' : 'App nổi bật đang bật'}/>
    </div>

    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>Sức khoẻ nội dung &amp; SEO</CardTitle>
          <CardDescription>{issues.length ? `${byApp.length} app, ${issues.length} điểm cần xem lại (theo title và mô tả meta thực tế của trang)` : 'Không có vấn đề nào'}</CardDescription></CardHeader>
        <CardContent>
          {issues.length ? <ul className="divide-y">{byApp.map(([slug, list]) => <li key={slug} className="flex items-start gap-3 py-3">
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-sm font-medium">{list[0].name}</p>
              {list.map((issue, i) => <p key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                {issue.severity === 'warn' ? <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-600" aria-label="Cảnh báo"/> : <Info className="mt-0.5 size-3.5 shrink-0" aria-label="Gợi ý"/>}{issue.label}</p>)}
            </div>
            <Button variant="outline" size="sm" onClick={() => onEditApp(slug)}>Sửa</Button>
          </li>)}</ul>
            : <p className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle2 className="size-4 text-green-600"/> Mọi app đều đạt các kiểm tra hiện có.</p>}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Trạng thái publish</CardTitle>
            <CardDescription>{publish?.pending ? <Badge variant="outline" className="border-amber-400 bg-amber-100 text-amber-900">Có thay đổi chưa publish</Badge> : <Badge variant="secondary">Đã đồng bộ với website</Badge>}</CardDescription></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
              <dt className="text-muted-foreground">Publish cuối</dt><dd>{when(publish?.publishedAt ?? null)}</dd>
              <dt className="text-muted-foreground">Sửa gần nhất</dt><dd>{when(publish?.changedAt ?? null)}</dd>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Theo danh mục</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">{categories.map(category => <Badge key={category.slug} variant="secondary">{category.name}: {entries.filter(e => e.vi.category === category.slug).length}</Badge>)}</CardContent>
        </Card>
      </div>
    </div>

    <Card>
      <CardHeader><CardTitle>Hoạt động gần đây</CardTitle><CardDescription>Các lần sửa nội dung mới nhất</CardDescription></CardHeader>
      <CardContent>
        {!activity ? <p className="text-sm text-muted-foreground">Đang tải…</p> : activity.length ? <ul className="divide-y">{activity.map(item => <li key={`${item.kind}-${item.target}`} className="flex items-center gap-3 py-2 text-sm">
          {item.kind === 'app' ? <Smartphone className="size-4 text-muted-foreground"/> : <FileText className="size-4 text-muted-foreground"/>}
          <span className="min-w-0 flex-1 truncate"><span className="font-medium">{item.kind === 'app' ? names[item.target] ?? item.target : `Nội dung web (${item.target === 'strings-vi' ? 'Tiếng Việt' : 'English'})`}</span>
            <span className="text-muted-foreground"> · {item.by === 'seed' ? 'nạp dữ liệu ban đầu' : item.by ?? '—'}</span></span>
          <time className="shrink-0 text-xs text-muted-foreground" dateTime={item.at} title={when(item.at)}>{ago(item.at)}</time>
        </li>)}</ul> : <p className="text-sm text-muted-foreground">Chưa có hoạt động.</p>}
      </CardContent>
    </Card>
  </div>;
}
