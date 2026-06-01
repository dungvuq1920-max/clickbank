import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@/components/article-page';
import { getPostBySlug, listPosts } from '@/lib/db';
import { getSiteBySlug } from '@/lib/sites';

export async function generateMetadata({ params }: { params: Promise<{ siteSlug: string; articleSlug: string }> }): Promise<Metadata> {
  const { siteSlug, articleSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) return {};
  const post = await getPostBySlug(site.id, articleSlug);
  if (!post) return {};
  return {
    title: post.seo_title,
    description: post.meta_description,
    openGraph: {
      title: post.og_title || post.seo_title,
      description: post.og_description || post.meta_description,
    },
    twitter: {
      title: post.twitter_title || post.seo_title,
      description: post.twitter_description || post.meta_description,
    },
  };
}

export default async function ReviewPage({ params }: { params: Promise<{ siteSlug: string; articleSlug: string }> }) {
  const { siteSlug, articleSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) notFound();
  const post = await getPostBySlug(site.id, articleSlug);
  if (!post) notFound();
  const related = (await listPosts({ siteId: site.id, status: 'published' })).filter((item) => item.id !== post.id).slice(0, 3);
  return <ArticlePage site={site} post={post} related={related} />;
}
