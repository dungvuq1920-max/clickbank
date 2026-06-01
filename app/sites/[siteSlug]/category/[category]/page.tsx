import { notFound } from 'next/navigation';
import { PostCard } from '@/components/site-home';
import { listPosts } from '@/lib/db';
import { getSiteBySlug } from '@/lib/sites';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, Layers3, ShoppingBag } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ siteSlug: string; category: string }> }): Promise<Metadata> {
  const { siteSlug, category } = await params;
  const site = getSiteBySlug(siteSlug);
  const catalog = site?.catalogs.find((item) => item.slug === category);
  if (!site || !catalog) return {};
  return {
    title: `${catalog.name} | ${site.name}`,
    description: catalog.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ siteSlug: string; category: string }> }) {
  const { siteSlug, category } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) notFound();
  const catalog = site.catalogs.find((item) => item.slug === category);
  if (!catalog) notFound();
  const posts = (await listPosts({ siteId: site.id, status: 'published' })).filter((post) => post.category.toLowerCase() === catalog.name.toLowerCase());

  return (
    <main className="bg-neutral-50 text-neutral-950">
      <section className="px-5 py-16 text-white md:py-24" style={{ background: site.primary_color }}>
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-widest" style={{ color: site.accent_color }}>{catalog.role.replace('-', ' ')} catalog</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">{catalog.name}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{catalog.description}</p>
          <Link className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-black text-neutral-950" href={`/sites/${site.slug}/quiz`}>Find your starting point <ArrowRight size={17} /></Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-12 md:grid-cols-3">
        <CatalogSummary icon={Layers3} title="Built for" items={[catalog.targetAudience]} color={site.secondary_color} />
        <CatalogSummary icon={CheckCircle2} title="Problems solved" items={catalog.problemsSolved} color={site.secondary_color} />
        <CatalogSummary icon={ShoppingBag} title="Affiliate opportunities" items={catalog.affiliateOpportunities} color={site.secondary_color} />
      </section>
      <section className="bg-white px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>Editorial roadmap</p>
          <h2 className="mt-3 text-4xl font-black">Start with these ten evergreen articles.</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {catalog.futureArticleIdeas.map((idea, index) => <article key={idea} className="flex gap-4 rounded-2xl border border-black/10 bg-neutral-50 p-5"><BookOpen className="shrink-0" style={{ color: site.secondary_color }} /><div><span className="text-xs font-black uppercase text-neutral-400">Article {index + 1}</span><h3 className="mt-1 font-black">{idea}</h3></div></article>)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="text-sm font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>Published content</p>
        <h2 className="mt-3 text-4xl font-black">Latest guides and reviews.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => <PostCard key={post.id} site={site} post={post} />)}
          {!posts.length && <p className="text-neutral-600">The first articles for this catalog are in the editorial roadmap above.</p>}
        </div>
      </section>
    </main>
  );
}

function CatalogSummary({ icon: Icon, title, items, color }: { icon: typeof Layers3; title: string; items: string[]; color: string }) {
  return <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"><Icon style={{ color }} /><h2 className="mt-5 text-xl font-black">{title}</h2><ul className="mt-3 grid gap-2 text-sm leading-6 text-neutral-600">{items.map((item) => <li key={item}>- {item}</li>)}</ul></article>;
}
