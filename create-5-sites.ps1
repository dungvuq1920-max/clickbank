param(
    [string]$AdminPassword = $env:ADMIN_PASSWORD
)

$ErrorActionPreference = "Stop"
$sites = @(
    @{ service = "neuro-sleep-site"; slug = "neuro-sleep"; name = "NeuroRestLab" },
    @{ service = "manifest-signal-site"; slug = "manifest-signal"; name = "InnerAlignmentLab" },
    @{ service = "ai-hustle-site"; slug = "ai-hustle"; name = "DigitalOperatorAI" },
    @{ service = "metabolic-reset-site"; slug = "metabolic-reset"; name = "HealthyResetLab" },
    @{ service = "love-psychology-site"; slug = "love-psychology"; name = "ConnectionDecoded" }
)

if (-not $AdminPassword) {
    throw "Set ADMIN_PASSWORD or pass -AdminPassword before creating production services."
}

npx --yes @railway/cli whoami | Out-Null
$existing = @(npx --yes @railway/cli service list --json | ConvertFrom-Json)

foreach ($site in $sites) {
    if ($existing.name -notcontains $site.service) {
        Write-Host "Creating $($site.service)..."
        npx --yes @railway/cli add --service $site.service --json | Out-Null
    } else {
        Write-Host "$($site.service) already exists."
    }

    npx --yes @railway/cli variable set "APP_MODE=site" "SITE_SLUG=$($site.slug)" "ADMIN_PASSWORD=$AdminPassword" --service $site.service --skip-deploys --json | Out-Null
    Write-Host "Configured $($site.name)."
}

Write-Host "Five site services are ready. Run .\deploy-5-sites.ps1 next."
