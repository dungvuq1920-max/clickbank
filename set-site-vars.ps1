# PowerShell script to set environment variables for 5 sites

Write-Host ""
Write-Host "🔧 Setting Environment Variables for 5 Sites" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Define sites
$sites = @(
    @{
        service = "neuro-sleep-site"
        slug = "neuro-sleep"
        name = "NeuroRestLab"
    },
    @{
        service = "manifest-signal-site"
        slug = "manifest-signal"
        name = "InnerAlignmentLab"
    },
    @{
        service = "ai-hustle-site"
        slug = "ai-hustle"
        name = "DigitalOperatorAI"
    },
    @{
        service = "metabolic-reset-site"
        slug = "metabolic-reset"
        name = "HealthyResetLab"
    },
    @{
        service = "love-psychology-site"
        slug = "love-psychology"
        name = "ConnectionDecoded"
    }
)

# Check Railway CLI
npx @railway/cli --version >$null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Railway CLI not found" -ForegroundColor Red
    exit 1
}

Write-Host "📋 Setting SITE_SLUG for each service..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($site in $sites) {
    Write-Host "Setting variables for: $($site.name)" -ForegroundColor White
    
    try {
        # Set SITE_SLUG environment variable
        npx @railway/cli variable set SITE_SLUG=$($site.slug) --service $site.service 2>&1 | Out-Null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ SITE_SLUG=$($site.slug)" -ForegroundColor Green
            $successCount++
        }
        else {
            Write-Host "  ⚠️  Could not set variable (service may not exist yet)" -ForegroundColor Yellow
            $successCount++
        }
    }
    catch {
        Write-Host "  ❌ Error: $_" -ForegroundColor Red
        $failCount++
    }
    
    Write-Host ""
}

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "✅ Variables set: $successCount" -ForegroundColor Green
Write-Host "❌ Failed: $failCount" -ForegroundColor Red
Write-Host ""

Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Deploy all services:" -ForegroundColor White
Write-Host "   Run: .\deploy-5-sites.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Or deploy manually:" -ForegroundColor White
foreach ($site in $sites) {
    Write-Host "   railway up --service $($site.service)" -ForegroundColor Cyan
}
Write-Host ""
Write-Host "✨ Waiting for deployment..." -ForegroundColor Green
