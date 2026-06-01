import { notFound } from 'next/navigation';
import { getSiteBySlug } from '@/lib/sites';

export default async function AboutPage({ params }: { params: Promise<{ siteSlug: string }> }) {
  const { siteSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) notFound();
  return <Info title={`About ${site.name}`} body={`${site.name} publishes practical guides and responsible reviews for ${site.niche}. Our editorial approach emphasizes clear tradeoffs, realistic expectations, ethical affiliate disclosure, and useful questions to ask before purchasing.`} disclaimer={site.disclaimer} />;
}

function Info({ title, body, disclaimer }: { title: string; body: string; disclaimer: string }) {
  return <main className="mx-auto max-w-3xl px-5 py-16 md:py-24"><p className="text-sm font-black uppercase tracking-widest text-neutral-500">Editorial standards</p><h1 className="mt-3 text-5xl font-black">{title}</h1><p className="mt-5 text-lg leading-8 text-neutral-600">{body}</p><div className="mt-8 rounded-2xl border border-black/10 bg-white p-5 leading-7 text-neutral-600"><strong className="text-neutral-950">Our commitment:</strong> We avoid exaggerated claims and encourage readers to verify current details on official product pages.</div><div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 leading-7 text-neutral-700">{disclaimer}</div></main>;
}
