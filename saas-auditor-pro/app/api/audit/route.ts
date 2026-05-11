import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { subscriptions, isPro } = await req.json();

    if (!subscriptions) {
      return NextResponse.json({ error: "No subscriptions provided" }, { status: 400 });
    }

    if (isPro) {
      const message = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1500,
        messages: [{
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

⚡ ACTION PLAN
Week by week priority order of what to do.

Be specific, direct, and give exact figures. Format clearly. No waffle.`
        }]
      });
      const report = message.content[0].type === "text" ? message.content[0].text : "";
      return NextResponse.json({ report, isPro: true });

    } else {
      const message = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        messages: [{
          role: "user",
          content: `You are a SaaS cost optimisation expert. Analyse this list of software subscriptions.

SUBSCRIPTIONS:
${subscriptions}

Return ONLY a JSON object with no markdown, no backticks:
{
  "totalMonthly": <total monthly spend as number>,
  "wastePct": <estimated waste percentage as number between 20-60>,
  "annualSaving": <estimated annual saving as number>,
  "toolCount": <number of subscriptions>,
  "biggestWaste": "<name of single biggest waste tool>"
}`
        }]
      });

      const text = message.content[0].type === "text" ? message.content[0].text : "{}";
      const clean = text.replace(/```json|```/g, "").trim();
      const data = JSON.parse(clean);
      return NextResponse.json({ teaser: data, isPro: false });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
