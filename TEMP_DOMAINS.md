# 🚀 5 Temporary Railway Domains - Setup Guide

Tạo 5 temporary domains trên Railway để test 5 sites mà không cần mua domain thực.

---

## 📊 Kết Quả Cuối Cùng

Sau setup, bạn sẽ có 5 domains tạm thời như thế này:

| Site | Temporary Domain |
|------|-----------------|
| NeuroRestLab | `https://neuro-sleep-production.up.railway.app` |
| InnerAlignmentLab | `https://manifest-signal-production.up.railway.app` |
| DigitalOperatorAI | `https://ai-hustle-production.up.railway.app` |
| HealthyResetLab | `https://metabolic-reset-production.up.railway.app` |
| ConnectionDecoded | `https://love-psychology-production.up.railway.app` |

Giống như: `https://clickbank-production.up.railway.app/` nhưng cho mỗi site!

---

## ✅ Step 1: Tạo 5 Services Trên Railway

### Cách 1: Via Railway Dashboard (Recommended)

1. Go to: https://railway.app/project/a9895cce-1c0f-4055-9e39-1f381cf37051
2. Click **+ Create New Service**
3. Select **GitHub Repo** → Choose `dungvuq1920-max/clickbank`
4. Name it: `neuro-sleep-site`
5. Deploy
6. Repeat cho 4 sites khác

### Cách 2: Via Railway CLI + Script

```bash
# Run this PowerShell script
.\create-5-sites.ps1
```

Or run manually:

```bash
# Service 1: NeuroRestLab
railway service new neuro-sleep-site

# Service 2: InnerAlignmentLab
railway service new manifest-signal-site

# Service 3: DigitalOperatorAI
railway service new ai-hustle-site

# Service 4: HealthyResetLab
railway service new metabolic-reset-site

# Service 5: ConnectionDecoded
railway service new love-psychology-site
```

---

## 🔧 Step 2: Set Environment Variables Cho Mỗi Service

### Via Railway Dashboard

For each service:

1. Click the service
2. Go to **Variables**
3. Add: `SITE_SLUG` = `neuro-sleep` (hoặc slug tương ứng)
4. Save

**Example:**
- Service `neuro-sleep-site` → `SITE_SLUG=neuro-sleep`
- Service `manifest-signal-site` → `SITE_SLUG=manifest-signal`
- Service `ai-hustle-site` → `SITE_SLUG=ai-hustle`
- Service `metabolic-reset-site` → `SITE_SLUG=metabolic-reset`
- Service `love-psychology-site` → `SITE_SLUG=love-psychology`

### Via CLI Script

```bash
.\set-site-vars.ps1
```

---

## 🚀 Step 3: Deploy Mỗi Service

### Via Railway Dashboard

Click mỗi service → Click **Deploy** (hoặc tự động)

### Via CLI

```bash
railway up --service neuro-sleep-site
railway up --service manifest-signal-site
railway up --service ai-hustle-site
railway up --service metabolic-reset-site
railway up --service love-psychology-site
```

---

## ✅ Verify - Kiểm Tra 5 Sites

Sau khi deploy xong (2-3 minutes), kiểm tra mỗi domain:

```bash
# Test tất cả 5 sites
curl -I https://neuro-sleep-production.up.railway.app
curl -I https://manifest-signal-production.up.railway.app
curl -I https://ai-hustle-production.up.railway.app
curl -I https://metabolic-reset-production.up.railway.app
curl -I https://love-psychology-production.up.railway.app
```

Hoặc **mở trực tiếp trong browser**:
- https://neuro-sleep-production.up.railway.app
- https://manifest-signal-production.up.railway.app
- https://ai-hustle-production.up.railway.app
- https://metabolic-reset-production.up.railway.app
- https://love-psychology-production.up.railway.app

---

## 📝 5 Services Config Summary

