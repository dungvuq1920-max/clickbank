import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createProduct, saveMediaAssets, upsertPost } from '@/lib/db';
import { generateArticle } from '@/lib/ai/client';
import { getRuntimeSiteId, getSiteById } from '@/lib/sites';
import { researchProductPage } from '@/lib/product-research';

const bodySchema = z.object({
  site_id: z.string(),
  product_url: z.string().url(),
  affiliate_url: z.string().url(),
  niche: z.string(),
  content_type: z.string(),
  target_keyword: z.string().optional(),
  article_length: z.string().optional(),
  tone: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const input = bodySchema.parse(await request.json());
    const site = getSiteById(input.site_id);
    if (!site) return NextResponse.json({ error: 'Invalid site_id.' }, { status: 400 });
    if (getRuntimeSiteId() && site.id !== getRuntimeSiteId()) {
      return NextResponse.json({ error: 'This admin can only manage its assigned site.' }, { status: 403 });
    }

    let research: { sourceUrl: string; text: string } | undefined;
    let researchNote = 'Sales page research completed.';
    try {
      research = await researchProductPage(input.product_url);
    } catch (error) {
      researchNote = error instanceof Error ? `Sales page research warning: ${error.message}` : 'Sales page research was unavailable.';
    }
    const generated = await generateArticle({
      ...input,
      product_page_content: research?.text,
      product_research_note: researchNote,
    });
    const product = await createProduct({
      site_id: site.id,
      product_name: String(generated.product_profile.product_name || generated.title),
      product_url: input.product_url,
      affiliate_url: input.affiliate_url,
      niche: input.niche,
      extracted_data: generated.product_profile,
    });

    const post = await upsertPost({
      site_id: site.id,
      product_id: product.id,
      title: generated.title,
      slug: generated.slug,
      excerpt: generated.excerpt,
      content_markdown: generated.content_markdown,
      content_html: generated.content_html,
      featured_image: generated.featured_image.search_query,
      seo_title: generated.seo_title,
      meta_description: generated.meta_description,
      category: generated.category,
      tags: generated.tags,
      status: 'draft',
      schema: generated.schema,
      faq: generated.faq,
      product_box: generated.product_box,
      cta_blocks: generated.cta_blocks,
      tiktok_ideas: generated.tiktok_ideas,
      facebook_posts: generated.facebook_posts,
      image_suggestions: generated.images.map((image) => ({
        ...image,
        image_search_query: image.search_query,
      })),
      seo_pack: generated.seo_pack,
    });

    await saveMediaAssets(post.id, generated.images.map((image) => ({
      image_search_query: image.search_query,
      source_suggestion: image.source_suggestion,
      filename: image.filename,
      alt_text: image.alt_text,
      caption: image.caption,
      placement: image.placement,
    })));

    return NextResponse.json({ post, product, generated, research: { source_url: research?.sourceUrl || input.product_url, note: researchNote, extracted_characters: research?.text.length || 0 } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to generate article.' }, { status: 500 });
  }
}
