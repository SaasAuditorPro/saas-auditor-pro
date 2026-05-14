"use client";
import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!email) return;
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
    <main style={{ minHeight: "100vh", background: "#080c10", backgroundImage: "linear-gradient(rgba(52,211,153,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(52,211,153,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", maxWidth: "1100px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <img src="/logo.svg" alt="SaaS Auditor Pro" style={{ height: "52px", width: "auto" }} />
        </Link>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ maxWidth: "440px", width: "100%" }}>

          <div style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "16px", padding: "28px 24px", marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "20px", color: "#fff" }}>Full Audit Report</div>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#6b7280", marginTop: "2px" }}>One-time payment · No subscription</div>
              </div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "28px", color: "#34d399" }}>£29<span style={{ fontSize: "14px", color: "#4b5563" }}> once</span></div>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px" }}>
              {["Complete savings breakdown", "Every duplicate identified", "Cheaper alternatives named", "Week-by-week action plan", "No recurring charges ever"].map(feature => (
                <div key={feature} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ color: "#34d399", fontSize: "14px" }}>✓</span>
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "#d1d5db" }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#9ca3af", display: "block", marginBottom: "8px" }}>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              onKeyDown={(e) => e.key === "Enter" && handleCheckout()}
              style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "13px 14px", fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "#d1d5db", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading || !email}
            style={{ width: "100%", background: loading || !email ? "#1f2937" : "#34d399", color: loading || !email ? "#6b7280" : "#000", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "16px", padding: "16px", borderRadius: "12px", border: "none", cursor: loading || !email ? "not-allowed" : "pointer", boxShadow: loading || !email ? "none" : "0 0 40px rgba(52,211,153,0.25)", transition: "all 0.2s", marginBottom: "12px" }}
          >
            {loading ? "Redirecting to payment..." : "Get My Full Report — £29 →"}
          </button>

          <p style={{ textAlign: "center", fontFamily: "DM Sans, sans-serif", color: "#4b5563", fontSize: "12px" }}>
            🔒 Secure payment via Stripe · One-time charge · No hidden fees
          </p>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "24px", paddingTop: "16px", textAlign: "center" }}>
            <Link href="/audit" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#6b7280", textDecoration: "none" }}>← Back to audit</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
