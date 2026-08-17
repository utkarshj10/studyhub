import Link from "next/link";
import { ReactNode } from "react";

export default function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <main className="paper-grid flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 block text-center text-2xl font-black tracking-tight">
          study<span className="text-accent">hub</span>
        </Link>
        <div className="rounded-[2rem] border border-black/10 bg-white p-7 shadow-soft md:p-9">
          <h1 className="text-3xl font-black tracking-tight">{title}</h1>
          <p className="mt-2 leading-6 text-ink/55">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </main>
  );
}
