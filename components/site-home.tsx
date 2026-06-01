import Link from 'next/link';
import { ArrowRight, BadgeCheck, BarChart3, BookOpen, CheckCircle2, Compass, Mail, ShieldCheck, Sparkles, Star } from 'lucide-react';
import type { Post, Site } from '@/lib/types';
import { LeadCapture } from './lead-capture';

const themeStyles = {
  neuro: { page: 'bg-slate-50', soft: 'bg-blue-50', hero: 'from-slate-950 via-blue-950 to-indigo-950', label: 'Evidence-aware wellness' },
  manifest: { page: 'bg-[#fffaf0]', soft: 'bg-[#fff4dc]', hero: 'from-[#241039] via-[#54266f] to-[#9a5f70]', label: 'Grounded spiritual growth' },
  ai: { page: 'bg-zinc-100', soft: 'bg-zinc-200', hero: 'from-black via-zinc-950 to-emerald-950', label: 'Operator-tested workflows' },
  metabolic: { page: 'bg-emerald-50/60', soft: 'bg-[#ecfff4]', hero: 'from-[#103b2b] via-[#176548] to-[#65a96c]', label: 'Supportive wellness habits' },
  love: { page: 'bg-rose-50/70', soft: 'bg-[#fff1f4]', hero: 'from-[#35121f] via-[#7f1d3a] to-[#b83e65]', label: 'Healthy relationship guidance' },
};

export function SiteHome({ site, posts }: { site: Site; posts: Post[] }) {
  const featured = posts[0];
  const theme = themeStyles[site.theme];

  return (
    <main className={theme.page}>
      <Hero site={site} theme={theme} />
      <TrustStrip site={site} />
      <PainPoints site={site} />
      <Pillars site={site} softClass={theme.soft} />
      <Catalogs site={site} />
      <RecommendedProducts site={site} />
      <FeaturedArticles site={site} posts={posts} />
      <QuizSection site={site} />
      <LeadMagnet site={site} softClass={theme.soft} />
      <FAQ site={site} />
      <Disclosure site={site} />
      {featured && <div className="fixed inset-x-3 bottom-3 z-50 md:hidden"><Link href={`/sites/${site.slug}/review/${featured.slug}`} className="affiliate-button w-full justify-center">{site.ctaTexts[0]}</Link></div>}
    </main>
  );
}

