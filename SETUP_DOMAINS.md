# 🚀 Domain Setup & Update Tracking - Complete Guide

## What's Ready Now

Your CLICKBANK system now has **complete domain mapping and update tracking setup**:

✅ All 5 affiliate sites deployed on Railway  
✅ GitHub Actions CI/CD ready  
✅ Domain mapping configuration ready  
✅ Update tracking system ready  
✅ VS Code integration ready  

---

## 🎯 Your 5 Affiliate Domains

| Niche | Site Name | Domain | Slug |
|-------|-----------|--------|------|
| 🧠 Brain / Sleep | NeuroRestLab | **NeuroRestLab.com** | neuro-sleep |
| ✨ Spirituality | InnerAlignmentLab | **InnerAlignmentLab.com** | manifest-signal |
| 🤖 AI Hustle | DigitalOperatorAI | **DigitalOperatorAI.com** | ai-hustle |
| 💪 Weight Loss | HealthyResetLab | **healthyresetlab.com** | metabolic-reset |
| 💕 Dating | ConnectionDecoded | **connectiondecoded.com** | love-psychology |

---

## 📋 3-Step Setup Process

### Step 1️⃣: Set Up CI/CD (One-time, 5 minutes)

**In VS Code:**
```
Ctrl+Shift+B → Select "✨ Setup CI/CD (PowerShell)" or "✨ Setup CI/CD (Windows)"
```

**What it does:**
1. Gets your Railway API token
2. Adds it to GitHub Secrets
3. Tests automatic deployment
4. You're done! ✅

---

### Step 2️⃣: Add Domains to Railway (One-time, 2 minutes)

**In VS Code:**
```
Ctrl+Shift+B → Select "🌐 Add Domains to Railway (PowerShell)" or "🌐 Add Domains to Railway (Windows)"
```

**What it does:**
1. Adds all 5 domains to Railway
2. Shows you what DNS records to add
3. Provides testing commands

---

### Step 3️⃣: Configure DNS at Your Registrar (One-time, varies)

**Go to your domain registrar** (GoDaddy, Namecheap, etc.):

For **each of your 5 domains**, add this DNS record:

```
Type:  CNAME
Name:  @
Value: cname.railway.app
TTL:   3600
```

**Then wait 24-48 hours** for DNS to propagate worldwide.

---

## ✅ Verification (After DNS Propagation)

### Test Each Domain

```bash
# All should return HTTP 307 or 200
curl -I https://NeuroRestLab.com
curl -I https://InnerAlignmentLab.com
curl -I https://DigitalOperatorAI.com
curl -I https://healthyresetlab.com
curl -I https://connectiondecoded.com
```

Or just **visit them in your browser** 🌐

---

## 📱 Daily Workflow (After Setup)

### Edit & Deploy Your Content

```
1. Edit files locally in VS Code
2. Press Ctrl+Shift+B
3. Select "🚀 Full Deploy: Commit → Push → Railway"
4. Wait 2-3 minutes
5. Your content is live on all 5 domains! 🎉
```

### Track Updates in Real-Time

**Open these in your browser for monitoring:**

1. **GitHub Actions** (see deployment progress):  
   https://github.com/dungvuq1920-max/clickbank/actions

2. **Your 5 Live Domains**:
   - https://NeuroRestLab.com
   - https://InnerAlignmentLab.com
   - https://DigitalOperatorAI.com
   - https://healthyresetlab.com
   - https://connectiondecoded.com

3. **Admin Panel** (manage all sites):  
   https://[any-domain]/admin/dashboard

---

## 📊 Update Tracking Methods

### Real-Time Tracking in VS Code

After deployment, open these in VS Code terminals:

```bash
# Watch deployment logs live
Ctrl+Shift+B → "🔍 Check Railway Logs"

# Or manually:
npx @railway/cli logs --service clickbank --lines 50
```

### Real-Time Tracking on GitHub

1. Go to: https://github.com/dungvuq1920-max/clickbank/actions
2. Click your latest push
3. Watch status: ⏳ → ✅ → 🚀
4. Each step shows in real-time

### Real-Time Tracking on Railway

1. Go to: https://railway.app/project/a9895cce-1c0f-4055-9e39-1f381cf37051
2. Click "clickbank" service
3. See build progress and logs

---

## 🔄 Example Content Update Flow

### Scenario: Update NeuroRestLab Blog Post

