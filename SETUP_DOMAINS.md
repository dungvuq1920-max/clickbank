# Setup Purchased Domains

Railway-provided domains already work. Purchased domains are optional.

To attach purchased domains to their matching Railway services:

```powershell
.\add-domains.ps1
```

The script prints the DNS records required by Railway. Add those exact records
at your registrar and wait for DNS propagation.

Mapping details: [DOMAIN_MAPPING.md](DOMAIN_MAPPING.md).

Verify Railway-provided domains at any time:

```powershell
.\verify-5-sites.ps1
```
