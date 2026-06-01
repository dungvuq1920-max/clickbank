# 🌐 Map 5 Domains to Railway - Setup Guide

## Domain Routing Architecture

Each custom domain routes to the same Railway app, but the app serves different sites based on the domain:

```
NeuroRestLab.com              →  clickbank-production.up.railway.app/sites/neuro-sleep
InnerAlignmentLab.com         →  clickbank-production.up.railway.app/sites/manifest-signal
DigitalOperatorAI.com         →  clickbank-production.up.railway.app/sites/ai-hustle
healthyresetlab.com           →  clickbank-production.up.railway.app/sites/metabolic-reset
connectiondecoded.com         →  clickbank-production.up.railway.app/sites/love-psychology
```

---

## Step 1: Purchase Domains (If Not Done)

Purchase all 5 domains from your domain registrar:
- NeuroRestLab.com
- InnerAlignmentLab.com
- DigitalOperatorAI.com
- healthyresetlab.com
- connectiondecoded.com

---

## Step 2: Add Domains to Railway

### Method A: Via Railway Dashboard (Recommended)

1. Go to: https://railway.app/project/a9895cce-1c0f-4055-9e39-1f381cf37051
2. Click **clickbank** service
3. Go to **Domains** tab
4. Click **+ Add Custom Domain**
5. Enter domain: `NeuroRestLab.com`
6. Configure as:
   - **Domain**: `NeuroRestLab.com`
   - **Port**: Auto (default 3000/80)
   - **Target**: Root (`/`) - app will route to `/sites/neuro-sleep`
7. Repeat for all 5 domains

### Method B: Via Railway CLI

```bash
# Add domain 1
railway domain --add NeuroRestLab.com

# Add domain 2
railway domain --add InnerAlignmentLab.com

# Add domain 3
railway domain --add DigitalOperatorAI.com

# Add domain 4
railway domain --add healthyresetlab.com

# Add domain 5
railway domain --add connectiondecoded.com

# List all domains
railway domain --json
```

---

## Step 3: Configure DNS Records

After adding domains to Railway, you need to point them via DNS.

### For Each Domain:

1. Log in to your domain registrar (GoDaddy, Namecheap, etc.)
2. Go to DNS Settings
3. Add **CNAME record**:
   - **Name**: `@` or `www` (depending on registrar)
   - **Target**: `cname.railway.app.` (with trailing dot)
   - **TTL**: 3600

**Example DNS Record:**
```
Type: CNAME
Name: @
Value: cname.railway.app
TTL: 3600
```

Wait 24-48 hours for DNS propagation.

---

## Step 4: Verify Domain Setup

After DNS propagates, test each domain:

```bash
# Test domain 1
curl -I https://NeuroRestLab.com

# Test domain 2
curl -I https://InnerAlignmentLab.com

# Test domain 3
curl -I https://DigitalOperatorAI.com

# Test domain 4
curl -I https://healthyresetlab.com

# Test domain 5
curl -I https://connectiondecoded.com
```

Expected response: **HTTP/1.1 307 Temporary Redirect** (to `/admin/dashboard`)

---

## Step 5: App Routing Configuration

The app automatically routes based on URL. Verify in `lib/sites.ts`:

```typescript
export function getRuntimeSite(): Site {
  const slug = (process.env.SITE_SLUG || 'neuro-sleep') as SiteSlug;
  return getSiteBySlug(slug) || sites[0];
}
```

**How routing works:**

1. User visits `https://NeuroRestLab.com/`
2. Railway routes to: `clickbank-production.up.railway.app/sites/neuro-sleep`
3. App detects slug from URL path and loads correct site config
4. Site content displays

---

## 📊 Domain Mapping Reference

