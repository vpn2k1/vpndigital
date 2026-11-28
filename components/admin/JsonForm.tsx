'use client';

import { useState } from 'react';
import { categories } from '@/content/catalog';
import { api } from './api';

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
const imageKeys = ['icon', 'splash', 'src', 'image'];
const longKeys = ['description', 'privacy'];
// Shape for "+ Thêm" when an array is still empty.
const samples: Record<string, Json> = { screenshots: { src: '', caption: '' } };
const choices: Record<string, string[]> = { status: ['demo', 'released'], category: categories.map(category => category.slug) };

/** Generic editor for any JSON value: products, translations and site strings all use it. */
export function JsonForm({ value, onChange, folder }: { value: Json; onChange: (value: Json) => void; folder: string }) {
  return <Field name="" value={value} onChange={onChange} folder={folder}/>;
}

function Field({ name, value, onChange, folder }: { name: string; value: Json; onChange: (value: Json) => void; folder: string }) {
  const label = name && <span className="admin-label">{name}</span>;
  if (Array.isArray(value)) return <fieldset className="admin-group"><legend>{name} ({value.length})</legend>
    {value.map((item, index) => <div className="admin-item" key={index}>
      <Field name={`#${index + 1}`} value={item} onChange={next => onChange(value.map((old, i) => i === index ? next : old))} folder={folder}/>
      <div className="admin-row">
        <button type="button" disabled={!index} onClick={() => onChange(move(value, index, -1))} aria-label="Lên">↑</button>
        <button type="button" disabled={index === value.length - 1} onClick={() => onChange(move(value, index, 1))} aria-label="Xuống">↓</button>
        <button type="button" onClick={() => onChange(value.filter((_, i) => i !== index))} aria-label="Xoá">✕</button>
      </div>
    </div>)}
    <button type="button" onClick={() => onChange([...value, blank(value[0] ?? samples[name] ?? '')])}>+ Thêm</button>
  </fieldset>;
  if (value && typeof value === 'object') {
    const fields = Object.entries(value).map(([key, item]) => <Field key={key} name={key} value={item} onChange={next => onChange({ ...value, [key]: next })} folder={folder}/>);
    return name ? <fieldset className="admin-group"><legend>{name}</legend>{fields}</fieldset> : <>{fields}</>;
  }
  if (typeof value === 'boolean') return <label className="admin-check"><input type="checkbox" checked={value} onChange={event => onChange(event.target.checked)}/>{name}</label>;
  if (typeof value === 'number') return <label className="admin-field">{label}<input type="number" value={value} onChange={event => onChange(Number(event.target.value))}/></label>;
  const text = value ?? '';
  if (choices[name]) return <label className="admin-field">{label}<select value={text} onChange={event => onChange(event.target.value)}>{choices[name].map(option => <option key={option}>{option}</option>)}</select></label>;
  if (imageKeys.includes(name)) return <ImageField label={name} value={text} onChange={onChange} folder={folder}/>;
  return <label className="admin-field">{label}{longKeys.includes(name) || text.length > 90 || text.includes('\n')
    ? <textarea value={text} rows={longKeys.includes(name) ? 10 : 3} onChange={event => onChange(event.target.value)}/>
    : <input value={text} onChange={event => onChange(event.target.value)}/>}</label>;
}

function ImageField({ label, value, onChange, folder }: { label: string; value: string; onChange: (value: string) => void; folder: string }) {
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
  return <div className="admin-field">
    <span className="admin-label">{label}</span>
    <div className="admin-image">
      {value && <img src={value} alt="" width={72} height={72}/>}
      <div>
        <input value={value} onChange={event => onChange(event.target.value)} aria-label={`${label} URL`}/>
        <input type="file" accept="image/webp,image/png,image/jpeg" disabled={busy} aria-label={`Tải ảnh ${label}`} onChange={event => event.target.files?.[0] && upload(event.target.files[0])}/>
        {busy && <small>Đang tải lên…</small>}{error && <small className="admin-error">{error}</small>}
      </div>
    </div>
  </div>;
}

function move<T>(list: T[], index: number, step: number) {
  const next = [...list];
  [next[index], next[index + step]] = [next[index + step], next[index]];
  return next;
}

/** Empty copy of an existing item, so "+ Thêm" creates an entry with the same shape. */
function blank(sample: Json): Json {
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === 'object') return Object.fromEntries(Object.entries(sample).map(([key, item]) => [key, blank(item)]));
  return typeof sample === 'boolean' ? false : typeof sample === 'number' ? 0 : '';
}
