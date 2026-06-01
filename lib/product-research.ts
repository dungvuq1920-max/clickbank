import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

const maxPageBytes = 1000000;
const maxPageCharacters = 14000;
const maxRedirects = 4;

function isPrivateIp(address: string) {
  if (isIP(address) === 4) {
    const [a, b] = address.split('.').map(Number);
    return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
  }
  const normalized = address.toLowerCase();
  return normalized === '::1' || normalized === '::' || normalized.startsWith('fc') || normalized.startsWith('fd') || normalized.startsWith('fe80');
}

async function assertPublicProductUrl(rawUrl: string) {
  const url = new URL(rawUrl);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Product URL must use HTTP or HTTPS.');
  const hostname = url.hostname.toLowerCase();
  if (hostname === 'localhost' || hostname.endsWith('.local')) throw new Error('Product URL must point to a public sales page.');
  const addresses = isIP(hostname) ? [{ address: hostname }] : await lookup(hostname, { all: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateIp(address))) throw new Error('Product URL resolved to a blocked internal address.');
  return url;
}

function textFromHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxPageCharacters);
}

async function readLimitedText(response: Response) {
  const contentLength = Number(response.headers.get('content-length') || 0);
  if (contentLength > maxPageBytes) throw new Error('Sales page is too large to analyze safely.');
  if (!response.body) return '';
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxPageBytes) {
      await reader.cancel();
      throw new Error('Sales page is too large to analyze safely.');
    }
    chunks.push(value);
  }
  const combined = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(combined);
}

export async function researchProductPage(rawUrl: string) {
  let url = await assertPublicProductUrl(rawUrl);
  for (let redirect = 0; redirect <= maxRedirects; redirect++) {
    const response = await fetch(url, {
      redirect: 'manual',
      signal: AbortSignal.timeout(12000),
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AffiliateResearchBot/1.0)' },
    });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location || redirect === maxRedirects) throw new Error('Sales page redirect chain could not be followed safely.');
      url = await assertPublicProductUrl(new URL(location, url).toString());
      continue;
    }
    if (!response.ok) throw new Error(`Sales page returned HTTP ${response.status}.`);
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html') && !contentType.includes('text/plain')) throw new Error('Sales page did not return readable text.');
    const text = textFromHtml(await readLimitedText(response));
    if (text.length < 120) throw new Error('Sales page did not provide enough readable product information.');
    return { sourceUrl: url.toString(), text };
  }
  throw new Error('Sales page redirect chain could not be followed safely.');
}
