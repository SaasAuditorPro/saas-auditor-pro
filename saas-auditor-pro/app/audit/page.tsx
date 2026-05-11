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

export default function AuditPage() {
  const [subscriptions, setSubscriptions] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [error, setError] = useState("");

  const runAudit = async () => {
    if (!subscriptions.trim()) { setError("Please paste your subscriptions first."); return; }
    setError(""); setLoading(true); setReport("");
    try {
      const res = await fetch("/api/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ subscriptions, email }) });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setReport(data.report);
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
        <Link href="/checkout" style={{ fontSize: "12px", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", color: "#34d399", padding: "7px 14px", borderRadius: "8px", textDecoration: "none", fontFamily: "DM Sans, sans-serif", whiteSpace: "nowrap" }}>
          Upgrade →
        </Link>
      </nav>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px" }}>
        {!report ? (
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
            <button onClick={runAudit} disabled={loading} style={{ width: "100%", background: loading ? "#1f2937" : "#34d399", color: loading ? "#6b7280" : "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "16px", padding: "16px", borderRadius: "12px", border: "none", cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 0 40px rgba(52,211,153,0.25)", transition: "all 0.2s" }}>
              {loading ? "⏳ Analysing your stack..." : "Run My Audit →"}
            </button>
          </>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
              <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(24px, 5vw, 36px)", color: "#fff", letterSpacing: "-1px", margin: 0 }}>Your Savings Report</h1>
              <button onClick={() => { setReport(""); setSubscriptions(""); }} style={{ fontSize: "13px", color: "#6b7280", background: "none", border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif", whiteSpace: "nowrap" }}>← Run another</button>
            </div>
            <div className="report-content" dangerouslySetInnerHTML={{ __html: renderedReport }} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "16px", padding: "clamp(20px, 5vw, 40px)", marginBottom: "28px", overflowX: "auto" }} />
            <div style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "12px", padding: "24px 20px", textAlign: "center" }}>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#fff", marginBottom: "6px", fontSize: "18px" }}>Want unlimited audits?</p>
              <p style={{ fontFamily: "DM Sans, sans-serif", color: "#6b7280", fontSize: "14px", marginBottom: "16px" }}>Upgrade to Pro for £19/month — unlimited audits, renewal reminders, and more.</p>
              <Link href="/checkout" style={{ display: "inline-block", background: "#34d399", color: "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontSize: "14px" }}>Upgrade to Pro →</Link>
            </div>
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
