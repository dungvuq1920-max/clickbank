import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Scale, ShieldCheck, Star } from 'lucide-react';
import { getSiteBySlug } from '@/lib/sites';

export default async function BestProductsPage({ params }: { params: Promise<{ siteSlug: string }> }) {
  const { siteSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) notFound();

  return (
    <main className="bg-neutral-50 text-neutral-950">
      <section className="px-5 py-16 text-white md:py-24" style={{ background: site.primary_color }}>
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-widest" style={{ color: site.accent_color }}>Buyer guide</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">Compare {site.niche.toLowerCase()} resources with a clearer framework.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">Start with your goal, compare the tradeoffs, and review the official product details before making a decision.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <p className="text-sm font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>Comparison table</p>
        <h2 className="mt-3 text-4xl font-black">Three useful starting points.</h2>
        <div className="mt-8 overflow-x-auto rounded-3xl border border-black/10 bg-white shadow-sm">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-neutral-950 text-white"><tr><th className="p-5">Resource type</th><th className="p-5">Best for</th><th className="p-5">What to evaluate</th><th className="p-5">Next step</th></tr></thead>
            <tbody>{site.productTypes.map((item) => <tr className="border-t border-black/10" key={item.title}><td className="p-5 font-black">{item.title}</td><td className="p-5 text-neutral-600">{item.label}</td><td className="p-5 text-neutral-600">{item.text}</td><td className="p-5"><Link className="font-black" style={{ color: site.secondary_color }} href={`/sites/${site.slug}/review`}>Browse reviews</Link></td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>Buying guide</p>
          <h2 className="mt-3 text-4xl font-black">A responsible way to choose.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['Start with fit', 'Choose the problem you actually want to solve before comparing features.', Scale],
              ['Check the official page', 'Verify pricing, terms, refund policies, and current product details directly.', CheckCircle2],
              ['Keep expectations realistic', site.disclaimer, ShieldCheck],
            ].map(([title, text, Icon]) => <article className="rounded-3xl border border-black/10 bg-neutral-50 p-6" key={title as string}><Icon style={{ color: site.secondary_color }} /><h3 className="mt-5 text-2xl font-black">{title as string}</h3><p className="mt-3 leading-7 text-neutral-600">{text as string}</p></article>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl bg-neutral-950 p-7 text-white md:flex-row md:items-center md:justify-between md:p-10">
          <div><Star style={{ color: site.accent_color }} /><h2 className="mt-4 text-3xl font-black">Not sure where to begin?</h2><p className="mt-3 max-w-2xl text-white/70">Use the short quiz to find a more focused starting point.</p></div>
          <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 font-black text-neutral-950" href={`/sites/${site.slug}/quiz`}>Take the free quiz <ArrowRight size={17} /></Link>
        </div>
      </section>
    </main>
  );
}
