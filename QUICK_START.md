# CLICKBANK Quick Start

## Daily Workflow

1. Edit files locally.
2. Run `npm run lint` and `npm run build`.
3. Commit and push to `master`.
4. Watch [GitHub Actions](https://github.com/dungvuq1920-max/clickbank/actions).
5. Verify production with:

```powershell
.\verify-5-sites.ps1
```

Every push deploys the same application build to five Railway services. Each
service receives a different `SITE_SLUG`, so its root URL and `/admin` page are
scoped to one niche website.

## Local Development

Build once, then run all local processes:

```powershell
npm run build
npm run dev
```

Local site ports:

| Process | URL |
| --- | --- |
| Admin | `http://localhost:3010/admin` |
| NeuroRestLab | `http://localhost:3011` |
| InnerAlignmentLab | `http://localhost:3012` |
| DigitalOperatorAI | `http://localhost:3013` |
| HealthyResetLab | `http://localhost:3014` |
| ConnectionDecoded | `http://localhost:3015` |

## Setup and Operations

- Railway token setup: [RAILWAY_SETUP.md](RAILWAY_SETUP.md)
- Railway domains: [DOMAINS.md](DOMAINS.md)
- Custom domain mapping: [DOMAIN_MAPPING.md](DOMAIN_MAPPING.md)
- Generated Railway URLs: [TEMP_DOMAINS.md](TEMP_DOMAINS.md)