| Domain | Route | Site | Niche |
|--------|-------|------|-------|
| NeuroRestLab.com | `/sites/neuro-sleep` | NeuroRestLab | Brain / Sleep |
| InnerAlignmentLab.com | `/sites/manifest-signal` | InnerAlignmentLab | Spirituality |
| DigitalOperatorAI.com | `/sites/ai-hustle` | DigitalOperatorAI | AI Side Hustle |
| healthyresetlab.com | `/sites/metabolic-reset` | HealthyResetLab | Weight Loss |
| connectiondecoded.com | `/sites/love-psychology` | ConnectionDecoded | Dating |

---

## 🔄 Tracking Content Updates

### Automatic Tracking (Already Set Up)

Every push to GitHub triggers:

1. ✅ GitHub commit recorded
2. ✅ GitHub Actions workflow runs
3. ✅ Railway deployment starts
4. ✅ App rebuilds and restarts
5. ✅ New content live across all 5 domains

### Monitor Updates

**Watch deployments:**
```
https://github.com/dungvuq1920-max/clickbank/actions
```

**View logs:**
```bash
railway logs --service clickbank --lines 100
```

**Check each domain:**
```bash
curl https://NeuroRestLab.com/api/posts  # Get latest posts
```

---

## 🚀 Publishing Workflow

For each content update:

1. **Edit locally** (in VS Code)
   ```
   Edit app/sites/[siteSlug]/blog/page.tsx
   Edit data/local-db.json (or admin panel)
   ```

2. **Deploy** (One command)
   ```
   Ctrl+Shift+B → 🚀 Full Deploy: Commit → Push → Railway
   ```

3. **Track update** (2-3 minutes)
   - Watch: https://github.com/dungvuq1920-max/clickbank/actions
   - Check status: `Ctrl+Shift+B` → 🔍 Check Logs
   - Verify live: Visit any domain

4. **Confirm live** (Check each domain)
   - https://NeuroRestLab.com
   - https://InnerAlignmentLab.com
   - https://DigitalOperatorAI.com
   - https://healthyresetlab.com
   - https://connectiondecoded.com

---

## 🆘 Troubleshooting

### Domain shows "502 Bad Gateway"

**Causes:**
- DNS hasn't propagated yet (wait 24-48 hours)
- Railway deployment failed
- App crashed

**Fix:**
```bash
# Check Railway logs
railway logs --service clickbank --lines 50

# Check app status
railway status

# Redeploy
npx @railway/cli up --service clickbank
```

### Domain shows Railway's default page

**Cause:** DNS not configured correctly

**Fix:**
1. Verify CNAME record in registrar DNS settings
2. Test DNS: `nslookup NeuroRestLab.com`
3. Wait longer for propagation

### Changes not appearing on domain

**Cause:** Cache or deployment still running

**Fix:**
```bash
# Hard refresh in browser
Ctrl+Shift+Delete (clear cache)

# Or use incognito mode
Ctrl+Shift+N
```

---

## 📋 Checklist

- [ ] Purchase all 5 domains
- [ ] Add domains to Railway Dashboard
- [ ] Configure DNS CNAME records at registrar
- [ ] Wait 24-48 hours for DNS propagation
- [ ] Test each domain with curl or browser
- [ ] Verify all 5 domains accessible
- [ ] Deploy content update to test workflow
- [ ] Monitor update on all domains
- [ ] Set up bookmarks for easy access

---

## 🎯 Quick Links

| Resource | Link |
|----------|------|
| Railway Project | https://railway.app/project/a9895cce-1c0f-4055-9e39-1f381cf37051 |
| GitHub Actions | https://github.com/dungvuq1920-max/clickbank/actions |
| Live (Railway URL) | https://clickbank-production.up.railway.app |
| Admin Panel | https://clickbank-production.up.railway.app/admin |

---

## 📝 Next Steps

1. Purchase domains if not done
2. Add them to Railway (Steps 1-2)
3. Configure DNS at registrar (Step 3)
4. Wait for propagation (24-48 hours)
5. Test all domains (Step 4)
6. Start tracking updates!

**Once domains are live**, every code change you push will instantly update all 5 sites across their custom domains! 🎉
