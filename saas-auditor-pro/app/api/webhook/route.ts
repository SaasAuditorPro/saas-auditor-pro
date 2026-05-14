import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

async function sendEmail(to: string, subject: string, htmlContent: string) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: "SaaS Auditor Pro", email: "hello@saasauditorpro.com" },
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  });
  return res.ok;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: any;

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-04-22.dahlia" as any,
    });
    event = stripe.webhooks.constructEvent(body, sig!, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerEmail = session.customer_email || session.customer_details?.email;

    if (customerEmail) {
      // Email A: Purchase confirmation
      await sendEmail(
        customerEmail,
        "Your audit report is ready ✅",
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050b14; color: #f1f5f9; padding: 40px 32px; border-radius: 16px;">
          <div style="margin-bottom: 32px;">
            <span style="color: #34d399; font-weight: 800; font-size: 20px;">SaaS</span>
            <span style="color: #f1f5f9; font-weight: 800; font-size: 20px;">Auditor</span>
            <span style="color: #475569; font-weight: 800; font-size: 20px;">Pro</span>
          </div>
          
          <h1 style="color: #34d399; font-size: 28px; font-weight: 800; margin-bottom: 16px;">Your full report is unlocked. Let's find your savings.</h1>
          
          <p style="color: #94a3b8; font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
            You now have access to your full audit report — paste your subscriptions and see exactly where your money is going.
          </p>

          <div style="background: #0c1525; border: 1px solid rgba(52,211,153,0.25); border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <p style="color: #94a3b8; font-size: 14px; margin: 0 0 8px;">What you've unlocked:</p>
            <ul style="color: #f1f5f9; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li>Complete savings breakdown</li>
              <li>Every duplicate identified</li>
              <li>Cheaper alternatives named</li>
              <li>Week-by-week action plan</li>
              <li>One-time payment — no recurring charges</li>
            </ul>
          </div>

          <a href="https://saasauditorpro.com/audit?paid=true" style="display: inline-block; background: #34d399; color: #000; font-weight: 700; font-size: 16px; padding: 14px 32px; border-radius: 10px; text-decoration: none; margin-bottom: 32px;">
            Run My Full Audit →
          </a>

          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 32px 0;" />

          <div style="background: rgba(96,165,250,0.06); border: 1px solid rgba(96,165,250,0.15); border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <p style="color: #f1f5f9; font-size: 15px; font-weight: 700; margin: 0 0 8px;">One quick question 👋</p>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.7; margin: 0;">What would make you want to keep using this every month? Just hit reply — I read every response personally.</p>
          </div>

          <p style="color: #475569; font-size: 13px; line-height: 1.6;">
            Questions? Reply to this email or contact us at hello@saasauditorpro.com
          </p>
        </div>
        `
      );

      // Email B: Report reminder — sent straight after to prompt them to run their first audit
      await sendEmail(
        customerEmail,
        "Your full audit is waiting — here's how to run it",
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050b14; color: #f1f5f9; padding: 40px 32px; border-radius: 16px;">
          <div style="margin-bottom: 32px;">
            <span style="color: #34d399; font-weight: 800; font-size: 20px;">SaaS</span>
            <span style="color: #f1f5f9; font-weight: 800; font-size: 20px;">Auditor</span>
            <span style="color: #475569; font-weight: 800; font-size: 20px;">Pro</span>
          </div>

          <h1 style="color: #f1f5f9; font-size: 26px; font-weight: 800; margin-bottom: 16px;">Your full report is one step away.</h1>

          <p style="color: #94a3b8; font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
            To run your audit, just paste your software subscriptions — one per line with the monthly cost. Like this:
          </p>

          <div style="background: #0c1525; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; margin-bottom: 32px; font-family: monospace; font-size: 14px; color: #34d399; line-height: 1.8;">
            Xero - £28/month<br />
            Slack - £12/month<br />
            Mailchimp - £35/month<br />
            Hootsuite - £49/month<br />
            Canva Pro - £12/month
          </div>

          <p style="color: #94a3b8; font-size: 15px; line-height: 1.7; margin-bottom: 32px;">
            Check your bank statement or card for recurring charges if you're not sure what you're paying for. Most of our users find tools they'd completely forgotten about.
          </p>

          <a href="https://saasauditorpro.com/audit?paid=true" style="display: inline-block; background: #34d399; color: #000; font-weight: 700; font-size: 16px; padding: 14px 32px; border-radius: 10px; text-decoration: none; margin-bottom: 32px;">
            Run My Full Audit →
          </a>

          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 32px 0;" />

          <p style="color: #475569; font-size: 13px;">
            Questions? Reply to this email or contact hello@saasauditorpro.com
          </p>
        </div>
        `
      );
    }
  }

  return NextResponse.json({ received: true });
}
