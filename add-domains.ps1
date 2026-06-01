$ErrorActionPreference = "Stop"
$domains = @(
    @{ service = "neuro-sleep-site"; domain = "NeuroRestLab.com" },
    @{ service = "manifest-signal-site"; domain = "InnerAlignmentLab.com" },
    @{ service = "ai-hustle-site"; domain = "DigitalOperatorAI.com" },
    @{ service = "metabolic-reset-site"; domain = "healthyresetlab.com" },
    @{ service = "love-psychology-site"; domain = "connectiondecoded.com" }
)

foreach ($item in $domains) {
    Write-Host "Adding $($item.domain) to $($item.service)..."
    npx --yes @railway/cli domain $item.domain --service $item.service --json
}

Write-Host "Add the DNS records returned by Railway at your domain registrar."
