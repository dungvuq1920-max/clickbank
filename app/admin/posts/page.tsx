import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { listPosts } from '@/lib/db';
import { getSiteById } from '@/lib/sites';
import { getRuntimeSiteId } from '@/lib/sites';
import { Card } from '@/components/ui';

export default async function PostsPage() {
  const posts = await listPosts({ siteId: getRuntimeSiteId() });

  return (
    <main className="p-5 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black">All Posts</h1>
          <p className="mt-2 text-neutral-600">Edit drafts, publish articles, and manage the content library.</p>
        </div>
        <Link href="/admin/products/new" className="rounded-lg bg-neutral-950 px-4 py-3 font-black text-white">Generate New</Link>
      </div>
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b bg-neutral-50 text-sm uppercase text-neutral-500">
              <th className="p-4">Title</th>
              <th className="p-4">Site</th>
              <th className="p-4">Status</th>
              <th className="p-4">Category</th>
              <th className="p-4">Updated</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b last:border-0">
                <td className="p-4 font-extrabold">{post.title}</td>
                <td className="p-4">{getSiteById(post.site_id)?.name || post.site_id}</td>
                <td className="p-4"><span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-black uppercase">{post.status}</span></td>
                <td className="p-4">{post.category}</td>
                <td className="p-4 text-sm text-neutral-500">{new Date(post.updated_at).toLocaleString()}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link href={`/admin/posts/${post.id}/edit`} className="flex items-center gap-1 rounded-lg border border-black/10 px-3 py-2 text-sm font-extrabold"><Pencil size={14} /> Edit</Link>
                    <button className="flex items-center gap-1 rounded-lg border border-black/10 px-3 py-2 text-sm font-extrabold"><Trash2 size={14} /> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {!posts.length && <tr><td className="p-4 text-neutral-500" colSpan={6}>No posts yet.</td></tr>}
          </tbody>
        </table>
      </Card>
    </main>
  );
}
