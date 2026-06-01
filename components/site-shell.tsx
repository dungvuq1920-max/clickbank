import Link from 'next/link';
import type { Site } from '@/lib/types';

export function SiteShell({ site, children }: { site: Site; children: React.ReactNode }) {
  return (
    <div style={{ '--site-primary': site.primary_color, '--site-secondary': site.secondary_color } as React.CSSProperties} className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link href={`/sites/${site.slug}`} className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg text-sm font-black text-white" style={{ background: site.primary_color }}>{site.logo}</span>
            <span className="font-black">{site.name}</span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-extrabold text-neutral-600 md:flex">
            <Link href={`/sites/${site.slug}/blog`}>Blog</Link>
            <Link href={`/sites/${site.slug}/category/reviews`}>Reviews</Link>
            <Link href={`/sites/${site.slug}/about`}>About</Link>
            <Link href={`/sites/${site.slug}/contact`}>Contact</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-black/10 bg-neutral-950 px-5 py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_2fr]">
          <div>
            <div className="text-2xl font-black">{site.name}</div>
            <p className="mt-3 max-w-md text-white/65">{site.description}</p>
          </div>
          <div className="grid gap-3 text-sm font-bold text-white/75 md:grid-cols-3">
            <Link href={`/sites/${site.slug}/privacy-policy`}>Privacy Policy</Link>
            <Link href={`/sites/${site.slug}/terms`}>Terms</Link>
            <Link href={`/sites/${site.slug}/affiliate-disclosure`}>Affiliate Disclosure</Link>
            <Link href="/admin/dashboard">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
