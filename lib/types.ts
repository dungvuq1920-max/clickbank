export type SiteSlug =
  | 'neuro-sleep'
  | 'manifest-signal'
  | 'ai-hustle'
  | 'metabolic-reset'
  | 'love-psychology';

export type PostStatus = 'draft' | 'published' | 'scheduled';

export type Site = {
  id: string;
  name: string;
  slug: SiteSlug;
  niche: string;
  domain: string;
  description: string;
  logo: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  theme: 'neuro' | 'manifest' | 'ai' | 'metabolic' | 'love';
  ctaTexts: string[];
  compliance: string;
  hero: string;
  leadMagnet: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCta: string;
  secondaryCta: string;
  painTitle: string;
  painPoints: Array<{ title: string; text: string }>;
  pillars: Array<{ title: string; text: string }>;
  productTypes: Array<{ title: string; text: string; label: string }>;
  categories: string[];
  quizTitle: string;
  quizText: string;
  faqs: Array<{ question: string; answer: string }>;
  disclaimer: string;
  created_at: string;
};

export type Subscriber = {
  id: string;
  site_id: string;
  email: string;
  source: string;
  interest: string;
  created_at: string;
};

export type Product = {
  id: string;
  site_id: string;
  product_name: string;
  product_url: string;
  affiliate_url: string;
  niche: string;
  extracted_data: Record<string, unknown>;
  created_at: string;
};

export type MediaAsset = {
  id: string;
  post_id: string;
  image_url?: string;
  image_search_query: string;
  source_suggestion: 'Unsplash' | 'Pexels' | 'Pixabay';
  filename: string;
  alt_text: string;
  caption: string;
  placement: string;
  created_at: string;
};

export type AffiliateLink = {
  id: string;
  site_id: string;
  product_id: string;
  affiliate_url: string;
  cta_text: string;
  placement: string;
  created_at: string;
};

export type Post = {
  id: string;
  site_id: string;
  product_id: string;
  title: string;
  slug: string;
  excerpt: string;
  content_markdown: string;
  content_html: string;
  featured_image: string;
  seo_title: string;
  meta_description: string;
  category: string;
  tags: string[];
  status: PostStatus;
  published_at: string | null;
  scheduled_at?: string | null;
  created_at: string;
  updated_at: string;
  og_title?: string;
  og_description?: string;
  twitter_title?: string;
  twitter_description?: string;
  schema?: Record<string, unknown>;
  faq?: Array<{ question: string; answer: string }>;
  product_box?: Record<string, unknown>;
  cta_blocks?: Array<{ text: string; url: string; placement: string }>;
  tiktok_ideas?: string[];
  facebook_posts?: string[];
  image_suggestions?: Array<Omit<MediaAsset, 'id' | 'post_id' | 'created_at'>>;
};

export type GeneratedArticle = {
  product_profile: Record<string, unknown>;
  title: string;
  slug: string;
  excerpt: string;
  seo_title: string;
  meta_description: string;
  category: string;
  tags: string[];
  featured_image: {
    search_query: string;
    alt_text: string;
    caption: string;
    filename: string;
    source_suggestion?: 'Unsplash' | 'Pexels' | 'Pixabay';
  };
  images: Array<{
    search_query: string;
    source_suggestion: 'Unsplash' | 'Pexels' | 'Pixabay';
    filename: string;
    alt_text: string;
    caption: string;
    placement: string;
  }>;
  content_markdown: string;
  content_html: string;
  cta_blocks: Array<{ text: string; url: string; placement: string }>;
  product_box: Record<string, unknown>;
  schema: Record<string, unknown>;
  faq: Array<{ question: string; answer: string }>;
  internal_links: string[];
  tiktok_ideas: string[];
  facebook_posts: string[];
};

export type GenerateArticleInput = {
  site_id: string;
  product_url: string;
  affiliate_url: string;
  niche: string;
  content_type: string;
  target_keyword?: string;
  article_length?: string;
  tone?: string;
};
