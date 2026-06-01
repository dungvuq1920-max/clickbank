'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, FileText, ImageIcon, Loader2, Rocket, Save, Search, ShieldCheck, Tags } from 'lucide-react';
import type { Post, Site } from '@/lib/types';
import { Button, Card, Field, inputClass, textareaClass } from '@/components/ui';

const tabs = ['Preview', 'SEO Pack', 'Illustrations', 'HTML', 'Schema', 'Social'];

type ResearchResult = {
  source_url: string;
  note: string;
  extracted_characters: number;
};

export default function GenerateArticleForm({ sites }: { sites: Site[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [post, setPost] = useState<Post | null>(null);
  const [research, setResearch] = useState<ResearchResult | null>(null);
  const [form, setForm] = useState({
    site_id: sites[0].id,
    product_url: '',
    affiliate_url: '',
    content_type: 'Long-form affiliate review',
    target_keyword: '',
    article_length: '3000-5000 words',
    tone: 'Native US English, trustworthy, persuasive, balanced, and compliance-aware',
  });

  const selectedSite = useMemo(() => sites.find((site) => site.id === form.site_id) || sites[0], [form.site_id, sites]);

  function update(key: string, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function generate() {
    setLoading(true);
    setMessage('Reading the sales page, extracting product facts, and generating the review...');
    setPost(null);
    setResearch(null);
    try {
      const response = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, niche: selectedSite.niche }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Unable to generate article.');
      setPost(payload.post);
      setResearch(payload.research);
      setActiveTab('Preview');
      setMessage('Draft ready. Review the facts, illustrations, and SEO pack before publishing.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to generate article.');
    } finally {
      setLoading(false);
    }
  }

  async function setStatus(status: 'draft' | 'published') {
    if (!post) return;
    setMessage(status === 'published' ? 'Publishing article to the website...' : 'Saving draft...');
    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...post,
        status,
        published_at: status === 'published' ? new Date().toISOString() : null,
      }),
    });
    const payload = await response.json();
    if (!response.ok) {
      setMessage(payload.error || 'Unable to update article.');
      return;
    }
    setPost(payload);
    setMessage(status === 'published' ? 'Published. The article is live on the website.' : 'Draft saved.');
  }

  const liveUrl = post ? `/sites/${selectedSite.slug}/review/${post.slug}` : '';

  return (
    <div className="grid gap-6">
      <Card className="overflow-hidden p-0">
        <div className="bg-neutral-950 p-6 text-white md:p-8">
          <p className="text-xs font-black uppercase tracking-[.22em] text-yellow-400">AI Affiliate Publishing Studio</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">Sales page to conversion-ready review in one workflow.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-white/65">Research the official product page, generate a balanced long-form article, prepare illustration briefs, review the SEO pack, and push the final article to {selectedSite.name}.</p>
        </div>
        <div className="grid gap-5 p-5 md:p-8">
          <div className="grid gap-4 lg:grid-cols-3">
            <Field label="Publishing website">
              <select className={inputClass} value={form.site_id} onChange={(event) => update('site_id', event.target.value)}>
                {sites.map((site) => <option key={site.id} value={site.id}>{site.name} - {site.niche}</option>)}
              </select>
            </Field>
            <Field label="Article type">
              <select className={inputClass} value={form.content_type} onChange={(event) => update('content_type', event.target.value)}>
                <option>Long-form affiliate review</option>
                <option>Comparison article</option>
                <option>Advertorial</option>
                <option>VSL bridge page</option>
                <option>Tutorial review</option>
              </select>
            </Field>
            <Field label="Target keyword">
              <input className={inputClass} value={form.target_keyword} onChange={(event) => update('target_keyword', event.target.value)} placeholder="Optional: infer from product page" />
            </Field>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Field label="Official product sales page">
              <input className={inputClass} value={form.product_url} onChange={(event) => update('product_url', event.target.value)} placeholder="https://vendor-product-page.com" />
            </Field>
            <Field label="ClickBank hoplink / affiliate URL">
              <input className={inputClass} value={form.affiliate_url} onChange={(event) => update('affiliate_url', event.target.value)} placeholder="https://hop.clickbank.net/..." />
            </Field>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Field label="Article length"><input className={inputClass} value={form.article_length} onChange={(event) => update('article_length', event.target.value)} /></Field>
            <Field label="Writing direction"><input className={inputClass} value={form.tone} onChange={(event) => update('tone', event.target.value)} /></Field>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/10 bg-neutral-50 p-4">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-neutral-400">Publishing target</div>
              <div className="mt-1 text-lg font-black">{selectedSite.name}</div>
              <div className="text-sm text-neutral-500">/sites/{selectedSite.slug}/review/[article-slug]</div>
            </div>
            <Button type="button" onClick={generate} disabled={loading || !form.product_url || !form.affiliate_url}>
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
              Research Sales Page & Generate
            </Button>
          </div>
          {message && <p className="rounded-xl border border-black/10 bg-white p-4 text-sm font-bold text-neutral-700">{message}</p>}
        </div>
      </Card>

      {post && (
        <Card className="grid gap-5 p-0">
          <div className="grid gap-4 border-b border-black/10 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-700">Draft workspace</p>
              <h2 className="mt-2 text-2xl font-black">{post.title}</h2>
              {research && <p className="mt-2 text-sm text-neutral-500">{research.note} Extracted characters: {research.extracted_characters.toLocaleString()}.</p>}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" className="bg-neutral-700" onClick={() => setStatus('draft')}><Save size={17} /> Save Draft</Button>
              <Button type="button" className="bg-emerald-700" onClick={() => setStatus('published')}><Rocket size={17} /> Push to Website</Button>
              {post.status === 'published' && <Link className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-black/10 px-4 font-extrabold" href={liveUrl} target="_blank">Open Live Article <ExternalLink size={16} /></Link>}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 px-5 md:px-6">
            {tabs.map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`rounded-full px-4 py-2 text-sm font-extrabold ${activeTab === tab ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-700'}`}>{tab}</button>)}
          </div>
          <div className="max-h-[760px] overflow-auto px-5 pb-5 md:px-6 md:pb-6">
            {activeTab === 'Preview' && <article className="article-body rounded-2xl border border-black/10 bg-white p-5 md:p-8" dangerouslySetInnerHTML={{ __html: post.content_html }} />}
            {activeTab === 'SEO Pack' && <SeoPack post={post} setPost={setPost} />}
            {activeTab === 'Illustrations' && <Illustrations post={post} />}
            {activeTab === 'HTML' && <textarea className={textareaClass} rows={26} value={post.content_html} onChange={(event) => setPost({ ...post, content_html: event.target.value })} />}
            {activeTab === 'Schema' && <pre className="whitespace-pre-wrap rounded-2xl bg-neutral-950 p-5 text-xs text-white">{JSON.stringify(post.schema || {}, null, 2)}</pre>}
            {activeTab === 'Social' && <pre className="whitespace-pre-wrap rounded-2xl bg-neutral-950 p-5 text-xs text-white">{JSON.stringify({ tiktok: post.tiktok_ideas, facebook: post.facebook_posts }, null, 2)}</pre>}
          </div>
        </Card>
      )}
    </div>
  );
}

