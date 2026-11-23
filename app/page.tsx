import type { Metadata } from 'next';
import { LegacyRedirect } from '@/components/LegacyRedirect';

export const metadata: Metadata = {
  title: 'VPN Digital — English',
  robots: { index: false, follow: true },
};
export default function RootGateway() { return <LegacyRedirect to="/en/" />; }
