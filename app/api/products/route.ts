import { NextResponse } from 'next/server';
import { listProducts } from '@/lib/db';
import { getRuntimeSiteId } from '@/lib/sites';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const products = await listProducts(getRuntimeSiteId() || searchParams.get('site_id') || undefined);
  return NextResponse.json(products);
}
