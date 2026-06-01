# Railway Domains for the Five Sites

Each website is deployed as an independent Railway service. The root URL opens
the assigned website, and `/admin` opens the admin panel scoped to that website.

| Website | Railway service | Railway domain |
| --- | --- | --- |
| NeuroRestLab | `neuro-sleep-site` | `https://neuro-sleep-site-production.up.railway.app` |
| InnerAlignmentLab | `manifest-signal-site` | `https://manifest-signal-site-production.up.railway.app` |
| DigitalOperatorAI | `ai-hustle-site` | `https://ai-hustle-site-production.up.railway.app` |
| HealthyResetLab | `metabolic-reset-site` | `https://metabolic-reset-site-production.up.railway.app` |
| ConnectionDecoded | `love-psychology-site` | `https://love-psychology-site-production.up.railway.app` |

## Setup

Set an admin password in the current PowerShell session:

```powershell
$env:ADMIN_PASSWORD = "replace-with-a-strong-password"
```

Create or configure services, deploy them, and print their generated domains:

```powershell
.\create-5-sites.ps1
.\add-site-volumes.ps1
.\deploy-5-sites.ps1
.\generate-site-domains.ps1
```

Each service receives:

- `APP_MODE=site`
- Its matching `SITE_SLUG`
- `ADMIN_PASSWORD`

Each service also has its own Railway volume mounted at `/app/data`, so local
fallback content survives redeploys before Supabase is configured.

To attach purchased custom domains, run:

```powershell
.\add-domains.ps1
```

Use username `admin` and the configured password when the browser prompts for
credentials at `/admin`.
