import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email) return NextResponse.json({ error: "No email provided" }, { status: 400 });

    const res = await fetch("https://api.brevo.com/v3/contacts", {
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

    if (res.ok || res.status === 204) {
      return NextResponse.json({ success: true });
    } else {
      const data = await res.json();
      console.error("Brevo error:", data);
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
