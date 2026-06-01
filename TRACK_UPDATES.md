# 📊 Track Content Updates Across 5 Domains

Guide to monitor and track when your content updates go live on all 5 affiliate sites.

---

## 🔄 How Updates Work

```
You edit locally → Commit → Push to GitHub → GitHub Actions → Railway deploys → Live on all 5 domains
```

**Update time:** 2-3 minutes from push to live

---

## 📱 Real-Time Tracking Methods

### Method 1: GitHub Actions Dashboard (Recommended)

Monitor deployments in real-time:

1. **Open**: https://github.com/dungvuq1920-max/clickbank/actions
2. **Watch** the latest workflow run
3. **See status**: ⏳ Running → ✅ Success → 🚀 Deployed

**What to look for:**
- Yellow dot = In progress
- Green check = Deployment succeeded
- Red X = Deployment failed

### Method 2: Railway Logs

View live deployment logs:

1. **In VS Code**: `Ctrl+Shift+B` → **🔍 Check Railway Logs**
2. **Or command line**: 
   ```bash
   npx @railway/cli logs --service clickbank --lines 100
   ```
3. **Watch for**: "Build complete" → "Starting app" → "Listening on port"

### Method 3: Check Each Domain Directly

```bash
# Terminal commands to verify each site
curl -I https://NeuroRestLab.com
curl -I https://InnerAlignmentLab.com
curl -I https://DigitalOperatorAI.com
curl -I https://healthyresetlab.com
curl -I https://connectiondecoded.com
```

Expected response: `HTTP/2 307` (redirect to `/admin/dashboard`)

---

## 📋 Content Update Checklist

### Before Pushing (Preparation)

- [ ] Edit content locally
- [ ] Test locally: `npm run dev`
- [ ] Verify on `http://localhost:3010` (admin)
- [ ] Verify on `http://localhost:3011` (neuro-sleep site)
- [ ] Check styling and layout
- [ ] Verify links work
- [ ] Test on mobile (resize browser)

### During Push (Deployment)

- [ ] Run task: **🚀 Full Deploy: Commit → Push → Railway**
- [ ] Or manually: `git add . && git commit -m "message" && git push`
- [ ] Open GitHub Actions dashboard
- [ ] Watch deployment progress

### After Push (Verification)

- [ ] Wait for GitHub Actions to show ✅ (2-3 minutes)
- [ ] Check Railway logs for "Listening on port"
- [ ] Test each domain:
  - `https://NeuroRestLab.com` - verify update
  - `https://InnerAlignmentLab.com` - verify update
  - `https://DigitalOperatorAI.com` - verify update
  - `https://healthyresetlab.com` - verify update
  - `https://connectiondecoded.com` - verify update
- [ ] Clear browser cache (Ctrl+Shift+Delete) if needed

---

## 🎯 Update Scenarios

### Scenario 1: Update a Blog Post

**Files to edit:**
```
data/local-db.json  (post content)
OR
app/sites/[siteSlug]/blog/page.tsx  (layout/styling)
```

**Deploy:**
```
Ctrl+Shift+B → 🚀 Full Deploy
```

**Verify:**
```
Visit https://[domain]/sites/[slug]/blog
Check post content appears
```

### Scenario 2: Update Admin Dashboard

**Files to edit:**
```
app/admin/dashboard/page.tsx
app/admin/dashboard/quick-generate.tsx
```

**Deploy:**
```
Ctrl+Shift+B → 🚀 Full Deploy
```

**Verify:**
```
Visit https://[domain]/admin/dashboard
Login and verify changes
```

### Scenario 3: Update Site Settings (Colors, Text)

**Files to edit:**
```
lib/sites.ts  (site config)
components/site-shell.tsx  (layout)
app/globals.css  (styling)
```

**Deploy:**
```
Ctrl+Shift+B → 🚀 Full Deploy
```

**Verify:**
```
Visit each domain root: https://[domain]/
Check colors, logo, navigation
```

### Scenario 4: Add New Product/Article

**Files to edit:**
```
data/local-db.json  (add data)
OR use admin panel: https://[domain]/admin
```

**Deploy:**
```
Ctrl+Shift+B → 🚀 Full Deploy
```

**Verify:**
```
Visit https://[domain]/sites/[slug]
Search for new product/article
```

---

## 📊 Monitor Dashboard

Create bookmarks for quick access:

