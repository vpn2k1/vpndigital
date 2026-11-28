'use client';

import { useId, useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { categories } from '@/content/catalog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { api } from './api';

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
const imageKeys = ['icon', 'splash', 'src', 'image'];
const longKeys = ['description', 'privacy'];
// Shape for "Thêm" when an array is still empty.
const samples: Record<string, Json> = { screenshots: { src: '', caption: '' } };
const choices: Record<string, string[]> = { status: ['demo', 'released'], category: categories.map(category => category.slug) };

/** Generic editor for any JSON value: products, translations and site strings all use it. */
export function JsonForm({ value, onChange, folder }: { value: Json; onChange: (value: Json) => void; folder: string }) {
  return <Field name="" value={value} onChange={onChange} folder={folder}/>;
}

function Field({ name, value, onChange, folder }: { name: string; value: Json; onChange: (value: Json) => void; folder: string }) {
  const id = useId();
  const label = name && <Label htmlFor={id} className="text-muted-foreground">{name}</Label>;
  if (Array.isArray(value)) return <div className="space-y-3 rounded-lg border p-3">
    <p className="text-sm font-medium">{name} ({value.length})</p>
    {value.map((item, index) => <div className="flex items-start gap-2" key={index}>
      <div className="min-w-0 flex-1"><Field name={`#${index + 1}`} value={item} onChange={next => onChange(value.map((old, i) => i === index ? next : old))} folder={folder}/></div>
      <div className="flex shrink-0 gap-1 pt-6">
        <Button type="button" variant="ghost" size="icon" disabled={!index} onClick={() => onChange(move(value, index, -1))} aria-label="Lên"><ChevronUp/></Button>
        <Button type="button" variant="ghost" size="icon" disabled={index === value.length - 1} onClick={() => onChange(move(value, index, 1))} aria-label="Xuống"><ChevronDown/></Button>
        <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => onChange(value.filter((_, i) => i !== index))} aria-label="Xoá"><Trash2/></Button>
      </div>
    </div>)}
    <Button type="button" variant="outline" size="sm" onClick={() => onChange([...value, blank(value[0] ?? samples[name] ?? '')])}><Plus/> Thêm</Button>
  </div>;
  if (value && typeof value === 'object') {
    const fields = Object.entries(value).map(([key, item]) => <Field key={key} name={key} value={item} onChange={next => onChange({ ...value, [key]: next })} folder={folder}/>);
    return name ? <div className="space-y-3 rounded-lg border p-3"><p className="text-sm font-medium">{name}</p>{fields}</div> : <div className="space-y-4">{fields}</div>;
  }
  if (typeof value === 'boolean') return <div className="flex items-center gap-2 py-1"><Switch id={id} checked={value} onCheckedChange={onChange}/><Label htmlFor={id}>{name}</Label></div>;
  if (typeof value === 'number') return <div className="space-y-1.5">{label}<Input id={id} type="number" value={value} onChange={event => onChange(Number(event.target.value))}/></div>;
  const text = value ?? '';
  if (choices[name]) return <div className="space-y-1.5">{label}
    <Select value={text} onValueChange={onChange}><SelectTrigger id={id} className="w-full"><SelectValue/></SelectTrigger>
      <SelectContent>{choices[name].map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>;
  if (imageKeys.includes(name)) return <ImageField id={id} label={name} value={text} onChange={onChange} folder={folder}/>;
  return <div className="space-y-1.5">{label}{longKeys.includes(name) || text.length > 90 || text.includes('\n')
    ? <Textarea id={id} value={text} rows={longKeys.includes(name) ? 10 : 3} onChange={event => onChange(event.target.value)}/>
    : <Input id={id} value={text} onChange={event => onChange(event.target.value)}/>}</div>;
}

function ImageField({ id, label, value, onChange, folder }: { id: string; label: string; value: string; onChange: (value: string) => void; folder: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function upload(file: File) {
    setBusy(true); setError('');
    const form = new FormData();
    form.append('file', file);
    form.append('folder', folder || 'misc');
    try { onChange((await api<{ url: string }>('upload', { method: 'POST', body: form })).url); }
    catch (err) { setError((err as Error).message); }
    finally { setBusy(false); }
  }
  return <div className="space-y-1.5">
    <Label htmlFor={id} className="text-muted-foreground">{label}</Label>
    <div className="flex items-start gap-3">
      {value && <img src={value} alt="" width={72} height={72} className="size-[72px] shrink-0 rounded-lg border bg-muted object-cover"/>}
      <div className="min-w-0 flex-1 space-y-2">
        <Input id={id} value={value} onChange={event => onChange(event.target.value)}/>
        <Input type="file" accept="image/webp,image/png,image/jpeg" disabled={busy} aria-label={`Tải ảnh ${label}`} onChange={event => event.target.files?.[0] && upload(event.target.files[0])}/>
        {busy && <p className="text-xs text-muted-foreground">Đang tải lên…</p>}
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    </div>
  </div>;
}

function move<T>(list: T[], index: number, step: number) {
  const next = [...list];
  [next[index], next[index + step]] = [next[index + step], next[index]];
  return next;
}

/** Empty copy of an existing item, so "Thêm" creates an entry with the same shape. */
function blank(sample: Json): Json {
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === 'object') return Object.fromEntries(Object.entries(sample).map(([key, item]) => [key, blank(item)]));
  return typeof sample === 'boolean' ? false : typeof sample === 'number' ? 0 : '';
}
