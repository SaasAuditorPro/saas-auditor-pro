"use client";
import { useState } from "react";
import Link from "next/link";

const c = {
  bg: "#050b14",
  card: "#0c1525",
  cardBorder: "rgba(96,165,250,0.1)",
  green: "#34d399",
  greenBg: "rgba(52,211,153,0.08)",
  greenBorder: "rgba(52,211,153,0.25)",
  blue: "#60a5fa",
  blueBg: "rgba(96,165,250,0.08)",
  text: "#f1f5f9",
  sub: "#94a3b8",
  dim: "#475569",
  red: "#f87171",
};

const stats = [
  { n: "49%", label: "of SaaS licences go unused — software paid for that nobody opens", src: "Zylo SaaS Management Index 2025" },
  { n: "7.6", label: "duplicate apps the average business runs simultaneously, paying twice for the same job", src: "Chief Martec" },
  { n: "1-in-3", label: "software pounds is wasted spend — unused, duplicated or overpriced tools", src: "Zylo / CFO Dive 2024" },
  { n: "22%", label: "rise in SaaS costs per employee in 2025 alone — prices growing faster than your revenue", src: "Zylo SaaS Management Index 2025" },
];

const faqs = [
  { q: "Is the snapshot really free?", a: "Yes — paste your subscriptions, get your savings figure and biggest drain for free. No card needed, no account required. The full breakdown with specific cuts, alternatives and action plan is unlocked with a Basic plan." },
  { q: "Do you need access to my bank account?", a: "Never. Unlike other tools, we don't connect to your bank. Just paste your list of subscriptions and costs. Your financial data stays entirely with you." },
  { q: "How accurate is the AI analysis?", a: "Highly accurate for identifying waste and overlaps. The savings figures are AI estimates based on your specific stack — real savings will vary, but our users consistently find the report identifies cuts they hadn't considered." },
  { q: "What's the Founder Member pricing?", a: "The first 100 customers lock in Basic at £19/month forever — even when we raise to £29/month. This is our way of rewarding the businesses that believe in us early. Once 100 seats are taken, this offer closes permanently." },
  { q: "Can I cancel anytime?", a: "Yes — no contracts, no notice period. Cancel in one click from your Stripe customer portal. We're confident the savings you find will more than justify the subscription, but you're never locked in." },
  { q: "Does this work for my industry?", a: "Yes. Any business that pays for software monthly has this problem — whether you're in construction, beauty, retail, professional services, or e-commerce. The AI adapts its analysis to your specific stack." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main style={{ minHeight: "100vh", background: c.bg, color: c.text }}>

      {/* Founder banner */}
      <div style={{ background: "rgba(52,211,153,0.12)", borderBottom: "1px solid rgba(52,211,153,0.2)", padding: "10px 24px", textAlign: "center" }}>
        <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: c.green }}>
          🎯 <strong>Founder Member Offer:</strong> First 100 customers lock in £19/month forever — price rises to £29/month after that.
          <Link href="/audit" style={{ color: "#fff", marginLeft: "12px", textDecoration: "underline", fontWeight: 600 }}>Claim your spot →</Link>
        </span>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", maxWidth: "1100px", margin: "0 auto", flexWrap: "wrap", gap: "12px" }}>
        <Link href="/">
          <img src="/logo.svg" alt="SaaS Auditor Pro" style={{ height: "100px", width: "auto" }} />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="#how" className="nav-link" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.sub, textDecoration: "none" }}>How it works</Link>
          <Link href="#pricing" className="nav-link" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.sub, textDecoration: "none" }}>Pricing</Link>
          <Link href="/audit" style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "13px", background: c.green, color: "#000", padding: "9px 16px", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Get Free Snapshot</Link>
        </div>
        <style>{`@media (max-width: 600px) { .nav-link { display: none !important; } }`}</style>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "64px 24px 48px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: c.blueBg, border: `1px solid rgba(96,165,250,0.2)`, borderRadius: "100px", padding: "6px 16px", marginBottom: "28px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: c.blue, display: "inline-block" }} />
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: c.blue, letterSpacing: "0.5px" }}>Built for UK Small Businesses</span>
        </div>

        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 7vw, 72px)", lineHeight: 1.04, letterSpacing: "-2px", color: c.text, marginBottom: "24px" }}>
          UK businesses are losing<br />
          <span style={{ color: c.green, textShadow: "0 0 60px rgba(52,211,153,0.35)" }}>money every month</span><br />
          on software waste.
        </h1>

        <p style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "clamp(16px, 2.5vw, 19px)", maxWidth: "580px", margin: "0 auto 36px", lineHeight: 1.75 }}>
          Paste your subscriptions. Our AI identifies every wasted pound — duplicates, unused tools, overpriced software — and tells you exactly what to do about it. <strong style={{ color: c.text }}>In 30 seconds.</strong>
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", marginBottom: "40px" }}>
          <Link href="/audit" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: c.green, color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, padding: "17px 36px", borderRadius: "12px", fontSize: "17px", textDecoration: "none", boxShadow: "0 0 60px rgba(52,211,153,0.25)" }}>
            Get My Free Savings Snapshot →
          </Link>
          <span style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "13px" }}>No bank connection · No account needed · Free forever</span>
        </div>

        {/* Trust signals */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
          {["🔒 No bank access required", "🇬🇧 Built for UK businesses", "⚡ 30-second results", "🔐 Your data stays private"].map(t => (
            <div key={t} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: c.sub, background: c.card, border: `1px solid ${c.cardBorder}`, padding: "7px 14px", borderRadius: "100px" }}>{t}</div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "12px" }}>
          {stats.map(s => (
            <div key={s.n} style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "16px", padding: "24px 20px" }}>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "38px", color: c.green, letterSpacing: "-1px", marginBottom: "8px" }}>{s.n}</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "14px", lineHeight: 1.6, marginBottom: "8px" }}>{s.label}</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "11px" }}>Source: {s.src}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: c.text, letterSpacing: "-1px", marginBottom: "12px" }}>How it works</h2>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "16px" }}>No integrations. No bank connection. Just paste and go.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          {[
            { step: "01", title: "Paste your subscriptions", desc: "List your tools and monthly costs — one per line. Takes 2 minutes. No account needed.", icon: "📋" },
            { step: "02", title: "AI analyses your stack", desc: "Our AI identifies duplicates, unused tools, overpriced software and cheaper alternatives instantly.", icon: "🔍" },
            { step: "03", title: "See your savings figure", desc: "Your free snapshot shows exactly how much you're wasting annually — the full breakdown unlocks with Basic.", icon: "💰" },
          ].map(s => (
            <div key={s.step} style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "16px", padding: "28px 24px" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>{s.icon}</div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "11px", color: c.green, letterSpacing: "2px", marginBottom: "8px" }}>STEP {s.step}</div>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "17px", color: c.text, marginBottom: "10px" }}>{s.title}</h3>
              <p style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "20px", padding: "40px 32px" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3vw, 32px)", color: c.text, marginBottom: "8px", letterSpacing: "-0.5px" }}>Built for every UK small business</h2>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "15px", marginBottom: "28px" }}>If you pay for software monthly, you have this problem. Our users include:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px" }}>
            {["🔧 Tradespeople", "💅 Beauty & Wellness", "🏗️ Construction", "🛍️ E-commerce", "📊 Accountants", "🎨 Creative agencies", "⚖️ Legal & Consulting", "🍰 Food & Hospitality", "🏋️ Fitness & Coaching", "🔑 Estate Agents", "🚗 Auto & Transport", "💻 Tech & Freelancers"].map(b => (
              <div key={b} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${c.cardBorder}`, borderRadius: "10px", padding: "10px 14px", fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: c.sub }}>{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: c.text, letterSpacing: "-1px", marginBottom: "12px" }}>Pricing that pays for itself</h2>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "16px" }}>Find more in savings than you spend on the tool — or cancel anytime.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "20px" }}>
          {/* Free */}
          <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "18px", padding: "28px 24px" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: c.sub, fontSize: "13px", letterSpacing: "1px", marginBottom: "8px" }}>FREE</div>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "36px", color: c.text, marginBottom: "4px", letterSpacing: "-1px" }}>£0</div>
            <div style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "13px", marginBottom: "24px" }}>Always free</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
              {["✓ Free savings snapshot", "✓ Annual waste figure", "✓ Biggest drain identified", "✗ Full breakdown", "✗ Action plan"].map((f, i) => (
                <li key={i} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: i < 3 ? c.sub : c.dim, padding: "5px 0" }}>{f}</li>
              ))}
            </ul>
            <Link href="/audit" style={{ display: "block", textAlign: "center", border: `1px solid ${c.cardBorder}`, color: c.sub, padding: "11px", borderRadius: "8px", textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "13px" }}>Get Free Snapshot</Link>
          </div>

          {/* Basic */}
          <div style={{ position: "relative", background: "rgba(52,211,153,0.05)", border: `1px solid ${c.greenBorder}`, borderRadius: "18px", padding: "28px 24px" }}>
            <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", background: c.green, color: "#000", fontSize: "11px", fontFamily: "Syne, sans-serif", fontWeight: 700, padding: "4px 14px", borderRadius: "100px", whiteSpace: "nowrap" }}>FOUNDER PRICE</div>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: c.green, fontSize: "13px", letterSpacing: "1px", marginBottom: "8px" }}>BASIC</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "36px", color: c.green, letterSpacing: "-1px" }}>£19</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "14px", textDecoration: "line-through" }}>£29</div>
            </div>
            <div style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "13px", marginBottom: "24px" }}>per month · first 100 only</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
              {["✓ Unlimited full audits", "✓ Complete savings breakdown", "✓ Week-by-week action plan", "✓ Cheaper alternatives named", "✓ Locked-in founder price"].map((f, i) => (
                <li key={i} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.sub, padding: "5px 0" }}>{f}</li>
              ))}
            </ul>
            <Link href="/checkout" style={{ display: "block", textAlign: "center", background: c.green, color: "#000", padding: "13px", borderRadius: "8px", textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "14px", boxShadow: "0 0 30px rgba(52,211,153,0.2)" }}>Lock In Founder Price →</Link>
          </div>

          {/* Pro coming soon */}
          <div style={{ background: c.card, border: `1px solid ${c.cardBorder}`, borderRadius: "18px", padding: "28px 24px", opacity: 0.6 }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: c.blue, fontSize: "13px", letterSpacing: "1px", marginBottom: "8px" }}>PRO</div>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "36px", color: c.text, marginBottom: "4px", letterSpacing: "-1px" }}>£39</div>
            <div style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "13px", marginBottom: "24px" }}>per month · coming soon</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
              {["✓ Everything in Basic", "✓ Monthly auto-monitoring", "✓ Renewal alerts", "✓ Price increase notifications", "✓ Saved subscription stack"].map((f, i) => (
                <li key={i} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.sub, padding: "5px 0" }}>{f}</li>
              ))}
            </ul>
            <div style={{ display: "block", textAlign: "center", border: `1px solid ${c.cardBorder}`, color: c.dim, padding: "11px", borderRadius: "8px", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "13px" }}>Coming Soon</div>
          </div>
        </div>

        <p style={{ textAlign: "center", fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "12px" }}>
          Founder pricing locked forever as long as you stay subscribed · Cancel anytime · No contracts
        </p>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(24px, 3vw, 36px)", color: c.text, letterSpacing: "-1px", textAlign: "center", marginBottom: "40px" }}>Frequently asked questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: c.card, border: `1px solid ${openFaq === i ? c.greenBorder : c.cardBorder}`, borderRadius: "12px", overflow: "hidden", transition: "border-color 0.2s" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "15px", color: c.text }}>{faq.q}</span>
                <span style={{ color: c.green, fontSize: "20px", lineHeight: 1 }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 20px 18px", fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.sub, lineHeight: 1.75 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px 100px", textAlign: "center" }}>
        <div style={{ background: "rgba(52,211,153,0.06)", border: `1px solid ${c.greenBorder}`, borderRadius: "24px", padding: "56px 32px" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 42px)", color: c.text, letterSpacing: "-1px", marginBottom: "16px" }}>
            Find your wasted spend.<br />
            <span style={{ color: c.green }}>In 30 seconds. For free.</span>
          </h2>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "16px", marginBottom: "32px", maxWidth: "460px", margin: "0 auto 32px" }}>
            No bank connection. No account required. Just paste your subscriptions and see exactly how much you're losing.
          </p>
          <Link href="/audit" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: c.green, color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, padding: "17px 36px", borderRadius: "12px", fontSize: "17px", textDecoration: "none", boxShadow: "0 0 60px rgba(52,211,153,0.2)" }}>
            Get My Free Snapshot →
          </Link>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "12px", marginTop: "16px" }}>First 100 founder members · £19/month locked forever</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${c.cardBorder}`, padding: "40px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "24px" }}>
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "17px", marginBottom: "8px" }}>
              <span style={{ color: c.green }}>SaaS</span>
              <span style={{ color: c.text }}>Auditor</span>
              <span style={{ color: c.dim }}>Pro</span>
            </div>
            <p style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "13px", maxWidth: "240px", lineHeight: 1.6 }}>AI-powered software spend auditing for UK small businesses.</p>
          </div>
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "12px", color: c.sub, letterSpacing: "1px", marginBottom: "12px" }}>PRODUCT</div>
              {[["Run Free Audit", "/audit"], ["Pricing", "#pricing"], ["How it works", "#how"]].map(([l, h]) => (
                <div key={l} style={{ marginBottom: "8px" }}><Link href={h} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.dim, textDecoration: "none" }}>{l}</Link></div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "12px", color: c.sub, letterSpacing: "1px", marginBottom: "12px" }}>LEGAL</div>
              <div style={{ marginBottom: "8px" }}><Link href="/legal" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.dim, textDecoration: "none" }}>Legal & Privacy</Link></div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "1000px", margin: "24px auto 0", paddingTop: "24px", borderTop: `1px solid ${c.cardBorder}`, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px" }}>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "12px" }}>© 2026 SaaS Auditor Pro · Registered in England & Wales</p>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "12px" }}>Questions? saasauditorpro@gmail.com</p>
        </div>
      </footer>
    </main>
  );
}
