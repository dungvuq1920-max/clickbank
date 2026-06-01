# Sites & Niches Tree for CLICKBANK Workspace

Below is a directory-tree infographic (Mermaid) and a plain text tree summarizing websites and niches found in `lib/sites.ts` and `app/sites/[siteSlug]`.

```mermaid
flowchart TD
  root[CLICKBANK Sites]
  root --> neuro[NeuroRestLab\n(neuro-sleep)\nNiche: Brain / Focus / Sleep\nDomain: NeuroRestLab.com]
  root --> manifest[InnerAlignmentLab\n(manifest-signal)\nNiche: Spirituality / Manifestation\nDomain: InnerAlignmentLab.com]
  root --> ai[DigitalOperatorAI\n(ai-hustle)\nNiche: AI MMO / Side Hustle\nDomain: DigitalOperatorAI.com]
  root --> metabolic[HealthyResetLab\n(metabolic-reset)\nNiche: Weight Loss / Metabolism\nDomain: healthyresetlab.com]
  root --> love[ConnectionDecoded\n(love-psychology)\nNiche: Dating / Relationship\nDomain: connectiondecoded.com]

  subgraph pages_neuro [NeuroRestLab pages]
    neuro_home[Home]
    neuro_about[About]
    neuro_blog[Blog]
    neuro_review[Reviews]
    neuro_review_article[Review Article]
    neuro_category[Category]
    neuro_contact[Contact]
    neuro_privacy[Privacy Policy]
    neuro_terms[Terms]
    neuro_affiliate[Affiliate Disclosure]
    neuro_legal[Legal Page]
  end
  neuro --> pages_neuro
  pages_neuro --> neuro_home
  pages_neuro --> neuro_about
  pages_neuro --> neuro_blog
  pages_neuro --> neuro_review
  pages_neuro --> neuro_review_article
  pages_neuro --> neuro_category
  pages_neuro --> neuro_contact
  pages_neuro --> neuro_privacy
  pages_neuro --> neuro_terms
  pages_neuro --> neuro_affiliate
  pages_neuro --> neuro_legal

  %% Reuse same page structure for other sites
  manifest --> pages_manifest[InnerAlignmentLab pages]
  ai --> pages_ai[DigitalOperatorAI pages]
  metabolic --> pages_metabolic[HealthyResetLab pages]
  love --> pages_love[ConnectionDecoded pages]

  pages_manifest --> AboutM[About]
  pages_manifest --> BlogM[Blog]
  pages_manifest --> ReviewM[Reviews]
  pages_manifest --> CategoryM[Category]
  pages_manifest --> ContactM[Contact]
  pages_manifest --> PrivacyM[Privacy Policy]
  pages_manifest --> TermsM[Terms]
  pages_manifest --> AffiliateM[Affiliate Disclosure]
  pages_manifest --> LegalM[Legal Page]

  pages_ai --> AboutA[About]
  pages_ai --> BlogA[Blog]
  pages_ai --> ReviewA[Reviews]
  pages_ai --> CategoryA[Category]
  pages_ai --> ContactA[Contact]
  pages_ai --> PrivacyA[Privacy Policy]
  pages_ai --> TermsA[Terms]
  pages_ai --> AffiliateA[Affiliate Disclosure]
  pages_ai --> LegalA[Legal Page]

  pages_metabolic --> AboutR[About]
  pages_metabolic --> BlogR[Blog]
  pages_metabolic --> ReviewR[Reviews]
  pages_metabolic --> CategoryR[Category]
  pages_metabolic --> ContactR[Contact]
  pages_metabolic --> PrivacyR[Privacy Policy]
  pages_metabolic --> TermsR[Terms]
  pages_metabolic --> AffiliateR[Affiliate Disclosure]
  pages_metabolic --> LegalR[Legal Page]

  pages_love --> AboutL[About]
  pages_love --> BlogL[Blog]
  pages_love --> ReviewL[Reviews]
  pages_love --> CategoryL[Category]
  pages_love --> ContactL[Contact]
  pages_love --> PrivacyL[Privacy Policy]
  pages_love --> TermsL[Terms]
  pages_love --> AffiliateL[Affiliate Disclosure]
  pages_love --> LegalL[Legal Page]

  %% Admin + API
  root --> admin[Admin area]
  admin --> admin_dashboard[Dashboard]
  admin --> admin_login[Login]
  admin --> admin_posts[Posts editor]
  root --> api[API routes]
  api --> api_generate[generate-article]
  api --> api_posts[posts CRUD]
  api --> api_products[products CRUD]

  %% Data sources
  root --> data[data]
  data --> posts_json[posts.json]
  data --> lib_sites[lib/sites.ts]
```


Plain tree:

- CLICKBANK
  - Sites
    - NeuroRestLab (neuro-sleep) — Brain / Focus / Sleep — NeuroRestLab.com
      - pages: home, about, blog, reviews, review article, category, contact, privacy-policy, terms, affiliate-disclosure, legal-page
    - InnerAlignmentLab (manifest-signal) — Spirituality / Manifestation — InnerAlignmentLab.com
      - pages: home, about, blog, reviews, category, contact, privacy-policy, terms, affiliate-disclosure, legal-page
    - DigitalOperatorAI (ai-hustle) — AI MMO / Side Hustle — DigitalOperatorAI.com
      - pages: home, about, blog, reviews, category, contact, privacy-policy, terms, affiliate-disclosure, legal-page
    - HealthyResetLab (metabolic-reset) — Weight Loss / Metabolism — healthyresetlab.com
      - pages: home, about, blog, reviews, category, contact, privacy-policy, terms, affiliate-disclosure, legal-page
    - ConnectionDecoded (love-psychology) — Dating / Relationship — connectiondecoded.com
      - pages: home, about, blog, reviews, category, contact, privacy-policy, terms, affiliate-disclosure, legal-page
  - Admin
    - dashboard, login, posts editor, post editor UI
  - API
    - generate-article, posts routes, products routes
  - Data
    - lib/sites.ts, posts.json

---

File saved: [SITES_TREE.md](SITES_TREE.md#L1)
