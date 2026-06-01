import Link from 'next/link';
import { ArrowRight, Mail, ShieldCheck, Star } from 'lucide-react';
import type { Post, Site } from '@/lib/types';

export function SiteHome({ site, posts }: { site: Site; posts: Post[] }) {
  const featured = posts[0];
  return (
    <main>
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `linear-gradient(90deg, ${site.primary_color}, transparent), url(${site.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative mx-auto grid min-h-[680px] max-w-7xl content-center px-5 py-20">
          <p className="text-sm font-black uppercase" style={{ color: site.accent_color }}>{site.niche}</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-none tracking-tight md:text-7xl">{site.name}: affiliate reviews built for smarter decisions.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{site.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="affiliate-button" href={`/sites/${site.slug}/blog`}>Latest Reviews <ArrowRight size={18} /></Link>
            <Link className="rounded-lg border border-white/25 px-4 py-3 font-black" href={`/sites/${site.slug}/affiliate-disclosure`}>Disclosure</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-[1.3fr_.7fr]">
        <div>
          <p className="text-sm font-black uppercase" style={{ color: site.secondary_color }}>Featured articles</p>
          <h2 className="mt-2 text-4xl font-black">Latest reviews</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {posts.slice(0, 4).map((post) => <PostCard key={post.id} site={site} post={post} />)}
            {!posts.length && <EmptyCard site={site} />}
          </div>
        </div>
        <aside className="grid content-start gap-4">
          <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
            <Mail className="mb-4" style={{ color: site.secondary_color }} />
            <h3 className="text-2xl font-black">{site.leadMagnet}</h3>
            <p className="mt-3 text-neutral-600">Use this lead magnet in your email capture funnel for this niche.</p>
            <button className="mt-5 min-h-11 rounded-lg px-4 font-black text-white" style={{ background: site.primary_color }}>Join Free</button>
          </div>
          <div className="rounded-lg border border-black/10 bg-neutral-50 p-6">
            <ShieldCheck className="mb-4" style={{ color: site.secondary_color }} />
            <h3 className="font-black">Compliance note</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{site.compliance}</p>
          </div>
        </aside>
      </section>

      <section className="bg-neutral-100 px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase" style={{ color: site.secondary_color }}>Recommended product section</p>
          <div className="mt-4 rounded-lg bg-white p-6 shadow-sm md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-black">Publish a product review from the admin panel.</h2>
              <p className="mt-2 text-neutral-600">Generated and published articles appear here automatically.</p>
            </div>
            <Link href="/admin/products/new" className="mt-4 inline-flex rounded-lg bg-neutral-950 px-4 py-3 font-black text-white md:mt-0">Generate Review</Link>
          </div>
        </div>
      </section>
      {featured && <div className="fixed inset-x-3 bottom-3 z-50 md:hidden"><Link href={`/sites/${site.slug}/review/${featured.slug}`} className="affiliate-button w-full justify-center">{site.ctaTexts[0]}</Link></div>}
    </main>
  );
}

export function PostCard({ site, post }: { site: Site; post: Post }) {
  return (
    <Link href={`/sites/${site.slug}/review/${post.slug}`} className="rounded-lg border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Star className="mb-5" style={{ color: site.secondary_color }} />
      <div className="text-xs font-black uppercase text-neutral-500">{post.category}</div>
      <h3 className="mt-2 text-xl font-black">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">{post.excerpt}</p>
    </Link>
  );
}

function EmptyCard({ site }: { site: Site }) {
  return (
    <div className="rounded-lg border border-dashed border-black/20 bg-white p-5">
      <h3 className="text-xl font-black">No published reviews yet</h3>
      <p className="mt-3 text-neutral-600">Go to /admin, generate an article, then publish it to {site.name}.</p>
    </div>
  );
}
