"use client";
import { useState } from "react";
import Link from "next/link";
import { marked } from "marked";

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

const DEMO_PASSWORD = "SaaSdemoPro10*";

const c = {
  bg: "#080c10",
  card: "#0c1525",
  green: "#34d399",
  greenBorder: "rgba(52,211,153,0.25)",
  text: "#f1f5f9",
  sub: "#94a3b8",
  dim: "#475569",
};

export default function AuditPage() {
  const [subscriptions, setSubscriptions] = useState("");
  const [email, setEmail] = useState("");
  const [demoPassword, setDemoPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [teaser, setTeaser] = useState<any>(null);
  const [report, setReport] = useState("");
  const [error, setError] = useState("");
  const [showDemo, setShowDemo] = useState(false);

  const isDemoMode = demoPassword === DEMO_PASSWORD;

  const runAudit = async () => {
    if (!subscriptions.trim()) { setError("Please paste your subscriptions first."); return; }
    setError(""); setLoading(true); setTeaser(null); setReport("");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptions, email, isPro: isDemoMode })
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else if (isDemoMode) {
        setReport(data.report);
      } else {
        setTeaser(data.teaser);
      }
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  const goToCheckout = async () => {
    const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  const renderedReport = report ? marked(report) as string : "";

  return (
    <main style={{ minHeight: "100vh", background: c.bg }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 40px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <img src="/logo.svg" alt="SaaS Auditor Pro" style={{ height: "100px", width: "auto" }} />
        </Link>
        <Link href="/checkout" style={{ fontSize: "13px", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", color: c.green, padding: "8px 16px", borderRadius: "8px", textDecoration: "none", fontFamily: "DM Sans, sans-serif" }}>Upgrade →</Link>
      </nav>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "48px 32px" }}>

        {/* Demo mode toggle */}
        <div style={{ textAlign: "right", marginBottom: "12px" }}>
          <button onClick={() => setShowDemo(!showDemo)} style={{ background: "none", border: "none", color: c.dim, fontSize: "12px", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>
            {showDemo ? "Hide demo mode" : "Demo mode"}
          </button>
        </div>

        {showDemo && (
          <div style={{ background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.15)", borderRadius: "12px", padding: "16px 20px", marginBottom: "20px" }}>
            <label style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#60a5fa", display: "block", marginBottom: "8px" }}>Demo password</label>
            <input
              type="password"
              value={demoPassword}
              onChange={e => setDemoPassword(e.target.value)}
              placeholder="Enter demo password"
              style={{ width: "100%", background: "#0c1525", border: "1px solid rgba(96,165,250,0.2)", borderRadius: "8px", padding: "10px 14px", color: c.text, fontFamily: "DM Sans, sans-serif", fontSize: "14px", boxSizing: "border-box" }}
            />
            {isDemoMode && <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: c.green, marginTop: "8px" }}>✓ Demo mode active — full report unlocked</p>}
          </div>
        )}

        {!teaser && !report ? (
          <>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 42px)", color: c.text, marginBottom: "12px", letterSpacing: "-1px" }}>Run Your Audit</h1>
            <p style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "16px", marginBottom: "32px", lineHeight: 1.7 }}>
              List your subscriptions below — one per line with the monthly cost. Not sure what you pay for? Check your bank or card statement for recurring charges and paste them below.
            </p>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.sub, display: "block", marginBottom: "8px" }}>Your subscriptions <span style={{ color: c.dim }}>(one per line, include cost)</span></label>
              <textarea
                value={subscriptions}
                onChange={e => setSubscriptions(e.target.value)}
                placeholder={PLACEHOLDER}
                rows={10}
                style={{ width: "100%", background: "#0c1525", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "16px", color: c.text, fontFamily: "DM Sans, sans-serif", fontSize: "14px", lineHeight: 1.7, resize: "vertical", boxSizing: "border-box" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.sub, display: "block", marginBottom: "8px" }}>Your email <span style={{ color: c.dim }}>(optional)</span></label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{ width: "100%", background: "#0c1525", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px 16px", color: c.text, fontFamily: "DM Sans, sans-serif", fontSize: "14px", boxSizing: "border-box" }}
              />
            </div>

            {error && <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "#f87171" }}>{error}</div>}

            <button
              onClick={runAudit}
              disabled={loading}
              style={{ width: "100%", background: c.green, color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "16px", padding: "16px", borderRadius: "12px", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Analysing your stack..." : isDemoMode ? "Run Full Demo Audit →" : "Run My Free Audit →"}
            </button>
          </>
        ) : teaser ? (
          <>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "32px", color: c.text, marginBottom: "32px", letterSpacing: "-1px" }}>Your Audit Results</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
              <div style={{ background: c.card, border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" }}>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: c.dim, letterSpacing: "1px", marginBottom: "8px" }}>MONTHLY SPEND</div>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "40px", color: c.text }}>£{teaser?.totalMonthly}</div>
              </div>
              <div style={{ background: "rgba(52,211,153,0.05)", border: `1px solid ${c.greenBorder}`, borderRadius: "16px", padding: "24px" }}>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: c.green, letterSpacing: "1px", marginBottom: "8px" }}>POTENTIAL SAVING</div>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "40px", color: c.green }}>£{teaser?.annualSaving}/yr</div>
              </div>
            </div>

            <div style={{ background: c.card, border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "28px", marginBottom: "24px", position: "relative", overflow: "hidden" }}>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "15px", color: c.sub, marginBottom: "20px" }}>
                We analysed your <strong style={{ color: c.text }}>{teaser?.toolCount} subscriptions</strong> and found <strong style={{ color: c.text }}>{teaser?.wastePct}% waste</strong>. Your biggest drain is <strong style={{ color: c.green }}>{teaser?.biggestWaste}</strong>.
              </p>

              <div style={{ filter: "blur(4px)", pointerEvents: "none", userSelect: "none", opacity: 0.5 }}>
                {subscriptions.trim().split("\n").filter((l: string) => l.trim()).slice(0, 5).map((line: string, i: number) => {
                  const toolName = line.split(/[-–]/)[0].trim();
                  const prefixes = ["🔴 Cut immediately:", "🟡 Replace:", "🟢 Overlap detected:", "📊 Saving identified:", "⚡ Action:"];
                  return (
                    <div key={i} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: c.sub, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      {prefixes[i]} {toolName} — unlock to see details
                    </div>
                  );
                })}
              </div>

              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", zIndex: 10 }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>🔒</div>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "18px", color: c.text }}>Full report locked</div>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: c.sub }}>Upgrade to unlock every saving</div>
              </div>
            </div>

            <div style={{ background: "rgba(52,211,153,0.04)", border: `1px solid ${c.greenBorder}`, borderRadius: "16px", padding: "28px", textAlign: "center" }}>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "24px", color: c.green, marginBottom: "8px" }}>£{teaser?.annualSaving} waiting for you</h3>
              <p style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, fontSize: "14px", marginBottom: "24px" }}>Unlock your full report to see exactly what to cut, what to replace, and your week-by-week action plan.</p>
              <button onClick={goToCheckout} style={{ display: "inline-block", background: c.green, color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, padding: "14px 32px", borderRadius: "10px", border: "none", cursor: "pointer", fontSize: "16px", boxShadow: "0 0 40px rgba(52,211,153,0.3)" }}>
                Unlock Full Report — £19/mo →
              </button>
              <p style={{ fontFamily: "DM Sans, sans-serif", color: c.dim, fontSize: "12px", marginTop: "12px" }}>Cancel anytime · Pays for itself in week 1</p>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "28px", color: c.text, letterSpacing: "-0.5px" }}>Your Full Audit Report</h2>
              {isDemoMode && <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "#60a5fa", background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)", padding: "4px 12px", borderRadius: "100px" }}>Demo Mode</span>}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: renderedReport }}
              style={{ fontFamily: "DM Sans, sans-serif", color: c.sub, lineHeight: 1.8, fontSize: "15px" }}
            />
            <div style={{ marginTop: "40px", textAlign: "center" }}>
              <button onClick={() => { setReport(""); setTeaser(null); setSubscriptions(""); }} style={{ background: "none", border: `1px solid rgba(255,255,255,0.1)`, color: c.sub, fontFamily: "DM Sans, sans-serif", fontSize: "14px", padding: "10px 24px", borderRadius: "8px", cursor: "pointer" }}>
                Run another audit
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
