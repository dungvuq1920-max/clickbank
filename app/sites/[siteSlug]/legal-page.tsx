import { notFound } from 'next/navigation';
import { getSiteBySlug } from '@/lib/sites';

export async function LegalPage({ kind, params }: { kind: string; params: Promise<{ siteSlug: string }> }) {
  const { siteSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) notFound();
  const disclosure = kind === 'Affiliate Disclosure'
    ? 'This website may contain affiliate links. If you buy through these links, we may earn a commission at no extra cost to you. Reviews should be read as editorial guidance, not guaranteed outcomes.'
    : `${kind} content for ${site.name}. Replace this template with your production legal policy before deployment.`;
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-5xl font-black">{kind}</h1>
      <p className="mt-5 text-lg leading-8 text-neutral-600">{disclosure}</p>
      <p className="mt-5 text-neutral-600">{site.compliance}</p>
    </main>
  );
}
