"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#080c10", backgroundImage: "linear-gradient(rgba(52,211,153,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }}>
      <div style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(52,211,153,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "18px", letterSpacing: "-0.5px" }}>
          <span style={{ color: "#34d399" }}>SaaS</span>
          <span style={{ color: "#fff" }}>Auditor</span>
          <span style={{ color: "#4b5563" }}>Pro</span>
        </div>
        <Link href="/audit" style={{ fontSize: "13px", color: "#6b7280", textDecoration: "none", fontFamily: "DM Sans, sans-serif" }}>Run Audit →</Link>
      </nav>

      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 24px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "100px", padding: "6px 16px", marginBottom: "28px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "#34d399", letterSpacing: "0.5px" }}>AI-Powered Savings Reports</span>
        </div>

        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 8vw, 80px)", lineHeight: 1.05, letterSpacing: "-2px", color: "#fff", marginBottom: "20px" }}>
          You&apos;re wasting money<br />
          <span style={{ color: "#34d399", textShadow: "0 0 60px rgba(52,211,153,0.4)" }}>on software.</span>
        </h1>

        <p style={{ fontFamily: "DM Sans, sans-serif", color: "#6b7280", fontSize: "clamp(15px, 3vw, 18px)", maxWidth: "600px", margin: "0 auto 32px", lineHeight: 1.7, padding: "0 8px" }}>
          The average small business wastes <strong style={{ color: "#e5e7eb" }}>£8,000 per year</strong> on unused subscriptions. Paste your list. Get your savings report in 30 seconds.
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <Link href="/audit" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#34d399", color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, padding: "16px 32px", borderRadius: "12px", fontSize: "16px", textDecoration: "none", boxShadow: "0 0 50px rgba(52,211,153,0.3)", width: "fit-content" }}>
            Free Snapshot →
          </Link>
          <span style={{ fontFamily: "DM Sans, sans-serif", color: "#374151", fontSize: "13px" }}>No account needed</span>
        </div>
      </section>

      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          {[
            { stat: "51%", label: "of SaaS licenses go unused every month" },
            { stat: "£8K", label: "average SMB waste per year on software" },
            { stat: "30s", label: "to get your full AI savings report" },
          ].map((item) => (
            <div key={item.stat} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "24px 20px" }}>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "40px", color: "#34d399", marginBottom: "8px", letterSpacing: "-1px" }}>{item.stat}</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", color: "#6b7280", fontSize: "14px", lineHeight: 1.6 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px 64px" }}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "22px", textAlign: "center", marginBottom: "40px", color: "#9ca3af" }}>How it works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "28px" }}>
          {[
            { step: "01", title: "Paste your subscriptions", desc: "List your tools and monthly costs. One line each. Takes 2 minutes." },
            { step: "02", title: "AI analyses everything", desc: "Our AI identifies waste, overlaps, and cheaper alternatives instantly." },
            { step: "03", title: "Get your savings report", desc: "A ranked list of cuts with exact savings and what to switch to." },
          ].map((item) => (
            <div key={item.step}>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "56px", color: "rgba(255,255,255,0.05)", marginBottom: "10px", lineHeight: 1 }}>{item.step}</div>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "16px", color: "#f9fafb", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontFamily: "DM Sans, sans-serif", color: "#6b7280", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "22px", textAlign: "center", marginBottom: "8px", color: "#9ca3af" }}>Simple pricing</h2>
        <p style={{ textAlign: "center", color: "#4b5563", fontFamily: "DM Sans, sans-serif", fontSize: "14px", marginBottom: "32px" }}>Save £1,000s. Pay pennies.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "28px 24px" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#e5e7eb", marginBottom: "4px" }}>Free</div>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "36px", color: "#fff", marginBottom: "20px", letterSpacing: "-1px" }}>£0</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", fontFamily: "DM Sans, sans-serif", fontSize: "14px" }}>
              <li style={{ color: "#6b7280", padding: "5px 0" }}><span style={{ color: "#34d399", marginRight: "8px" }}>✓</span>1 free savings snapshot</li>
              <li style={{ color: "#374151", padding: "5px 0" }}><span style={{ marginRight: "8px" }}>✗</span>Unlimited audits</li>
              <li style={{ color: "#374151", padding: "5px 0" }}><span style={{ marginRight: "8px" }}>✗</span>Renewal reminders</li>
            </ul>
            <Link href="/audit" style={{ display: "block", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af", padding: "12px", borderRadius: "8px", textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "14px" }}>Start Free</Link>
          </div>
          <div style={{ position: "relative", background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: "16px", padding: "28px 24px" }}>
            <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", background: "#34d399", color: "#000", fontSize: "11px", fontFamily: "Syne, sans-serif", fontWeight: 700, padding: "4px 12px", borderRadius: "100px", whiteSpace: "nowrap" }}>MOST POPULAR</div>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#e5e7eb", marginBottom: "4px" }}>Pro</div>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "36px", color: "#34d399", marginBottom: "20px", letterSpacing: "-1px" }}>£19<span style={{ fontSize: "15px", color: "#4b5563" }}>/mo</span></div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", fontFamily: "DM Sans, sans-serif", fontSize: "14px" }}>
              <li style={{ color: "#d1d5db", padding: "5px 0" }}><span style={{ color: "#34d399", marginRight: "8px" }}>✓</span>Unlimited audits</li>
              <li style={{ color: "#d1d5db", padding: "5px 0" }}><span style={{ color: "#34d399", marginRight: "8px" }}>✓</span>AI savings analysis</li>
              <li style={{ color: "#d1d5db", padding: "5px 0" }}><span style={{ color: "#34d399", marginRight: "8px" }}>✓</span>Renewal reminders</li>
              <li style={{ color: "#d1d5db", padding: "5px 0" }}><span style={{ color: "#34d399", marginRight: "8px" }}>✓</span>Stack comparison tool</li>
            </ul>
            <Link href="/checkout" style={{ display: "block", textAlign: "center", background: "#34d399", color: "#000", padding: "12px", borderRadius: "8px", textDecoration: "none", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "14px", boxShadow: "0 0 30px rgba(52,211,153,0.2)" }}>Get Pro — £19/mo</Link>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "DM Sans, sans-serif", color: "#374151", fontSize: "12px", margin: 0 }}>© 2026 SaaS Auditor Pro · Built to save you money</p>
      </footer>
    </main>
  );
}
