import { z } from 'zod';
import { getSiteById } from '@/lib/sites';
import type { GenerateArticleInput, GeneratedArticle } from '@/lib/types';
import { buildArticlePrompt } from './prompt';
import { getAiSettings } from './settings';

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
  seo_pack: z.object({
    title_variants: z.array(z.string()),
    meta_descriptions: z.array(z.string()),
    long_tail_keywords: z.array(z.string()),
    internal_links: z.array(z.string()),
    authority_sources: z.array(z.string()),
    featured_snippet: z.string(),
  }),
});

function parseJson(text: string) {
  const clean = text.trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  return JSON.parse(clean);
}

function articleWordCount(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length;
}

function assertArticleQuality(article: GeneratedArticle, input: GenerateArticleInput) {
  const errors: string[] = [];
  const words = articleWordCount(article.content_html);
  if (words < 2800 || words > 5500) errors.push(`article length must be 3,000-5,000 words (received about ${words})`);
  if (article.cta_blocks.length < 6 || article.cta_blocks.length > 12) errors.push('article must contain 6-12 CTA blocks spaced through the review');
  if (article.cta_blocks.some((cta) => cta.url !== input.affiliate_url)) errors.push('every CTA block must use the submitted affiliate hoplink exactly');
  if (article.faq.length < 10) errors.push('article must contain at least 10 FAQ entries');
  if (article.seo_pack.title_variants.length < 10) errors.push('SEO pack must contain 10 title variants');
  if (article.seo_pack.meta_descriptions.length < 10) errors.push('SEO pack must contain 10 meta descriptions');
  if (article.seo_pack.long_tail_keywords.length < 20) errors.push('SEO pack must contain 20 long-tail keywords');
  const hoplinkOccurrences = article.content_html.split(input.affiliate_url).length - 1;
  if (hoplinkOccurrences < article.cta_blocks.length) errors.push('article HTML must include the submitted hoplink in every CTA section');
  if (errors.length) throw new Error(`AI draft did not pass the publishing quality gate: ${errors.join('; ')}. Generate again.`);
}

export async function generateArticle(input: GenerateArticleInput): Promise<GeneratedArticle> {
  const site = getSiteById(input.site_id);
  if (!site) throw new Error('Invalid site.');

  const { apiKey, baseUrl, model } = await getAiSettings();

  if (!apiKey) {
    throw new Error('Connect and save a valid ShopAIKey API key before generating an article.');
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
  const article = generatedArticleSchema.parse(parseJson(content));
  assertArticleQuality(article, input);
  return article;
}
