import { notFound } from 'next/navigation';
import { getSiteBySlug } from '@/lib/sites';
import { QuizClient } from './quiz-client';

export default async function QuizPage({ params }: { params: Promise<{ siteSlug: string }> }) {
  const { siteSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) notFound();
  return <QuizClient site={site} />;
}
