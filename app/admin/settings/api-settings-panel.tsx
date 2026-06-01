'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, KeyRound, Loader2, PlugZap, Save, ShieldCheck } from 'lucide-react';
import { Button, Card, Field, inputClass } from '@/components/ui';

type PublicSettings = {
  baseUrl: string;
  model: string;
  configured: boolean;
  source: string;
};

export default function ApiSettingsPanel() {
  const [form, setForm] = useState({ model: 'gpt-4o', apiKey: '' });
  const [settings, setSettings] = useState<PublicSettings | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ai-settings')
      .then((response) => response.json())
      .then((payload: PublicSettings) => {
        setSettings(payload);
        setForm((current) => ({ ...current, model: payload.model }));
      })
      .finally(() => setLoading(false));
  }, []);

  async function request(method: 'POST' | 'PUT') {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/ai-settings', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: form.apiKey, model: form.model, baseUrl: 'https://api.shopaikey.com/v1' }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Unable to connect to ShopAIKey.');
      if (method === 'PUT') {
        setMessage(payload.modelAvailable === false ? `Connected, but model "${form.model}" was not listed for this key. Choose a model included in your ShopAIKey group.` : 'Connection successful. Your ShopAIKey key is valid.');
      } else {
        setSettings(payload);
        setForm((current) => ({ ...current, apiKey: '' }));
        setMessage('ShopAIKey connection saved securely on this Railway service.');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to connect to ShopAIKey.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="grid gap-5 border-emerald-900/15">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.22em] text-emerald-700">Step 1 / Connect ShopAIKey</p>
          <h2 className="mt-2 text-2xl font-black">Paste your ShopAIKey API key</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">Configured for ShopAIKey OpenAI format: <strong>https://api.shopaikey.com/v1</strong>. The studio sends <strong>Authorization: Bearer &lt;key&gt;</strong> to <strong>/models</strong> for testing and <strong>/chat/completions</strong> for article generation. <a className="font-black text-emerald-700 underline" href="https://shopaikey.com/docs/openai-format" target="_blank" rel="noopener noreferrer">Open official guide</a>.</p>
        </div>
        <KeyRound className="shrink-0 text-emerald-700" />
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_260px]">
        <Field label={settings?.configured ? 'ShopAIKey API key (leave blank to keep current key)' : 'ShopAIKey API key'}>
          <input className={inputClass} type="password" autoComplete="new-password" value={form.apiKey} onChange={(event) => setForm({ ...form, apiKey: event.target.value })} placeholder={settings?.configured ? 'A key is already stored server-side' : 'Paste your key from shopaikey.com'} />
        </Field>
        <Field label="Chat model">
          <input className={inputClass} value={form.model} onChange={(event) => setForm({ ...form, model: event.target.value })} placeholder="gpt-4o" />
        </Field>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" className="bg-emerald-700" onClick={() => request('PUT')} disabled={loading || (!form.apiKey && !settings?.configured)}>{loading ? <Loader2 className="animate-spin" size={17} /> : <PlugZap size={17} />} Test Connection</Button>
        <Button type="button" onClick={() => request('POST')} disabled={loading || !form.model || (!form.apiKey && !settings?.configured)}><Save size={17} /> Save Key</Button>
        {settings?.configured ? <span className="flex items-center gap-2 text-sm font-black text-emerald-700"><CheckCircle2 size={17} /> Key stored server-side</span> : <span className="flex items-center gap-2 text-sm font-black text-amber-700"><ShieldCheck size={17} /> Add a key to enable real AI generation</span>}
      </div>
      {message && <p className="rounded-xl border border-black/10 bg-neutral-50 p-4 text-sm font-bold">{message}</p>}
    </Card>
  );
}
