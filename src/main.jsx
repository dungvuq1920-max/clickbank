import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BarChart3,
  Check,
  Copy,
  ExternalLink,
  Eye,
  KeyRound,
  LayoutDashboard,
  Play,
  Save,
  Sparkles,
  Trash2,
  Upload,
  Wand2,
} from 'lucide-react';
import { getSite, sites } from './siteData';
import './styles.css';

const site = getSite();
const managedSites = Object.values(sites).filter((item) => item.key !== 'admin');
const modelOptions = {
  demo: ['gpt-4o', 'gpt-5-mini', 'gpt-4.1-mini'],
  shopaikey: ['gpt-4o', 'gpt-5-mini', 'gpt-4.1-mini', 'gpt-4o-mini', 'claude-3-5-sonnet-20240620', 'gemini-1.5-pro'],
  openai: ['gpt-4.1-mini', 'gpt-4o', 'gpt-4o-mini', 'gpt-5-mini'],
  claude: ['claude-3-5-sonnet-latest', 'claude-3-5-haiku-latest', 'claude-3-opus-latest'],
  gemini: ['gemini-1.5-pro', 'gemini-1.5-flash', 'gemini-2.0-flash'],
};

function Nav({ route, setRoute }) {
  const isAdmin = site.key === 'admin';
  return (
    <header className="topbar">
      <button className="brand" onClick={() => setRoute('home')} aria-label="Home">
        <span className="brandMark" style={{ background: site.accent }} />
        <span>{site.name}</span>
      </button>
      <nav>
        {!isAdmin && <button className={route === 'home' ? 'active' : ''} onClick={() => setRoute('home')}>Site</button>}
        <button className={isAdmin || route === 'cpanel' ? 'active' : ''} onClick={() => (isAdmin ? setRoute('cpanel') : window.location.assign('http://localhost:3010'))}>
          <LayoutDashboard size={16} /> cPanel
        </button>
      </nav>
    </header>
  );
}

function Home({ setRoute }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`/api/posts?site=${site.key}&status=published`)
      .then((response) => response.json())
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <main>
      <section className="hero" style={{ '--hero-image': `url(${site.hero})`, '--accent': site.accent, '--dark': site.dark }}>
        <div className="heroContent">
          <p className="eyebrow">{site.eyebrow}</p>
          <h1>{site.headline}</h1>
          <p>{site.subhead}</p>
          <div className="heroActions">
            <button className="primary" onClick={() => document.getElementById('offers').scrollIntoView({ behavior: 'smooth' })}>
              {site.cta} <ArrowRight size={18} />
            </button>
            <button className="secondary" onClick={() => window.location.assign('http://localhost:3010')}>
              <Wand2 size={18} /> Central cPanel
            </button>
          </div>
        </div>
      </section>

      <section id="offers" className="band">
        <div className="sectionHead">
          <p className="eyebrow">Affiliate Positioning</p>
          <h2>Built for AI scale, faceless content, and global ClickBank traffic.</h2>
        </div>
        <div className="nicheStrip">
          <div>
            <span>Examples</span>
            <p>{site.examples.join(' / ')}</p>
          </div>
          <div>
            <span>Site Formats</span>
            <p>{site.formats.join(' / ')}</p>
          </div>
        </div>
        <div className="offerGrid">
          {site.offers.map(([title, text]) => (
            <article className="offerCard" key={title}>
              <Check size={20} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="strategy">
        {site.sections.map(([title, text], index) => (
          <div className="strategyRow" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </section>

      <section className="conversionBand">
        <div>
          <p className="eyebrow">Content Engine</p>
          <h2>Publish review pages, then chop the core ideas into daily short videos.</h2>
        </div>
        <button className="primary" onClick={() => window.location.assign('http://localhost:3010')}>
          Open cPanel <ArrowRight size={18} />
        </button>
      </section>

      <section className="band">
        <div className="sectionHead">
          <p className="eyebrow">Published Reviews</p>
          <h2>Articles pushed from the central cPanel.</h2>
        </div>
        <div className="postGrid">
          {posts.length ? posts.map((post) => (
            <article className="offerCard postCard" key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.angle || site.angle}</p>
              <button className="primary" onClick={() => setRoute(`post:${post.slug}`)}>
                Read review <ArrowRight size={16} />
              </button>
            </article>
          )) : (
            <article className="offerCard postCard">
              <h3>No pushed articles yet</h3>
              <p>Use localhost:3010 to generate a preview, save a draft, then push it to this website.</p>
            </article>
          )}
        </div>
      </section>
    </main>
  );
}

function PostPage({ slug, setRoute }) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((response) => {
        if (!response.ok) throw new Error('Post not found');
        return response.json();
      })
      .then(setPost)
      .catch((err) => setError(err.message));
  }, [slug]);

  return (
    <main className="panelShell">
      <button className="backButton" onClick={() => setRoute('home')}>Back to site</button>
      <section className="outputPanel articlePage">
        {error && <p className="error">{error}</p>}
        {post ? <article className="reviewPreview" dangerouslySetInnerHTML={{ __html: post.html }} /> : <div className="emptyState"><Play size={34} /><h2>Loading review...</h2></div>}
      </section>
    </main>
  );
}

