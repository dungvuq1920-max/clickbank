import { getSiteById } from '@/lib/sites';
import type { GenerateArticleInput, Site } from '@/lib/types';

const structure = [
  'SEO Title',
  'Introduction using PAS: problem, agitation, solution, then CTA',
  'Quick Summary comparison table: ratings, best for, not ideal for, price, guarantee, official website',
  'What Is The Product?',
  'My Research and Analysis',
  'Main Features and Benefits',
  'How It Works',
  'Who Should Buy This?',
  'Pros and Cons table',
  'Product vs Competitors table',
  'Pricing, Bonuses and Value',
  'Money Back Guarantee',
  'Customer Feedback: common positive feedback and objections without invented testimonials',
  'Frequently Asked Questions: 10 SEO-friendly questions',
  'Final Verdict',
  'Final CTA',
];

export function buildArticlePrompt(input: GenerateArticleInput) {
  const site = getSiteById(input.site_id);
  if (!site) throw new Error('Invalid site_id.');

  return `
You are an expert affiliate editor, SEO strategist, and compliance-aware copywriter.
Return ONLY valid JSON. No markdown fences. No commentary.

Product URL: ${input.product_url}
Affiliate URL: ${input.affiliate_url}
Selected niche: ${input.niche}
Selected website: ${site.name}
Content type: ${input.content_type}
Target keyword: ${input.target_keyword || 'Infer from product URL and niche'}
Article length: ${input.article_length || '2500-3500 words'}
Tone: ${input.tone || 'Helpful, trustworthy, conversion-focused'}

Website profile:
- Name: ${site.name}
- Niche: ${site.niche}
- Description: ${site.description}
- CTA text options: ${site.ctaTexts.join(' | ')}
- Compliance rule: ${site.compliance}

Product research requirements:
- Extract product name, vendor name, main promise, target audience, pain points, benefits, features, bonuses, pricing, guarantee, unique mechanism, testimonials, FAQ, risk factors, and compliance warnings.
- If exact pricing or guarantee is not found, write: "Pricing and guarantee details should be verified on the official website."
- Do not invent facts, prices, scientific proof, testimonials, guarantees, bonuses, or vendor details.
- If the page cannot be accessed, make cautious inferences from the URL and clearly mark uncertain details for verification.
- Sales page research status: ${input.product_research_note || 'Not provided'}
- Extracted sales page text:
${input.product_page_content || 'Sales page text unavailable. Do not invent facts; mark uncertain details for verification.'}

Review article structure:
${structure.map((item, index) => `${index + 1}. ${item}`).join('\n')}

Affiliate link rules:
- Every affiliate button must use exactly: ${input.affiliate_url}
- Maximum 5 CTA blocks.
- CTA placements: after intro, after benefits, after pricing, before FAQ, final verdict.
- Include this disclosure near the top: "This article may contain affiliate links. If you buy through these links, we may earn a commission at no extra cost to you."

Image system:
- Generate 1 featured image suggestion, 3 supporting image suggestions, and 1 infographic idea.
- Use only royalty-free source suggestions: Unsplash, Pexels, Pixabay.
- Include search query, source suggestion, filename, alt text, caption, and placement.

SEO requirements:
- Generate SEO title, meta description, slug, category, tags, Open Graph title, Open Graph description, Twitter title, Twitter description.
- Generate Article schema, Review schema, FAQ schema, and Breadcrumb schema inside "schema".
- Generate an SEO pack with 10 title variants, 10 meta descriptions, 20 long-tail keywords, internal links, external authority source suggestions, and one featured snippet answer.

Compliance:
- Health, sleep, brain, and weight loss: no medical claims, no cure claims, no guaranteed results, add health disclaimer.
- AI MMO: no income guarantees, add income disclaimer.
- Manifestation: no guaranteed spiritual or financial results; position as personal development.
- Dating: avoid manipulative language; focus on communication and relationship improvement.

Return valid JSON in exactly this shape:
{
  "product_profile": {},
  "title": "",
  "slug": "",
  "excerpt": "",
  "seo_title": "",
  "meta_description": "",
  "category": "",
  "tags": [],
  "featured_image": {
    "search_query": "",
    "source_suggestion": "Unsplash",
    "alt_text": "",
    "caption": "",
    "filename": ""
  },
  "images": [],
  "content_markdown": "",
  "content_html": "",
  "cta_blocks": [],
  "product_box": {},
  "schema": {},
  "faq": [],
  "internal_links": [],
  "tiktok_ideas": [],
  "facebook_posts": [],
  "seo_pack": {
    "title_variants": [],
    "meta_descriptions": [],
    "long_tail_keywords": [],
    "internal_links": [],
    "authority_sources": [],
    "featured_snippet": ""
  }
}
`;
}

