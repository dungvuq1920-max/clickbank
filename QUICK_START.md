# 🚀 CLICKBANK Quick Start - Full Automation Complete!

## ✅ What's Ready

Your CLICKBANK multi-site affiliate system is now **fully automated** with:

- ✅ 5 affiliate sites deployed and live
- ✅ GitHub repository created and synced
- ✅ Railway CI/CD pipeline configured
- ✅ VS Code deployment tasks ready
- ✅ Automatic deployment on GitHub push

## 🎯 Your Workflow (From Now On)

### Option 1: Just edit and deploy in VS Code (Recommended)

```
1. Edit files locally in VS Code
2. Press Ctrl+Shift+B
3. Select: 🚀 Full Deploy: Commit → Push → Railway
4. Wait 2-3 minutes
5. Your changes are live!
```

### Option 2: One command in terminal

```bash
git add .
git commit -m "Your message"
git push origin master
```

Then GitHub Actions automatically deploys to Railway.

---

## 🔧 First-Time Setup (5 minutes)

### Step 1: Get Railway API Token

1. Open: https://railway.app/account/tokens
2. Click: **Create New Token**
3. Name it: `GitHub CI/CD`
4. Copy the token (save it temporarily)

### Step 2: Run Setup Script

In VS Code, press `Ctrl+Shift+B` and select one:

- **✨ Setup CI/CD (Windows)** - for cmd.exe
- **✨ Setup CI/CD (PowerShell)** - for PowerShell

The script will:
1. Ask for your Railway token
2. Open GitHub Secrets page
3. Help you add the token to GitHub
4. Test the deployment
5. Show you the live URL

### Step 3: Verify Deployment

After setup completes:
- Check: https://github.com/dungvuq1920-max/clickbank/actions
- See your first automatic deployment running
- Once green ✅, visit: https://clickbank-production.up.railway.app

---

## 🌐 Domain Mapping (Step 2)

After setup completes, add your domains to Railway:

```
Ctrl+Shift+B → Select "🌐 Add Domains to Railway (PowerShell)" or (Windows)
```

This will:
1. Add all 5 domains to Railway
2. Show you DNS configuration steps
3. Provide testing commands

See [DOMAIN_MAPPING.md](DOMAIN_MAPPING.md) for full details.

---

## 📱 Daily Workflow (From Now On)

### Example 1: Edit a blog post

```
1. Edit: app/sites/[siteSlug]/blog/page.tsx
2. Ctrl+Shift+B → 🚀 Full Deploy
3. Done! Changes live in 2-3 minutes
```

### Example 2: Update admin dashboard

```
1. Edit: app/admin/dashboard/page.tsx
2. Ctrl+Shift+B → 🚀 Full Deploy
3. Visit: https://clickbank-production.up.railway.app/admin
```

### Example 3: Add new product

```
1. Edit: data/local-db.json (or use admin panel)
2. Ctrl+Shift+B → 🚀 Full Deploy
3. Product appears on all sites
```

---

## 🌐 Live URLs (Ready Now!)

### Production (Live)
- **Main**: https://clickbank-production.up.railway.app
- **Admin**: https://clickbank-production.up.railway.app/admin/dashboard
- **NeuroRestLab**: https://clickbank-production.up.railway.app/sites/neuro-sleep
- **InnerAlignmentLab**: https://clickbank-production.up.railway.app/sites/manifest-signal
- **DigitalOperatorAI**: https://clickbank-production.up.railway.app/sites/ai-hustle
- **HealthyResetLab**: https://clickbank-production.up.railway.app/sites/metabolic-reset
- **ConnectionDecoded**: https://clickbank-production.up.railway.app/sites/love-psychology

### Development (Local)
```bash
npm run dev
```
Then open:
- Admin: http://localhost:3010/admin
- NeuroRestLab: http://localhost:3011
- InnerAlignmentLab: http://localhost:3012
- DigitalOperatorAI: http://localhost:3013
- HealthyResetLab: http://localhost:3014
- ConnectionDecoded: http://localhost:3015

---

## 💰 Domain Names (For Future Purchase)

Once you're ready to buy domains, here are the 5 sites:

| Niche | Site | Domain | Slug |
|-------|------|--------|------|
| Brain / Focus / Sleep | NeuroRestLab | NeuroRestLab.com | neuro-sleep |
| Spirituality / Manifestation | InnerAlignmentLab | InnerAlignmentLab.com | manifest-signal |
| AI MMO / Side Hustle | DigitalOperatorAI | DigitalOperatorAI.com | ai-hustle |
| Weight Loss / Metabolism | HealthyResetLab | healthyresetlab.com | metabolic-reset |
| Dating / Relationship | ConnectionDecoded | connectiondecoded.com | love-psychology |

