"use client";
import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setLoading(false);
  };

  return (
    <main className="min-h-screen grid-bg flex items-center justify-center px-8">
      <div className="max-w-md w-full">
        <Link href="/" className="font-syne font-bold text-lg tracking-tight block mb-12">
          <span className="text-emerald-400">SaaS</span>
          <span className="text-white">Auditor</span>
          <span className="text-zinc-500">Pro</span>
        </Link>

        <h1 className="font-syne font-extrabold text-3xl text-white mb-2">
          Upgrade to Pro
        </h1>
        <p className="font-dm text-zinc-400 mb-8">
          Unlimited audits, renewal reminders, and more — for £19/month.
        </p>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full bg-white/4 border border-white/10 focus:border-emerald-500/50 rounded-xl p-4 font-dm text-sm text-zinc-300 placeholder:text-zinc-700 outline-none transition-colors"
          />
          <button
            onClick={handleCheckout}
            disabled={loading || !email}
            className="w-full bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed text-black font-syne font-bold py-4 rounded-xl transition-all glow"
          >
            {loading ? "Redirecting to payment..." : "Continue to Payment →"}
          </button>
          <p className="text-center text-zinc-600 font-dm text-xs">
            Secure payment via Stripe · Cancel anytime
          </p>
        </div>
      </div>
    </main>
  );
}
