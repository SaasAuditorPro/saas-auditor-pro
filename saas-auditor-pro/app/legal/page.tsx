"use client";
import { useState } from "react";
import Link from "next/link";

const s = {
  bg: "#050b14", card: "#0c1525", border: "rgba(96,165,250,0.1)",
  green: "#34d399", text: "#f1f5f9", sub: "#94a3b8", dim: "#475569",
};

const sections = {
  privacy: {
    title: "Privacy Policy",
    content: [
      { h: "1. Who we are", b: `SaaS Auditor Pro is operated by Joey Payton, a sole trader registered in England and Wales. We provide an AI-powered software subscription audit tool for UK small businesses.\n\nContact: hello@saasauditorpro.com` },
      { h: "2. What data we collect", b: `We collect only the minimum data necessary:\n\n• Email address (optional — only if you choose to provide it)\n• Subscription list data you paste into the audit tool\n• Basic usage data via standard server logs\n• Payment information (handled entirely by Stripe — we never see your card details)\n\nWe do not collect bank account details or sensitive personal data.` },
      { h: "3. How we use your data", b: `We use your data solely to:\n\n• Provide the audit service you requested\n• Send your report to your email address (if provided)\n• Process your subscription payment via Stripe\n• Comply with legal obligations\n\nWe will never sell your data or share it with advertisers.` },
      { h: "4. Legal basis for processing", b: `Under UK GDPR:\n\n• Contract: to provide the service you requested\n• Legitimate interests: to improve our service and prevent fraud\n• Legal obligation: where required by law` },
      { h: "5. Third parties", b: `• Anthropic — AI processing of your subscription list\n• Stripe — payment processing\n• Vercel — website hosting\n\nWe do not share your data with any other third parties.` },
      { h: "6. Your rights under UK GDPR", b: `You have the right to access, erase, rectify, port, and object to processing of your personal data. Email hello@saasauditorpro.com to exercise these rights. You may also complain to the ICO at ico.org.uk.` },
      { h: "7. Data retention", b: `• Email addresses: deleted within 30 days of cancellation\n• Audit data: not stored — processed in real time only\n• Payment records: retained 7 years as required by UK tax law` },
    ]
  },
  terms: {
    title: "Terms & Conditions",
    content: [
      { h: "1. About these terms", b: `These Terms govern your use of SaaS Auditor Pro, operated by Joey Payton (sole trader, England and Wales). By using the service, you agree to these terms.` },
      { h: "2. The service", b: `SaaS Auditor Pro provides AI-generated subscription audit reports. Reports are informational estimates only and do not constitute financial, legal, or professional advice. You are responsible for verifying recommendations before acting on them.` },
      { h: "3. Basic plan subscription", b: `• Founder Member pricing (£19/month) is locked permanently for the first 100 subscribers while their subscription remains active\n• Standard pricing (£29/month) applies to subsequent subscribers\n• Payment is taken monthly in advance via Stripe\n• Cancel anytime — no notice period required\n• No refunds for partial months` },
      { h: "4. Acceptable use", b: `You agree not to use the service for any unlawful purpose, submit false data, reverse engineer the service, or resell access without written permission.` },
      { h: "5. Limitation of liability", b: `To the maximum extent permitted by UK law, our total liability shall not exceed the amount paid in the 3 months preceding any claim. We are not liable for decisions made based on AI-generated reports.` },
      { h: "6. Governing law", b: `These terms are governed by the laws of England and Wales.` },
    ]
  },
  cookies: {
    title: "Cookie Policy",
    content: [
      { h: "1. Cookies we use", b: `We use only essential cookies required for the service to function:\n\n• Session cookies — expire when you close your browser\n• Stripe cookies — required for payment processing\n\nWe do not use analytics, advertising, or tracking cookies.` },
      { h: "2. Third-party cookies", b: `Stripe (payments) and Vercel (hosting) may set essential cookies. See their respective privacy policies for details.` },
      { h: "3. Managing cookies", b: `You can control cookies through your browser settings. Disabling essential cookies may affect service functionality.` },
    ]
  }
};

export default function LegalPage() {
  const [active, setActive] = useState<"privacy" | "terms" | "cookies">("privacy");
  const current = sections[active];

  return (
    <main style={{ minHeight: "100vh", background: s.bg, color: s.text }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", maxWidth: "1100px", margin: "0 auto" }}>
        <Link href="/" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "19px", textDecoration: "none", letterSpacing: "-0.5px" }}>
          <span style={{ color: s.green }}>SaaS</span><span style={{ color: s.text }}>Auditor</span><span style={{ color: s.dim }}>Pro</span>
        </Link>
      </nav>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 40px)", color: s.text, letterSpacing: "-1px", marginBottom: "32px" }}>Legal</h1>

        <div style={{ display: "flex", gap: "8px", marginBottom: "48px", flexWrap: "wrap" }}>
          {(["privacy", "terms", "cookies"] as const).map(tab => (
            <button key={tab} onClick={() => setActive(tab)} style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "14px", padding: "10px 20px", borderRadius: "8px", border: `1px solid ${active === tab ? s.green : s.border}`, background: active === tab ? "rgba(52,211,153,0.1)" : "transparent", color: active === tab ? s.green : s.sub, cursor: "pointer", textTransform: "capitalize" }}>
              {tab === "privacy" ? "Privacy Policy" : tab === "terms" ? "Terms & Conditions" : "Cookie Policy"}
            </button>
          ))}
        </div>

        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "24px", color: s.text, marginBottom: "8px", letterSpacing: "-0.5px" }}>{current.title}</h2>
        <p style={{ fontFamily: "DM Sans, sans-serif", color: s.dim, fontSize: "13px", marginBottom: "40px" }}>Last updated: May 2026</p>

        {current.content.map((item, i) => (
          <div key={i} style={{ marginBottom: "32px" }}>
            <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "17px", color: s.text, marginBottom: "10px" }}>{item.h}</h3>
            <div style={{ fontFamily: "DM Sans, sans-serif", color: s.sub, fontSize: "15px", lineHeight: 1.8, whiteSpace: "pre-line" }}>{item.b}</div>
          </div>
        ))}

        <div style={{ borderTop: `1px solid ${s.border}`, paddingTop: "32px", marginTop: "48px" }}>
          <Link href="/" style={{ fontFamily: "DM Sans, sans-serif", color: s.green, textDecoration: "none", fontSize: "14px" }}>← Back to home</Link>
        </div>
      </div>
    </main>
  );
}
