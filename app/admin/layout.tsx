import type { Metadata } from 'next';
import './admin.css';

export const metadata: Metadata = { title: 'Quản trị · VPN Digital', robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="admin" lang="vi">{children}</main>;
}
