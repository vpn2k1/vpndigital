import type { Entry } from './types';

export interface Issue { slug: string; name: string; label: string; severity: 'warn' | 'info' }

// Limits follow what the site actually emits: <title> = "name — subtitle | VPN Digital", meta description = summary (app/[locale]/[category]/[slug]/page.tsx).
const titleLength = (name: string, subtitle: string) => name.length + subtitle.length + 17;

/** Content/SEO problems per app, derived from the data the admin already loads. */
export function healthIssues(entries: Entry[]): Issue[] {
  return entries.flatMap(({ slug, vi, en }) => {
    const issues: Omit<Issue, 'slug' | 'name'>[] = [];
    if (vi.summary.length > 160) issues.push({ severity: 'warn', label: `Mô tả meta (VI) dài ${vi.summary.length} ký tự, nên ≤ 160` });
    if (vi.summary.length < 50) issues.push({ severity: 'warn', label: `Mô tả meta (VI) chỉ ${vi.summary.length} ký tự, nên ≥ 50` });
    if (en.summary.length > 160) issues.push({ severity: 'warn', label: `Mô tả meta (EN) dài ${en.summary.length} ký tự, nên ≤ 160` });
    if (!en.summary.trim() || en.summary === vi.summary) issues.push({ severity: 'warn', label: 'Bản tiếng Anh chưa dịch (summary trùng bản Việt)' });
    if (titleLength(vi.name, vi.subtitle) > 60) issues.push({ severity: 'info', label: `Title trang dài ${titleLength(vi.name, vi.subtitle)} ký tự, nên ≤ 60` });
    if (!vi.screenshots?.length) issues.push({ severity: 'info', label: 'Chưa có ảnh chụp màn hình' });
    if (vi.featured && !vi.visible) issues.push({ severity: 'info', label: 'Bật “Trang chủ” nhưng app đang ẩn, sẽ không hiện' });
    return issues.map(issue => ({ ...issue, slug, name: vi.name }));
  });
}
