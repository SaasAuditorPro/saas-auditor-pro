import Link from "next/link";

const s = {
  bg: "#050b14", card: "#0c1525", border: "rgba(96,165,250,0.1)",
  green: "#34d399", text: "#f1f5f9", sub: "#94a3b8", dim: "#475569",
};

export default function TermsPage() {
  return (
    <main style={{ minHeight: "100vh", background: s.bg, color: s.text }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", maxWidth: "1100px", margin: "0 auto" }}>
        <Link href="/" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "19px", textDecoration: "none", letterSpacing: "-0.5px" }}>
          <span style={{ color: s.green }}>SaaS</span><span style={{ color: s.text }}>Auditor</span><span style={{ color: s.dim }}>Pro</span>
        </Link>
      </nav>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 42px)", color: s.text, letterSpacing: "-1px", marginBottom: "8px" }}>Terms & Conditions</h1>
        <p style={{ fontFamily: "DM Sans, sans-serif", color: s.dim, fontSize: "14px", marginBottom: "48px" }}>Last updated: May 2026</p>

        {[
          { title: "1. About these terms", body: `These Terms & Conditions govern your use of SaaS Auditor Pro, operated by Joey Payton (sole trader, England and Wales). By using the service, you agree to these terms.\n\nIf you do not agree, please do not use the service.` },
          { title: "2. The service", body: `SaaS Auditor Pro provides an AI-powered tool that analyses software subscription lists provided by users and generates estimated cost savings reports.\n\nThe service is provided "as is." Reports are AI-generated estimates based on the information you provide. They are informational only and do not constitute financial, legal, or professional advice. You are responsible for verifying any recommendations before acting on them.` },
          { title: "3. Free snapshot", body: `The free snapshot feature allows any user to paste a subscription list and receive an estimated annual savings figure at no cost. No account or payment is required.\n\nThe free tier is provided at our sole discretion and may be modified or withdrawn at any time.` },
          { title: "4. Basic plan subscription", body: `The Basic plan is a monthly recurring subscription charged at the price displayed at the time of purchase via Stripe.\n\n• Founder Member pricing (£19/month) is locked permanently for the first 100 subscribers, for as long as their subscription remains active and uninterrupted\n• Standard pricing (£29/month) applies to all subsequent subscribers\n• Payment is taken monthly in advance\n• Subscriptions renew automatically unless cancelled\n• You may cancel at any time via your Stripe customer portal — cancellation takes effect at the end of the current billing period\n• We do not offer refunds for partial months` },
          { title: "5. Acceptable use", body: `You agree not to:\n\n• Use the service for any unlawful purpose\n• Submit false, misleading, or third-party subscription data without authorisation\n• Attempt to reverse engineer, scrape, or exploit the service\n• Resell or sublicense access to the service without written permission\n• Use the service in a way that disrupts or damages it` },
          { title: "6. Intellectual property", body: `All content, design, code, and AI prompting methodology of SaaS Auditor Pro is the intellectual property of Joey Payton. You may not copy, reproduce, or distribute any part of the service without written permission.\n\nYou retain ownership of any subscription data you submit. By submitting it, you grant us a limited licence to process it for the purpose of generating your report.` },
          { title: "7. Accuracy and disclaimers", body: `AI-generated reports are estimates based on the data provided. We make no guarantees regarding:\n\n• The accuracy of savings figures\n• The availability or pricing of suggested alternative tools\n• The suitability of recommendations for your specific business\n\nAlways conduct your own research before making business decisions based on our reports.` },
          { title: "8. Limitation of liability", body: `To the maximum extent permitted by UK law, SaaS Auditor Pro shall not be liable for:\n\n• Any indirect, incidental, or consequential loss\n• Loss of profits, data, or business opportunity\n• Decisions made based on AI-generated reports\n\nOur total liability to you shall not exceed the amount you have paid us in the 3 months preceding any claim.` },
          { title: "9. Governing law", body: `These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.` },
          { title: "10. Changes to terms", body: `We may update these terms from time to time. We will notify subscribers of material changes by email with 14 days notice. Continued use after notice constitutes acceptance.` },
          { title: "11. Contact", body: `Questions about these terms: hello@saasauditorpro.com` },
        ].map((s2, i) => (
          <div key={i} style={{ marginBottom: "36px" }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "18px", color: s.text, marginBottom: "12px" }}>{s2.title}</h2>
            <div style={{ fontFamily: "DM Sans, sans-serif", color: s.sub, fontSize: "15px", lineHeight: 1.8, whiteSpace: "pre-line" }}>{s2.body}</div>
          </div>
        ))}

        <div style={{ borderTop: `1px solid ${s.border}`, paddingTop: "32px", marginTop: "48px" }}>
          <Link href="/" style={{ fontFamily: "DM Sans, sans-serif", color: s.green, textDecoration: "none", fontSize: "14px" }}>← Back to home</Link>
        </div>
      </div>
    </main>
  );
}
