import { NextResponse } from 'next/server';
import { deletePost, getPostById, updatePost } from '@/lib/db';
import { getRuntimeSiteId } from '@/lib/sites';

async function getScopedPost(id: string) {
  const post = await getPostById(id);
  return post && (!getRuntimeSiteId() || post.site_id === getRuntimeSiteId()) ? post : null;
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getScopedPost(id);
  if (!post) return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await getScopedPost(id))) return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  const post = await updatePost(id, await request.json());
  return NextResponse.json(post);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await getScopedPost(id))) return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  await deletePost(id);
  return NextResponse.json({ ok: true });
}