```
1. Edit: app/sites/[siteSlug]/blog/page.tsx
   OR: data/local-db.json (add/edit post)

2. Test locally:
   npm run dev → http://localhost:3011

3. Deploy:
   Ctrl+Shift+B → 🚀 Full Deploy

4. Track progress:
   GitHub Actions: https://github.com/dungvuq1920-max/clickbank/actions

5. Verify live:
   https://NeuroRestLab.com/sites/neuro-sleep/blog
   
6. Check other sites (same update everywhere):
   https://InnerAlignmentLab.com
   https://DigitalOperatorAI.com
   ... (all have same new blog post)
```

---

## 📚 Documentation

Full guides are available:

| Guide | Purpose |
|-------|---------|
| [QUICK_START.md](QUICK_START.md) | 5-minute quick reference |
| [DOMAIN_MAPPING.md](DOMAIN_MAPPING.md) | Detailed domain setup |
| [TRACK_UPDATES.md](TRACK_UPDATES.md) | Content update tracking |
| [RAILWAY_SETUP.md](RAILWAY_SETUP.md) | Railway configuration |
| [.vscode/DEPLOYMENT_GUIDE.md](.vscode/DEPLOYMENT_GUIDE.md) | VS Code tasks |

---

## 🎮 Available VS Code Tasks

Press `Ctrl+Shift+B` to see all:

**Setup Tasks:**
- ✨ Setup CI/CD (PowerShell)
- ✨ Setup CI/CD (Windows)
- 🌐 Add Domains to Railway (PowerShell)
- 🌐 Add Domains to Railway (Windows)

**Deployment Tasks:**
- 🚀 Full Deploy: Commit → Push → Railway ⭐ **Use this daily**
- 1️⃣ Dev - Run All Sites (local testing)
- 2️⃣ Commit & Push (stage changes)
- 3️⃣ Deploy to Railway (push to GitHub)
- 🔍 Check Railway Logs (monitor deployment)

---

## 🔗 Important Links

| Resource | Link |
|----------|------|
| **Live App** | https://clickbank-production.up.railway.app |
| **Admin Panel** | https://clickbank-production.up.railway.app/admin |
| **GitHub Repo** | https://github.com/dungvuq1920-max/clickbank |
| **GitHub Actions** | https://github.com/dungvuq1920-max/clickbank/actions |
| **Railway Project** | https://railway.app/project/a9895cce-1c0f-4055-9e39-1f381cf37051 |
| **GitHub Secrets** | https://github.com/dungvuq1920-max/clickbank/settings/secrets/actions |
| **Railway Tokens** | https://railway.app/account/tokens |

---

## ⚡ Quick Commands

```bash
# Local development
npm run dev                    # Run all sites locally

# Deploy
git add .
git commit -m "Update message"
git push origin master         # Auto-deploys to Railway!

# Monitor
npx @railway/cli logs --service clickbank
npx @railway/cli status

# Test domains
curl -I https://NeuroRestLab.com
```

---

## ❓ FAQ

**Q: How long does an update take to go live?**  
A: 2-3 minutes from push to live on all 5 domains.

**Q: Can I edit while deployment is running?**  
A: Yes! Just don't push until the first deployment finishes.

**Q: What if DNS doesn't work?**  
A: Use the temporary Railway URL while waiting: `https://clickbank-production.up.railway.app/sites/[slug]`

**Q: Can I test locally before pushing?**  
A: Yes! Run `npm run dev` and test on `http://localhost:3010-3015`

**Q: Do all 5 domains need to be different?**  
A: For now, all use Railway's single app. You can later set up subdomains or separate apps per site.

---

## 🎉 You're All Set!

Everything is ready. Just:

1. **First time:** Run the setup tasks (Steps 1-3 above)
2. **Every update:** Edit → `Ctrl+Shift+B` → Deploy
3. **Monitor:** Watch GitHub Actions for progress
4. **Verify:** Visit your live domains

Your content is now instantly published across all 5 affiliate sites with automatic tracking! 🚀

---

## 🆘 Stuck?

1. Check [DOMAIN_MAPPING.md](DOMAIN_MAPPING.md) for detailed setup
2. Check [TRACK_UPDATES.md](TRACK_UPDATES.md) for monitoring help
3. View deployment logs: `Ctrl+Shift+B` → 🔍 Check Logs
4. Check GitHub Actions for errors: https://github.com/dungvuq1920-max/clickbank/actions

**Everything is documented and automated. You've got this!** 💪