export function fallbackArticle(input: GenerateArticleInput, site: Site) {
  const productName = input.product_url.split('/').filter(Boolean).pop()?.replace(/[-_]/g, ' ') || `${site.name} Product`;
  const ctas = site.ctaTexts.slice(0, 3).map((text, index) => ({
    text,
    url: input.affiliate_url,
    placement: ['after intro', 'after benefits', 'final verdict'][index],
  }));
  const slug = `${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-review`;
  const disclosure = 'This article may contain affiliate links. If you buy through these links, we may earn a commission at no extra cost to you.';
  const html = `
    <p class="affiliate-disclosure">${disclosure}</p>
    <h1>${productName} Review: Is It Right For ${site.niche}?</h1>
    <p>This review is a draft generated for ${site.name}. Verify official pricing, guarantee, vendor details, and claims before publishing.</p>
    <div class="cta-block"><a href="${input.affiliate_url}" rel="nofollow sponsored noopener">${site.ctaTexts[0]}</a></div>
    <h2>Quick Verdict</h2><p>${productName} may be worth reviewing if your audience wants ${site.niche.toLowerCase()} support and a structured program. Results vary.</p>
    <h2>What Is The Product?</h2><p>This section should summarize the product after checking the official page.</p>
    <h2>Who Is It For?</h2><p>It is best for readers who understand that educational products require personal effort and careful expectations.</p>
    <h2>How It Works</h2><p>The official website should be checked for the exact mechanism, modules, and delivery format.</p>
    <h2>Key Benefits</h2><ul><li>Clearer buying decision</li><li>Structured guidance</li><li>Potential fit for ${site.niche}</li></ul>
    <div class="cta-block"><a href="${input.affiliate_url}" rel="nofollow sponsored noopener">${site.ctaTexts[1]}</a></div>
    <h2>Pricing</h2><p>Pricing and guarantee details should be verified on the official website.</p>
    <h2>FAQ</h2><h3>Is this guaranteed?</h3><p>No. Results vary and no outcome should be considered guaranteed.</p>
    <h2>Final Verdict</h2><p>Review the official product page, compare alternatives, and decide whether the program fits your goals.</p>
    <div class="cta-block"><a href="${input.affiliate_url}" rel="nofollow sponsored noopener">${site.ctaTexts[2]}</a></div>
  `;

  return {
    product_profile: {
      product_name: productName,
      compliance_warnings: [site.compliance],
      note: 'Fallback draft. Verify product page details before publishing.',
    },
    title: `${productName} Review`,
    slug,
    excerpt: `A careful ${site.niche} review draft for ${productName}.`,
    seo_title: `${productName} Review: Benefits, Pricing, Pros and Cons`,
    meta_description: `Read this careful ${productName} review for ${site.niche}. Verify pricing and guarantee on the official website.`,
    category: 'Reviews',
    tags: site.niche.split('/').map((tag) => tag.trim()),
    featured_image: {
      search_query: `${site.niche} product review lifestyle`,
      source_suggestion: 'Unsplash' as const,
      alt_text: `${site.niche} review illustration`,
      caption: `${site.name} review visual concept.`,
      filename: `${slug}-featured.jpg`,
    },
    images: [
      {
        search_query: `${site.niche} checklist`,
        source_suggestion: 'Pexels' as const,
        filename: `${slug}-checklist.jpg`,
        alt_text: `${site.niche} checklist`,
        caption: 'A checklist-style supporting image.',
        placement: 'after quick verdict',
      },
      {
        search_query: `${site.niche} routine`,
        source_suggestion: 'Unsplash' as const,
        filename: `${slug}-routine.jpg`,
        alt_text: `${site.niche} routine`,
        caption: 'Routine-oriented supporting image.',
        placement: 'after benefits',
      },
      {
        search_query: `${site.niche} decision`,
        source_suggestion: 'Pixabay' as const,
        filename: `${slug}-decision.jpg`,
        alt_text: `${site.niche} decision guide`,
        caption: 'Decision-focused supporting image.',
        placement: 'before final verdict',
      },
      {
        search_query: `${site.niche} infographic`,
        source_suggestion: 'Pexels' as const,
        filename: `${slug}-infographic.jpg`,
        alt_text: `${site.niche} infographic idea`,
        caption: 'Infographic idea for product comparison.',
        placement: 'infographic',
      },
    ],
    content_markdown: html.replace(/<[^>]+>/g, '\n'),
    content_html: html,
    cta_blocks: ctas,
    product_box: { product_name: productName, affiliate_url: input.affiliate_url },
    schema: {
      article: { '@type': 'Article', headline: `${productName} Review` },
      review: { '@type': 'Review', itemReviewed: { '@type': 'Product', name: productName } },
      faq: { '@type': 'FAQPage' },
      breadcrumb: { '@type': 'BreadcrumbList' },
    },
    faq: [{ question: 'Are results guaranteed?', answer: 'No. Results vary and details should be verified on the official website.' }],
    internal_links: [`/sites/${site.slug}`, `/sites/${site.slug}/blog`],
    tiktok_ideas: [`3 things to verify before buying ${productName}`, `${site.niche} mistakes beginners make`],
    facebook_posts: [`Considering ${productName}? Here is what to verify before buying.`],
    seo_pack: {
      title_variants: [`${productName} Review: Benefits, Pricing, Pros and Cons`],
      meta_descriptions: [`A careful ${productName} review for ${site.niche}. Verify pricing, bonuses, and guarantee details on the official website.`],
      long_tail_keywords: [`${productName} review`, `${productName} pricing`, `${productName} pros and cons`],
      internal_links: [`/sites/${site.slug}`, `/sites/${site.slug}/best-products`, `/sites/${site.slug}/quiz`],
      authority_sources: ['Add relevant external authority sources after manual editorial review.'],
      featured_snippet: `${productName} is a product that should be evaluated against its official pricing, guarantee, features, and fit for your goals before purchase.`,
    },
  };
}
