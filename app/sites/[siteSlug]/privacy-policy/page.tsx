import { LegalPage } from '../legal-page';

export default function PrivacyPage(props: { params: Promise<{ siteSlug: string }> }) {
  return <LegalPage kind="Privacy Policy" {...props} />;
}
