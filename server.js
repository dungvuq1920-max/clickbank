import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const siteKey = process.env.SITE_KEY || 'mind';
const port = Number(process.env.PORT || 3001);

const app = express();
app.use(express.json({ limit: '1mb' }));

const dataDir = path.join(process.cwd(), 'data');
const postsFile = path.join(dataDir, 'posts.json');

async function readPosts() {
  try {
    const raw = await fs.readFile(postsFile, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writePosts(posts) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2), 'utf8');
}

function slugify(text) {
  const base = String(text || 'review')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);
  return base || `review-${Date.now()}`;
}

function getTitle(html, fallback) {
  const match = String(html || '').match(/<h1[^>]*>(.*?)<\/h1>/i);
  return match ? match[1].replace(/<[^>]+>/g, '').trim() : fallback;
}

function stripCodeFence(text) {
  return String(text || '').replace(/^```(?:html|markdown)?\s*/i, '').replace(/```\s*$/i, '').trim();
}

function imageUrl(prompt) {
  const clean = encodeURIComponent(`${prompt}, premium editorial affiliate blog illustration, no text, no watermark`);
  return `https://image.pollinations.ai/prompt/${clean}?width=1200&height=720&nologo=true`;
}

function articlePrompt({ productUrl, affiliateUrl, audience, angle, tone, siteName, reviewPrompt }) {
  return `
Bạn là chuyên gia affiliate marketing ClickBank và copywriter tiếng Việt.
Hãy tạo một bài review chi tiết, thân thiện SEO, thuyết phục nhưng không hứa hẹn quá mức.

Site: ${siteName}
Product URL: ${productUrl}
Affiliate URL cần chèn CTA: ${affiliateUrl}
Đối tượng: ${audience}
Góc nội dung: ${angle}
Tone: ${tone}
Prompt preset riêng cho ngách: ${reviewPrompt || 'Không có'}

Yêu cầu output CHỈ là HTML sạch, không markdown, không CSS, không script.
Độ dài khoảng 1600-2200 từ tiếng Việt.
Cấu trúc bắt buộc:
- h1 tiêu đề review có lợi ích cụ thể
- đoạn mở đầu khớp intent người đọc từ TikTok/Reels, SEO hoặc advertorial
- Nếu không truy cập được nội dung Product URL, hãy nói theo hướng "dựa trên thông tin trên trang chính thức" một cách thận trọng, không bịa số liệu, giá, bonus hoặc claim cụ thể.
- Suy luận tên/chủ đề sản phẩm từ URL nếu có thể, nhưng không bịa chứng nhận, nghiên cứu, testimonial hoặc kết quả.
- 1 bảng tóm tắt nhanh với rating, phù hợp với ai, điểm mạnh, điểm cần cân nhắc
- 3 vị trí CTA dùng đúng href="${affiliateUrl}" với anchor text tự nhiên
- ít nhất 6 h2, có phần "Sản phẩm này giải quyết vấn đề gì?", "Tính năng nổi bật", "Ưu và nhược điểm", "Ai nên dùng?", "Cách tận dụng để có kết quả tốt hơn", "Kết luận"
- Nếu là Brain/Focus/Sleep: ưu tiên blog SEO, landing page, quiz funnel; có thể nhắc Brain Song, sleep hacks, dopamine/focus, memory supplements nếu phù hợp.
- Nếu là Spiritual/Manifestation: ưu tiên advertorial, long-form review, VSL bridge; có thể nhắc manifestation guides, frequency review, subconscious content nếu phù hợp.
- Nếu là AI MMO/Side Hustle: ưu tiên tutorial blog, tools comparison, email capture funnel; có thể nhắc AI affiliate tools, faceless TikTok, automation content nếu phù hợp.
- 3 thẻ img minh họa, src dùng placeholder %%IMAGE_1%%, %%IMAGE_2%%, %%IMAGE_3%% và alt tiếng Việt cụ thể
- disclaimer affiliate ngắn ở cuối
Không đưa claim y tế/tài chính chắc chắn, không cam kết thu nhập, chữa bệnh, hoặc kết quả tuyệt đối.
`;
}

async function callOpenAI(apiKey, model, prompt) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model || 'gpt-4.1-mini',
      input: prompt,
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || 'OpenAI request failed');
  return data.output_text || data.output?.flatMap((o) => o.content || []).map((c) => c.text).join('\n');
}

