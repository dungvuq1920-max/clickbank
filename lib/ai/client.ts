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

function stringify(value: unknown, fallback = '') {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value && typeof value === 'object') {
    const object = value as Record<string, unknown>;
    return stringify(object.url || object.href || object.link || object.question || object.title || object.name || object.placement || object.section || fallback);
  }
  return fallback;
}

function normalizeFaq(value: unknown) {
  if (typeof value === 'string') {
    const [question, ...answer] = value.split(/\n|Answer:/i);
    return { question: question.replace(/^Question:\s*/i, '').trim(), answer: answer.join(' ').trim() || 'See the official product page for verified details.' };
  }
  const object = (value || {}) as Record<string, unknown>;
  return {
    question: stringify(object.question || object.q || object.title),
    answer: stringify(object.answer || object.a || object.response, 'See the official product page for verified details.'),
  };
}

function normalizeCta(value: unknown, index: number, hoplink: string) {
  const object = (value || {}) as Record<string, unknown>;
  return {
    text: stringify(object.text || object.label || object.button_text || object.cta || object.title, 'Visit the official website'),
    url: hoplink,
    placement: stringify(object.placement || object.section || object.position, `CTA section ${index + 1}`),
  };
}

function normalizeArticlePayload(value: unknown, hoplink: string) {
  const article = value as Record<string, unknown>;
  const images = Array.isArray(article.images) ? article.images : [];
  const ctaBlocks = Array.isArray(article.cta_blocks) ? article.cta_blocks.map((item, index) => normalizeCta(item, index, hoplink)) : [];
  const html = stringify(article.content_html);
  const hoplinkOccurrences = html.split(hoplink).length - 1;
  for (let index = ctaBlocks.length; index < hoplinkOccurrences; index++) {
    ctaBlocks.push({ text: 'Visit the official website', url: hoplink, placement: `CTA section ${index + 1}` });
  }
  const seoPack = (article.seo_pack || {}) as Record<string, unknown>;
  return {
    ...article,
    cta_blocks: ctaBlocks,
    images: images.map((image, index) => {
      const object = image as Record<string, unknown>;
      return {
        ...object,
        search_query: stringify(object.search_query || object.query),
        filename: stringify(object.filename, `supporting-image-${index + 1}.jpg`),
        alt_text: stringify(object.alt_text || object.alt),
        caption: stringify(object.caption),
        placement: stringify(object.placement || object.section, `supporting image ${index + 1}`),
      };
    }),
    faq: Array.isArray(article.faq) ? article.faq.map(normalizeFaq) : [],
    internal_links: Array.isArray(article.internal_links) ? article.internal_links.map((item) => stringify(item)).filter(Boolean) : [],
    seo_pack: {
      ...seoPack,
      internal_links: Array.isArray(seoPack.internal_links) ? seoPack.internal_links.map((item) => stringify(item)).filter(Boolean) : [],
      authority_sources: Array.isArray(seoPack.authority_sources) ? seoPack.authority_sources.map((item) => stringify(item)).filter(Boolean) : [],
    },
  };
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
  const article = generatedArticleSchema.parse(normalizeArticlePayload(parseJson(content), input.affiliate_url));
  assertArticleQuality(article, input);
  return article;
}
