$ErrorActionPreference = "Stop"
$sites = @(
    "neuro-sleep-site",
    "manifest-signal-site",
    "ai-hustle-site",
    "metabolic-reset-site",
    "love-psychology-site"
)

foreach ($service in $sites) {
    Write-Host "Deploying $service..."
    npx --yes @railway/cli up --service $service --environment production --detach
}

Write-Host "Deployments started. Run .\generate-site-domains.ps1 after the builds complete."
