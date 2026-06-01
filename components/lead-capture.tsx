'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Site } from '@/lib/types';

export function LeadCapture({ site, source = 'lead-magnet', compact = false }: { site: Site; source?: string; compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus('');
    const response = await fetch('/api/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ site_id: site.id, email, website, source, interest: site.niche }),
    });
    setLoading(false);
    setStatus(response.ok ? 'Your guide is reserved. Check your inbox for the next step.' : 'Please enter a valid email address.');
    if (response.ok) setEmail('');
  }

  return (
    <form className={compact ? 'grid gap-3' : 'mt-6 grid gap-3 sm:grid-cols-[1fr_auto]'} onSubmit={submit}>
      <input className="min-h-12 rounded-full border border-black/15 bg-white px-5 text-neutral-900 outline-none focus:border-black/40" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your best email address" aria-label="Email address" />
      <input className="hidden" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} aria-hidden="true" />
      <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-black text-white transition hover:-translate-y-0.5 hover:opacity-90" style={{ background: site.primary_color }} disabled={loading}>
        {loading ? 'Saving...' : 'Get the free guide'} <ArrowRight size={17} />
      </button>
      {status && <p className="flex items-center gap-2 text-sm font-bold sm:col-span-2"><CheckCircle2 size={16} /> {status}</p>}
    </form>
  );
}
