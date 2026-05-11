import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { subscriptions } = await req.json();

    if (!subscriptions) {
      return NextResponse.json({ error: "No subscriptions provided" }, { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `You are a SaaS cost optimisation expert. Analyse this list of software subscriptions and produce a clear savings report.

SUBSCRIPTIONS:
${subscriptions}

Produce a report with these sections:

💰 ESTIMATED MONTHLY WASTE
Calculate total monthly spend and estimate what percentage is waste/overlap.

🔴 CUT IMMEDIATELY (highest priority savings)
List subscriptions to cancel with exact saving and reason.

🟡 REPLACE WITH CHEAPER ALTERNATIVE
List subscriptions that could be replaced with a cheaper tool. Name the alternative and the saving.

🟢 OVERLAPPING TOOLS
Identify tools that do the same thing - they are paying twice.

📊 SUMMARY
Total monthly spend, estimated monthly saving, estimated annual saving.

Be specific, direct, and give exact figures. Format clearly. No waffle.`,
        },
      ],
    });

    const report = message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ report });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
