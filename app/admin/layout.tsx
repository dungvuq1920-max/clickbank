import Link from 'next/link';
import { LayoutDashboard, Newspaper, PackagePlus, Settings, Shield, Target } from 'lucide-react';
import { getAdminSites } from '@/lib/sites';

const nav = [
  ['Dashboard', '/admin/dashboard', LayoutDashboard],
  ['Sites', '/admin/sites', Target],
  ['New Product', '/admin/products/new', PackagePlus],
  ['Posts', '/admin/posts', Newspaper],
  ['Settings', '/admin/settings', Settings],
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminSites = getAdminSites();
  return (
    <div className="min-h-screen bg-[#f4f6f3]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-black/10 bg-neutral-950 p-5 text-white lg:block">
        <Link href="/admin/dashboard" className="flex items-center gap-3 text-xl font-black">
          <span className="grid size-10 place-items-center rounded-lg bg-yellow-400 text-neutral-950">AI</span>
          {adminSites.length === 1 ? `${adminSites[0].name} Admin` : 'Command Center'}
        </Link>
        <nav className="mt-8 grid gap-2">
          {nav.map(([label, href, Icon]) => (
            <Link key={href as string} href={href as string} className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-bold text-white/78 hover:bg-white/10 hover:text-white">
              <Icon size={18} />
              {label as string}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-white/10 p-4 text-sm text-white/72">
          <div className="mb-2 flex items-center gap-2 font-extrabold text-white"><Shield size={16} /> Supabase Auth</div>
          Production admin and API routes require ADMIN_PASSWORD.
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b border-black/10 bg-white/90 px-5 backdrop-blur">
          <Link href="/admin/dashboard" className="font-black lg:hidden">{adminSites.length === 1 ? `${adminSites[0].name} Admin` : 'Command Center'}</Link>
          <div className="text-sm font-bold text-neutral-500">{adminSites.length === 1 ? `${adminSites[0].name} admin at /admin` : 'Shared admin panel at /admin'}</div>
        </header>
        {children}
      </div>
    </div>
  );
}
