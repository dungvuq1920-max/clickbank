@echo off
REM Batch script to create 5 temporary Railway sites

cls
echo.
echo 🚀 Creating 5 Temporary Railway Sites
echo =====================================
echo.

REM Check Railway CLI
echo 📋 Checking Railway CLI...
npx @railway/cli --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Railway CLI not found. Install with: npm install -g @railway/cli
    exit /b 1
)
echo ✅ Railway CLI found
echo.

REM Check login
echo 🔐 Checking Railway login...
npx @railway/cli whoami >nul 2>&1
if errorlevel 1 (
    echo ❌ Not logged in to Railway. Run: railway login
    exit /b 1
)
echo ✅ Logged in to Railway
echo.

echo 🛠️  Creating services...
echo.

REM Create services
echo Creating: NeuroRestLab (neuro-sleep-site)
npx @railway/cli service new neuro-sleep-site >nul 2>&1
echo ✅ neuro-sleep-site

echo Creating: InnerAlignmentLab (manifest-signal-site)
npx @railway/cli service new manifest-signal-site >nul 2>&1
echo ✅ manifest-signal-site

echo Creating: DigitalOperatorAI (ai-hustle-site)
npx @railway/cli service new ai-hustle-site >nul 2>&1
echo ✅ ai-hustle-site

echo Creating: HealthyResetLab (metabolic-reset-site)
npx @railway/cli service new metabolic-reset-site >nul 2>&1
echo ✅ metabolic-reset-site

echo Creating: ConnectionDecoded (love-psychology-site)
npx @railway/cli service new love-psychology-site >nul 2>&1
echo ✅ love-psychology-site

echo.
echo =====================================
echo 📝 Next Steps:
echo.
echo 1. Set environment variables for each service:
echo    Run: set-site-vars.bat
echo.
echo 2. Or set manually in Railway Dashboard:
echo    For each service, add variable: SITE_SLUG=[slug]
echo.
echo 3. Deploy each service:
echo    Run: deploy-5-sites.bat
echo.
echo 4. Access your temporary domains:
echo    🌐 NeuroRestLab: https://neuro-sleep-production.up.railway.app
echo    🌐 InnerAlignmentLab: https://manifest-signal-production.up.railway.app
echo    🌐 DigitalOperatorAI: https://ai-hustle-production.up.railway.app
echo    🌐 HealthyResetLab: https://metabolic-reset-production.up.railway.app
echo    🌐 ConnectionDecoded: https://love-psychology-production.up.railway.app
echo.
echo ✨ Done! Continue with next steps.
echo.
pause
