import { z } from 'zod';
import { getSiteById } from '@/lib/sites';
import type { GenerateArticleInput, GeneratedArticle } from '@/lib/types';
import { buildArticlePrompt, fallbackArticle } from './prompt';

const generatedArticleSchema = z.object({
  product_profile: z.record(z.string(), z.unknown()),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  seo_title: z.string(),
  meta_description: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  featured_image: z.object({
    search_query: z.string(),
    source_suggestion: z.enum(['Unsplash', 'Pexels', 'Pixabay']).optional(),
    alt_text: z.string(),
    caption: z.string(),
    filename: z.string(),
  }),
  images: z.array(z.object({
    search_query: z.string(),
    source_suggestion: z.enum(['Unsplash', 'Pexels', 'Pixabay']),
    filename: z.string(),
    alt_text: z.string(),
    caption: z.string(),
    placement: z.string(),
  })),
  content_markdown: z.string(),
  content_html: z.string(),
  cta_blocks: z.array(z.object({ text: z.string(), url: z.string(), placement: z.string() })),
  product_box: z.record(z.string(), z.unknown()),
  schema: z.record(z.string(), z.unknown()),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })),
  internal_links: z.array(z.string()),
  tiktok_ideas: z.array(z.string()),
  facebook_posts: z.array(z.string()),
});

function parseJson(text: string) {
  const clean = text.trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  return JSON.parse(clean);
}

export async function generateArticle(input: GenerateArticleInput): Promise<GeneratedArticle> {
  const site = getSiteById(input.site_id);
  if (!site) throw new Error('Invalid site.');

  const apiKey = process.env.AI_API_KEY;
  const baseUrl = process.env.AI_BASE_URL || 'https://api.shopaikey.com/v1';
  const model = process.env.AI_MODEL || 'gpt-4o';

  if (!apiKey) {
    return fallbackArticle(input, site);
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'Return publication-ready affiliate review content as valid JSON only.',
        },
        {
          role: 'user',
          content: buildArticlePrompt(input),
        },
      ],
    }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error?.message || payload?.message || 'AI API request failed.');
  }

  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error('AI returned an empty response.');
  return generatedArticleSchema.parse(parseJson(content));
}
