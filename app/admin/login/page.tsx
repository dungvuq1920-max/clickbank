import { Card } from '@/components/ui';

export default function LoginPage() {
  return (
    <main className="grid min-h-[calc(100vh-4rem)] place-items-center p-5">
      <Card className="w-full max-w-md">
        <p className="text-sm font-black uppercase text-yellow-600">Admin Login</p>
        <h1 className="mt-2 text-3xl font-black">Supabase Auth Ready</h1>
        <p className="mt-3 text-neutral-600">
          Add Supabase credentials in `.env.local` to enable production authentication. Local mode keeps the dashboard open for development.
        </p>
        <form className="mt-6 grid gap-3">
          <input className="min-h-11 rounded-lg border border-black/15 px-3" placeholder="admin@email.com" />
          <input className="min-h-11 rounded-lg border border-black/15 px-3" placeholder="Password" type="password" />
          <button className="min-h-11 rounded-lg bg-neutral-950 font-black text-white" type="button">Continue</button>
        </form>
      </Card>
    </main>
  );
}