function Catalogs({ site }: { site: Site }) {
  return (
    <section id="catalogs" className="bg-white px-5 py-16 text-neutral-950 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>Explore the authority hubs</p>
        <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight md:text-5xl">Five focused catalogs for every stage of your journey.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-neutral-600">Start with education, move into practical solutions, and compare products with a clearer framework.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {site.catalogs.map((catalog, index) => (
            <Link key={catalog.slug} href={`/sites/${site.slug}/category/${catalog.slug}`} className="rounded-3xl border border-black/10 bg-neutral-50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>0{index + 1} / {catalog.role.replace('-', ' ')}</span>
              <h3 className="mt-4 text-xl font-black">{catalog.name}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{catalog.description}</p>
              <span className="mt-5 flex items-center gap-2 text-sm font-black" style={{ color: site.secondary_color }}>Explore catalog <ArrowRight size={15} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero({ site, theme }: { site: Site; theme: { hero: string; label: string } }) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${theme.hero} text-white`}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url(${site.hero})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
      <div className="absolute -right-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto grid min-h-[680px] max-w-7xl content-center px-5 py-20 md:py-28">
        <div className="max-w-4xl rounded-3xl border border-white/15 bg-white/8 p-6 shadow-2xl backdrop-blur-sm md:p-10">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[.24em]" style={{ color: site.accent_color }}><Sparkles size={15} /> {theme.label}</p>
          <h1 className="mt-5 text-5xl font-black leading-[.98] tracking-tight md:text-7xl">{site.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{site.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-black text-white transition hover:-translate-y-0.5 hover:opacity-90" style={{ background: site.secondary_color }} href={`/sites/${site.slug}/quiz`}>{site.primaryCta} <ArrowRight size={18} /></Link>
            <Link className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 font-black transition hover:bg-white/20" href={`/sites/${site.slug}/best-products`}>{site.secondaryCta}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip({ site }: { site: Site }) {
  return (
    <section className="border-y border-black/10 bg-white/90 px-5">
      <div className="mx-auto grid max-w-7xl gap-4 py-5 text-sm font-bold text-neutral-600 sm:grid-cols-3">
        <span className="flex items-center gap-2"><BadgeCheck size={18} style={{ color: site.secondary_color }} /> Clear buyer guidance</span>
        <span className="flex items-center gap-2"><ShieldCheck size={18} style={{ color: site.secondary_color }} /> Ethical affiliate disclosure</span>
        <span className="flex items-center gap-2"><BarChart3 size={18} style={{ color: site.secondary_color }} /> Practical comparison framework</span>
      </div>
    </section>
  );
}

function PainPoints({ site }: { site: Site }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
      <p className="text-sm font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>Start with the real problem</p>
      <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-neutral-950 md:text-6xl">{site.painTitle}</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {site.painPoints.map((item) => <InfoCard key={item.title} title={item.title} text={item.text} site={site} />)}
      </div>
    </section>
  );
}

function Pillars({ site, softClass }: { site: Site; softClass: string }) {
  return (
    <section className={`${softClass} px-5 py-16 text-neutral-950 md:py-24`}>
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>A simpler framework</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Three pillars for a more confident next step.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {site.pillars.map((item, index) => (
            <article key={item.title} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <span className="text-sm font-black" style={{ color: site.secondary_color }}>0{index + 1}</span>
              <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
              <p className="mt-3 leading-7 text-neutral-600">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecommendedProducts({ site }: { site: Site }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 text-neutral-950 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>Recommended resources</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Compare before you commit.</h2>
        </div>
        <Link className="flex items-center gap-2 font-black" href={`/sites/${site.slug}/best-products`}>View comparison guide <ArrowRight size={18} /></Link>
      </div>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {site.productTypes.map((item) => (
          <article key={item.title} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <span className="rounded-full px-3 py-1 text-xs font-black uppercase" style={{ background: `${site.accent_color}55`, color: site.primary_color }}>{item.label}</span>
            <h3 className="mt-6 text-2xl font-black">{item.title}</h3>
            <p className="mt-3 leading-7 text-neutral-600">{item.text}</p>
            <Link className="mt-6 flex items-center gap-2 font-black" style={{ color: site.secondary_color }} href={`/sites/${site.slug}/best-products`}>Explore options <ArrowRight size={16} /></Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeaturedArticles({ site, posts }: { site: Site; posts: Post[] }) {
  return (
    <section className="bg-white px-5 py-16 text-neutral-950 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-sm font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>Content hub</p><h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Guides and honest reviews.</h2></div>
          <Link className="flex items-center gap-2 font-black" href={`/sites/${site.slug}/blog`}>Browse all articles <ArrowRight size={18} /></Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => <PostCard key={post.id} site={site} post={post} />)}
          {!posts.length && site.categories.map((category) => <EditorialCard key={category} category={category} site={site} />)}
        </div>
      </div>
    </section>
  );
}

function QuizSection({ site }: { site: Site }) {
  return (
    <section className="px-5 py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl p-7 text-white shadow-xl md:grid-cols-[1fr_auto] md:items-center md:p-10" style={{ background: site.primary_color }}>
        <div><Compass size={30} style={{ color: site.accent_color }} /><h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight">{site.quizTitle}</h2><p className="mt-4 max-w-2xl leading-7 text-white/75">{site.quizText}</p></div>
        <Link href={`/sites/${site.slug}/quiz`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 font-black text-neutral-950 transition hover:-translate-y-0.5">Take the quiz <ArrowRight size={18} /></Link>
      </div>
    </section>
  );
}

function LeadMagnet({ site, softClass }: { site: Site; softClass: string }) {
  return <section className={`${softClass} px-5 py-16 text-neutral-950 md:py-24`}><div className="mx-auto max-w-3xl text-center"><Mail className="mx-auto" style={{ color: site.secondary_color }} /><p className="mt-5 text-sm font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>Free practical guide</p><h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{site.leadMagnet}</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-neutral-600">Get a focused starting plan and responsible recommendations for your next step.</p><LeadCapture site={site} /></div></section>;
}

function FAQ({ site }: { site: Site }) {
  return <section className="mx-auto max-w-4xl px-5 py-16 text-neutral-950 md:py-24"><p className="text-sm font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>FAQ</p><h2 className="mt-3 text-4xl font-black">Questions worth asking.</h2><div className="mt-8 grid gap-3">{site.faqs.map((item) => <details className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm" key={item.question}><summary className="cursor-pointer font-black">{item.question}</summary><p className="mt-3 leading-7 text-neutral-600">{item.answer}</p></details>)}</div></section>;
}

function Disclosure({ site }: { site: Site }) {
  return <section className="border-t border-black/10 bg-amber-50 px-5 py-6 text-neutral-800"><div className="mx-auto flex max-w-7xl gap-3 text-sm leading-6"><ShieldCheck className="shrink-0 text-amber-700" size={20} /><p><strong>Affiliate disclosure:</strong> This website may earn a commission from qualifying purchases at no extra cost to you. {site.disclaimer}</p></div></section>;
}

function InfoCard({ title, text, site }: { title: string; text: string; site: Site }) {
  return <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"><CheckCircle2 style={{ color: site.secondary_color }} /><h3 className="mt-5 text-2xl font-black text-neutral-950">{title}</h3><p className="mt-3 leading-7 text-neutral-600">{text}</p></article>;
}

function EditorialCard({ category, site }: { category: string; site: Site }) {
  return <article className="rounded-3xl border border-dashed border-black/15 bg-neutral-50 p-6"><BookOpen style={{ color: site.secondary_color }} /><p className="mt-5 text-xs font-black uppercase text-neutral-500">Editorial category</p><h3 className="mt-2 text-2xl font-black">{category}</h3><p className="mt-3 leading-7 text-neutral-600">New practical guides and reviews are being prepared for this topic.</p></article>;
}

export function PostCard({ site, post }: { site: Site; post: Post }) {
  return <Link href={`/sites/${site.slug}/review/${post.slug}`} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><Star className="mb-6" style={{ color: site.secondary_color }} /><div className="text-xs font-black uppercase text-neutral-500">{post.category}</div><h3 className="mt-2 text-xl font-black">{post.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">{post.excerpt}</p><span className="mt-5 flex items-center gap-2 text-sm font-black" style={{ color: site.secondary_color }}>Read review <ArrowRight size={15} /></span></Link>;
}