function CPanel() {
  const [selectedSiteKey, setSelectedSiteKey] = useState(managedSites[0].key);
  const selectedSite = sites[selectedSiteKey];
  const savedProvider = localStorage.getItem('central:provider');
  const initialProvider = savedProvider && savedProvider !== 'demo' ? savedProvider : 'shopaikey';
  const savedModel = localStorage.getItem('central:model');
  const initialModel = modelOptions[initialProvider]?.includes(savedModel) ? savedModel : modelOptions[initialProvider][0];
  const [form, setForm] = useState({
    provider: initialProvider,
    apiKey: localStorage.getItem('central:apiKey') || '',
    model: initialModel,
    productUrl: '',
    affiliateUrl: '',
    audience: selectedSite.audience,
    angle: selectedSite.angle,
    tone: selectedSite.tone,
    reviewPrompt: selectedSite.reviewPrompt,
    imagePrompt: selectedSite.imagePrompt,
  });
  const [article, setArticle] = useState('');
  const [currentPostId, setCurrentPostId] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);

  const wordEstimate = useMemo(() => article.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length, [article]);
  const currentModelOptions = modelOptions[form.provider] || modelOptions.demo;

  async function loadPosts() {
    const response = await fetch('/api/posts');
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    loadPosts().catch(() => setPosts([]));
  }, []);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      audience: selectedSite.audience,
      angle: selectedSite.angle,
      tone: selectedSite.tone,
      reviewPrompt: selectedSite.reviewPrompt,
      imagePrompt: selectedSite.imagePrompt,
    }));
  }, [selectedSiteKey]);

  function update(key, value) {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === 'provider') {
        const options = modelOptions[value] || [];
        next.model = options[0] || '';
        localStorage.setItem('central:model', next.model);
      }
      return next;
    });
    if (['provider', 'apiKey', 'model'].includes(key)) localStorage.setItem(`central:${key}`, value);
  }

  async function generateReview(event) {
    event.preventDefault();
    setError('');
    setStatus('Generating preview...');
    setArticle('');
    setCurrentPostId('');
    try {
      const response = await fetch('/api/generate-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, siteName: selectedSite.name }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Cannot generate review.');
      setArticle(data.html);
      setStatus('Preview is ready. Save draft or push it to the selected website.');
    } catch (err) {
      setError(err.message);
      setStatus('');
    }
  }

  async function copyHtml() {
    await navigator.clipboard.writeText(article);
    setStatus('Copied article HTML.');
  }

  async function savePost(nextStatus) {
    setError('');
    if (!article) {
      setError('Generate or load a preview first.');
      return;
    }
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentPostId || undefined,
          siteKey: selectedSite.key,
          siteName: selectedSite.name,
          status: nextStatus,
          html: article,
          ...form,
        }),
      });
      const saved = await response.json();
      if (!response.ok) throw new Error(saved.error || 'Cannot save post.');
      setCurrentPostId(saved.id);
      await loadPosts();
      setStatus(nextStatus === 'published' ? `Pushed to ${selectedSite.name}.` : 'Draft saved.');
    } catch (err) {
      setError(err.message);
    }
  }

  function loadPost(post) {
    setSelectedSiteKey(post.siteKey);
    setCurrentPostId(post.id);
    setArticle(post.html);
    setForm((current) => ({
      ...current,
      provider: post.provider || current.provider,
      model: post.model || current.model,
      productUrl: post.productUrl || '',
      affiliateUrl: post.affiliateUrl || '',
      audience: post.audience || sites[post.siteKey].audience,
      angle: post.angle || sites[post.siteKey].angle,
      tone: post.tone || sites[post.siteKey].tone,
      reviewPrompt: post.reviewPrompt || sites[post.siteKey].reviewPrompt,
      imagePrompt: post.imagePrompt || sites[post.siteKey].imagePrompt,
    }));
    setStatus('Loaded saved item into preview.');
  }

  async function deletePost(id) {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (currentPostId === id) setCurrentPostId('');
    await loadPosts();
    setStatus('Deleted saved item.');
  }

  return (
    <main className="panelShell">
      <section className="panelIntro">
        <p className="eyebrow">Central AI cPanel</p>
        <h1>Manage all three ClickBank websites from one place.</h1>
        <p>Generate a review preview, save it as draft, push it to a website, and track product links and affiliate links across all niches.</p>
      </section>

      <section className="panelGrid">
        <form className="controlPanel" onSubmit={generateReview}>
          <label>
            Target website
            <select value={selectedSiteKey} onChange={(event) => setSelectedSiteKey(event.target.value)}>
              {managedSites.map((item) => <option key={item.key} value={item.key}>{item.name} - localhost:{item.port}</option>)}
            </select>
          </label>
          <div className="destinationBox">
            <span>Push destination</span>
            <strong>{selectedSite.name}</strong>
            <a href={`http://localhost:${selectedSite.port}`} target="_blank" rel="noreferrer">localhost:{selectedSite.port}</a>
          </div>
          <label>
            Provider
            <select value={form.provider} onChange={(event) => update('provider', event.target.value)}>
              <option value="demo">Demo without API key</option>
              <option value="shopaikey">ShopAIKey OpenAI format</option>
              <option value="openai">OpenAI</option>
              <option value="claude">Claude</option>
              <option value="gemini">Gemini</option>
            </select>
          </label>
          <label>
            <span><KeyRound size={15} /> API key</span>
            <input type="password" value={form.apiKey} onChange={(event) => update('apiKey', event.target.value)} placeholder="Stored only in this browser localStorage" />
          </label>
          <label>
            Model
            <select value={currentModelOptions.includes(form.model) ? form.model : currentModelOptions[0]} onChange={(event) => update('model', event.target.value)}>
              {currentModelOptions.map((model) => <option key={model} value={model}>{model}</option>)}
            </select>
          </label>
          <label>
            ClickBank product URL
            <input required value={form.productUrl} onChange={(event) => update('productUrl', event.target.value)} placeholder="https://..." />
          </label>
          <label>
            Affiliate URL
            <input required value={form.affiliateUrl} onChange={(event) => update('affiliateUrl', event.target.value)} placeholder="https://hop.clickbank.net/..." />
          </label>
          <label>
            Audience
            <textarea value={form.audience} onChange={(event) => update('audience', event.target.value)} rows="3" />
          </label>
          <label>
            Angle content
            <textarea value={form.angle} onChange={(event) => update('angle', event.target.value)} rows="3" />
          </label>
          <label>
            Tone
            <input value={form.tone} onChange={(event) => update('tone', event.target.value)} />
          </label>
          <label>
            Review prompt preset
            <textarea value={form.reviewPrompt} onChange={(event) => update('reviewPrompt', event.target.value)} rows="5" />
          </label>
          <label>
            Image prompt preset
            <textarea value={form.imagePrompt} onChange={(event) => update('imagePrompt', event.target.value)} rows="3" />
          </label>
          <button className="primary wide" type="submit">
            <Sparkles size={18} /> Generate preview
          </button>
          <div className="panelActions">
            <button type="button" className="secondary dark" disabled={!article} onClick={() => savePost('draft')}><Save size={17} /> Save draft</button>
            <button type="button" className="primary" disabled={!article} onClick={() => savePost('published')}><Upload size={17} /> Push to {selectedSite.name}</button>
          </div>
          {status && <p className="status">{status}</p>}
          {error && <p className="error">{error}</p>}
        </form>

        <aside className="outputPanel">
          <div className="outputToolbar">
            <span><BarChart3 size={16} /> {wordEstimate} words</span>
            <div>
              <button type="button" disabled={!article} onClick={copyHtml}><Copy size={16} /> Copy HTML</button>
              {form.affiliateUrl && <a href={form.affiliateUrl} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Test link</a>}
              <a href={`http://localhost:${selectedSite.port}`} target="_blank" rel="noreferrer"><Eye size={16} /> Open site</a>
            </div>
          </div>
          {article ? (
            <article className="reviewPreview" dangerouslySetInnerHTML={{ __html: article }} />
          ) : (
            <div className="emptyState">
              <Play size={34} />
              <h2>Review preview will appear here.</h2>
              <p>Use demo mode for a quick sample, or add an API key for a deeper article.</p>
            </div>
          )}
        </aside>
      </section>

      <section className="tableSection">
        <div className="sectionHead">
          <p className="eyebrow">Drafts and pushed articles</p>
          <h2>Product link and affiliate link table for all three sites.</h2>
        </div>
        <div className="linkTableWrap">
          <table className="linkTable">
            <thead>
              <tr>
                <th>Site</th>
                <th>Status</th>
                <th>Title</th>
                <th>Product link</th>
                <th>Affiliate link</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.siteName}</td>
                  <td><span className={`pill ${post.status}`}>{post.status}</span></td>
                  <td>{post.title}</td>
                  <td><a href={post.productUrl} target="_blank" rel="noreferrer">Product</a></td>
                  <td><a href={post.affiliateUrl} target="_blank" rel="noreferrer">Affiliate</a></td>
                  <td>{new Date(post.updatedAt).toLocaleString()}</td>
                  <td>
                    <div className="rowActions">
                      <button type="button" onClick={() => loadPost(post)}><Eye size={15} /> Load</button>
                      <button type="button" onClick={() => deletePost(post.id)}><Trash2 size={15} /> Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {!posts.length && (
                <tr>
                  <td colSpan="7">No saved drafts yet. Generate a preview, then save draft or push to website.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function App() {
  const initialPath = window.location.pathname;
  const initial = site.key === 'admin'
    ? 'cpanel'
    : initialPath.startsWith('/post/') ? `post:${initialPath.split('/post/')[1]}` : 'home';
  const [route, setRouteState] = useState(initial);

  function setRoute(next) {
    setRouteState(next);
    if (site.key === 'admin') {
      window.history.pushState(null, '', '/');
      return;
    }
    window.history.pushState(null, '', next.startsWith('post:') ? `/post/${next.replace('post:', '')}` : '/');
  }

  return (
    <div style={{ '--accent': site.accent, '--dark': site.dark, '--light': site.light }}>
      <Nav route={route} setRoute={setRoute} />
      {site.key === 'admin' ? <CPanel /> : route.startsWith('post:') ? <PostPage slug={route.replace('post:', '')} setRoute={setRoute} /> : <Home setRoute={setRoute} />}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
