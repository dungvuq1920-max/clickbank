import type { Site, SiteSlug } from './types';

const now = '2026-05-29T00:00:00.000Z';

export const sites: Site[] = [
  {
    id: 'site_neuro_sleep',
    name: 'NeuroRestLab',
    slug: 'neuro-sleep',
    niche: 'Brain / Focus / Sleep',
    domain: 'NeuroRestLab.com',
    description: 'Science-inspired reviews for brain, focus, memory, and sleep products.',
    logo: 'NS',
    primary_color: '#111f3f',
    secondary_color: '#6d5dfc',
    accent_color: '#8dd8ff',
    theme: 'neuro',
    ctaTexts: ['Improve Sleep Tonight', 'Start Sleeping Better', 'Visit Official Website'],
    compliance: 'Do not make medical claims, promise cures, or guarantee health outcomes. Add a health disclaimer.',
    hero: '/assets/hero-brain-focus-sleep.png',
    leadMagnet: '7-night focus and sleep reset checklist',
    created_at: now,
  },
  {
    id: 'site_manifest_signal',
    name: 'InnerAlignmentLab',
    slug: 'manifest-signal',
    niche: 'Spirituality / Manifestation',
    domain: 'InnerAlignmentLab.com',
    description: 'Manifestation, frequency, and subconscious growth reviews with grounded guidance.',
    logo: 'MS',
    primary_color: '#35195f',
    secondary_color: '#d6a84f',
    accent_color: '#f5dc89',
    theme: 'manifest',
    ctaTexts: ['Unlock Your Manifestation Potential', 'Discover The Method', 'Activate The Signal'],
    compliance: 'Do not guarantee spiritual, financial, or life outcomes. Position as personal development.',
    hero: '/assets/hero-spiritual-manifestation.png',
    leadMagnet: 'Manifestation journaling prompts starter pack',
    created_at: now,
  },
  {
    id: 'site_ai_hustle',
    name: 'DigitalOperatorAI',
    slug: 'ai-hustle',
    niche: 'AI MMO / Side Hustle',
    domain: 'DigitalOperatorAI.com',
    description: 'AI tools, faceless content systems, and realistic side-hustle training reviews.',
    logo: 'AI',
    primary_color: '#080d0b',
    secondary_color: '#25b987',
    accent_color: '#8dffca',
    theme: 'ai',
    ctaTexts: ['Start Your AI Business', 'Get Instant Access', 'See The Training'],
    compliance: 'Do not promise income or guarantee earnings. Add an income disclaimer.',
    hero: '/assets/hero-ai-mmo.png',
    leadMagnet: 'AI affiliate workflow map for beginners',
    created_at: now,
  },
  {
    id: 'site_metabolic_reset',
    name: 'HealthyResetLab',
    slug: 'metabolic-reset',
    niche: 'Weight Loss / Metabolism',
    domain: 'healthyresetlab.com',
    description: 'Fresh, responsible reviews for weight loss, metabolism, and healthy routine offers.',
    logo: 'MR',
    primary_color: '#174431',
    secondary_color: '#ff8a3d',
    accent_color: '#93e6aa',
    theme: 'metabolic',
    ctaTexts: ['Start Your Transformation', 'Boost Your Metabolism', 'Discover The Program'],
    compliance: 'Do not make medical claims, promise weight loss, or guarantee results. Add a health disclaimer.',
    hero: '/assets/hero-metabolic-reset.svg',
    leadMagnet: 'Metabolism-friendly meal planning checklist',
    created_at: now,
  },
  {
    id: 'site_love_psychology',
    name: 'ConnectionDecoded',
    slug: 'love-psychology',
    niche: 'Dating / Relationship',
    domain: 'connectiondecoded.com',
    description: 'Soft, practical relationship reviews focused on communication and emotional growth.',
    logo: 'LP',
    primary_color: '#7f1d3a',
    secondary_color: '#ff5c8a',
    accent_color: '#ffd0dd',
    theme: 'love',
    ctaTexts: ['Discover The Secret', 'Improve Your Relationship', 'Learn The Method'],
    compliance: 'Avoid manipulative language. Focus on communication, empathy, and relationship improvement.',
    hero: '/assets/hero-love-psychology.svg',
    leadMagnet: 'Better conversation prompts for couples and dating',
    created_at: now,
  },
];

export function getSiteBySlug(slug: string): Site | undefined {
  return sites.find((site) => site.slug === slug);
}

export function getSiteById(id: string): Site | undefined {
  return sites.find((site) => site.id === id);
}

export function getRuntimeSite(): Site {
  const slug = (process.env.SITE_SLUG || 'neuro-sleep') as SiteSlug;
  return getSiteBySlug(slug) || sites[0];
}