See [DOMAINS.md](DOMAINS.md) for full details.

---

## 📦 Available VS Code Tasks

Press `Ctrl+Shift+B` to see all:

1. **1️⃣ Dev** - Run all sites locally
2. **2️⃣ Commit & Push** - Stage and commit changes
3. **3️⃣ Deploy to Railway** - Push to GitHub (auto-deploys)
4. **🚀 Full Deploy** - Commit + Push in one go (RECOMMENDED)
5. **🔍 Check Logs** - View Railway deployment logs
6. **✨ Setup CI/CD** - First-time setup script

See [.vscode/DEPLOYMENT_GUIDE.md](.vscode/DEPLOYMENT_GUIDE.md) for full details.

---

## 🔗 Important Links

| Link | Purpose |
|------|---------|
| https://github.com/dungvuq1920-max/clickbank | GitHub repository |
| https://github.com/dungvuq1920-max/clickbank/actions | View deployments |
| https://github.com/dungvuq1920-max/clickbank/settings/secrets/actions | GitHub Secrets |
| https://railway.app/project/a9895cce-1c0f-4055-9e39-1f381cf37051 | Railway project |
| https://railway.app/account/tokens | Railway API tokens |
| https://clickbank-production.up.railway.app | Live app |

---

## ❓ FAQ

### Q: How long does deployment take?
**A:** Usually 1-2 minutes. Max 3 minutes. Check the progress at: https://github.com/dungvuq1920-max/clickbank/actions

### Q: Can I edit locally while Railway is deploying?
**A:** Yes! Your local edits won't interfere. Just don't push again until the previous deployment finishes.

### Q: What if deployment fails?
**A:** Check the logs:
1. GitHub Actions: https://github.com/dungvuq1920-max/clickbank/actions
2. Railway logs: `Ctrl+Shift+B` → **🔍 Check Logs**

### Q: How do I use my own domain?
**A:** See [RAILWAY_SETUP.md](RAILWAY_SETUP.md) - Section "Configure Custom Domains"

### Q: Can I run multiple sites locally?
**A:** Yes! Use `npm run dev` which starts all 6 services on different ports.

### Q: Do I need to set up anything else?
**A:** Just the Railway token for GitHub Actions. That's it!

---

## ⚡ Quick Commands Reference

```bash
# Local development
npm run dev                    # Run all sites locally

# Git workflow
git add .                      # Stage all changes
git commit -m "message"        # Commit changes
git push origin master         # Push to GitHub (auto-deploys)

# Railway
railway logs                   # View deployment logs
railway status                 # Check status
railway variable list          # View environment variables
```

---

## 🎓 Next Steps

1. ✅ **Complete setup**: Run the CI/CD setup script
2. ✅ **Add domains to Railway**: Run **🌐 Add Domains to Railway** task (Step 2 below)
3. ✅ **Test a deployment**: Edit a file → Deploy → See it live
4. ⏳ **Purchase domains**: When ready, buy the 5 domains above
5. ⏳ **Configure DNS records** at your registrar: Follow [DOMAIN_MAPPING.md](DOMAIN_MAPPING.md)
6. ⏳ **Track updates**: Use methods in [TRACK_UPDATES.md](TRACK_UPDATES.md)

---

## 🆘 Need Help?

See the detailed guides:
- [QUICK_START.md](QUICK_START.md) - This file (quick reference)
- [RAILWAY_SETUP.md](RAILWAY_SETUP.md) - Railway configuration details
- [DOMAIN_MAPPING.md](DOMAIN_MAPPING.md) - Map domains to Railway
- [TRACK_UPDATES.md](TRACK_UPDATES.md) - Monitor content updates
- [.vscode/DEPLOYMENT_GUIDE.md](.vscode/DEPLOYMENT_GUIDE.md) - VS Code tasks reference
- [README.md](README.md) - Full project documentation

---

## 🎉 You're All Set!

Your entire deployment pipeline is ready. You can now:

```
Edit locally → Deploy with one VS Code command → See changes live in 2-3 minutes
```

No manual deployment steps. No complex workflows. Just edit and ship! 🚀

**When you're ready, run the setup script (one time only):**

```
Ctrl+Shift+B → Select "✨ Setup CI/CD (PowerShell)" or "✨ Setup CI/CD (Windows)"
```

Then you're 100% automated! 🎊
