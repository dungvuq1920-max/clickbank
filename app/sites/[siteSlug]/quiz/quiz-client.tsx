'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Compass } from 'lucide-react';
import type { Site } from '@/lib/types';
import { LeadCapture } from '@/components/lead-capture';

export function QuizClient({ site }: { site: Site }) {
  const [choice, setChoice] = useState('');
  const pillar = site.pillars.find((item) => item.title === choice);

  return (
    <main className="bg-neutral-50 px-5 py-16 text-neutral-950 md:py-24">
      <section className="mx-auto max-w-3xl">
        <Compass size={34} style={{ color: site.secondary_color }} />
        <p className="mt-5 text-sm font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>One-minute quiz</p>
        <h1 className="mt-3 text-5xl font-black tracking-tight md:text-6xl">{site.quizTitle}</h1>
        <p className="mt-5 text-lg leading-8 text-neutral-600">{site.quizText}</p>
        <div className="mt-10 grid gap-3">
          {site.pillars.map((item) => <button key={item.title} type="button" onClick={() => setChoice(item.title)} className={`rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 ${choice === item.title ? 'border-transparent text-white shadow-lg' : 'border-black/10 bg-white'}`} style={choice === item.title ? { background: site.primary_color } : undefined}><strong className="text-xl">{item.title}</strong><span className={`mt-2 block leading-7 ${choice === item.title ? 'text-white/75' : 'text-neutral-600'}`}>{item.text}</span></button>)}
        </div>

        {pillar && <section className="mt-10 rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:p-8"><CheckCircle2 style={{ color: site.secondary_color }} /><p className="mt-5 text-sm font-black uppercase tracking-widest" style={{ color: site.secondary_color }}>Your starting point</p><h2 className="mt-2 text-3xl font-black">Begin with {pillar.title.toLowerCase()}.</h2><p className="mt-3 leading-7 text-neutral-600">{pillar.text}</p><p className="mt-6 font-black">Get the free guide: {site.leadMagnet}</p><LeadCapture compact site={site} source={`quiz-${pillar.title.toLowerCase().replace(/\s+/g, '-')}`} /><Link className="mt-6 inline-flex items-center gap-2 font-black" style={{ color: site.secondary_color }} href={`/sites/${site.slug}/best-products`}>Review your comparison guide <ArrowRight size={16} /></Link></section>}
      </section>
    </main>
  );
}