async function callShopAIKey(apiKey, model, prompt) {
  const response = await fetch('https://api.shopaikey.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model || 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert Vietnamese affiliate marketing copywriter. Return clean HTML only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 5000,
      temperature: 0.8,
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || data?.message || 'ShopAIKey request failed');
  return data.choices?.[0]?.message?.content || '';
}

async function callClaude(apiKey, model, prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model || 'claude-3-5-sonnet-latest',
      max_tokens: 5000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || 'Claude request failed');
  return data.content?.map((part) => part.text || '').join('\n');
}

async function callGemini(apiKey, model, prompt) {
  const selected = model || 'gemini-1.5-pro';
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selected}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || 'Gemini request failed');
  return data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('\n');
}

function demoArticle({ affiliateUrl, audience, angle, siteName }) {
  return `
    <h1>Review ${siteName}: Có đáng thử cho người muốn cải thiện cuộc sống hằng ngày?</h1>
    <p>Nếu bạn đang kéo traffic từ TikTok/Reels bằng nội dung faceless, một bài review rõ ràng sẽ giúp người xem chuyển từ tò mò sang click có chủ đích. Bài viết này phân tích sản phẩm từ góc nhìn thực tế, dễ hiểu và không phóng đại.</p>
    <p><a href="${affiliateUrl}" target="_blank" rel="nofollow sponsored noopener">Xem ưu đãi chính thức tại đây</a></p>
    <img src="%%IMAGE_1%%" alt="Minh họa hành trình cải thiện thói quen cá nhân" />
    <h2>Tóm tắt nhanh</h2>
    <table><tbody><tr><th>Phù hợp với</th><td>${audience || 'Người mới muốn có lộ trình rõ ràng'}</td></tr><tr><th>Góc nổi bật</th><td>${angle || 'Dễ áp dụng, nội dung có thể triển khai thành series ngắn'}</td></tr><tr><th>Cần cân nhắc</th><td>Nên đọc kỹ trang bán hàng, chính sách hoàn tiền và kỳ vọng cá nhân.</td></tr></tbody></table>
    <h2>Sản phẩm này giải quyết vấn đề gì?</h2>
    <p>Sản phẩm hướng đến người đang quá tải thông tin và muốn có một phương pháp được đóng gói gọn gàng. Với affiliate global, điểm mạnh là thông điệp có thể chuyển thành nhiều video ngắn: vấn đề, sai lầm phổ biến, checklist, câu chuyện trước-sau và lời mời đọc review.</p>
    <h2>Tính năng nổi bật</h2>
    <p>Nội dung thường được trình bày theo từng bước, giúp người mua dễ bắt đầu. Đây là dạng sản phẩm phù hợp để bạn xây funnel bằng bài blog, short video và email follow-up.</p>
    <p><a href="${affiliateUrl}" target="_blank" rel="nofollow sponsored noopener">Kiểm tra chi tiết sản phẩm trên trang chính thức</a></p>
    <img src="%%IMAGE_2%%" alt="Minh họa checklist đánh giá sản phẩm affiliate" />
    <h2>Ưu và nhược điểm</h2>
    <p><strong>Ưu điểm:</strong> dễ giải thích, có thể tạo nhiều angle content, phù hợp với người mới. <strong>Nhược điểm:</strong> kết quả phụ thuộc vào mức độ áp dụng, không nên xem như giải pháp tức thì.</p>
    <h2>Ai nên dùng?</h2>
    <p>Người thích tự học, cần cấu trúc rõ ràng và sẵn sàng thử trong một khoảng thời gian đủ dài sẽ phù hợp hơn người chỉ tìm kết quả nhanh.</p>
    <h2>Cách tận dụng để có kết quả tốt hơn</h2>
    <p>Hãy ghi lại mục tiêu ban đầu, theo dõi tiến trình hằng tuần và kết hợp nội dung sản phẩm với thói quen thực tế. Với creator, bạn có thể biến mỗi bài học thành một video ngắn kèm CTA về review đầy đủ.</p>
    <img src="%%IMAGE_3%%" alt="Minh họa người dùng theo dõi tiến trình sau khi mua sản phẩm" />
    <h2>Kết luận</h2>
    <p>Nếu thông điệp trên trang bán hàng khớp với nhu cầu của bạn, sản phẩm đáng để xem xét. Điều quan trọng là đọc kỹ cam kết, chính sách hoàn tiền và chọn mua qua link chính thức.</p>
    <p><a href="${affiliateUrl}" target="_blank" rel="nofollow sponsored noopener">Truy cập trang sản phẩm chính thức</a></p>
    <p><small>Disclosure: Bài viết có thể chứa affiliate link. Nếu bạn mua qua link này, website có thể nhận hoa hồng mà không làm tăng chi phí của bạn.</small></p>
  `;
}

