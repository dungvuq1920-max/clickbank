# Map Custom Domains to the Five Railway Services

Each website has its own Railway service and Railway-provided domain.

| Website | Railway service | Railway domain | Custom domain |
| --- | --- | --- | --- |
| NeuroRestLab | `neuro-sleep-site` | `https://neuro-sleep-site-production.up.railway.app` | `NeuroRestLab.com` |
| InnerAlignmentLab | `manifest-signal-site` | `https://manifest-signal-site-production.up.railway.app` | `InnerAlignmentLab.com` |
| DigitalOperatorAI | `ai-hustle-site` | `https://ai-hustle-site-production.up.railway.app` | `DigitalOperatorAI.com` |
| HealthyResetLab | `metabolic-reset-site` | `https://metabolic-reset-site-production.up.railway.app` | `healthyresetlab.com` |
| ConnectionDecoded | `love-psychology-site` | `https://love-psychology-site-production.up.railway.app` | `connectiondecoded.com` |

## Add Custom Domains

Run:

```powershell
.\add-domains.ps1
```

The script attaches each purchased domain to its matching service using the
current Railway CLI syntax:

```powershell
npx --yes @railway/cli domain NeuroRestLab.com --service neuro-sleep-site --json
```

Railway returns the DNS records required for each domain. Add those exact
records at the registrar, then wait for DNS propagation.

## Admin Pages

Each domain has an independent admin page:

```text
https://neuro-sleep-site-production.up.railway.app/admin
https://manifest-signal-site-production.up.railway.app/admin
https://ai-hustle-site-production.up.railway.app/admin
https://metabolic-reset-site-production.up.railway.app/admin
https://love-psychology-site-production.up.railway.app/admin
```

Use username `admin` and the configured `ADMIN_PASSWORD`.
