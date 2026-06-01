import { LegalPage } from '../legal-page';

export default function TermsPage(props: { params: Promise<{ siteSlug: string }> }) {
  return <LegalPage kind="Terms" {...props} />;
}
