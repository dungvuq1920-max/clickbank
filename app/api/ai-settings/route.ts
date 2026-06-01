import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAiSettings, publicAiSettings, saveAiSettings } from '@/lib/ai/settings';

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
    const settings = await saveAiSettings(bodySchema.parse(await request.json()));
    return NextResponse.json(publicAiSettings(settings));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to save AI settings.' }, { status: 400 });
  }
}
