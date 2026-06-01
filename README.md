# 5-Site Affiliate AI Publishing System

Production-oriented Next.js system for one shared admin panel and five affiliate niche sites.

## Local URLs

- Legacy Vite app: `http://localhost:3001`
- Admin: `http://localhost:3010/admin`
- NeuroRestLab.com: `http://localhost:3011` and `/sites/neuro-sleep`
- InnerAlignmentLab.com: `http://localhost:3012` and `/sites/manifest-signal`
- DigitalOperatorAI.com: `http://localhost:3013` and `/sites/ai-hustle`
- healthyresetlab.com: `http://localhost:3014` and `/sites/metabolic-reset`
- connectiondecoded.com: `http://localhost:3015` and `/sites/love-psychology`

## Run

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env.local` and set:

```bash
AI_BASE_URL=https://api.shopaikey.com/v1
AI_MODEL=gpt-4o
AI_API_KEY=your_key_here
```

The AI key is used only in server-side API route `/api/generate-article`.

## Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Add these env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

If Supabase env vars are missing, the app uses local fallback storage at `data/local-db.json` so you can test the workflow immediately.

## Admin Workflow

1. Open `/admin/dashboard`.
2. Select one of the five websites.
3. Enter Product URL and Affiliate URL.
4. Choose content type, target keyword, article length, and tone.
5. Click Generate Article.
6. Review tabs: Preview, Markdown, HTML, SEO, Images, Schema, Social Posts.
7. Save Draft, Publish Now, or Schedule Tomorrow.

Published posts appear only on the selected website at:

```txt
/sites/[site-slug]/review/[article-slug]
```

## Vercel Deployment

1. Push the repo to GitHub.
2. Import into Vercel.
3. Add env vars from `.env.example`.
4. Deploy.
5. Map production domains to the site routes or deploy separate Vercel projects with `SITE_SLUG`.

## Current Architecture

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase-ready data layer
- Local JSON fallback for development
- OpenAI-compatible AI API integration
- Markdown/HTML content support
- SEO metadata and schema JSON output
- Five branded affiliate site templates
