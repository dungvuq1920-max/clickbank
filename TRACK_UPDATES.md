# Track Content Updates

## Deployment Flow

```text
Local edit -> lint/build -> git commit -> push -> GitHub Actions -> five Railway services -> HTTP health checks
```

Monitor deployments:

- GitHub Actions: `https://github.com/dungvuq1920-max/clickbank/actions`
- Railway project: `https://railway.com/project/a9895cce-1c0f-4055-9e39-1f381cf37051`

## Verify Production

```powershell
.\verify-5-sites.ps1
```

The verification script checks:

- Each homepage returns `200`.
- Each comparison page returns `200`.
- Each quiz page returns `200`.
- Each admin page returns `401` without credentials.

## Railway Logs

```powershell
npx --yes @railway/cli logs --service neuro-sleep-site --lines 100
npx --yes @railway/cli logs --service manifest-signal-site --lines 100
npx --yes @railway/cli logs --service ai-hustle-site --lines 100
npx --yes @railway/cli logs --service metabolic-reset-site --lines 100
npx --yes @railway/cli logs --service love-psychology-site --lines 100
```