```
GitHub Actions:        https://github.com/dungvuq1920-max/clickbank/actions
Railway Project:       https://railway.app/project/a9895cce-1c0f-4055-9e39-1f381cf37051
NeuroRestLab:          https://NeuroRestLab.com
InnerAlignmentLab:     https://InnerAlignmentLab.com
DigitalOperatorAI:     https://DigitalOperatorAI.com
HealthyResetLab:       https://healthyresetlab.com
ConnectionDecoded:     https://connectiondecoded.com
Admin Panel:           https://[domain]/admin
```

---

## 🔍 Tracking Logs

### View Git Commits

All your updates are tracked in git:

```bash
git log --oneline -10
```

Output:
```
90e3417b docs: Add domain mapping
5b21815f docs: Add quick start guide
dc4aa6bc feat: Add CI/CD workflow
...
```

### View GitHub Commits

All commits are visible:
```
https://github.com/dungvuq1920-max/clickbank/commits/master
```

### View GitHub Actions Runs

See deployment history:
```
https://github.com/dungvuq1920-max/clickbank/actions
```

Click any run to see:
- Build logs
- Test results
- Deployment status
- Duration

---

## 📈 Analytics & Performance

### Check Site Status

```bash
# Check if site is up
curl https://NeuroRestLab.com -w "HTTP %{http_code}\n"

# Get response time
curl -w "Time: %{time_total}s\n" https://NeuroRestLab.com

# Check SSL certificate
openssl s_client -connect NeuroRestLab.com:443 -servername NeuroRestLab.com
```

### Monitor Performance

Once Railway domains are live, use:
- **Google PageSpeed**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **Pingdom**: https://tools.pingdom.com/

---

## ⚠️ Troubleshooting Updates

### Update doesn't appear on domain

**Possible causes:**
1. Deployment still running (wait 3-5 minutes)
2. Browser cache (Ctrl+Shift+Delete to clear)
3. Deployment failed (check GitHub Actions)

**Solution:**
```bash
# Clear cache
Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)

# Or use incognito
Ctrl+Shift+N

# Check status
npx @railway/cli logs --service clickbank --lines 50
```

### GitHub Actions shows red X (failure)

**Check the error:**
1. Go to: https://github.com/dungvuq1920-max/clickbank/actions
2. Click the failed workflow
3. Click the failed job
4. Scroll to see error message

**Common issues:**
- Railway token expired → Re-run workflow
- Large file committed → Remove file and retry
- Build error → Fix code and commit again

### One domain works but others don't

**Possible causes:**
1. DNS still propagating (wait 24-48 hours)
2. Railway domain routing issue
3. App crashed on restart

**Solution:**
```bash
# Check app is running
npx @railway/cli status

# Restart app
npx @railway/cli restart

# Check logs
npx @railway/cli logs --service clickbank
```

---

## 🚀 Automated Tracking (Optional)

### Email Notifications

GitHub can email you when deployments complete:
1. GitHub Settings → Notifications
2. Enable "Actions" notifications
3. Select "All Activity" for real-time updates

### Slack Integration (Advanced)

Connect Railway to Slack for instant notifications:
1. Railway Settings → Integrations
2. Connect Slack workspace
3. Get updates when deployments finish

---

## 📅 Deployment History Example

```
Time   | Status  | Commit                              | Sites Updated
-------|---------|-------------------------------------|------------------
14:30  | ✅      | Update blog post NeuroRestLab      | All 5 domains live
14:27  | 🔄      | Deploy from VS Code                | In progress...
14:26  | ⏹️      | Previous deployment done           | Verified
13:15  | ✅      | Add new product                    | All 5 domains live
13:10  | 🔄      | Deploy from VS Code                | In progress...
```

---

## 📝 Best Practices

1. **Edit locally first**
   - Always test with `npm run dev` before pushing
   - Verify on all local site URLs (3010-3015)

2. **Meaningful commit messages**
   ```bash
   git commit -m "Update NeuroRestLab blog post on sleep quality"
   # NOT: git commit -m "update"
   ```

3. **Monitor deployment**
   - Keep GitHub Actions tab open during deployment
   - Check each domain after "✅ Success"

4. **Test each domain**
   - Visit all 5 domains, not just one
   - Test on mobile and desktop
   - Clear cache if needed

5. **Keep logs for reference**
   - GitHub Actions keeps 90 days of history
   - Export important deployment logs
   - Document major updates

---

## 🎉 You're Ready!

Your 5-domain system is set up for real-time tracking. Every commit automatically:
- Builds the app
- Deploys to Railway
- Updates all 5 domains
- Can be monitored in real-time

**Happy content updating!** 🚀
