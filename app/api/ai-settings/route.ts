import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAiSettings, publicAiSettings, saveAiSettings, testAiSettings } from '@/lib/ai/settings';

const bodySchema = z.object({
  baseUrl: z.string().url(),
  model: z.string().min(1),
  apiKey: z.string().optional(),
});

export async function GET() {
  return NextResponse.json(publicAiSettings(await getAiSettings()));
}

export async function POST(request: Request) {
  try {
    const input = bodySchema.parse(await request.json());
    await testAiSettings(input);
    const settings = await saveAiSettings(input);
    return NextResponse.json(publicAiSettings(settings));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to save AI settings.' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    return NextResponse.json(await testAiSettings(z.object({ apiKey: z.string().optional(), model: z.string().optional() }).parse(await request.json())));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to connect to ShopAIKey.' }, { status: 400 });
  }
}
