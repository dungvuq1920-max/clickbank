# Railway CI/CD Quick Setup Script for PowerShell
# This script helps you set up automatic deployment from GitHub to Railway

Write-Host ""
Write-Host "🚀 CLICKBANK Railway CI/CD Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Get Railway token
Write-Host "📋 Step 1: Get Your Railway API Token" -ForegroundColor Yellow
Write-Host "-----" -ForegroundColor Yellow
Write-Host "Open this link in your browser:" -ForegroundColor White
Write-Host "👉 https://railway.app/account/tokens" -ForegroundColor Green
Write-Host ""
Write-Host "If you're not logged in, log in first, then:" -ForegroundColor White
Write-Host "1. Click 'Create New Token'" -ForegroundColor White
Write-Host "2. Name it: 'GitHub CI/CD'" -ForegroundColor White
Write-Host "3. Copy the token" -ForegroundColor White
Write-Host ""

$RAILWAY_TOKEN = Read-Host "Paste your Railway API token here"

if ([string]::IsNullOrEmpty($RAILWAY_TOKEN)) {
    Write-Host "❌ No token provided. Exiting." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Token received!" -ForegroundColor Green
Write-Host ""

# Step 2: Get GitHub repo
Write-Host "📋 Step 2: Add Token to GitHub Secrets" -ForegroundColor Yellow
Write-Host "-----" -ForegroundColor Yellow

$GITHUB_REPO = "https://github.com/dungvuq1920-max/clickbank"
$GITHUB_SECRETS_URL = "$GITHUB_REPO/settings/secrets/actions"

Write-Host "Opening GitHub Secrets page in browser..." -ForegroundColor White
Write-Host "👉 $GITHUB_SECRETS_URL" -ForegroundColor Green
Write-Host ""
Write-Host "In GitHub, click 'New repository secret' and add:" -ForegroundColor White
Write-Host "  Name: RAILWAY_TOKEN" -ForegroundColor White
Write-Host "  Value: (paste the token you copied)" -ForegroundColor White
Write-Host ""

# Open URL in default browser
Start-Process $GITHUB_SECRETS_URL

Write-Host "Press Enter once you've added the secret to GitHub..."
Read-Host

Write-Host ""
Write-Host "✅ GitHub Secrets configured!" -ForegroundColor Green
Write-Host ""

# Step 3: Test deployment
Write-Host "📋 Step 3: Test Deployment" -ForegroundColor Yellow
Write-Host "-----" -ForegroundColor Yellow
Write-Host "Now we'll test the deployment by making a commit..." -ForegroundColor White
Write-Host ""

Push-Location $PSScriptRoot

git add .
git commit -m "test: CI/CD workflow ready" --allow-empty
git push origin master

Write-Host ""
Write-Host "✅ Push complete! GitHub Actions workflow is running..." -ForegroundColor Green
Write-Host ""

# Step 4: Monitor deployment
Write-Host "📋 Step 4: Monitor Deployment" -ForegroundColor Yellow
Write-Host "-----" -ForegroundColor Yellow

$ACTIONS_URL = "$GITHUB_REPO/actions"

Write-Host "Watch your deployment in real-time:" -ForegroundColor White
Write-Host "👉 $ACTIONS_URL" -ForegroundColor Green
Write-Host ""

Start-Process $ACTIONS_URL

Write-Host "The workflow should complete in 2-3 minutes." -ForegroundColor White
Write-Host ""
Write-Host "Once deployed, your app is live at:" -ForegroundColor White
Write-Host "🌐 https://clickbank-production.up.railway.app" -ForegroundColor Green
Write-Host ""
Write-Host "Dashboard:" -ForegroundColor White
Write-Host "👉 https://clickbank-production.up.railway.app/admin" -ForegroundColor Green
Write-Host ""
Write-Host "✨ Setup complete! Future commits will auto-deploy to Railway." -ForegroundColor Green
Write-Host ""

Pop-Location
