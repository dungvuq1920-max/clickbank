import Link from 'next/link';
import { ArrowRight, FileText, Globe2, Timer, Upload, type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui';
import { getDashboardStats } from '@/lib/db';
import { getAdminSites, getRuntimeSiteId } from '@/lib/sites';
import GenerateArticleForm from './quick-generate';

export default async function DashboardPage() {
  const adminSites = getAdminSites();
  const stats = await getDashboardStats(getRuntimeSiteId());

  return (
    <main className="p-5 lg:p-8">
      <div className="mb-8 max-w-4xl">
        <p className="text-sm font-black uppercase text-yellow-600">Dashboard overview</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight lg:text-6xl">AI affiliate publishing for {adminSites.length === 1 ? adminSites[0].name : '5 niche sites'}.</h1>
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

      <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_420px]">
        <GenerateArticleForm sites={adminSites} />
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black">Recent articles</h2>
            <Link href="/admin/posts" className="flex items-center gap-1 text-sm font-extrabold">View all <ArrowRight size={15} /></Link>
          </div>
          <div className="grid gap-3">
            {stats.recentPosts.map((post) => (
              <Link key={post.id} href={`/admin/posts/${post.id}/edit`} className="rounded-lg border border-black/10 p-3 hover:bg-neutral-50">
                <div className="font-extrabold">{post.title}</div>
                <div className="text-xs font-bold uppercase text-neutral-500">{post.status} · {post.category}</div>
              </Link>
            ))}
            {!stats.recentPosts.length && <p className="text-neutral-500">No articles yet. Generate your first draft.</p>}
          </div>
        </Card>
      </section>
    </main>
  );
}
