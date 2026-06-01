import { NextResponse } from 'next/server';
import { listProducts } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const products = await listProducts(searchParams.get('site_id') || undefined);
  return NextResponse.json(products);
}
