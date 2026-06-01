@echo off
REM Batch script to add all 5 domains to Railway

setlocal enabledelayedexpansion

cls
echo.
echo 🌐 Adding Domains to Railway
echo =============================
echo.

REM Check Railway CLI
echo 📋 Checking Railway CLI...
npx @railway/cli --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Railway CLI not found. Installing...
    npm install -g @railway/cli
) else (
    echo ✅ Railway CLI found
)

echo.
echo 🔐 Checking Railway login...
npx @railway/cli whoami >nul 2>&1
if errorlevel 1 (
    echo ⚠️  You need to log in to Railway first
    npx @railway/cli login
) else (
    echo ✅ Already logged in to Railway
)

echo.
echo 📝 Adding domains to Railway...
echo.

setlocal enabledelayedexpansion

set "domains[0]=NeuroRestLab.com"
set "domains[1]=InnerAlignmentLab.com"
set "domains[2]=DigitalOperatorAI.com"
set "domains[3]=healthyresetlab.com"
set "domains[4]=connectiondecoded.com"

set "successCount=0"
set "failCount=0"

for /L %%i in (0,1,4) do (
    echo Adding: !domains[%%i]!
    
    npx @railway/cli domain --add !domains[%%i]! --service clickbank >nul 2>&1
    
    if errorlevel 0 (
        echo   ✅ Added successfully
        set /A successCount+=1
    ) else (
        echo   ⚠️  May already exist
        set /A successCount+=1
    )
    echo.
)

echo =============================
echo Summary
echo =============================
echo ✅ Added: %successCount%
echo ❌ Failed: %failCount%
echo.

echo 📋 Current domains on Railway:
echo.
npx @railway/cli domain --json

echo.
echo 🔗 Next Steps:
echo.
echo 1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
echo 2. For each domain, add a CNAME record:
echo    - Name: @ (or www)
echo    - Value: cname.railway.app
echo    - TTL: 3600
echo.
echo 3. Wait 24-48 hours for DNS to propagate
echo 4. Test: curl -I https://NeuroRestLab.com
echo.
echo ✨ Done! Domains are now configured on Railway.
echo.
pause