```json
{
  "services": [
    {
      "name": "neuro-sleep-site",
      "repo": "clickbank",
      "env": { "SITE_SLUG": "neuro-sleep" },
      "domain": "neuro-sleep-production.up.railway.app"
    },
    {
      "name": "manifest-signal-site",
      "repo": "clickbank",
      "env": { "SITE_SLUG": "manifest-signal" },
      "domain": "manifest-signal-production.up.railway.app"
    },
    {
      "name": "ai-hustle-site",
      "repo": "clickbank",
      "env": { "SITE_SLUG": "ai-hustle" },
      "domain": "ai-hustle-production.up.railway.app"
    },
    {
      "name": "metabolic-reset-site",
      "repo": "clickbank",
      "env": { "SITE_SLUG": "metabolic-reset" },
      "domain": "metabolic-reset-production.up.railway.app"
    },
    {
      "name": "love-psychology-site",
      "repo": "clickbank",
      "env": { "SITE_SLUG": "love-psychology" },
      "domain": "love-psychology-production.up.railway.app"
    }
  ]
}
```

---

## 🔄 Update Workflow (After Setup)

### Mỗi lần update content:

**Option A: Update tất cả 5 sites cùng lúc**

```bash
# Edit files
# Commit & push
git add .
git commit -m "Update content"
git push origin master

# Railway CI/CD auto-deploys to all 5 services!
```

Railway sẽ tự động build & deploy cho tất cả 5 services.

**Option B: Update riêng một site**

```bash
# Set environment variable khi deploy
SITE_SLUG=neuro-sleep railway up --service neuro-sleep-site
```

---

## 📊 Monitoring 5 Sites

### Real-Time Logs

```bash
# Watch logs for service 1
npx @railway/cli logs --service neuro-sleep-site

# Watch logs for service 2
npx @railway/cli logs --service manifest-signal-site

# ... etc
```

### View In GitHub Actions

All 5 deployments tracked:
https://github.com/dungvuq1920-max/clickbank/actions

---

## ⚠️ Quản Lý 5 Services

### Costs

Railway free tier covers multiple services. Keep an eye on:
- https://railway.app/billing

### When You Buy Real Domains

You can:

**Option 1:** Keep 5 services, map domains to each
```
NeuroRestLab.com → neuro-sleep-production.up.railway.app
InnerAlignmentLab.com → manifest-signal-production.up.railway.app
... etc
```

**Option 2:** Consolidate back to 1 service with subpaths
```
NeuroRestLab.com/sites/neuro-sleep
InnerAlignmentLab.com/sites/manifest-signal
... etc
```

---

## 🆘 Troubleshooting

### Service không deploy

```bash
# Check status
npx @railway/cli status --service neuro-sleep-site

# View logs
npx @railway/cli logs --service neuro-sleep-site --lines 100

# Manual redeploy
npx @railway/cli up --service neuro-sleep-site
```

### Domain không hoạt động

- Wait 5 minutes for Railway to assign domain
- Check Railway dashboard for domain status
- Test with curl: `curl -I https://neuro-sleep-production.up.railway.app`

### Environment variable không set

```bash
# List all vars for a service
npx @railway/cli variable list --service neuro-sleep-site

# Add/update var
npx @railway/cli variable --service neuro-sleep-site SITE_SLUG=neuro-sleep
```

---

## 🔗 Quick Links

| Service | Domain | Admin |
|---------|--------|-------|
| NeuroRestLab | https://neuro-sleep-production.up.railway.app | https://neuro-sleep-production.up.railway.app/admin |
| InnerAlignmentLab | https://manifest-signal-production.up.railway.app | https://manifest-signal-production.up.railway.app/admin |
| DigitalOperatorAI | https://ai-hustle-production.up.railway.app | https://ai-hustle-production.up.railway.app/admin |
| HealthyResetLab | https://metabolic-reset-production.up.railway.app | https://metabolic-reset-production.up.railway.app/admin |
| ConnectionDecoded | https://love-psychology-production.up.railway.app | https://love-psychology-production.up.railway.app/admin |

---

## 📚 Next Steps

1. ✅ Create 5 services (Step 1)
2. ✅ Set environment variables (Step 2)
3. ✅ Deploy (Step 3)
4. ✅ Test 5 domains (Verify)
5. Edit content locally
6. Push to GitHub
7. Railway auto-deploys to all 5 sites!
8. When ready to buy domains → Map them to these services

---

Bạn đã có 5 temporary Railway domains! Test xem websites hiển thị như thế nào! 🎉
