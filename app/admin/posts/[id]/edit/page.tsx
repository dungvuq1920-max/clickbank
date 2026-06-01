import { notFound } from 'next/navigation';
import EditPostClient from './post-editor';
import { getPostById } from '@/lib/db';
import { sites } from '@/lib/sites';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return <EditPostClient post={post} sites={sites} />;
}
