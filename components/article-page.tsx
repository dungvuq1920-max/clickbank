import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import type { Post, Site } from '@/lib/types';
import { PostCard } from './site-home';
import { sanitizeArticleHtml } from '@/lib/sanitize';

export function ArticlePage({ site, post, related }: { site: Site; post: Post; related: Post[] }) {
  const toc = Array.from(post.content_html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)).map((match) => match[1].replace(/<[^>]+>/g, ''));
  const cta = post.cta_blocks?.[0] || { text: site.ctaTexts[0], url: '#', placement: 'sticky' };
  const productDetails = Object.entries(post.product_box || {}).slice(0, 6);

  return (
    <main>
      <section className="bg-neutral-950 px-5 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black uppercase" style={{ color: site.accent_color }}>{post.category}</p>
          <h1 className="mt-3 text-5xl font-black leading-none tracking-tight md:text-7xl">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/75">{post.excerpt}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[260px_1fr_300px]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-black/10 bg-white p-4">
            <div className="font-black">Table of contents</div>
            <div className="mt-3 grid gap-2 text-sm text-neutral-600">
              {toc.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </aside>
        <article className="article-body rounded-2xl border border-black/10 bg-white p-5 shadow-sm md:p-8" dangerouslySetInnerHTML={{ __html: sanitizeArticleHtml(post.content_html) }} />
        <aside className="grid content-start gap-4">
          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>Review summary</p>
            <h3 className="mt-2 text-xl font-black">At a glance</h3>
            <div className="mt-4 grid gap-3 text-sm">
              {productDetails.length ? productDetails.map(([label, value]) => <div className="border-b border-black/10 pb-3 last:border-0" key={label}><div className="font-black capitalize">{label.replace(/_/g, ' ')}</div><div className="mt-1 text-neutral-600">{typeof value === 'string' ? value : JSON.stringify(value)}</div></div>) : <p className="text-neutral-600">Review the article and official product page for current details.</p>}
            </div>
            <Link className="affiliate-button mt-5 w-full justify-center" href={cta.url}>{cta.text}</Link>
          </div>
          <div className="rounded-2xl border border-black/10 bg-neutral-50 p-5">
            <h3 className="font-black">Author box</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{site.name} editorial team reviews affiliate offers with compliance and buyer clarity in mind.</p>
          </div>
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <h3 className="font-black">FAQ</h3>
            <div className="mt-3 grid gap-3">
              {(post.faq || []).slice(0, 4).map((item) => (
                <div key={item.question}>
                  <div className="flex gap-2 font-bold"><CheckCircle2 size={16} style={{ color: site.secondary_color }} /> {item.question}</div>
                  <p className="mt-1 text-sm text-neutral-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-10"><div className="affiliate-disclosure"><strong>Affiliate disclosure:</strong> This review may contain affiliate links. We may earn a commission at no extra cost to you. {site.disclaimer}</div></section>
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <h2 className="text-3xl font-black">Related articles</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {related.map((item) => <PostCard key={item.id} site={site} post={item} />)}
        </div>
      </section>
      <div className="fixed inset-x-3 bottom-3 z-50 md:hidden"><Link href={cta.url} className="affiliate-button w-full justify-center">{cta.text}</Link></div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(post.schema || {}) }} />
    </main>
  );
}
