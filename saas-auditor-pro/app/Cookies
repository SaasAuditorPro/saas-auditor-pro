import Link from "next/link";

const s = {
  bg: "#050b14", border: "rgba(96,165,250,0.1)",
  green: "#34d399", text: "#f1f5f9", sub: "#94a3b8", dim: "#475569",
};

export default function CookiesPage() {
  return (
    <main style={{ minHeight: "100vh", background: s.bg, color: s.text }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", maxWidth: "1100px", margin: "0 auto" }}>
        <Link href="/" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "19px", textDecoration: "none", letterSpacing: "-0.5px" }}>
          <span style={{ color: s.green }}>SaaS</span><span style={{ color: s.text }}>Auditor</span><span style={{ color: s.dim }}>Pro</span>
        </Link>
      </nav>
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "40px 24px 80px" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 5vw, 42px)", color: s.text, letterSpacing: "-1px", marginBottom: "8px" }}>Cookie Policy</h1>
        <p style={{ fontFamily: "DM Sans, sans-serif", color: s.dim, fontSize: "14px", marginBottom: "48px" }}>Last updated: May 2026</p>

        {[
          { title: "1. What are cookies?", body: `Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences and improve your experience.` },
          { title: "2. Cookies we use", body: `SaaS Auditor Pro uses only the minimum cookies necessary to operate the service. We do not use advertising cookies or tracking cookies.\n\nEssential cookies (required for the service to work):\n\n• Session cookies — temporary cookies that expire when you close your browser. Used to maintain your session while using the audit tool.\n• Stripe cookies — set by Stripe when you access the checkout. Required for payment processing. See stripe.com/cookies-policy for details.\n\nWe do not use:\n• Analytics cookies (Google Analytics, Hotjar, etc.)\n• Advertising or retargeting cookies\n• Social media tracking cookies` },
          { title: "3. Third-party cookies", body: `Stripe, our payment processor, may set cookies when you visit our checkout page. These are governed by Stripe's cookie policy at stripe.com/cookies-policy.\n\nVercel, our hosting provider, may set performance cookies. These are governed by Vercel's privacy policy at vercel.com/legal/privacy-policy.` },
          { title: "4. Managing cookies", body: `You can control and delete cookies through your browser settings. Please note that disabling essential cookies may affect the functionality of the service.\n\nHow to manage cookies in common browsers:\n• Chrome: Settings → Privacy and Security → Cookies\n• Safari: Preferences → Privacy → Manage Website Data\n• Firefox: Settings → Privacy & Security → Cookies\n• Edge: Settings → Privacy → Cookies` },
          { title: "5. Changes to this policy", body: `We may update this policy if we add new features that require additional cookies. We will update the "last updated" date above when we do.` },
          { title: "6. Contact", body: `Questions about our use of cookies: hello@saasauditorpro.com` },
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
