import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { sites } from './sites';
import type { AffiliateLink, MediaAsset, Post, PostStatus, Product, Subscriber } from './types';
import { createServiceClient, hasSupabaseEnv } from './supabase/server';
import { sanitizeArticleHtml } from './sanitize';

type LocalDb = {
  products: Product[];
  posts: Post[];
  affiliate_links: AffiliateLink[];
  media_assets: MediaAsset[];
  subscribers: Subscriber[];
};

const dataDir = path.join(process.cwd(), 'data');
const dbFile = path.join(dataDir, 'local-db.json');

const emptyDb: LocalDb = {
  products: [],
  posts: [],
  affiliate_links: [],
  media_assets: [],
  subscribers: [],
};

async function readLocalDb(): Promise<LocalDb> {
  try {
    const raw = await fs.readFile(dbFile, 'utf8');
    return { ...emptyDb, ...JSON.parse(raw) };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return emptyDb;
    throw error;
  }
}

async function writeLocalDb(db: LocalDb) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dbFile, JSON.stringify(db, null, 2), 'utf8');
}

export async function listSites() {
  return sites;
}

export async function getDashboardStats(siteId?: string) {
  const posts = await listPosts({ siteId });
  return {
    totalSites: siteId ? 1 : sites.length,
    totalPosts: posts.length,
    draftPosts: posts.filter((post) => post.status === 'draft').length,
    publishedPosts: posts.filter((post) => post.status === 'published').length,
    scheduledPosts: posts.filter((post) => post.status === 'scheduled').length,
    recentPosts: posts.slice(0, 6),
  };
}

export async function createProduct(input: Omit<Product, 'id' | 'created_at'>) {
  const product: Product = {
    ...input,
    id: randomUUID(),
    created_at: new Date().toISOString(),
  };

  if (hasSupabaseEnv()) {
    const supabase = createServiceClient();
    const { data, error } = await supabase.from('products').insert(product).select('*').single();
    if (error) throw error;
    return data as Product;
  }

  const db = await readLocalDb();
  db.products.push(product);
  await writeLocalDb(db);
  return product;
}

export async function upsertPost(input: Partial<Post> & Pick<Post, 'site_id' | 'product_id' | 'title' | 'slug'>) {
  const now = new Date().toISOString();
  const post: Post = {
    id: input.id || randomUUID(),
    site_id: input.site_id,
    product_id: input.product_id,
    title: input.title,
    slug: input.slug,
    excerpt: input.excerpt || '',
    content_markdown: input.content_markdown || '',
    content_html: sanitizeArticleHtml(input.content_html || ''),
    featured_image: input.featured_image || '',
    seo_title: input.seo_title || input.title,
    meta_description: input.meta_description || input.excerpt || '',
    category: input.category || 'Reviews',
    tags: input.tags || [],
    status: input.status || 'draft',
    published_at: input.status === 'published' ? input.published_at || now : input.published_at || null,
    scheduled_at: input.scheduled_at || null,
    created_at: input.created_at || now,
    updated_at: now,
    og_title: input.og_title || input.seo_title || input.title,
    og_description: input.og_description || input.meta_description || input.excerpt || '',
    twitter_title: input.twitter_title || input.seo_title || input.title,
    twitter_description: input.twitter_description || input.meta_description || input.excerpt || '',
    schema: input.schema || {},
    faq: input.faq || [],
    product_box: input.product_box || {},
    cta_blocks: input.cta_blocks || [],
    tiktok_ideas: input.tiktok_ideas || [],
    facebook_posts: input.facebook_posts || [],
    image_suggestions: input.image_suggestions || [],
  };

  if (hasSupabaseEnv()) {
    const supabase = createServiceClient();
    const { data, error } = await supabase.from('posts').upsert(post).select('*').single();
    if (error) throw error;
    return data as Post;
  }

  const db = await readLocalDb();
  const index = db.posts.findIndex((item) => item.id === post.id);
  if (index >= 0) db.posts[index] = post;
  else db.posts.push(post);
  await writeLocalDb(db);
  return post;
}

export async function listPosts(filters: { siteId?: string; status?: PostStatus } = {}) {
  if (hasSupabaseEnv()) {
    const supabase = createServiceClient();
    let query = supabase.from('posts').select('*').order('updated_at', { ascending: false });
    if (filters.siteId) query = query.eq('site_id', filters.siteId);
    if (filters.status) query = query.eq('status', filters.status);
    const { data, error } = await query;
    if (error) throw error;
    return data as Post[];
  }

  const db = await readLocalDb();
  return db.posts
    .filter((post) => !filters.siteId || post.site_id === filters.siteId)
    .filter((post) => !filters.status || post.status === filters.status)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
}

export async function getPostBySlug(siteId: string, slug: string) {
  const posts = await listPosts({ siteId });
  return posts.find((post) => post.slug === slug);
}

export async function getPostById(id: string) {
  if (hasSupabaseEnv()) {
    const supabase = createServiceClient();
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Post;
  }

  const db = await readLocalDb();
  return db.posts.find((post) => post.id === id) || null;
}

export async function updatePost(id: string, patch: Partial<Post>) {
  const existing = await getPostById(id);
  if (!existing) throw new Error('Post not found.');
  return upsertPost({ ...existing, ...patch, id, updated_at: new Date().toISOString() });
}

export async function deletePost(id: string) {
  if (hasSupabaseEnv()) {
    const supabase = createServiceClient();
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  const db = await readLocalDb();
  db.posts = db.posts.filter((post) => post.id !== id);
  await writeLocalDb(db);
  return true;
}

export async function listProducts(siteId?: string) {
  if (hasSupabaseEnv()) {
    const supabase = createServiceClient();
    let query = supabase.from('products').select('*').order('created_at', { ascending: false });
    if (siteId) query = query.eq('site_id', siteId);
    const { data, error } = await query;
    if (error) throw error;
    return data as Product[];
  }

  const db = await readLocalDb();
  return db.products.filter((product) => !siteId || product.site_id === siteId);
}

export async function saveMediaAssets(postId: string, assets: Omit<MediaAsset, 'id' | 'post_id' | 'created_at'>[]) {
  const media = assets.map((asset) => ({
    ...asset,
    id: randomUUID(),
    post_id: postId,
    created_at: new Date().toISOString(),
  }));

  if (hasSupabaseEnv()) {
    const supabase = createServiceClient();
    const { error } = await supabase.from('media_assets').insert(media);
    if (error) throw error;
    return media;
  }

  const db = await readLocalDb();
  db.media_assets.push(...media);
  await writeLocalDb(db);
  return media;
}

export async function saveSubscriber(input: Pick<Subscriber, 'site_id' | 'email' | 'source' | 'interest'>) {
  const db = await readLocalDb();
  const email = input.email.trim().toLowerCase();
  const existing = db.subscribers.find((item) => item.site_id === input.site_id && item.email === email);
  if (existing) return existing;

  const subscriber: Subscriber = {
    ...input,
    email,
    id: randomUUID(),
    created_at: new Date().toISOString(),
  };
  db.subscribers.push(subscriber);
  await writeLocalDb(db);
  return subscriber;
}
