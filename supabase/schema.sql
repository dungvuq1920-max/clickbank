create extension if not exists "pgcrypto";

create table if not exists sites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  niche text not null,
  domain text,
  description text,
  logo text,
  primary_color text,
  secondary_color text,
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  site_id text not null,
  product_name text not null,
  product_url text not null,
  affiliate_url text not null,
  niche text not null,
  extracted_data jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  site_id text not null,
  product_id text not null,
  title text not null,
  slug text not null,
  excerpt text,
  content_markdown text,
  content_html text,
  featured_image text,
  seo_title text,
  meta_description text,
  category text,
  tags text[] default '{}',
  status text check (status in ('draft', 'published', 'scheduled')) default 'draft',
  published_at timestamptz,
  scheduled_at timestamptz,
  og_title text,
  og_description text,
  twitter_title text,
  twitter_description text,
  schema jsonb default '{}'::jsonb,
  faq jsonb default '[]'::jsonb,
  product_box jsonb default '{}'::jsonb,
  cta_blocks jsonb default '[]'::jsonb,
  tiktok_ideas text[] default '{}',
  facebook_posts text[] default '{}',
  image_suggestions jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(site_id, slug)
);

create table if not exists affiliate_links (
  id uuid primary key default gen_random_uuid(),
  site_id text not null,
  product_id text not null,
  affiliate_url text not null,
  cta_text text not null,
  placement text not null,
  created_at timestamptz default now()
);

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  post_id text not null,
  image_url text,
  image_search_query text not null,
  alt_text text not null,
  caption text,
  placement text,
  source_suggestion text check (source_suggestion in ('Unsplash', 'Pexels', 'Pixabay')),
  filename text,
  created_at timestamptz default now()
);

alter table sites enable row level security;
alter table products enable row level security;
alter table posts enable row level security;
alter table affiliate_links enable row level security;
alter table media_assets enable row level security;

create policy "Public can read published posts" on posts
  for select using (status = 'published');

create policy "Service role manages posts" on posts
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role manages products" on products
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role manages affiliate links" on affiliate_links
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Service role manages media assets" on media_assets
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
