# PowerShell script to deploy all 5 sites

Write-Host ""
Write-Host "🚀 Deploying 5 Sites to Railway" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Define sites
$sites = @(
    "neuro-sleep-site",
    "manifest-signal-site",
    "ai-hustle-site",
    "metabolic-reset-site",
    "love-psychology-site"
)

# Check Railway CLI
npx @railway/cli --version >$null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Railway CLI not found" -ForegroundColor Red
    exit 1
}

Write-Host "📋 Starting deployments..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($service in $sites) {
    Write-Host "Deploying: $service" -ForegroundColor Cyan
    
    try {
        npx @railway/cli up --service $service --detach 2>&1 | Out-Null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ Deployment started" -ForegroundColor Green
            $successCount++
        }
        else {
            Write-Host "  ⚠️  Service may not exist yet" -ForegroundColor Yellow
            $failCount++
        }
    }
    catch {
        Write-Host "  ❌ Error: $_" -ForegroundColor Red
        $failCount++
    }
    
    Write-Host ""
}

Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ Deployments started: $successCount" -ForegroundColor Green
Write-Host "❌ Failed: $failCount" -ForegroundColor Red
Write-Host ""

Write-Host "⏳ Waiting for builds to complete (2-3 minutes)..." -ForegroundColor Yellow
Write-Host ""

Write-Host "📊 Your Temporary Domains:" -ForegroundColor Cyan
Write-Host "  🌐 NeuroRestLab: https://neuro-sleep-production.up.railway.app" -ForegroundColor Green
Write-Host "  🌐 InnerAlignmentLab: https://manifest-signal-production.up.railway.app" -ForegroundColor Green
Write-Host "  🌐 DigitalOperatorAI: https://ai-hustle-production.up.railway.app" -ForegroundColor Green
Write-Host "  🌐 HealthyResetLab: https://metabolic-reset-production.up.railway.app" -ForegroundColor Green
Write-Host "  🌐 ConnectionDecoded: https://love-psychology-production.up.railway.app" -ForegroundColor Green
Write-Host ""

Write-Host "📝 Monitor deployments:" -ForegroundColor Yellow
Write-Host "  GitHub Actions: https://github.com/dungvuq1920-max/clickbank/actions" -ForegroundColor Cyan
Write-Host "  Railway: https://railway.app/project/a9895cce-1c0f-4055-9e39-1f381cf37051" -ForegroundColor Cyan
Write-Host ""

Write-Host "✨ Check your domains in 2-3 minutes!" -ForegroundColor Green
