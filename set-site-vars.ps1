param(
    [string]$AdminPassword = $env:ADMIN_PASSWORD
)

$ErrorActionPreference = "Stop"
$sites = @(
    @{ service = "neuro-sleep-site"; slug = "neuro-sleep" },
    @{ service = "manifest-signal-site"; slug = "manifest-signal" },
    @{ service = "ai-hustle-site"; slug = "ai-hustle" },
    @{ service = "metabolic-reset-site"; slug = "metabolic-reset" },
    @{ service = "love-psychology-site"; slug = "love-psychology" }
)

if (-not $AdminPassword) {
    throw "Set ADMIN_PASSWORD or pass -AdminPassword."
}

foreach ($site in $sites) {
    npx --yes @railway/cli variable set "APP_MODE=site" "SITE_SLUG=$($site.slug)" "ADMIN_PASSWORD=$AdminPassword" --service $site.service --skip-deploys --json | Out-Null
    Write-Host "Configured $($site.service)."
}
