import { notFound } from 'next/navigation';
import { getSiteBySlug } from '@/lib/sites';

export default async function ContactPage({ params }: { params: Promise<{ siteSlug: string }> }) {
  const { siteSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) notFound();
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-5xl font-black">Contact {site.name}</h1>
      <p className="mt-5 text-lg leading-8 text-neutral-600">For editorial corrections, affiliate disclosure questions, or partnership inquiries, email our team. Include the page URL when requesting a correction.</p>
      <a className="mt-8 inline-flex rounded-full px-5 py-3 font-black text-white" style={{ background: site.primary_color }} href={`mailto:editorial@${site.domain.toLowerCase()}`}>editorial@{site.domain.toLowerCase()}</a>
    </main>
  );
}
