import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import './admin.css';

export const metadata: Metadata = { title: 'Quản trị · VPN Digital', robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="admin min-h-screen bg-background px-4 py-4 text-sm text-foreground" lang="vi">
    <div className="mx-auto max-w-7xl pb-20">{children}</div>
    <Toaster richColors position="bottom-right"/>
  </main>;
}
