# Railway CI/CD Setup

The five Railway services already exist and each has its own Railway domain.
Local deploys use the Railway CLI login on this machine.

## GitHub Actions Token

GitHub Actions requires an account/workspace token because the workflow deploys
multiple services in one Railway project.

1. Open Railway Account Settings, then create an API token.
2. Open the GitHub repository settings.
3. Go to **Secrets and variables** -> **Actions**.
4. Add a repository secret named `RAILWAY_API_TOKEN`.
5. Push a commit or run the `Deploy Railway Sites` workflow manually.

Railway CLI authentication variables:

- `RAILWAY_API_TOKEN`: account/workspace-scoped token.
- `RAILWAY_TOKEN`: project-scoped token for a single service or project.

This repository uses `RAILWAY_API_TOKEN` in GitHub Actions because one workflow
deploys five services.

Do not run `railway login --token`; that flag is not supported by the current
Railway CLI.

## Manual Deploy

```powershell
.\deploy-5-sites.ps1
.\generate-site-domains.ps1
```

If services are recreated, add persistent storage before publishing content:

```powershell
.\add-site-volumes.ps1
```

## Admin Password

Each production service must define `ADMIN_PASSWORD`. To reset the password for
all five services:

```powershell
$env:ADMIN_PASSWORD = "replace-with-a-strong-password"
.\set-site-vars.ps1
.\deploy-5-sites.ps1
```

## AI API for Article Generation

Each website has its own protected admin at `/admin`. Open **Settings** in that
admin panel and save an OpenAI-compatible API base URL, model, and API key.

The key is stored server-side in the service volume at `/app/data` and is never
returned to the browser after saving. You can also define `AI_BASE_URL`,
`AI_MODEL`, and `AI_API_KEY` as Railway environment variables; environment
variables take precedence over volume settings.
