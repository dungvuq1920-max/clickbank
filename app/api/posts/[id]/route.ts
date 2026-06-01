import { NextResponse } from 'next/server';
import { deletePost, getPostById, updatePost } from '@/lib/db';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await updatePost(id, await request.json());
  return NextResponse.json(post);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deletePost(id);
  return NextResponse.json({ ok: true });
}
