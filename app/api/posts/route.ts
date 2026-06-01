import { NextResponse } from 'next/server';
import { listPosts, upsertPost } from '@/lib/db';
import type { PostStatus } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const siteId = searchParams.get('site_id') || undefined;
  const status = (searchParams.get('status') || undefined) as PostStatus | undefined;
  const posts = await listPosts({ siteId, status });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const post = await upsertPost(body);
  return NextResponse.json(post);
}
