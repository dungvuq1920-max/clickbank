import { notFound } from 'next/navigation';
import { getSiteBySlug } from '@/lib/sites';

export default async function ContactPage({ params }: { params: Promise<{ siteSlug: string }> }) {
  const { siteSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) notFound();
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-5xl font-black">Contact {site.name}</h1>
      <p className="mt-5 text-lg leading-8 text-neutral-600">For partnerships, corrections, or compliance questions, contact the site owner after deployment using your production email address.</p>
      <form className="mt-8 grid gap-3 rounded-lg border border-black/10 bg-white p-5">
        <input className="min-h-11 rounded-lg border border-black/15 px-3" placeholder="Name" />
        <input className="min-h-11 rounded-lg border border-black/15 px-3" placeholder="Email" />
        <textarea className="min-h-32 rounded-lg border border-black/15 p-3" placeholder="Message" />
        <button className="min-h-11 rounded-lg bg-neutral-950 font-black text-white" type="button">Send</button>
      </form>
    </main>
  );
}
