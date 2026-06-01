$ErrorActionPreference = "Stop"
$sites = @(
    @{ name = "NeuroRestLab"; slug = "neuro-sleep"; url = "https://neuro-sleep-site-production.up.railway.app" },
    @{ name = "InnerAlignmentLab"; slug = "manifest-signal"; url = "https://manifest-signal-site-production.up.railway.app" },
    @{ name = "DigitalOperatorAI"; slug = "ai-hustle"; url = "https://ai-hustle-site-production.up.railway.app" },
    @{ name = "HealthyResetLab"; slug = "metabolic-reset"; url = "https://metabolic-reset-site-production.up.railway.app" },
    @{ name = "ConnectionDecoded"; slug = "love-psychology"; url = "https://love-psychology-site-production.up.railway.app" }
)

foreach ($site in $sites) {
    $root = curl.exe -L -sS --max-time 20 -o NUL -w "%{http_code}" $site.url
    $best = curl.exe -sS --max-time 20 -o NUL -w "%{http_code}" "$($site.url)/sites/$($site.slug)/best-products"
    $quiz = curl.exe -sS --max-time 20 -o NUL -w "%{http_code}" "$($site.url)/sites/$($site.slug)/quiz"
    $admin = curl.exe -sS --max-time 20 -o NUL -w "%{http_code}" "$($site.url)/admin"

    if ($root -ne "200" -or $best -ne "200" -or $quiz -ne "200" -or $admin -ne "401") {
        throw "$($site.name) verification failed: root=$root best=$best quiz=$quiz admin=$admin"
    }

    Write-Host "$($site.name): root=$root best-products=$best quiz=$quiz admin=$admin"
}
