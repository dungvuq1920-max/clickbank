import { Card } from '@/components/ui';
import ApiSettingsPanel from './api-settings-panel';

export default function SettingsPage() {
  return (
    <main className="grid gap-6 p-5 lg:p-8">
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-emerald-700">Configuration</p>
        <h1 className="mt-2 text-4xl font-black">Settings</h1>
        <p className="mt-2 text-neutral-600">Manage the private AI connection and publishing rules for this Railway website.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ApiSettingsPanel />
        {[
          ['Product research', 'The generator reads the public sales page with a strict timeout and sends cleaned text to the AI prompt. Verify pricing, bonuses, and guarantee details before publishing.'],
          ['ClickBank hoplinks', 'The affiliate URL is stored with the product and used only inside CTA blocks. Published links include sponsored and nofollow attributes.'],
          ['Illustrations', 'Each generated draft includes royalty-free illustration briefs, filenames, captions, alt text, and recommended placements for editorial review.'],
          ['Deployment', 'Every website runs as an independent Railway service with APP_MODE=site, its own SITE_SLUG, Basic Auth admin, and persistent /app/data volume.'],
        ].map(([title, text]) => <Card key={title}><h2 className="text-xl font-black">{title}</h2><p className="mt-2 leading-7 text-neutral-600">{text}</p></Card>)}
      </div>
    </main>
  );
}
