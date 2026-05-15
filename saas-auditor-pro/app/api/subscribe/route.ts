import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, annualSaving, totalMonthly } = await req.json();

    if (!email) return NextResponse.json({ error: "No email provided" }, { status: 400 });

    // Add to Brevo contact list
    const listRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        email,
        listIds: [2],
        updateEnabled: true,
        attributes: {
          SOURCE: "SaaS Auditor Pro — Free Snapshot",
        },
      }),
    });

    // Send follow-up email with savings figure
    const savingText = annualSaving && annualSaving > 0
      ? `£${annualSaving}/year`
      : "significant savings";

    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: { name: "SaaS Auditor Pro", email: "hello@saasauditorpro.com" },
        to: [{ email }],
        subject: `You have ${savingText} in wasted software spend`,
        htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050b14; color: #f1f5f9; padding: 40px 32px; border-radius: 16px;">
          <div style="margin-bottom: 32px;">
            <span style="color: #34d399; font-weight: 800; font-size: 20px;">SaaS</span>
            <span style="color: #f1f5f9; font-weight: 800; font-size: 20px;">Auditor</span>
            <span style="color: #475569; font-weight: 800; font-size: 20px;">Pro</span>
          </div>

          <h1 style="color: #f1f5f9; font-size: 26px; font-weight: 800; margin-bottom: 16px;">
            Your free snapshot is ready.
          </h1>

          ${annualSaving && annualSaving > 0 ? `
          <div style="background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.25); border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
            <p style="color: #94a3b8; font-size: 14px; margin: 0 0 8px; letter-spacing: 1px;">POTENTIAL ANNUAL SAVING</p>
            <p style="color: #34d399; font-size: 48px; font-weight: 800; margin: 0; letter-spacing: -2px;">£${annualSaving}</p>
          </div>
          ` : ''}

          <p style="color: #94a3b8; font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
            We've identified waste in your software stack. Your full report shows exactly which tools to cut, what to replace them with, and a week-by-week action plan to reclaim that money.
          </p>

          <p style="color: #94a3b8; font-size: 15px; line-height: 1.7; margin-bottom: 32px;">
            Unlock your full report for <strong style="color: #f1f5f9;">£29 one-time</strong> — no subscription, no recurring charges.
          </p>

          <a href="https://saasauditorpro.com/audit" style="display: inline-block; background: #34d399; color: #000; font-weight: 700; font-size: 16px; padding: 14px 32px; border-radius: 10px; text-decoration: none; margin-bottom: 32px;">
            Unlock My Full Report →
          </a>

          <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 32px 0;" />

          <p style="color: #475569; font-size: 12px; line-height: 1.6;">
            You received this because you ran a free audit at saasauditorpro.com.<br />
            Questions? Reply to this email or contact hello@saasauditorpro.com
          </p>
        </div>
        `
      }),
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
