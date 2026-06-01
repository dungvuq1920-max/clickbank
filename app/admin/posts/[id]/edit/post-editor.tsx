'use client';

import { useState } from 'react';
import type { Post, Site } from '@/lib/types';
import { Button, Field, inputClass, textareaClass } from '@/components/ui';

export default function EditPostClient({ post: initialPost, sites }: { post: Post; sites: Site[] }) {
  const [post, setPost] = useState(initialPost);
  const [status, setStatus] = useState('');

  async function save(nextStatus = post.status) {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...post, status: nextStatus, published_at: nextStatus === 'published' ? new Date().toISOString() : post.published_at }),
    });
    setPost(await response.json());
    setStatus('Saved.');
  }

  return (
    <main className="grid gap-6 p-5 lg:grid-cols-[380px_1fr] lg:p-8">
      <section className="grid gap-4">
        <h1 className="text-4xl font-black">Edit Post</h1>
        <Field label="Website">
          <select className={inputClass} value={post.site_id} onChange={(event) => setPost({ ...post, site_id: event.target.value })}>
            {sites.map((site) => <option key={site.id} value={site.id}>{site.name}</option>)}
          </select>
        </Field>
        <Field label="Title"><input className={inputClass} value={post.title} onChange={(event) => setPost({ ...post, title: event.target.value })} /></Field>
        <Field label="Slug"><input className={inputClass} value={post.slug} onChange={(event) => setPost({ ...post, slug: event.target.value })} /></Field>
        <Field label="SEO title"><input className={inputClass} value={post.seo_title} onChange={(event) => setPost({ ...post, seo_title: event.target.value })} /></Field>
        <Field label="Meta description"><textarea className={textareaClass} value={post.meta_description} onChange={(event) => setPost({ ...post, meta_description: event.target.value })} /></Field>
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={() => save('draft')} className="bg-neutral-700">Save Draft</Button>
          <Button type="button" onClick={() => save('published')}>Publish Now</Button>
        </div>
        {status && <p className="rounded-lg bg-green-50 p-3 font-bold text-green-800">{status}</p>}
      </section>
      <section>
        <Field label="Content HTML">
          <textarea className={textareaClass} rows={28} value={post.content_html} onChange={(event) => setPost({ ...post, content_html: event.target.value })} />
        </Field>
        <article className="article-body mt-6 rounded-lg border border-black/10 bg-white p-6" dangerouslySetInnerHTML={{ __html: post.content_html }} />
      </section>
    </main>
  );
}
