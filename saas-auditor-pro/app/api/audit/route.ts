import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Step 1: Calculate monthly spend precisely from the subscription list — no AI needed
function calculateMonthlySpend(subscriptions: string): { totalMonthly: number; toolCount: number } {
  const lines = subscriptions.trim().split("\n").filter((l: string) => l.trim());
  let totalMonthly = 0;
  lines.forEach((line: string) => {
    const match = line.match(/£(\d+(?:\.\d+)?)/);
    if (match) totalMonthly += parseFloat(match[1]);
  });
  return { totalMonthly: Math.round(totalMonthly), toolCount: lines.length };
}

export async function POST(req: NextRequest) {
  try {
    const { subscriptions, isPro } = await req.json();

    if (!subscriptions) {
      return NextResponse.json({ error: "No subscriptions provided" }, { status: 400 });
    }

    if (isPro) {
      // Step 1: Precise monthly spend from list
      const { totalMonthly, toolCount } = calculateMonthlySpend(subscriptions);

      // Steps 2 & 3: Run saving figure and full report in parallel
      const [savingRes, reportRes] = await Promise.all([

        // Step 2: AI returns only the annual saving figure as JSON
        client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 100,
          messages: [{
            role: "user",
            content: `Analyse this subscription list. Return ONLY this JSON object with no markdown and no other text:
{"annualSaving": <total annual saving in pounds as a whole number, based only on genuine duplicates and overlaps visible in the list>}

SUBSCRIPTIONS:
${subscriptions}`
          }]
        }),

        // Step 3: Full detailed report
        client.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 2500,
          messages: [{
            role: "user",
            content: `You are a SaaS cost optimisation expert. Analyse this list of software subscriptions and produce a clear savings report.
SUBSCRIPTIONS:
${subscriptions}

Produce a report with these sections:
💰 ESTIMATED MONTHLY WASTE
Calculate what percentage is waste/overlap and why.
🔴 CUT IMMEDIATELY (highest priority savings)
List subscriptions to cancel with exact monthly saving and reason.
🟡 REPLACE WITH CHEAPER ALTERNATIVE
List subscriptions that could be replaced with a cheaper tool. Name the alternative and the saving.
🟢 OVERLAPPING TOOLS
Identify tools that do the same thing — they are paying twice.
📊 SUMMARY
Total monthly saving and total annual saving.
⚡ ACTION PLAN
Week by week priority order of what to do.
Be specific, direct, and give exact figures. Format clearly. No waffle.
IMPORTANT RULES:
- Only recommend alternatives you are 100% certain exist and are genuinely cheaper
- Do NOT recommend any subscription management, spend tracking, or SaaS auditing tools
- Do NOT make up or hallucinate any tool names or products
- Only base your analysis on what is actually in the subscription list provided
- Do not add generic advice about ongoing monitoring tools`
          }]
        })

      ]);

      // Extract annual saving from JSON response
      const savingText = savingRes.content[0].type === "text" ? savingRes.content[0].text : "{}";
      let annualSaving = null;
      try {
        const clean = savingText.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(clean);
        annualSaving = parsed.annualSaving || null;
      } catch { annualSaving = null; }

      const report = reportRes.content[0].type === "text" ? reportRes.content[0].text : "";

      return NextResponse.json({
        report,
        isPro: true,
        summary: { totalMonthly, toolCount, annualSaving }
      });

    } else {
      // Free snapshot
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
