import { NextResponse } from 'next/server';
import { z } from 'zod';
import { saveSubscriber } from '@/lib/db';
import { getSiteById } from '@/lib/sites';

const bodySchema = z.object({
  site_id: z.string().max(80),
  email: z.string().email().max(180),
  source: z.string().max(80).default('lead-magnet'),
  interest: z.string().max(120).default('general'),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  try {
    const input = bodySchema.parse(await request.json());
    if (!getSiteById(input.site_id)) {
      return NextResponse.json({ error: 'Invalid site.' }, { status: 400 });
    }
    await saveSubscriber(input);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }
}
