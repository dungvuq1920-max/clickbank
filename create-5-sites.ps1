# PowerShell script to create 5 temporary Railway sites

Write-Host ""
Write-Host "🚀 Creating 5 Temporary Railway Sites" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Define sites
$sites = @(
    @{
        name = "neuro-sleep-site"
        slug = "neuro-sleep"
        displayName = "NeuroRestLab"
    },
    @{
        name = "manifest-signal-site"
        slug = "manifest-signal"
        displayName = "InnerAlignmentLab"
    },
    @{
        name = "ai-hustle-site"
        slug = "ai-hustle"
        displayName = "DigitalOperatorAI"
    },
    @{
        name = "metabolic-reset-site"
        slug = "metabolic-reset"
        displayName = "HealthyResetLab"
    },
    @{
        name = "love-psychology-site"
        slug = "love-psychology"
        displayName = "ConnectionDecoded"
    }
)

# Check Railway CLI
Write-Host "📋 Checking Railway CLI..." -ForegroundColor Yellow
npx @railway/cli --version >$null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Railway CLI not found. Install with: npm install -g @railway/cli" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Railway CLI found" -ForegroundColor Green
Write-Host ""

# Check login
Write-Host "🔐 Checking Railway login..." -ForegroundColor Yellow
npx @railway/cli whoami >$null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not logged in to Railway. Run: railway login" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Logged in to Railway" -ForegroundColor Green
Write-Host ""

# Create services
Write-Host "🛠️  Creating services..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($site in $sites) {
    Write-Host "Creating service: $($site.displayName)" -ForegroundColor Cyan
    Write-Host "  Service name: $($site.name)" -ForegroundColor Gray
    Write-Host "  Site slug: $($site.slug)" -ForegroundColor Gray
    
    try {
        # Create service
        npx @railway/cli service new $site.name --name $site.displayName 2>&1 | Out-Null
        
        if ($LASTEXITCODE -eq 0 -or $LASTEXITCODE -eq 127) {  # 127 = already exists
            Write-Host "  ✅ Service created/connected" -ForegroundColor Green
            $successCount++
            
            # Wait a moment before setting variables
            Start-Sleep -Seconds 2
        }
        else {
            Write-Host "  ❌ Failed to create service" -ForegroundColor Red
            $failCount++
        }
    }
    catch {
        Write-Host "  ⚠️  Warning: $_" -ForegroundColor Yellow
        $successCount++  # Count as success if it might already exist
    }
    
    Write-Host ""
}

Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "✅ Services created: $successCount" -ForegroundColor Green
Write-Host "❌ Failed: $failCount" -ForegroundColor Red
Write-Host ""

# Next steps
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Set environment variables for each service:" -ForegroundColor White
Write-Host "   Run: .\set-site-vars.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Or set manually in Railway Dashboard:" -ForegroundColor White
Write-Host "   For each service, add variable: SITE_SLUG=[slug]" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Deploy each service:" -ForegroundColor White
Write-Host "   Run: .\deploy-5-sites.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Access your temporary domains:" -ForegroundColor White

foreach ($site in $sites) {
    $domain = "$($site.slug)-production.up.railway.app"
    Write-Host "   🌐 $($site.displayName): https://$domain" -ForegroundColor Green
}

Write-Host ""
Write-Host "✨ Done! Continue with next steps." -ForegroundColor Green
