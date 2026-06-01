# 5-Site Affiliate AI Publishing System

Next.js system for five independent affiliate niche websites. Each production
website runs as its own Railway service with its own domain, scoped admin panel,
and persistent `/app/data` volume.

## Websites

| Website | Site slug | Railway service |
| --- | --- | --- |
| NeuroRestLab | `neuro-sleep` | `neuro-sleep-site` |
| InnerAlignmentLab | `manifest-signal` | `manifest-signal-site` |
| DigitalOperatorAI | `ai-hustle` | `ai-hustle-site` |
| HealthyResetLab | `metabolic-reset` | `metabolic-reset-site` |
| ConnectionDecoded | `love-psychology` | `love-psychology-site` |

The generated Railway domains are listed in [TEMP_DOMAINS.md](TEMP_DOMAINS.md).

## Local Development

```powershell
npm install
npm run dev
```

The local admin is available at `http://localhost:3010/admin`. Local site URLs
are documented in [SITES_TREE.md](SITES_TREE.md).

## Production Flow

```powershell
npm run lint
npm run build
git push origin master
.\verify-5-sites.ps1
```

A push to `master` runs GitHub Actions. The workflow deploys all five Railway
services, waits for Railway to report `SUCCESS`, and verifies each homepage.

See [RAILWAY_SETUP.md](RAILWAY_SETUP.md) for token setup and
[QUICK_START.md](QUICK_START.md) for the daily workflow.

## Admin Publishing Studio

Open `/admin` on the Railway domain for the website you want to manage. The
admin is intentionally a single-page workflow:

1. Paste the ShopAIKey API key and test the connection.
2. Save the key server-side.
3. Paste the official product sales-page URL and ClickBank hoplink.
4. Generate the research-backed draft, then review facts, SEO pack, and
   royalty-free illustration briefs.
5. Use **Push to Website** to publish the article on the current domain.

API settings and fallback draft data stay server-side in the Railway
`/app/data` volume and are excluded from Git.

## Environment

Each production service requires:

```text
APP_MODE=site
SITE_SLUG=<matching-site-slug>
ADMIN_PASSWORD=<strong-password>
```

Optional AI article generation requires:

```text
AI_BASE_URL=https://api.shopaikey.com/v1
AI_MODEL=<compatible-model>
AI_API_KEY=<server-side-api-key>
```

If Supabase variables are missing, the application stores content in
`data/local-db.json`. Railway mounts `/app/data` as a persistent volume for each
production service so fallback content survives redeploys.

## Architecture

- Next.js App Router
- TypeScript and Tailwind CSS
- Five branded affiliate templates
- Separate Basic Auth protected admin panel per Railway domain
- Supabase-ready data layer with persistent JSON fallback
- OpenAI-compatible server-side article generation route
- SEO metadata, schema JSON output, funnel pages, and subscriber opt-in API
