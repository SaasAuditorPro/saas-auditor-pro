"use client";
import { useState } from "react";
import Link from "next/link";

const c = {
  bg: "#050b14",
  card: "#0c1525",
  cardBorder: "rgba(96,165,250,0.08)",
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
  { n: "49%", label: "of SaaS licences go unused", src: "Zylo SaaS Management Index 2025" },
  { n: "7.6", label: "duplicate apps the average business runs simultaneously", src: "Chief Martec" },
  { n: "1-in-3", label: "software pounds is wasted spend", src: "Zylo / CFO Dive 2024" },
  { n: "22%", label: "rise in SaaS costs per employee in 2025", src: "Zylo SaaS Management Index 2025" },
];

const faqs = [
  { q: "Is the snapshot really free?", a: "Yes — paste your subscriptions, get your savings figure and biggest drain for free. No card needed, no account required. The full breakdown with specific cuts, alternatives and action plan is unlocked with the £29 full audit." },
  { q: "Do you need access to my bank account?", a: "Never. Unlike other tools, we don't connect to your bank. Just paste your list of subscriptions and costs. Your financial data stays entirely with you." },
  { q: "How accurate is the AI analysis?", a: "Highly accurate for identifying waste and overlaps. The savings figures are AI estimates based on your specific stack — real savings will vary, but our users consistently find the report identifies cuts they hadn't considered." },
  { q: "What does the £29 full audit include?", a: "Pay once for your full audit report — no subscription, no recurring charges. Your £29 gives you the complete savings breakdown, every duplicate identified, cheaper alternatives named, and a week-by-week action plan." },
  { q: "Is this a one-time payment?", a: "Yes — £29 once. No subscription, no monthly charges, no hidden fees. You pay once and get your full report immediately." },
  { q: "Does this work for my industry?", a: "Yes. Any business that pays for software monthly has this problem — whether you're in construction, beauty, retail, professional services, or e-commerce. The AI adapts its analysis to your specific stack." },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main style={{ minHeight: "100vh", background: c.bg, color: c.text }}>

      {/* Top banner */}
      <div style={{ background: "rgba(52,211,153,0.08)", borderBottom: "1px solid rgba(52,211,153,0.15)", padding: "10px 24px", textAlign: "center" }}>
        <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: c.sub }}>
          <strong style={{ color: c.green }}>No subscription needed.</strong> Get your full audit report for a one-time payment of £29 — no recurring charges ever.
          <Link href="/audit" style={{ color: c.green, marginLeft: "12px", textDecoration: "none", fontWeight: 600, borderBottom: "1px solid rgba(52,211,153,0.4)" }}>Get started →</Link>
        </span>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", maxWidth: "1100px", margin: "0 auto", flexWrap: "wrap", gap: "12px" }}>
        <Link href="/">
          <img src="/logo.svg" alt="SaaS Auditor Pro" style={{ height: "40px", width: "auto" }} />
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="#how" className="nav-link" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.dim, textDecoration: "none" }}>How it works</Link>
          <Link href="#pricing" className="nav-link" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.dim, textDecoration: "none" }}>Pricing</Link>
          <Link href="/audit" style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "14px", background: c.green, color: "#000", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", whiteSpace: "nowrap" }}>Get Free Snapshot</Link>
        </div>
        <style>{`@media (max-width: 600px) { .nav-link { display: none !important; } }`}</style>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "80px 32px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.15)", borderRadius: "100px", padding: "6px 18px", marginBottom: "32px" }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: c.blue, display: "inline-block" }} />
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: c.blue, letterSpacing: "0.8px", textTransform: "uppercase" }}>For Small Businesses Worldwide</span>
        </div>

        <h1 style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(38px, 7vw, 72px)", lineHeight: 1.06, letterSpacing: "-2.5px", color: c.text, marginBottom: "28px" }}>
          Small businesses are losing<br />
          <span style={{ color: c.green }}>money every month</span><br />
          on software waste.
        </h1>

        <p style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "clamp(16px, 2.5vw, 19px)", maxWidth: "520px", margin: "0 auto 40px", lineHeight: 1.8 }}>
          Paste your subscriptions. Our AI identifies every wasted pound — duplicates, unused tools, overpriced software — and tells you exactly what to cut. <strong style={{ color: c.text }}>In 30 seconds.</strong>
        </p>

        <Link href="/audit" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: c.green, color: "#000", fontFamily: "DM Sans, sans-serif", fontWeight: 700, padding: "18px 40px", borderRadius: "10px", fontSize: "17px", textDecoration: "none" }}>
          Get My Free Savings Snapshot →
        </Link>
        <p style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "13px", marginTop: "16px" }}>No bank connection · No account needed · Free forever</p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginTop: "40px" }}>
          {["No bank access required", "For small businesses worldwide", "30-second results", "Your data stays private"].map(t => (
            <span key={t} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: c.dim, padding: "6px 16px", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.06)" }}>{t}</span>
          ))}
        </div>
      </section>

      {/* Stats — borderless editorial */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 32px 96px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {stats.map((s, i) => (
            <div key={s.n} style={{ padding: "36px 24px", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "44px", color: c.green, letterSpacing: "-2px", marginBottom: "10px", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "14px", lineHeight: 1.65, marginBottom: "10px" }}>{s.label}</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "11px" }}>Source: {s.src}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 32px 96px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: c.text, letterSpacing: "-1.5px", marginBottom: "14px" }}>How it works</h2>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "16px" }}>No integrations. No bank connection. Just paste and go.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden" }}>
          {[
            { step: "01", title: "Paste your subscriptions", desc: "List your tools and monthly costs — one per line. Takes 2 minutes. No account needed." },
            { step: "02", title: "AI analyses your stack", desc: "Our AI identifies duplicates, unused tools, overpriced software and cheaper alternatives instantly." },
            { step: "03", title: "See your savings figure", desc: "Your free snapshot shows exactly how much you're wasting annually — the full breakdown unlocks with the £29 audit." },
          ].map(s => (
            <div key={s.step} style={{ background: c.bg, padding: "40px 32px" }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "11px", color: c.green, letterSpacing: "3px", marginBottom: "16px" }}>STEP {s.step}</div>
              <h3 style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "18px", color: c.text, marginBottom: "12px", lineHeight: 1.3 }}>{s.title}</h3>
              <p style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "14px", lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ maxWidth: "760px", margin: "0 auto", padding: "0 32px 96px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: c.text, letterSpacing: "-1.5px", marginBottom: "14px" }}>Simple pricing. Real savings.</h2>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "16px" }}>Find more in savings than you spend on the audit — or it costs you nothing to find out.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "20px" }}>
          {/* Free */}
          <div style={{ background: c.card, border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "32px 28px" }}>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: c.dim, fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>Free</div>
            <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "40px", color: c.text, marginBottom: "4px", letterSpacing: "-1px" }}>£0</div>
            <div style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "13px", marginBottom: "28px" }}>Always free</div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px", marginBottom: "28px" }}>
              {["Free savings snapshot", "Annual waste figure", "Biggest drain identified"].map((f, i) => (
                <div key={i} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.sub, padding: "5px 0", display: "flex", gap: "10px" }}>
                  <span style={{ color: c.green }}>—</span>{f}
                </div>
              ))}
              {["Full breakdown", "Action plan"].map((f, i) => (
                <div key={i} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.dim, padding: "5px 0", display: "flex", gap: "10px" }}>
                  <span>—</span>{f}
                </div>
              ))}
            </div>
            <Link href="/audit" style={{ display: "block", textAlign: "center", border: "1px solid rgba(255,255,255,0.08)", color: c.sub, padding: "12px", borderRadius: "8px", textDecoration: "none", fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "14px" }}>Get Free Snapshot</Link>
          </div>

          {/* Full Audit */}
          <div style={{ position: "relative", background: "rgba(52,211,153,0.04)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "16px", padding: "32px 28px" }}>
            <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", background: c.green, color: "#000", fontSize: "11px", fontFamily: "DM Sans, sans-serif", fontWeight: 700, padding: "4px 16px", borderRadius: "100px", whiteSpace: "nowrap", letterSpacing: "0.5px" }}>MOST POPULAR</div>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: c.green, fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>Full Audit</div>
            <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "40px", color: c.green, letterSpacing: "-1px", marginBottom: "4px" }}>£29</div>
            <div style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "13px", marginBottom: "28px" }}>one-time · no subscription</div>
            <div style={{ borderTop: "1px solid rgba(52,211,153,0.1)", paddingTop: "20px", marginBottom: "28px" }}>
              {["Complete savings breakdown", "Every duplicate identified", "Cheaper alternatives named", "Week-by-week action plan", "One-time, no recurring charge"].map((f, i) => (
                <div key={i} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.sub, padding: "5px 0", display: "flex", gap: "10px" }}>
                  <span style={{ color: c.green }}>—</span>{f}
                </div>
              ))}
            </div>
            <Link href="/checkout" style={{ display: "block", textAlign: "center", background: c.green, color: "#000", padding: "14px", borderRadius: "8px", textDecoration: "none", fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "15px" }}>Get My Full Report →</Link>
          </div>

          {/* Pro */}
          <div style={{ background: c.card, border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "32px 28px", opacity: 0.5 }}>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, color: c.blue, fontSize: "12px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>Pro</div>
            <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "40px", color: c.text, marginBottom: "4px", letterSpacing: "-1px" }}>£39</div>
            <div style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "13px", marginBottom: "28px" }}>per month · coming soon</div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px", marginBottom: "28px" }}>
              {["Unlimited full audits", "Saved subscription stack", "Quarterly re-audit reminder", "Renewal alerts", "Stack history & savings tracker"].map((f, i) => (
                <div key={i} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.dim, padding: "5px 0", display: "flex", gap: "10px" }}>
                  <span>—</span>{f}
                </div>
              ))}
            </div>
            <div style={{ display: "block", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)", color: c.dim, padding: "12px", borderRadius: "8px", fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "14px" }}>Coming Soon</div>
          </div>
        </div>

        <p style={{ textAlign: "center", fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "12px", marginTop: "16px" }}>
          One-time payment · No subscription · No hidden charges
        </p>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: "680px", margin: "0 auto", padding: "0 32px 96px" }}>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(24px, 3vw, 36px)", color: c.text, letterSpacing: "-1px", textAlign: "center", marginBottom: "48px" }}>Frequently asked questions</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: "15px", color: c.text, paddingRight: "24px" }}>{faq.q}</span>
                <span style={{ color: c.green, fontSize: "20px", lineHeight: 1, flexShrink: 0 }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <div style={{ paddingBottom: "20px", fontFamily: "DM Sans, sans-serif", fontSize: "15px", color: c.sub, lineHeight: 1.8 }}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ maxWidth: "680px", margin: "0 auto", padding: "0 32px 120px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", color: c.text, letterSpacing: "-2px", marginBottom: "20px", lineHeight: 1.1 }}>
          Find your wasted spend.<br />
          <span style={{ color: c.green }}>In 30 seconds. For free.</span>
        </h2>
        <p style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "17px", marginBottom: "36px", lineHeight: 1.75 }}>
          No bank connection. No account required. Just paste your subscriptions and see exactly how much you're losing.
        </p>
        <Link href="/audit" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: c.green, color: "#000", fontFamily: "DM Sans, sans-serif", fontWeight: 700, padding: "18px 40px", borderRadius: "10px", fontSize: "17px", textDecoration: "none" }}>
          Get My Free Snapshot →
        </Link>
        <p style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "12px", marginTop: "16px" }}>One-time payment · No subscription · No hidden charges</p>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 32px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "32px" }}>
          <div>
            <img src="/logo.svg" alt="SaaS Auditor Pro" style={{ height: "32px", width: "auto", marginBottom: "12px" }} />
            <p style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "13px", maxWidth: "240px", lineHeight: 1.7 }}>AI-powered software spend auditing for small businesses worldwide.</p>
          </div>
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "11px", color: c.dim, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>Product</div>
              {[["Run Free Audit", "/audit"], ["Pricing", "#pricing"], ["How it works", "#how"]].map(([l, h]) => (
                <div key={l} style={{ marginBottom: "10px" }}><Link href={h} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.dim, textDecoration: "none" }}>{l}</Link></div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "11px", color: c.dim, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px" }}>Legal</div>
              <div style={{ marginBottom: "10px" }}><Link href="/legal" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.dim, textDecoration: "none" }}>Legal & Privacy</Link></div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "1000px", margin: "32px auto 0", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px" }}>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "12px" }}>© 2026 SaaS Auditor Pro · Global small business software auditing</p>
          <p style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "12px" }}>Questions? hello@saasauditorpro.com</p>
        </div>
      </footer>
    </main>
  );
}
