"use client";
import { useState } from "react";
import Link from "next/link";

const PLACEHOLDER = `Slack - £12/month
Notion - £16/month
Asana - £25/month
Trello - £10/month
Monday.com - £20/month
Zoom - £15/month
Google Workspace - £10/month
Dropbox - £10/month
HubSpot - £45/month
Mailchimp - £35/month
Canva Pro - £12/month
Adobe Creative Cloud - £55/month`;

export default function AuditPage() {
  const [subscriptions, setSubscriptions] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [error, setError] = useState("");
  const [used, setUsed] = useState(false);

  const runAudit = async () => {
    if (!subscriptions.trim()) {
      setError("Please paste your subscriptions first.");
      return;
    }
    setError("");
    setLoading(true);
    setReport("");

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptions, email }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setReport(data.report);
        setUsed(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid-bg">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <nav className="flex items-center justify-between px-8 py-6 max-w-5xl mx-auto">
        <Link href="/" className="font-syne font-bold text-lg tracking-tight">
          <span className="text-emerald-400">SaaS</span>
          <span className="text-white">Auditor</span>
          <span className="text-zinc-500">Pro</span>
        </Link>
        <Link href="/checkout" className="text-xs bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/20 transition-colors px-4 py-2 rounded-lg font-dm">
          Upgrade to Pro →
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-12">
        {!report ? (
          <>
            <div className="mb-10">
              <h1 className="font-syne font-extrabold text-4xl text-white mb-3">
                Run Your Audit
              </h1>
              <p className="font-dm text-zinc-400">
                List your subscriptions below — one per line with the monthly cost.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="font-dm text-sm text-zinc-400 block mb-2">
                  Your subscriptions <span className="text-zinc-600">(one per line, include cost)</span>
                </label>
                <textarea
                  value={subscriptions}
                  onChange={(e) => setSubscriptions(e.target.value)}
                  placeholder={PLACEHOLDER}
                  rows={12}
                  className="w-full bg-white/4 border border-white/10 focus:border-emerald-500/50 rounded-xl p-4 font-dm text-sm text-zinc-300 placeholder:text-zinc-700 outline-none resize-none transition-colors"
                />
              </div>

              <div>
                <label className="font-dm text-sm text-zinc-400 block mb-2">
                  Your email <span className="text-zinc-600">(to save your report)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="joey@example.com"
                  className="w-full bg-white/4 border border-white/10 focus:border-emerald-500/50 rounded-xl p-4 font-dm text-sm text-zinc-300 placeholder:text-zinc-700 outline-none transition-colors"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm font-dm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}

              <button
                onClick={runAudit}
                disabled={loading}
                className="w-full bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-syne font-bold py-4 rounded-xl transition-all glow text-base"
              >
                {loading ? "Analysing your stack..." : "Run My Audit →"}
              </button>

              {loading && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-zinc-500 font-dm text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    AI is reviewing your subscriptions...
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <h1 className="font-syne font-extrabold text-3xl text-white">
                Your Savings Report
              </h1>
              <button
                onClick={() => { setReport(""); setSubscriptions(""); setUsed(false); }}
                className="text-xs text-zinc-500 hover:text-zinc-300 font-dm transition-colors"
              >
                ← Run another
              </button>
            </div>

            <div className="bg-white/3 border border-emerald-500/20 rounded-2xl p-8 mb-8">
              <pre className="font-dm text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {report}
              </pre>
            </div>

            {used && (
              <div className="bg-emerald-500/8 border border-emerald-500/25 rounded-xl p-6 text-center">
                <p className="font-syne font-bold text-white mb-1">Want to run unlimited audits?</p>
                <p className="font-dm text-zinc-400 text-sm mb-4">Upgrade to Pro for £19/month — unlimited audits, renewal reminders, and more.</p>
                <Link href="/checkout" className="inline-block bg-emerald-400 hover:bg-emerald-300 text-black font-syne font-bold px-6 py-3 rounded-lg transition-all glow text-sm">
                  Upgrade to Pro →
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
