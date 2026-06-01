# CLICKBANK Railway Domains

Each affiliate website runs as an independent Railway service.

| Website | Slug | Railway service | Railway URL |
| --- | --- | --- | --- |
| NeuroRestLab | `neuro-sleep` | `neuro-sleep-site` | `https://neuro-sleep-site-production.up.railway.app` |
| InnerAlignmentLab | `manifest-signal` | `manifest-signal-site` | `https://manifest-signal-site-production.up.railway.app` |
| DigitalOperatorAI | `ai-hustle` | `ai-hustle-site` | `https://ai-hustle-site-production.up.railway.app` |
| HealthyResetLab | `metabolic-reset` | `metabolic-reset-site` | `https://metabolic-reset-site-production.up.railway.app` |
| ConnectionDecoded | `love-psychology` | `love-psychology-site` | `https://love-psychology-site-production.up.railway.app` |

Each site has its own admin page at `<Railway URL>/admin`, protected by
`ADMIN_PASSWORD`, and its own persistent volume mounted at `/app/data`.

For purchased custom domains, follow [DOMAIN_MAPPING.md](DOMAIN_MAPPING.md).
