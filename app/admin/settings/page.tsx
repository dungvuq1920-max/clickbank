import { Card } from '@/components/ui';

export default function SettingsPage() {
  return (
    <main className="grid gap-5 p-5 lg:p-8">
      <h1 className="text-4xl font-black">Settings</h1>
      <div className="grid gap-4 lg:grid-cols-3">
        {[
          ['AI API', 'Set AI_API_KEY, AI_BASE_URL, and AI_MODEL in .env.local. API keys are server-side only.'],
          ['CTA Templates', 'Niche CTA templates are stored in lib/sites.ts and inserted into every generated article.'],
          ['Site Settings', 'Branding, colors, domains, compliance rules, and lead magnets are stored in lib/sites.ts.'],
          ['Affiliate Links', 'Generated products save product_url and affiliate_url, with CTA blocks capped at 5 placements.'],
          ['Supabase', 'Run supabase/schema.sql, then add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'],
          ['Deployment', 'Deploy each website as its own Railway service with APP_MODE=site, its SITE_SLUG, and a persistent /app/data volume.'],
        ].map(([title, text]) => (
          <Card key={title}>
            <h2 className="text-xl font-black">{title}</h2>
            <p className="mt-2 text-neutral-600">{text}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
