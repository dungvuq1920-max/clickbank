'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, KeyRound, Loader2, Save, ShieldCheck } from 'lucide-react';
import { Button, Card, Field, inputClass } from '@/components/ui';

type PublicSettings = {
  baseUrl: string;
  model: string;
  configured: boolean;
  source: string;
  updatedAt: string | null;
};

export default function ApiSettingsPanel() {
  const [form, setForm] = useState({ baseUrl: 'https://api.shopaikey.com/v1', model: 'gpt-4o', apiKey: '' });
  const [settings, setSettings] = useState<PublicSettings | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ai-settings')
      .then((response) => response.json())
      .then((payload: PublicSettings) => {
        setSettings(payload);
        setForm((current) => ({ ...current, baseUrl: payload.baseUrl, model: payload.model }));
      })
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/ai-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Unable to save AI settings.');
      setSettings(payload);
      setForm((current) => ({ ...current, apiKey: '' }));
      setMessage('API configuration saved securely on this Railway service.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save AI settings.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="grid gap-5 lg:col-span-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-emerald-700">Server-side connection</p>
          <h2 className="mt-2 text-2xl font-black">AI API Configuration</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">Configure an OpenAI-compatible API for this website. The key is stored in the Railway volume and is never returned to the browser after saving.</p>
        </div>
        <KeyRound className="shrink-0 text-emerald-700" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="API base URL"><input className={inputClass} value={form.baseUrl} onChange={(event) => setForm({ ...form, baseUrl: event.target.value })} /></Field>
        <Field label="Model"><input className={inputClass} value={form.model} onChange={(event) => setForm({ ...form, model: event.target.value })} /></Field>
      </div>
      <Field label={settings?.configured ? 'Replace API key (leave blank to keep current key)' : 'API key'}>
        <input className={inputClass} type="password" autoComplete="new-password" value={form.apiKey} onChange={(event) => setForm({ ...form, apiKey: event.target.value })} placeholder={settings?.configured ? 'Current key is configured' : 'Paste server-side API key'} />
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" onClick={save} disabled={loading || !form.baseUrl || !form.model}>{loading ? <Loader2 className="animate-spin" size={17} /> : <Save size={17} />} Save API Connection</Button>
        {settings?.configured ? <span className="flex items-center gap-2 text-sm font-black text-emerald-700"><CheckCircle2 size={17} /> Connected via {settings.source}</span> : <span className="flex items-center gap-2 text-sm font-black text-amber-700"><ShieldCheck size={17} /> No API key: fallback drafts only</span>}
      </div>
      {message && <p className="rounded-xl border border-black/10 bg-neutral-50 p-4 text-sm font-bold">{message}</p>}
    </Card>
  );
}
