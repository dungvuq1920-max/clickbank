$ErrorActionPreference = "Stop"
$sites = @(
    "neuro-sleep-site",
    "manifest-signal-site",
    "ai-hustle-site",
    "metabolic-reset-site",
    "love-psychology-site"
)

foreach ($service in $sites) {
    $result = npx --yes @railway/cli domain --service $service --json | Out-String | ConvertFrom-Json
    Write-Host "$service"
    Write-Host "  $($result.domains[0])"
}
