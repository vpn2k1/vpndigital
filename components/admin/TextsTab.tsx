'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api, send } from './api';
import { JsonForm } from './JsonForm';

export function TextsTab({ onChange }: { onChange: () => void }) {
  const [key, setKey] = useState('strings-vi');
  const [value, setValue] = useState<unknown>();
  useEffect(() => { setValue(undefined); api(`texts/${key}`).then(setValue).catch(err => toast.error(err.message)); }, [key]);
  async function save() {
    try { await api(`texts/${key}`, send('PUT', value)); onChange(); toast.success('Đã lưu. Bấm Publish để áp dụng lên web.'); }
    catch (err) { toast.error((err as Error).message); }
  }
  return <section className="space-y-4">
    <div className="sticky top-0 z-10 -mx-4 flex items-center gap-2 border-b bg-background/95 px-4 py-3 backdrop-blur">
      <h2 className="mr-auto text-lg font-semibold">Nội dung web</h2>
      <Select value={key} onValueChange={setKey}>
        <SelectTrigger className="w-40" aria-label="Ngôn ngữ"><SelectValue/></SelectTrigger>
        <SelectContent><SelectItem value="strings-vi">Tiếng Việt</SelectItem><SelectItem value="strings-en">English</SelectItem></SelectContent>
      </Select>
      <Button disabled={!value} onClick={save}>Lưu</Button>
    </div>
    {value ? <div className="max-w-3xl"><JsonForm value={value as never} folder="site" onChange={setValue}/></div> : <p className="text-sm text-muted-foreground">Đang tải…</p>}
  </section>;
}
