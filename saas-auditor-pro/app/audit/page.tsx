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

interface Teaser { totalMonthly: number; wastePct: number; annualSaving: number; toolCount: number; biggestWaste: string; }

export default function AuditPage() {
  const [subscriptions, setSubscriptions] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [teaser, setTeaser] = useState<Teaser | null>(null);
  const [error, setError] = useState("");

  const runAudit = async (isPro = false) => {
    if (!subscriptions.trim()) { setError("Please paste your subscriptions first."); return; }
    setError(""); setLoading(true); setReport(""); setTeaser(null);
    try {
      const res = await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subscriptions, email, isPro }) });
      const data = await res.json();
      if (data.error) setError(data.error);
      else if (data.isPro) setReport(data.report);
      else setTeaser(data.teaser);
    } catch { setError("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  const renderedReport = report ? marked(report) as string : "";

  return (
    <main style={{ minHeight: "100vh", background: "#080c10" }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "18px", textDecoration: "none", letterSpacing: "-0.5px" }}>
          <span style={{ color: "#34d399" }}>SaaS</span><span style={{ color: "#fff" }}>Auditor</span><span style={{ color: "#4b5563" }}>Pro</span>
        </Link>
        <Link href="/checkout" style={{ fontSize: "12px", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399", padding: "7px 14px", borderRadius: "8px", textDecoration: "none", fontFamily: "DM Sans, sans-serif", whiteSpace: "nowrap" }}>Upgrade →</Link>
      </nav>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px" }}>
        {!teaser && !report ? (
          <>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 6vw, 42px)", color: "#fff", marginBottom: "8px", letterSpacing: "-1px" }}>Run Your Audit</h1>
            <p style={{ fontFamily: "DM Sans, sans-serif", color: "#6b7280", marginBottom: "32px", fontSize: "15px" }}>List your subscriptions below — one per line with the monthly cost.</p>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#9ca3af", display: "block", marginBottom: "8px" }}>Your subscriptions <span style={{ color: "#4b5563" }}>(one per line, include cost)</span></label>
              <textarea value={subscriptions} onChange={(e) => setSubscriptions(e.target.value)} placeholder={PLACEHOLDER} rows={12} style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "14px", fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "#d1d5db", outline: "none", resize: "none", boxSizing: "border-box", lineHeight: "1.7" }} />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#9ca3af", display: "block", marginBottom: "8px" }}>Your email <span style={{ color: "#4b5563" }}>(optional)</span></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "13px 14px", fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "#d1d5db", outline: "none", boxSizing: "border-box" }} />
            </div>
            {error && <p style={{ color: "#f87171", fontSize: "14px", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "8px", padding: "12px 14px", marginBottom: "16px", fontFamily: "DM Sans, sans-serif" }}>{error}</p>}
            <button onClick={() => runAudit(false)} disabled={loading} style={{ width: "100%", background: loading ? "#1f2937" : "#34d399", color: loading ? "#6b7280" : "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "16px", padding: "16px", borderRadius: "12px", border: "none", cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 0 40px rgba(52,211,153,0.25)", transition: "all 0.2s" }}>
              {loading ? "Analysing your stack..." : "Run My Free Audit →"}
            </button>
          </>
        ) : teaser ? (
          <>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(24px, 5vw, 36px)", color: "#fff", letterSpacing: "-1px", marginBottom: "32px" }}>Your Audit Results</h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "20px" }}>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "#6b7280", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Monthly spend</div>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "32px", color: "#fff", letterSpacing: "-1px" }}>£{teaser.totalMonthly}</div>
              </div>
              <div style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: "16px", padding: "20px" }}>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "#34d399", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Potential saving</div>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "32px", color: "#34d399", letterSpacing: "-1px" }}>£{teaser.annualSaving}/yr</div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "24px", marginBottom: "28px" }}>
              <p style={{ fontFamily: "DM Sans, sans-serif", color: "#9ca3af", fontSize: "14px", marginBottom: "16px" }}>
                We analysed your {teaser.toolCount} subscriptions and found <strong style={{ color: "#fff" }}>{teaser.wastePct}% waste</strong>. Your biggest drain is <strong style={{ color: "#f87171" }}>{teaser.biggestWaste}</strong>.
              </p>

              <div style={{ position: "relative", overflow: "hidden", borderRadius: "12px" }}>
                <div style={{ filter: "blur(4px)", opacity: 0.4, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px", fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#d1d5db", lineHeight: 1.8 }}>
                  <p>🔴 CUT IMMEDIATELY</p>
                  <p>████████ — £XX/month — ████████████████</p>
                  <p>████████ — £XX/month — ████████████████</p>
                  <p>🟡 REPLACE WITH CHEAPER ALTERNATIVE</p>
                  <p>████████ → ████████ — Save £XX/month</p>
                  <p>🟢 OVERLAPPING TOOLS</p>
                  <p>████████ and ████████ do the same thing</p>
                  <p>📊 YOUR OPTIMISED STACK — £XXX/month</p>
                </div>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,12,16,0.7)", borderRadius: "12px" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "18px", color: "#fff", marginBottom: "4px" }}>🔒 Full report locked</div>
                    <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#6b7280" }}>Upgrade to unlock every saving</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: "16px", padding: "28px 24px", textAlign: "center", marginBottom: "16px" }}>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "28px", color: "#34d399", marginBottom: "4px" }}>£{teaser.annualSaving} waiting for you</div>
              <p style={{ fontFamily: "DM Sans, sans-serif", color: "#9ca3af", fontSize: "14px", marginBottom: "20px" }}>Unlock your full report to see exactly what to cut, what to replace, and your week-by-week action plan.</p>
              <Link href="/checkout" style={{ display: "inline-block", background: "#34d399", color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, padding: "14px 32px", borderRadius: "10px", textDecoration: "none", fontSize: "16px", boxShadow: "0 0 40px rgba(52,211,153,0.3)" }}>
                Unlock Full Report — £19/mo →
              </Link>
              <p style={{ fontFamily: "DM Sans, sans-serif", color: "#4b5563", fontSize: "12px", marginTop: "12px" }}>Cancel anytime · Pays for itself in week 1</p>
            </div>

            <button onClick={() => { setTeaser(null); setSubscriptions(""); }} style={{ width: "100%", background: "none", border: "1px solid rgba(255,255,255,0.08)", color: "#6b7280", fontFamily: "DM Sans, sans-serif", fontSize: "13px", padding: "12px", borderRadius: "10px", cursor: "pointer" }}>← Start over</button>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
              <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(24px, 5vw, 36px)", color: "#fff", letterSpacing: "-1px", margin: 0 }}>Your Full Savings Report</h1>
              <button onClick={() => { setReport(""); setSubscriptions(""); }} style={{ fontSize: "13px", color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif", whiteSpace: "nowrap" }}>← Run another</button>
            </div>
            <div className="report-content" dangerouslySetInnerHTML={{ __html: renderedReport }} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "16px", padding: "clamp(20px, 5vw, 40px)", marginBottom: "28px", overflowX: "auto" }} />
          </>
        )}
      </div>

      <style>{`
        .report-content { color: #d1d5db; font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 1.8; }
        .report-content h1, .report-content h2, .report-content h3 { font-family: 'Syne', sans-serif; color: #f9fafb; margin: 24px 0 10px; letter-spacing: -0.5px; }
        .report-content h2 { font-size: 18px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px; }
        .report-content h3 { font-size: 16px; color: #34d399; }
        .report-content p { margin: 10px 0; }
        .report-content strong { color: #f9fafb; font-weight: 600; }
        .report-content ul, .report-content ol { padding-left: 18px; margin: 10px 0; }
        .report-content li { margin: 5px 0; }
        .report-content table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; min-width: 300px; }
        .report-content th { background: rgba(52,211,153,0.1); color: #34d399; padding: 8px 12px; text-align: left; font-family: 'Syne', sans-serif; font-weight: 600; border: 1px solid rgba(52,211,153,0.2); }
        .report-content td { padding: 8px 12px; border: 1px solid rgba(255,255,255,0.06); color: #d1d5db; }
        .report-content tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
        .report-content hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 20px 0; }
      `}</style>
    </main>
  );
}
