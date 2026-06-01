'use client';

import { useMemo, useState } from 'react';
import { ImageIcon, Loader2, Save, Search, Share2, Upload } from 'lucide-react';
import type { Post, Site } from '@/lib/types';
import { Button, Card, Field, inputClass, textareaClass } from '@/components/ui';

const tabs = ['Preview', 'Markdown', 'HTML', 'SEO', 'Images', 'Schema', 'Social Posts'];

export default function GenerateArticleForm({ sites }: { sites: Site[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [form, setForm] = useState({
    site_id: sites[0].id,
    product_url: '',
    affiliate_url: '',
    content_type: 'Long-form review',
    target_keyword: '',
    article_length: '2500-3500 words',
    tone: 'Helpful, trustworthy, conversion-focused',
  });

  const selectedSite = useMemo(() => sites.find((site) => site.id === form.site_id) || sites[0], [form.site_id, sites]);

  function update(key: string, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function generate() {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, niche: selectedSite.niche }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Unable to generate article.');
      setPost(payload.post);
      setActiveTab('Preview');
    } finally {
      setLoading(false);
    }
  }

  async function setStatus(status: 'draft' | 'published' | 'scheduled') {
    if (!post) return;
    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        published_at: status === 'published' ? new Date().toISOString() : null,
        scheduled_at: status === 'scheduled' ? new Date(Date.now() + 86400000).toISOString() : null,
      }),
    });
    setPost(await response.json());
  }

  return (
    <Card className="grid gap-5">
      <div>
        <p className="text-sm font-black uppercase text-yellow-600">Quick generate</p>
        <h2 className="text-2xl font-black">Create a publication-ready affiliate review</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Select website">
          <select className={inputClass} value={form.site_id} onChange={(event) => update('site_id', event.target.value)}>
            {sites.map((site) => <option key={site.id} value={site.id}>{site.name} · {site.niche}</option>)}
          </select>
        </Field>
        <Field label="Content type">
          <select className={inputClass} value={form.content_type} onChange={(event) => update('content_type', event.target.value)}>
            <option>Long-form review</option>
            <option>Review page</option>
            <option>Advertorial</option>
            <option>VSL bridge page</option>
            <option>Tools comparison</option>
            <option>Tutorial blog</option>
          </select>
        </Field>
        <Field label="Product URL">
          <input className={inputClass} value={form.product_url} onChange={(event) => update('product_url', event.target.value)} placeholder="https://..." />
        </Field>
        <Field label="Affiliate URL">
          <input className={inputClass} value={form.affiliate_url} onChange={(event) => update('affiliate_url', event.target.value)} placeholder="https://hop.clickbank.net/..." />
        </Field>
        <Field label="Target keyword">
          <input className={inputClass} value={form.target_keyword} onChange={(event) => update('target_keyword', event.target.value)} placeholder="optional" />
        </Field>
        <Field label="Article length">
          <select className={inputClass} value={form.article_length} onChange={(event) => update('article_length', event.target.value)}>
            <option>1800-2500 words</option>
            <option>2500-3500 words</option>
            <option>3500-4500 words</option>
          </select>
        </Field>
      </div>
      <Field label="Tone">
        <input className={inputClass} value={form.tone} onChange={(event) => update('tone', event.target.value)} />
      </Field>
      <div className="rounded-lg border border-black/10 bg-neutral-50 p-4">
        <div className="text-sm font-black uppercase text-neutral-500">Publishing target</div>
        <div className="text-xl font-black">{selectedSite.name}</div>
        <div className="text-sm text-neutral-600">Published URL: /sites/{selectedSite.slug}/review/[article-slug]</div>
      </div>
      <Button type="button" onClick={generate} disabled={loading || !form.product_url || !form.affiliate_url}>
        {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
        Generate Article
      </Button>

      {post && (
        <div className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`rounded-lg px-3 py-2 text-sm font-extrabold ${activeTab === tab ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-700'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="max-h-[640px] overflow-auto rounded-lg border border-black/10 bg-white p-4">
            {activeTab === 'Preview' && <article className="article-body" dangerouslySetInnerHTML={{ __html: post.content_html }} />}
            {activeTab === 'Markdown' && <textarea className={textareaClass} rows={18} value={post.content_markdown} onChange={(event) => setPost({ ...post, content_markdown: event.target.value })} />}
            {activeTab === 'HTML' && <textarea className={textareaClass} rows={18} value={post.content_html} onChange={(event) => setPost({ ...post, content_html: event.target.value })} />}
            {activeTab === 'SEO' && (
              <div className="grid gap-3">
                <input className={inputClass} value={post.seo_title} onChange={(event) => setPost({ ...post, seo_title: event.target.value })} />
                <textarea className={textareaClass} value={post.meta_description} onChange={(event) => setPost({ ...post, meta_description: event.target.value })} />
                <input className={inputClass} value={post.category} onChange={(event) => setPost({ ...post, category: event.target.value })} />
                <input className={inputClass} value={post.tags.join(', ')} onChange={(event) => setPost({ ...post, tags: event.target.value.split(',').map((tag) => tag.trim()) })} />
              </div>
            )}
            {activeTab === 'Images' && <pre className="whitespace-pre-wrap text-sm"><ImageIcon size={18} /> {JSON.stringify(post.image_suggestions || [], null, 2)}</pre>}
            {activeTab === 'Schema' && <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(post.schema || {}, null, 2)}</pre>}
            {activeTab === 'Social Posts' && <pre className="whitespace-pre-wrap text-sm"><Share2 size={18} /> {JSON.stringify({ tiktok: post.tiktok_ideas, facebook: post.facebook_posts }, null, 2)}</pre>}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" className="bg-neutral-700" onClick={() => setStatus('draft')}><Save size={18} /> Save Draft</Button>
            <Button type="button" onClick={() => setStatus('published')}><Upload size={18} /> Publish Now to {selectedSite.name}</Button>
            <Button type="button" className="bg-amber-600" onClick={() => setStatus('scheduled')}>Schedule Tomorrow</Button>
          </div>
        </div>
      )}
    </Card>
  );
}
