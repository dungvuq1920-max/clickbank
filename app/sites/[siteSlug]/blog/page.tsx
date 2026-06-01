import { notFound } from 'next/navigation';
import { PostCard } from '@/components/site-home';
import { listPosts } from '@/lib/db';
import { getSiteBySlug } from '@/lib/sites';

export default async function BlogPage({ params }: { params: Promise<{ siteSlug: string }> }) {
  const { siteSlug } = await params;
  const site = getSiteBySlug(siteSlug);
  if (!site) notFound();
  const posts = await listPosts({ siteId: site.id, status: 'published' });

  return (
    <main className="mx-auto max-w-7xl px-5 py-16">
      <p className="text-sm font-black uppercase" style={{ color: site.secondary_color }}>Blog</p>
      <h1 className="mt-2 text-5xl font-black">{site.name} articles</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {posts.map((post) => <PostCard key={post.id} site={site} post={post} />)}
        {!posts.length && <p className="text-neutral-600">No published articles yet.</p>}
      </div>
    </main>
  );
}
