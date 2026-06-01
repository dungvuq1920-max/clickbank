import { promises as fs } from 'node:fs';
import path from 'node:path';

export type AiSettings = {
  baseUrl: string;
  model: string;
  apiKey: string;
  updatedAt?: string;
};

const settingsFile = path.join(process.cwd(), 'data', 'ai-settings.json');
const defaults = {
  baseUrl: 'https://api.shopaikey.com/v1',
  model: 'gpt-4o',
};

async function readSavedSettings(): Promise<Partial<AiSettings>> {
  try {
    return JSON.parse(await fs.readFile(settingsFile, 'utf8')) as Partial<AiSettings>;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return {};
    throw error;
  }
}

export async function getAiSettings(): Promise<AiSettings> {
  const saved = await readSavedSettings();
  return {
    baseUrl: process.env.AI_BASE_URL || saved.baseUrl || defaults.baseUrl,
    model: process.env.AI_MODEL || saved.model || defaults.model,
    apiKey: process.env.AI_API_KEY || saved.apiKey || '',
    updatedAt: saved.updatedAt,
  };
}

export async function saveAiSettings(input: { baseUrl: string; model: string; apiKey?: string }) {
  const current = await readSavedSettings();
  const next: AiSettings = {
    baseUrl: defaults.baseUrl,
    model: input.model.trim(),
    apiKey: input.apiKey?.trim() || current.apiKey || '',
    updatedAt: new Date().toISOString(),
  };
  await fs.mkdir(path.dirname(settingsFile), { recursive: true });
  await fs.writeFile(settingsFile, JSON.stringify(next, null, 2), 'utf8');
  return next;
}

export async function testAiSettings(input?: { apiKey?: string; model?: string }) {
  const current = await getAiSettings();
  const apiKey = input?.apiKey?.trim() || current.apiKey;
  const model = input?.model?.trim() || current.model;
  if (!apiKey) throw new Error('Paste your ShopAIKey API key first.');
  const response = await fetch(`${defaults.baseUrl}/models`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(12000),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.error?.message || payload?.message || `ShopAIKey returned HTTP ${response.status}.`);
  const models = Array.isArray(payload?.data) ? payload.data.map((item: { id?: string }) => item.id).filter(Boolean) : [];
  return {
    ok: true,
    model,
    modelAvailable: models.length ? models.includes(model) : null,
    availableModels: models.slice(0, 80),
  };
}

export function publicAiSettings(settings: AiSettings) {
  return {
    baseUrl: settings.baseUrl,
    model: settings.model,
    configured: Boolean(settings.apiKey),
    source: process.env.AI_API_KEY ? 'environment' : settings.apiKey ? 'admin-volume' : 'fallback-draft',
    updatedAt: settings.updatedAt || null,
  };
}
