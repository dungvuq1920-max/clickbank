import { NextResponse } from 'next/server';
import { listPosts, upsertPost } from '@/lib/db';
import type { PostStatus } from '@/lib/types';
import { getRuntimeSiteId } from '@/lib/sites';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const siteId = getRuntimeSiteId() || searchParams.get('site_id') || undefined;
  const status = (searchParams.get('status') || undefined) as PostStatus | undefined;
  const posts = await listPosts({ siteId, status });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const runtimeSiteId = getRuntimeSiteId();
  if (runtimeSiteId && body.site_id !== runtimeSiteId) {
    return NextResponse.json({ error: 'This admin can only manage its assigned site.' }, { status: 403 });
  }
  const post = await upsertPost(body);
  return NextResponse.json(post);
}
