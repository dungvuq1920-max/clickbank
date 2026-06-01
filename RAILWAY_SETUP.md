# Railway CI/CD Setup Guide

## 🔧 Step 1: Get Railway API Token

1. Go to [Railway Dashboard](https://railway.app)
2. Navigate to **Account Settings** → **API Tokens**
3. Click **Create New Token**
4. Copy the token (keep it secret!)

## 🔐 Step 2: Add Token to GitHub Secrets

1. Go to your GitHub repository: https://github.com/dungvuq1920-max/clickbank
2. Settings → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `RAILWAY_TOKEN`
5. Value: (paste the Railway API token)
6. Click **Add secret**

## ✅ Step 3: Verify GitHub Actions Workflow

1. Push a change to the repo:
   ```bash
   git add .
   git commit -m "Enable CI/CD workflow"
   git push origin master
   ```

2. Watch the deployment:
   - Go to: https://github.com/dungvuq1920-max/clickbank/actions
   - Click the latest workflow run
   - Monitor the logs in real-time

## 🌐 Step 4: Configure Custom Domains (Optional)

Once domains are purchased, add them in Railway:

1. Go to Railroad Project: https://railway.app/project/a9895cce-1c0f-4055-9e39-1f381cf37051
2. Select **clickbank** service
3. Go to **Domains** tab
4. Add custom domains:
   - `NeuroRestLab.com` → Route to `/sites/neuro-sleep`
   - `InnerAlignmentLab.com` → Route to `/sites/manifest-signal`
   - `DigitalOperatorAI.com` → Route to `/sites/ai-hustle`
   - `healthyresetlab.com` → Route to `/sites/metabolic-reset`
   - `connectiondecoded.com` → Route to `/sites/love-psychology`

Or use Railway's built-in domain: `clickbank-production.up.railway.app`

## 📝 Local Development

Run all sites locally with the concurrent command:

```bash
npm run dev
```

This starts:
- Admin: http://localhost:3010/admin
- NeuroRestLab: http://localhost:3011
- InnerAlignmentLab: http://localhost:3012
- DigitalOperatorAI: http://localhost:3013
- HealthyResetLab: http://localhost:3014
- ConnectionDecoded: http://localhost:3015

## 🚀 Deploy Manually (Without GitHub Actions)

If you want to deploy without waiting for GitHub Actions:

```bash
npx @railway/cli up --service clickbank --environment production
```

## 🔍 Check Deployment Status

```bash
# View logs
npx @railway/cli logs --service clickbank --lines 50

# Check status
npx @railway/cli status --json

# List all variables
npx @railway/cli variable list --service clickbank --json
```

## 🐛 Troubleshooting

### App returns 502 Bad Gateway
- Check logs: `npx @railway/cli logs --service clickbank`
- Verify PORT environment variable is set
- Ensure `package.json` start script uses `${PORT:-3010}`

### GitHub Actions fails to deploy
- Verify `RAILWAY_TOKEN` is set in GitHub Secrets
- Check token hasn't expired
- Ensure service name is correct: `clickbank`

### Domain not working
- Verify DNS records point to Railway's IP
- Wait 24-48 hours for DNS propagation
- Test with Railway's default URL first: `clickbank-production.up.railway.app`
