import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Affiliate AI Publishing System',
  description: 'AI-powered affiliate publishing system for five niche websites.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
