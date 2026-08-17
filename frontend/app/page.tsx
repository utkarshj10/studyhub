"use client";

import { ArrowRight, CheckCircle2, Clock3, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen paper-grid">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
        <Link href="/" className="text-xl font-black tracking-tight">
          study<span className="text-accent">hub</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-black/5"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-14 px-6 pb-24 pt-14 md:grid-cols-[1.1fr_.9fr] md:items-center md:pt-24">
        <div className="fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium">
            <Sparkles size={16} className="text-accent" />
            Your study life, organized.
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl">
            Make progress
            <span className="text-accent"> visible.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink/65">
            StudyHub turns scattered assignments and study plans into one
            calm, focused workspace.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-bold text-white shadow-soft transition hover:-translate-y-0.5"
            >
              Start planning
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-black/10 bg-white px-6 py-3.5 font-bold"
            >
              I already have an account
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-black/10 bg-white p-5 shadow-soft">
            <div className="rounded-[1.5rem] bg-ink p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/50">Monday, 17 August</p>
                  <h2 className="mt-1 text-2xl font-bold">Good evening 👋</h2>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <CheckCircle2 />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  ["12", "Total"],
                  ["8", "Done"],
                  ["67%", "Progress"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-white/8 p-4">
                    <div className="text-xl font-black">{value}</div>
                    <div className="mt-1 text-xs text-white/45">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-white p-4 text-ink">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-accent">
                      High priority
                    </p>
                    <p className="mt-1 font-bold">Prepare ML presentation</p>
                  </div>
                  <Clock3 size={18} className="text-ink/35" />
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full w-2/3 rounded-full bg-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 bg-white/55">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 py-14 md:grid-cols-3">
          {[
            ["Plan clearly", "Keep every assignment and study goal in one place."],
            ["Focus daily", "See what matters now instead of everything at once."],
            ["Track progress", "Watch completed work turn into visible momentum."],
          ].map(([title, text], index) => (
            <div key={title} className="rounded-3xl border border-black/8 bg-white p-6">
              <div className="mb-7 text-sm font-black text-accent">0{index + 1}</div>
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-2 leading-7 text-ink/60">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
