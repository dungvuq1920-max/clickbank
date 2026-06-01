import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Button({
  children,
  className,
  href,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: string }) {
  const classes = cn(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-neutral-950 px-4 font-extrabold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50',
    className,
  );

  if (href) return <Link className={classes} href={href}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('rounded-lg border border-black/10 bg-white p-5 shadow-sm', className)}>{children}</div>;
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-extrabold text-neutral-800">
      {label}
      {children}
    </label>
  );
}

export const inputClass = 'min-h-11 w-full rounded-lg border border-black/15 bg-white px-3 text-sm outline-none focus:border-neutral-950';
export const textareaClass = 'min-h-28 w-full rounded-lg border border-black/15 bg-white p-3 text-sm leading-6 outline-none focus:border-neutral-950';
