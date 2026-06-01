# CLICKBANK Multi-Site Domains

## 5 Affiliate Niche Sites

| Niche | Site Name | Domain | Slug | Railway URL |
|-------|-----------|--------|------|-------------|
| Brain / Focus / Sleep | NeuroRestLab | NeuroRestLab.com | neuro-sleep | clickbank-production.up.railway.app |
| Spirituality / Manifestation | InnerAlignmentLab | InnerAlignmentLab.com | manifest-signal | clickbank-production.up.railway.app |
| AI MMO / Side Hustle | DigitalOperatorAI | DigitalOperatorAI.com | ai-hustle | clickbank-production.up.railway.app |
| Weight Loss / Metabolism | HealthyResetLab | healthyresetlab.com | metabolic-reset | clickbank-production.up.railway.app |
| Dating / Relationship | ConnectionDecoded | connectiondecoded.com | love-psychology | clickbank-production.up.railway.app |

## Admin Panel

- URL: `https://clickbank-production.up.railway.app/admin`
- Default redirect: `/admin/dashboard`

## How to Access Sites Locally

During development, use these local URLs with custom environment variables:

```bash
# Terminal 1 - Admin
APP_MODE=admin PORT=3010 npm run start

# Terminal 2 - NeuroRestLab
SITE_SLUG=neuro-sleep PORT=3011 npm run start

# Terminal 3 - InnerAlignmentLab
SITE_SLUG=manifest-signal PORT=3012 npm run start

# Terminal 4 - DigitalOperatorAI
SITE_SLUG=ai-hustle PORT=3013 npm run start

# Terminal 5 - HealthyResetLab
SITE_SLUG=metabolic-reset PORT=3014 npm run start

# Terminal 6 - ConnectionDecoded
SITE_SLUG=love-psychology PORT=3015 npm run start
```

## Deployment

- **GitHub Repo**: https://github.com/dungvuq1920-max/clickbank
- **Railway Project**: clickbank (production)
- **Railway Service**: clickbank
- **Railway Domain**: https://clickbank-production.up.railway.app

### Next Steps

1. **Purchase domains** (optional): Buy the 5 domain names listed above
2. **Add DNS records** to Railway (CNAME pointing to Railway URL)
3. **Test with Railway URL**: Visit `https://clickbank-production.up.railway.app/sites/neuro-sleep`
4. **Map domains** in Railway settings once DNS is configured

## Environment Variables

Required on Railway:

- `AI_BASE_URL=https://api.shopaikey.com/v1`
- `AI_MODEL=gpt-4o`
- `AI_API_KEY=<your_key>` (add via Railway dashboard)
- `NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>` (optional)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_key>` (optional)
- `SUPABASE_SERVICE_ROLE_KEY=<your_key>` (optional)
