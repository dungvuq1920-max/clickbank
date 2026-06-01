import { LegalPage } from '../legal-page';

export default function AffiliateDisclosurePage(props: { params: Promise<{ siteSlug: string }> }) {
  return <LegalPage kind="Affiliate Disclosure" {...props} />;
}
