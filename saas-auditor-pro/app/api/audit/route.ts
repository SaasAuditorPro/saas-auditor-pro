import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function calculateSummary(subscriptions: string) {
  const lines = subscriptions.trim().split("\n").filter(l => l.trim());
  let totalMonthly = 0;
  const toolCount = lines.length;

  lines.forEach(line => {
    const match = line.match(/£(\d+(?:\.\d+)?)/);
    if (match) totalMonthly += parseFloat(match[1]);
  });

  return { totalMonthly: Math.round(totalMonthly), toolCount };
}

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
Be specific, direct, and give exact figures. Format clearly. No waffle.
IMPORTANT RULES:
- Only recommend alternatives you are 100% certain exist and are genuinely cheaper
- Do NOT recommend any subscription management, spend tracking, or SaaS auditing tools
- Do NOT make up or hallucinate any tool names or products
- Only base your analysis on what is actually in the subscription list provided
- Do not add generic advice about ongoing monitoring tools

At the very end of your response, after all sections, append this exact line with real numbers:
SUMMARY_JSON:{"totalMonthly":<exact total monthly spend as integer>,"annualSaving":<total annual saving from all cuts as integer>,"wastePct":<waste percentage as integer>}`
        }]
      });
      const fullText = message.content[0].type === "text" ? message.content[0].text : "";
      
      // Split report from summary JSON
      const jsonStart = fullText.indexOf('SUMMARY_JSON:');
      const jsonMatch = jsonStart !== -1 ? [null, fullText.slice(jsonStart + 13, fullText.indexOf('}', jsonStart) + 1)] : null;
      let summary = null;
      let report = fullText;
      
      if (jsonMatch) {
        try {
          summary = JSON.parse(jsonMatch[1] as string);
          report = jsonStart !== -1 ? fullText.slice(0, jsonStart).trim() : fullText.trim();
        } catch { summary = null; }
      }

      return NextResponse.json({ report, isPro: true, summary });
    } else {
      const message = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        messages: [{
          role: "user",
          content: `You are a SaaS cost optimisation expert. Analyse this list of software subscriptions honestly and identify real waste only.
SUBSCRIPTIONS:
${subscriptions}
Return ONLY a JSON object with no markdown, no backticks:
{
  "totalMonthly": <total monthly spend as number>,
  "wastePct": <number only, genuine waste percentage based on actual duplicates and overlaps you can see>,
  "annualSaving": <estimated annual saving as number>,
  "toolCount": <number of subscriptions>,
  "biggestWaste": "<name of single biggest waste tool>"
}`
        }]
      });
      const text = message.content[0].type === "text" ? message.content[0].text : "{}";
      const clean = text.replace(/```json|```/g, "").trim();
      try {
        const data = JSON.parse(clean);
        return NextResponse.json({ teaser: data, isPro: false });
      } catch {
        return NextResponse.json({ error: "Failed to parse analysis" }, { status: 500 });
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
