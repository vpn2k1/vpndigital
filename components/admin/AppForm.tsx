'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JsonForm } from './JsonForm';
import type { Entry } from './types';

export function AppForm({ title, entry, saving, onChange, onSave, onCancel }: { title: string; entry: Entry; saving: boolean; onChange: (entry: Entry) => void; onSave: () => void; onCancel: () => void }) {
  return <section className="space-y-4">
    <div className="sticky top-0 z-10 -mx-4 flex items-center gap-2 border-b bg-background/95 px-4 py-3 backdrop-blur">
      <h2 className="mr-auto text-lg font-semibold">{title}</h2>
      <Button variant="outline" onClick={onCancel}>Huỷ</Button>
      <Button onClick={onSave} disabled={saving}>{saving ? 'Đang lưu…' : 'Lưu'}</Button>
    </div>
    <div className="grid gap-6 lg:grid-cols-2">
      <Card><CardHeader><CardTitle>Tiếng Việt</CardTitle></CardHeader>
        <CardContent><JsonForm value={entry.vi as never} folder={entry.vi.slug} onChange={vi => onChange({ ...entry, vi: vi as never })}/></CardContent></Card>
      <Card><CardHeader><CardTitle>English</CardTitle></CardHeader>
        <CardContent><JsonForm value={entry.en as never} folder={entry.vi.slug} onChange={en => onChange({ ...entry, en: en as never })}/></CardContent></Card>
    </div>
  </section>;
}