app.post('/api/generate-review', async (req, res) => {
  try {
    const { provider, apiKey, model, productUrl, affiliateUrl, audience, angle, tone, siteName, reviewPrompt, imagePrompt } = req.body || {};
    if (!productUrl || !affiliateUrl) return res.status(400).json({ error: 'Cần nhập product URL và affiliate URL.' });

    const prompt = articlePrompt({ productUrl, affiliateUrl, audience, angle, tone, siteName, reviewPrompt });
    let html;
    if (!apiKey || provider === 'demo') {
      html = demoArticle({ productUrl, affiliateUrl, audience, angle, siteName });
    } else if (provider === 'openai') {
      html = await callOpenAI(apiKey, model, prompt);
    } else if (provider === 'shopaikey') {
      html = await callShopAIKey(apiKey, model, prompt);
    } else if (provider === 'claude') {
      html = await callClaude(apiKey, model, prompt);
    } else if (provider === 'gemini') {
      html = await callGemini(apiKey, model, prompt);
    } else {
      return res.status(400).json({ error: 'Provider không hợp lệ.' });
    }

    const imagePrompts = [
      `${siteName} ${imagePrompt || angle || ''} hero visual for product URL ${productUrl}`,
      `${siteName} ${imagePrompt || angle || ''} product review checklist and decision table`,
      `${siteName} ${imagePrompt || angle || ''} faceless user workflow after reading review`,
    ];

    html = stripCodeFence(html)
      .replaceAll('%%IMAGE_1%%', imageUrl(imagePrompts[0]))
      .replaceAll('%%IMAGE_2%%', imageUrl(imagePrompts[1]))
      .replaceAll('%%IMAGE_3%%', imageUrl(imagePrompts[2]));

    res.json({ html, imagePrompts });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Không thể tạo bài review.' });
  }
});

app.get('/api/posts', async (req, res) => {
  const posts = await readPosts();
  const { site, status } = req.query;
  const filtered = posts.filter((post) => (!site || post.siteKey === site) && (!status || post.status === status));
  res.json(filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
});

app.get('/api/posts/:slug', async (req, res) => {
  const posts = await readPosts();
  const post = posts.find((item) => item.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  res.json(post);
});

app.post('/api/posts', async (req, res) => {
  const now = new Date().toISOString();
  const body = req.body || {};
  const posts = await readPosts();
  const id = body.id || crypto.randomUUID();
  const existingIndex = posts.findIndex((post) => post.id === id);
  const title = body.title || getTitle(body.html, 'Untitled review');
  const existing = existingIndex >= 0 ? posts[existingIndex] : {};
  const post = {
    ...existing,
    id,
    siteKey: body.siteKey,
    siteName: body.siteName,
    title,
    slug: body.slug || existing.slug || `${slugify(title)}-${id.slice(0, 8)}`,
    productUrl: body.productUrl,
    affiliateUrl: body.affiliateUrl,
    provider: body.provider || 'demo',
    model: body.model || '',
    audience: body.audience || '',
    angle: body.angle || '',
    tone: body.tone || '',
    reviewPrompt: body.reviewPrompt || '',
    imagePrompt: body.imagePrompt || '',
    html: body.html || '',
    status: body.status || existing.status || 'draft',
    createdAt: existing.createdAt || now,
    updatedAt: now,
    publishedAt: body.status === 'published' ? now : existing.publishedAt || null,
  };

  if (!post.siteKey || !post.productUrl || !post.affiliateUrl || !post.html) {
    return res.status(400).json({ error: 'Missing site, product URL, affiliate URL, or article HTML.' });
  }

  if (existingIndex >= 0) posts[existingIndex] = post;
  else posts.push(post);
  await writePosts(posts);
  res.json(post);
});

app.delete('/api/posts/:id', async (req, res) => {
  const posts = await readPosts();
  const next = posts.filter((post) => post.id !== req.params.id);
  await writePosts(next);
  res.json({ ok: true });
});

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'spa',
  define: {
    'import.meta.env.VITE_SITE_KEY': JSON.stringify(siteKey),
  },
});

app.use(vite.middlewares);
app.listen(port, () => {
  console.log(`${siteKey} site running at http://localhost:${port}`);
});
