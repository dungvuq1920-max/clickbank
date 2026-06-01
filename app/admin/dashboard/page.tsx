import { FileText, Globe2, Timer, Upload, type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui';
import { getDashboardStats } from '@/lib/db';
import { getAdminSites, getRuntimeSiteId } from '@/lib/sites';
import ApiSettingsPanel from '../settings/api-settings-panel';
import GenerateArticleForm from './quick-generate';

export default async function DashboardPage() {
  const adminSites = getAdminSites();
  const stats = await getDashboardStats(getRuntimeSiteId());

  return (
    <main className="p-5 lg:p-8">
      <div className="mb-8 max-w-4xl">
        <p className="text-sm font-black uppercase text-emerald-700">Single-page publishing studio</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight lg:text-6xl">Generate and publish affiliate reviews for {adminSites[0].name}.</h1>
        <p className="mt-4 max-w-3xl leading-7 text-neutral-600">Connect ShopAIKey, paste the official sales page and ClickBank hoplink, generate the full article, review illustrations and SEO, then push it live. Everything is on this page.</p>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {([
          ['Total sites', stats.totalSites, Globe2],
          ['Total posts', stats.totalPosts, FileText],
          ['Draft posts', stats.draftPosts, Timer],
          ['Published', stats.publishedPosts, Upload],
          ['Scheduled', stats.scheduledPosts, Timer],
        ] as Array<[string, number, LucideIcon]>).map(([label, value, Icon]) => (
          <Card key={label}>
            <Icon className="mb-4 text-neutral-500" size={22} />
            <div className="text-3xl font-black">{value}</div>
            <div className="text-sm font-bold text-neutral-500">{label}</div>
          </Card>
        ))}
      </section>
      <section className="mt-8"><ApiSettingsPanel /></section>
      <section className="mt-8"><GenerateArticleForm sites={adminSites} /></section>
      <section className="mt-8">
        <Card>
          <h2 className="text-xl font-black">Recent articles</h2>
          <p className="mt-1 text-sm text-neutral-500">Recent draft and published content for this website.</p>
          <div className="mt-4 grid gap-3">
            {stats.recentPosts.map((post) => (
              <div key={post.id} className="rounded-lg border border-black/10 p-3">
                <div className="font-extrabold">{post.title}</div>
                <div className="text-xs font-bold uppercase text-neutral-500">{post.status} - {post.category}</div>
              </div>
            ))}
            {!stats.recentPosts.length && <p className="text-neutral-500">No articles yet. Generate your first draft above.</p>}
          </div>
        </Card>
      </section>
    </main>
  );
}
