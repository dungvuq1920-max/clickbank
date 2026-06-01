import { notFound } from 'next/navigation';
import { getSiteBySlug } from '@/lib/sites';

export async function LegalPage({ kind, params }: { kind: string; params: Promise<{ siteSlug: string }> }) {
  const { siteSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) notFound();
  const content = kind === 'Affiliate Disclosure'
    ? ['Some links on this website are affiliate links. If you purchase through them, we may earn a commission at no additional cost to you.', 'Affiliate relationships do not change our goal: to provide clear, responsible editorial guidance and encourage readers to verify details on the official product page.']
    : kind === 'Privacy Policy'
      ? ['We collect information you voluntarily provide, such as an email address submitted through a lead-magnet form.', 'We use this information to deliver requested resources and relevant editorial updates. We do not promise outcomes, and we do not sell personal information.']
      : ['By using this website, you agree to treat its content as educational information rather than professional advice.', 'Product details, pricing, and policies can change. Verify current information on the official product website before purchasing.'];
  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-5xl font-black">{kind}</h1>
      {content.map((paragraph) => <p className="mt-5 text-lg leading-8 text-neutral-600" key={paragraph}>{paragraph}</p>)}
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-neutral-700">{site.disclaimer}</div>
    </main>
  );
}
