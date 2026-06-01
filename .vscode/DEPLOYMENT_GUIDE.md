# VS Code Deployment Tasks

Quick deployment from VS Code without touching the terminal. Just press `Ctrl+Shift+B` to see all deployment tasks.

## 🎯 Quick Start

### First Time Setup (One-time)

Run this task once to set up GitHub Actions with Railway:

1. Open Command Palette: `Ctrl+Shift+P`
2. Type: `Tasks: Run Task`
3. Select: **✨ Setup CI/CD (PowerShell)** or **✨ Setup CI/CD (Windows)**
4. Follow the prompts to add Railway token to GitHub

### Daily Workflow

After setup, your deployment workflow is:

1. **Edit files locally** in VS Code
2. **Test locally** (optional): `Ctrl+Shift+B` → **1️⃣ Dev - Run All Sites**
3. **Deploy to live**: 
   - `Ctrl+Shift+B` → **🚀 Full Deploy: Commit → Push → Railway**
   - OR do it in steps:
     - `Ctrl+Shift+B` → **2️⃣ Commit & Push to GitHub**
     - `Ctrl+Shift+B` → **3️⃣ Deploy to Railway (GitHub Actions)**

## 📋 Available Tasks

### 1️⃣ Dev - Run All Sites
- **What**: Runs all 5 sites locally on different ports
- **Ports**:
  - Admin: http://localhost:3010/admin
  - NeuroRestLab: http://localhost:3011
  - InnerAlignmentLab: http://localhost:3012
  - DigitalOperatorAI: http://localhost:3013
  - HealthyResetLab: http://localhost:3014
  - ConnectionDecoded: http://localhost:3015
- **How to run**: `Ctrl+Shift+B` → Select this task

### 2️⃣ Commit & Push to GitHub
- **What**: Commits all changes with message "Update content from VS Code"
- **How to run**: `Ctrl+Shift+B` → Select this task
- **Note**: Just commits, doesn't push yet

### 3️⃣ Deploy to Railway (GitHub Actions)
- **What**: Pushes to GitHub, automatically triggers Railway deployment
- **How to run**: `Ctrl+Shift+B` → Select this task
- **Wait time**: 2-3 minutes for deployment to complete

### 🚀 Full Deploy: Commit → Push → Railway
- **What**: One-command deployment - commits and pushes in one go
- **How to run**: `Ctrl+Shift+B` → Select this task
- **Recommended**: Use this for quick deployments

### 🔍 Check Railway Logs
- **What**: Shows last 50 lines of Railway logs
- **How to run**: `Ctrl+Shift+B` → Select this task
- **Use case**: Troubleshooting deployment issues

### ✨ Setup CI/CD (Windows / PowerShell)
- **What**: First-time setup to enable automatic deployments
- **How to run**: `Ctrl+Shift+B` → Select this task
- **Need Railway token**: Get it at https://railway.app/account/tokens

## ⌨️ Keyboard Shortcuts

```
Ctrl+Shift+B    →    Show task menu
Ctrl+Shift+D    →    Toggle debug panel
Ctrl+J          →    Toggle terminal panel
```

## 🌐 Links

- **Live app**: https://clickbank-production.up.railway.app
- **Admin panel**: https://clickbank-production.up.railway.app/admin
- **GitHub repo**: https://github.com/dungvuq1920-max/clickbank
- **Railway project**: https://railway.app/project/a9895cce-1c0f-4055-9e39-1f381cf37051
- **GitHub Actions**: https://github.com/dungvuq1920-max/clickbank/actions
- **Railway tokens**: https://railway.app/account/tokens

## 🔧 How It Works

1. **Local edit** → Edit files in VS Code
2. **Commit** → Use task to commit changes
3. **Push** → Use task to push to GitHub
4. **Auto-deploy** → GitHub Actions automatically deploys to Railway
5. **Live** → Your changes appear on https://clickbank-production.up.railway.app

## ⚠️ Important Notes

- **Railway token**: Only needed once during initial setup
- **Auto-deploy**: Only works if `RAILWAY_TOKEN` is added to GitHub Secrets
- **Wait for deployment**: Check GitHub Actions page to see deployment progress
- **Rollback**: Just revert the commit and push again

## 🆘 Troubleshooting

### Task doesn't appear in menu
- Reload VS Code: `Ctrl+Shift+P` → "Reload Window"
- Check `.vscode/tasks.json` exists in project root

### Deploy fails with "502 Bad Gateway"
- Check Railway logs: `Ctrl+Shift+B` → **🔍 Check Railway Logs**
- View full logs at: https://railway.app/project/a9895cce-1c0f-4055-9e39-1f381cf37051

### GitHub Actions not running
- Verify `RAILWAY_TOKEN` was added: https://github.com/dungvuq1920-max/clickbank/settings/secrets/actions
- Check Actions tab: https://github.com/dungvuq1920-max/clickbank/actions

### Can't connect to Railway
- Install Railway CLI: `npm install -g @railway/cli`
- Login: `railway login`
- Test: `railway status`
