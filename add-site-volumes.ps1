$ErrorActionPreference = "Stop"
$sites = @(
    "neuro-sleep-site",
    "manifest-signal-site",
    "ai-hustle-site",
    "metabolic-reset-site",
    "love-psychology-site"
)

$services = npx --yes @railway/cli service list --json | Out-String | ConvertFrom-Json
$volumes = (npx --yes @railway/cli volume list --json | Out-String | ConvertFrom-Json).volumes

foreach ($site in $sites) {
    if ($volumes.serviceName -contains $site) {
        Write-Host "$site already has a volume."
        continue
    }

    $service = $services | Where-Object { $_.name -eq $site }
    if (-not $service) {
        throw "Service not found: $site"
    }

    npx --yes @railway/cli volume --service $service.id add --mount-path /app/data --json
    Start-Sleep -Seconds 4
}
