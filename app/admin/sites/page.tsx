import { ExternalLink } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { getAdminSites } from '@/lib/sites';

export default function SitesPage() {
  const sites = getAdminSites();
  return (
    <main className="p-5 lg:p-8">
      <h1 className="text-4xl font-black">Sites</h1>
      <p className="mt-2 text-neutral-600">Website profile managed by this Railway service.</p>
      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sites.map((site, index) => (
          <Card key={site.id}>
            <div className="mb-4 flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-lg font-black text-white" style={{ background: site.primary_color }}>{site.logo}</div>
              <div>
                <h2 className="text-xl font-black">{site.name}</h2>
                <p className="text-sm font-bold text-neutral-500">{site.niche}</p>
              </div>
            </div>
            <p className="text-neutral-600">{site.description}</p>
            <div className="mt-4 flex gap-2">
              <Button href={`/sites/${site.slug}`} className="bg-neutral-900"><ExternalLink size={16} /> Route</Button>
              <Button href={`http://localhost:${3011 + index}`} className="bg-neutral-700">Local {3011 + index}</Button>
            </div>
          </Card>
        ))}
      </section>
    </main>
  );
}
