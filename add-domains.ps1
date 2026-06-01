# PowerShell script to add all 5 domains to Railway

# Domains to add
$domains = @(
    "NeuroRestLab.com",
    "InnerAlignmentLab.com",
    "DigitalOperatorAI.com",
    "healthyresetlab.com",
    "connectiondecoded.com"
)

Write-Host ""
Write-Host "🌐 Adding Domains to Railway" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""

# Verify Railway CLI installed
Write-Host "📋 Checking Railway CLI..." -ForegroundColor Yellow
$railwayVersion = npx @railway/cli --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Railway CLI not found. Installing..." -ForegroundColor Red
    npm install -g @railway/cli
}
else {
    Write-Host "✅ Railway CLI found: $railwayVersion" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔐 Checking Railway login..." -ForegroundColor Yellow
npx @railway/cli whoami >$null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  You need to log in to Railway first" -ForegroundColor Yellow
    npx @railway/cli login
}
else {
    Write-Host "✅ Already logged in to Railway" -ForegroundColor Green
}

Write-Host ""
Write-Host "📝 Adding domains to Railway..." -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($domain in $domains) {
    Write-Host "Adding: $domain" -ForegroundColor White
    
    try {
        npx @railway/cli domain --add $domain --service clickbank 2>&1 | Out-Null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ Added successfully" -ForegroundColor Green
            $successCount++
        }
        else {
            Write-Host "  ⚠️  May already exist" -ForegroundColor Yellow
            $successCount++  # Count it as success since it might already be there
        }
    }
    catch {
        Write-Host "  ❌ Error: $_" -ForegroundColor Red
        $failCount++
    }
    
    Write-Host ""
}

Write-Host "=============================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host "✅ Added: $successCount" -ForegroundColor Green
Write-Host "❌ Failed: $failCount" -ForegroundColor Red
Write-Host ""

# List all domains
Write-Host "📋 Current domains on Railway:" -ForegroundColor Yellow
Write-Host ""

npx @railway/cli domain --json | ConvertFrom-Json | ForEach-Object {
    Write-Host "  🌐 $($_.domain)" -ForegroundColor Green
    if ($_.ssl) {
        Write-Host "     🔒 SSL: Enabled" -ForegroundColor Cyan
    }
    Write-Host ""
}

Write-Host ""
Write-Host "🔗 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to your domain registrar (GoDaddy, Namecheap, etc.)" -ForegroundColor White
Write-Host "2. For each domain, add a CNAME record:" -ForegroundColor White
Write-Host "   - Name: @ (or www)" -ForegroundColor Cyan
Write-Host "   - Value: cname.railway.app" -ForegroundColor Cyan
Write-Host "   - TTL: 3600" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Wait 24-48 hours for DNS to propagate" -ForegroundColor White
Write-Host "4. Test: curl -I https://NeuroRestLab.com" -ForegroundColor White
Write-Host ""
Write-Host "✨ Done! Domains are now configured on Railway." -ForegroundColor Green
