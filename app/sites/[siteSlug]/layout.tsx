import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/site-shell';
import { getSiteBySlug } from '@/lib/sites';

export default async function SiteLayout({ children, params }: { children: React.ReactNode; params: Promise<{ siteSlug: string }> }) {
  const { siteSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) notFound();
  return <SiteShell site={site}>{children}</SiteShell>;
}