function SeoPack({ post, setPost }: { post: Post; setPost: (post: Post) => void }) {
  const pack = post.seo_pack;
  return <div className="grid gap-4 rounded-2xl border border-black/10 bg-white p-5">
    <Field label="SEO title"><input className={inputClass} value={post.seo_title} onChange={(event) => setPost({ ...post, seo_title: event.target.value })} /></Field>
    <Field label="Meta description"><textarea className={textareaClass} value={post.meta_description} onChange={(event) => setPost({ ...post, meta_description: event.target.value })} /></Field>
    <Field label="Catalog"><input className={inputClass} value={post.category} onChange={(event) => setPost({ ...post, category: event.target.value })} /></Field>
    <div className="grid gap-4 lg:grid-cols-2">
      <List title="Title variants" items={pack?.title_variants || []} icon={Tags} />
      <List title="Long-tail keywords" items={pack?.long_tail_keywords || []} icon={FileText} />
      <List title="Internal links" items={pack?.internal_links || []} icon={ArrowRight} />
      <List title="Authority source suggestions" items={pack?.authority_sources || []} icon={ShieldCheck} />
    </div>
  </div>;
}

function Illustrations({ post }: { post: Post }) {
  return <div className="grid gap-4 md:grid-cols-2">{(post.image_suggestions || []).map((image) => <article key={`${image.filename}-${image.placement}`} className="rounded-2xl border border-black/10 bg-white p-5"><ImageIcon className="text-emerald-700" /><p className="mt-4 text-xs font-black uppercase tracking-widest text-neutral-400">{image.placement}</p><h3 className="mt-2 text-lg font-black">{image.alt_text}</h3><p className="mt-3 text-sm leading-6 text-neutral-600">{image.caption}</p><p className="mt-4 rounded-lg bg-neutral-100 p-3 text-xs font-bold text-neutral-600">Image brief: {image.image_search_query}</p><p className="mt-2 text-xs font-bold text-neutral-400">Royalty-free source: {image.source_suggestion}</p></article>)}</div>;
}

function List({ title, items, icon: Icon }: { title: string; items: string[]; icon: typeof FileText }) {
  return <article className="rounded-2xl border border-black/10 bg-neutral-50 p-4"><Icon size={18} /><h3 className="mt-3 font-black">{title}</h3><ul className="mt-3 grid gap-2 text-sm leading-6 text-neutral-600">{items.map((item) => <li key={item}>- {item}</li>)}</ul></article>;
}
