@echo off
REM Batch script to set environment variables for 5 sites

cls
echo.
echo 🔧 Setting Environment Variables for 5 Sites
echo ============================================
echo.

echo 📋 Setting SITE_SLUG for each service...
echo.

echo Setting: neuro-sleep-site
npx @railway/cli variable set SITE_SLUG=neuro-sleep --service neuro-sleep-site >nul 2>&1
echo ✅ SITE_SLUG=neuro-sleep

echo Setting: manifest-signal-site
npx @railway/cli variable set SITE_SLUG=manifest-signal --service manifest-signal-site >nul 2>&1
echo ✅ SITE_SLUG=manifest-signal

echo Setting: ai-hustle-site
npx @railway/cli variable set SITE_SLUG=ai-hustle --service ai-hustle-site >nul 2>&1
echo ✅ SITE_SLUG=ai-hustle

echo Setting: metabolic-reset-site
npx @railway/cli variable set SITE_SLUG=metabolic-reset --service metabolic-reset-site >nul 2>&1
echo ✅ SITE_SLUG=metabolic-reset

echo Setting: love-psychology-site
npx @railway/cli variable set SITE_SLUG=love-psychology --service love-psychology-site >nul 2>&1
echo ✅ SITE_SLUG=love-psychology

echo.
echo ============================================
echo 📝 Next Steps:
echo.
echo 1. Deploy all services:
echo    Run: deploy-5-sites.bat
echo.
echo 2. Or deploy manually:
echo    railway up --service neuro-sleep-site
echo    railway up --service manifest-signal-site
echo    railway up --service ai-hustle-site
echo    railway up --service metabolic-reset-site
echo    railway up --service love-psychology-site
echo.
echo ✨ Waiting for deployment...
echo.
pause
