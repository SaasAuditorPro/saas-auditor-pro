import Link from "next/link";

const s = {
  bg: "#050b14", card: "#0c1525", border: "rgba(96,165,250,0.1)",
  green: "#34d399", text: "#f1f5f9", sub: "#94a3b8", dim: "#475569",
};

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "100vh", background: s.bg, color: s.text }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", maxWidth: "1100px", margin: "0 auto" }}>
        <Link href="/" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "19px", textDecoration: "none", letterSpacing: "-0.5px" }}>
          <span style={{ color: s.green }}>SaaS</span><span style={{ color: s.text }}>Auditor</span><span style={{ color: s.dim }}>Pro</span>
        </Link>
      </nav>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 42px)", color: s.text, letterSpacing: "-1px", marginBottom: "8px" }}>Privacy Policy</h1>
        <p style={{ fontFamily: "DM Sans, sans-serif", color: s.dim, fontSize: "14px", marginBottom: "48px" }}>Last updated: May 2026</p>

        {[
          { title: "1. Who we are", body: `SaaS Auditor Pro is operated by Joey Payton, a sole trader registered in England and Wales. We provide an AI-powered software subscription audit tool for UK small businesses.\n\nContact: hello@saasauditorpro.com\nWebsite: saas-auditor-pro.vercel.app` },
          { title: "2. What data we collect", body: `We collect only the minimum data necessary to provide our service:\n\n• Email address (optional — only if you choose to provide it)\n• Subscription list data you paste into the audit tool\n• Basic usage data (pages visited, time on site) via standard server logs\n• Payment information (handled entirely by Stripe — we never see your card details)\n\nWe do not collect bank account details, financial transaction data, or any sensitive personal data.` },
          { title: "3. How we use your data", body: `We use your data solely to:\n\n• Provide the audit service you requested\n• Send your report to your email address (if provided)\n• Improve our AI analysis over time (in aggregate, anonymised form only)\n• Process your subscription payment via Stripe\n• Comply with legal obligations\n\nWe will never sell your data, share it with advertisers, or use it for any purpose other than providing and improving the service.` },
          { title: "4. Legal basis for processing", body: `Under UK GDPR, we process your data on the following legal bases:\n\n• Contract: to provide the service you have requested\n• Legitimate interests: to improve our service and prevent fraud\n• Consent: where you have explicitly opted in (e.g. email reports)\n• Legal obligation: where required by law` },
          { title: "5. Third parties we share data with", body: `We share your data with the following trusted third parties only as necessary to provide the service:\n\n• Anthropic (AI processing) — your subscription list is processed by Anthropic's Claude API to generate your audit report. Anthropic's privacy policy applies: anthropic.com/privacy\n• Stripe (payments) — payment processing for Basic plan subscribers. Stripe's privacy policy applies: stripe.com/privacy\n• Vercel (hosting) — our website is hosted on Vercel. Vercel's privacy policy applies: vercel.com/legal/privacy-policy\n\nWe do not share your data with any other third parties.` },
          { title: "6. Data retention", body: `We retain your data for as long as necessary to provide the service:\n\n• Email addresses: retained while your subscription is active, deleted within 30 days of cancellation\n• Audit data: not stored — subscription lists you paste are processed in real time and not saved to any database\n• Payment records: retained for 7 years as required by UK tax law\n• Usage logs: retained for 90 days` },
          { title: "7. Your rights under UK GDPR", body: `You have the following rights regarding your personal data:\n\n• Right of access — request a copy of the data we hold about you\n• Right to erasure — request deletion of your personal data\n• Right to rectification — request correction of inaccurate data\n• Right to portability — receive your data in a portable format\n• Right to object — object to processing based on legitimate interests\n• Right to restrict processing — request we limit how we use your data\n\nTo exercise any of these rights, email us at hello@saasauditorpro.com. We will respond within 30 days. You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.` },
          { title: "8. Cookies", body: `We use only essential cookies required for the site to function. See our Cookie Policy for full details.` },
          { title: "9. Data security", body: `We take reasonable technical and organisational measures to protect your data, including:\n\n• HTTPS encryption on all data in transit\n• Secure third-party processors (Stripe, Vercel, Anthropic) with their own security certifications\n• No storage of payment card data on our systems\n• No storage of audit input data after processing` },
          { title: "10. Changes to this policy", body: `We may update this policy from time to time. We will notify subscribers of material changes by email. Continued use of the service after changes constitutes acceptance of the updated policy.` },
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
