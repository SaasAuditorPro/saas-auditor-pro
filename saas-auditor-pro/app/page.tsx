"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [hovering, setHovering] = useState(false);

  return (
    <main className="min-h-screen grid-bg relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <div className="font-syne font-bold text-lg tracking-tight">
          <span className="text-emerald-400">SaaS</span>
          <span className="text-white">Auditor</span>
          <span className="text-zinc-500">Pro</span>
        </div>
        <Link
          href="/audit"
          className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors font-dm"
        >
          Run Audit →
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-8 pt-16 pb-24 text-center">
        <div className="fade-up fade-up-1 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-emerald-400 text-xs font-dm mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI-Powered Savings Reports
        </div>

        <h1 className="fade-up fade-up-2 font-syne font-extrabold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-6">
          You&apos;re wasting money
          <br />
          <span className="text-emerald-400 glow-text">on software.</span>
        </h1>

        <p className="fade-up fade-up-3 font-dm text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          The average small business wastes <strong className="text-white">£8,000 per year</strong> on unused
          or overlapping SaaS subscriptions. Paste your list. Get your savings
          report in 30 seconds.
        </p>

        <div className="fade-up fade-up-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/audit"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="group relative inline-flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-black font-syne font-bold px-8 py-4 rounded-lg text-base transition-all duration-200 glow"
          >
            Run My Free Audit
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <p className="text-zinc-600 text-sm font-dm">No account needed · Free first audit</p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { stat: "51%", label: "of SaaS licenses go unused every month" },
            { stat: "£8K", label: "average SMB waste per year on software" },
            { stat: "30s", label: "to get your full savings report" },
          ].map((item) => (
            <div
              key={item.stat}
              className="bg-white/3 border border-white/8 rounded-xl p-6 hover:border-emerald-500/30 transition-colors"
            >
              <div className="font-syne font-extrabold text-4xl text-emerald-400 mb-2">
                {item.stat}
              </div>
              <div className="font-dm text-zinc-400 text-sm leading-relaxed">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-8 pb-24">
        <h2 className="font-syne font-bold text-2xl text-center mb-12 text-zinc-300">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Paste your subscriptions", desc: "List your tools and monthly costs. One line each. Takes 2 minutes." },
            { step: "02", title: "AI analyses everything", desc: "Claude identifies waste, overlaps, and cheaper alternatives instantly." },
            { step: "03", title: "Get your savings report", desc: "A ranked list of cuts with exact savings and what to switch to." },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="font-syne font-extrabold text-6xl text-white/4 mb-3">
                {item.step}
              </div>
              <h3 className="font-syne font-bold text-lg text-white mb-2">{item.title}</h3>
              <p className="font-dm text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-8 pb-32">
        <h2 className="font-syne font-bold text-2xl text-center mb-4 text-zinc-300">
          Simple pricing
        </h2>
        <p className="text-center text-zinc-500 font-dm text-sm mb-12">Save £1,000s. Pay pennies.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-white/3 border border-white/8 rounded-xl p-8">
            <div className="font-syne font-bold text-lg text-white mb-1">Free</div>
            <div className="font-syne font-extrabold text-4xl text-white mb-6">£0</div>
            <ul className="space-y-3 font-dm text-sm text-zinc-400 mb-8">
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> 1 full audit report</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> AI savings analysis</li>
              <li className="flex items-center gap-2"><span className="text-zinc-600">✗</span> Unlimited audits</li>
              <li className="flex items-center gap-2"><span className="text-zinc-600">✗</span> Renewal reminders</li>
            </ul>
            <Link href="/audit" className="block text-center border border-white/10 hover:border-emerald-500/40 text-zinc-300 hover:text-emerald-400 font-syne font-bold py-3 rounded-lg transition-all text-sm">
              Start Free
            </Link>
          </div>
          <div className="bg-emerald-500/8 border border-emerald-500/30 rounded-xl p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400 text-black text-xs font-syne font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
            <div className="font-syne font-bold text-lg text-white mb-1">Pro</div>
            <div className="font-syne font-extrabold text-4xl text-emerald-400 mb-6">£19<span className="text-lg text-zinc-500">/mo</span></div>
            <ul className="space-y-3 font-dm text-sm text-zinc-300 mb-8">
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Unlimited audits</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> AI savings analysis</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Renewal reminders</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Stack comparison tool</li>
            </ul>
            <Link href="/checkout" className="block text-center bg-emerald-400 hover:bg-emerald-300 text-black font-syne font-bold py-3 rounded-lg transition-all text-sm glow">
              Get Pro — £19/mo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <p className="text-center text-zinc-600 font-dm text-xs">
          © 2026 SaaS Auditor Pro · Built to save you money
        </p>
      </footer>
    </main>
  );
}
