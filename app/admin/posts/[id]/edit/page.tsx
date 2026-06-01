import { notFound } from 'next/navigation';
import EditPostClient from './post-editor';
import { getPostById } from '@/lib/db';
import { getAdminSites, getRuntimeSiteId } from '@/lib/sites';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post || (getRuntimeSiteId() && post.site_id !== getRuntimeSiteId())) notFound();

  return <EditPostClient post={post} sites={getAdminSites()} />;
}
