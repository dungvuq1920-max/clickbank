import Link from 'next/link';
import { ExternalLink, Shield } from 'lucide-react';
import { getAdminSites } from '@/lib/sites';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const site = getAdminSites()[0];
  return (
    <div className="min-h-screen bg-[#f4f6f3]">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-neutral-950 px-5 text-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-3 font-black">
            <span className="grid size-9 place-items-center rounded-lg bg-emerald-400 text-neutral-950">AI</span>
            {site.name} Publishing Studio
          </Link>
          <div className="flex items-center gap-4 text-xs font-bold text-white/70">
            <span className="hidden items-center gap-2 md:flex"><Shield size={14} /> Private Railway admin</span>
            <Link className="flex items-center gap-2 text-white" href={`/sites/${site.slug}`} target="_blank">View website <ExternalLink size={14} /></Link>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
}
