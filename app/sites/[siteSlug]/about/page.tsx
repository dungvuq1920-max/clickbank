import { notFound } from 'next/navigation';
import { getSiteBySlug } from '@/lib/sites';

export default async function AboutPage({ params }: { params: Promise<{ siteSlug: string }> }) {
  const { siteSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) notFound();
  return <Info title={`About ${site.name}`} body={`${site.name} helps readers compare affiliate offers in ${site.niche} with practical reviews, compliance-aware summaries, and clear buyer guidance.`} />;
}

function Info({ title, body }: { title: string; body: string }) {
  return <main className="mx-auto max-w-3xl px-5 py-16"><h1 className="text-5xl font-black">{title}</h1><p className="mt-5 text-lg leading-8 text-neutral-600">{body}</p></main>;
}
