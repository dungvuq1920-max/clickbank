@echo off
REM Batch script to deploy all 5 sites

cls
echo.
echo 🚀 Deploying 5 Sites to Railway
echo ================================
echo.

echo 📋 Starting deployments...
echo.

echo Deploying: neuro-sleep-site
npx @railway/cli up --service neuro-sleep-site --detach >nul 2>&1
echo ✅ Deployment started

echo Deploying: manifest-signal-site
npx @railway/cli up --service manifest-signal-site --detach >nul 2>&1
echo ✅ Deployment started

echo Deploying: ai-hustle-site
npx @railway/cli up --service ai-hustle-site --detach >nul 2>&1
echo ✅ Deployment started

echo Deploying: metabolic-reset-site
npx @railway/cli up --service metabolic-reset-site --detach >nul 2>&1
echo ✅ Deployment started

echo Deploying: love-psychology-site
npx @railway/cli up --service love-psychology-site --detach >nul 2>&1
echo ✅ Deployment started

echo.
echo ================================
echo ⏳ Waiting for builds to complete (2-3 minutes)...
echo.
echo 📊 Your Temporary Domains:
echo   🌐 NeuroRestLab: https://neuro-sleep-production.up.railway.app
echo   🌐 InnerAlignmentLab: https://manifest-signal-production.up.railway.app
echo   🌐 DigitalOperatorAI: https://ai-hustle-production.up.railway.app
echo   🌐 HealthyResetLab: https://metabolic-reset-production.up.railway.app
echo   🌐 ConnectionDecoded: https://love-psychology-production.up.railway.app
echo.
echo 📝 Monitor deployments:
echo   GitHub Actions: https://github.com/dungvuq1920-max/clickbank/actions
echo   Railway: https://railway.app/project/a9895cce-1c0f-4055-9e39-1f381cf37051
echo.
echo ✨ Check your domains in 2-3 minutes!
echo.
pause
