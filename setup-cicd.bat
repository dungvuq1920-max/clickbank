@echo off
REM Railway CI/CD Quick Setup Script for Windows
REM This script helps you set up automatic deployment from GitHub to Railway

echo.
echo 🚀 CLICKBANK Railway CI/CD Setup
echo ==================================
echo.

REM Step 1: Get Railway token
echo 📋 Step 1: Get Your Railway API Token
echo -----
echo Open this link in your browser:
echo 👉 https://railway.app/account/tokens
echo.
echo If you're not logged in, log in first, then:
echo 1. Click 'Create New Token'
echo 2. Name it: 'GitHub CI/CD'
echo 3. Copy the token
echo.

set /p RAILWAY_TOKEN="Paste your Railway API token here: "

if "%RAILWAY_TOKEN%"=="" (
  echo ❌ No token provided. Exiting.
  exit /b 1
)

echo ✅ Token received!
echo.

REM Step 2: Get GitHub repo
echo 📋 Step 2: Add Token to GitHub Secrets
echo -----

set GITHUB_REPO=https://github.com/dungvuq1920-max/clickbank
set GITHUB_SECRETS_URL=%GITHUB_REPO%/settings/secrets/actions

echo Opening GitHub Secrets page in browser...
echo 👉 %GITHUB_SECRETS_URL%
echo.
echo In GitHub, click 'New repository secret' and add:
echo   Name: RAILWAY_TOKEN
echo   Value: (paste the token you copied)
echo.

start "" "%GITHUB_SECRETS_URL%"

pause "Once you've added the secret to GitHub, press Enter to continue..."

echo.
echo ✅ GitHub Secrets configured!
echo.

REM Step 3: Test deployment
echo 📋 Step 3: Test Deployment
echo -----
echo Now we'll test the deployment by making a commit...
echo.

cd /d "%~dp0"
git add .
git commit -m "test: CI/CD workflow ready" --allow-empty
git push origin master

echo.
echo ✅ Push complete! GitHub Actions workflow is running...
echo.

REM Step 4: Monitor deployment
echo 📋 Step 4: Monitor Deployment
echo -----

set ACTIONS_URL=%GITHUB_REPO%/actions

echo Watch your deployment in real-time:
echo 👉 %ACTIONS_URL%
echo.

start "" "%ACTIONS_URL%"

echo The workflow should complete in 2-3 minutes.
echo.
echo Once deployed, your app is live at:
echo 🌐 https://clickbank-production.up.railway.app
echo.
echo Dashboard:
echo 👉 https://clickbank-production.up.railway.app/admin
echo.
echo ✨ Setup complete! Future commits will auto-deploy to Railway.
echo.
pause
