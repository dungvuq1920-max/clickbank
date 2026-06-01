import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  if (process.env.APP_MODE === 'site') {
    redirect(`/sites/${process.env.SITE_SLUG || 'neuro-sleep'}`);
  }

  redirect('/admin/dashboard');
}
