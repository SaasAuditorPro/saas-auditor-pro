import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Calculate monthly spend precisely from the subscription list — no AI needed
function calculateMonthlySpend(subscriptions: string): { totalMonthly: number; toolCount: number } {
  const lines = subscriptions.trim().split("\n").filter((l: string) => l.trim());
  let totalMonthly = 0;
  lines.forEach((line: string) => {
    const match = line.match(/£(\d+(?:\.\d+)?)/);
    if (match) totalMonthly += parseFloat(match[1]);
  });
  return { totalMonthly: Math.round(totalMonthly), toolCount: lines.length };
}

// Extract annual saving from report text — looks for ANNUAL_SAVING: line
function extractAnnualSaving(report: string): number | null {
  const match = report.match(/ANNUAL_SAVING:\s*(\d+)/);
  if (match) return parseInt(match[1]);
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { subscriptions, isPro } = await req.json();

    if (!subscriptions) {
      return NextResponse.json({ error: "No subscriptions provided" }, { status: 400 });
    }

    if (isPro) {
      // Monthly spend calculated precisely from the list
      const { totalMonthly, toolCount } = calculateMonthlySpend(subscriptions);

      // Single AI call for the full report
      const reportRes = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2500,
        messages: [{
          role: "user",
          content: `You are a SaaS cost optimisation expert. Analyse this list of software subscriptions and produce a clear savings report.
IMPORTANT: The total monthly spend is exactly £${totalMonthly}. Use this figure throughout your report — do not recalculate it.
SUBSCRIPTIONS:
${subscriptions}

Produce a clean, professional audit report. No emoji. No markdown bold or headers with ##. No bullet points. Use plain section titles in capitals only.

WASTE ANALYSIS
Two to three sentences only. State the waste percentage, reference the exact monthly total provided, and name the main categories of waste.

CUT IMMEDIATELY
List each tool on its own line in this exact format:
Tool name — £X/month — One sentence reason.

REPLACE WITH CHEAPER ALTERNATIVE
List each replacement on its own line in this exact format:
Current tool £X/month — Replace with: Alternative — Save £X/month — One sentence reason.
Only include alternatives you are certain exist and are genuinely cheaper.

OVERLAPPING TOOLS
Group by category. One short paragraph per category. State which tools overlap, which single tool to keep and why, and the monthly saving.

SUMMARY
Four lines only, no other text:
Current monthly spend: £X
Monthly saving: £X
Annual saving: £X
New monthly spend: £X

ACTION PLAN
Four lines only. One action per week:
Week 1 — Action.
Week 2 — Action.
Week 3 — Action.
Week 4 — Action.

Be precise. Use the exact monthly total provided. No waffle. No emoji. No markdown.
IMPORTANT RULES:
- Only recommend alternatives you are 100% certain exist and are genuinely cheaper
- Do NOT recommend any subscription management, spend tracking, or SaaS auditing tools
- Do NOT make up or hallucinate any tool names or products
- Only base your analysis on what is actually in the subscription list provided
- Do not add generic advice about ongoing monitoring tools

At the very end of your response on its own line write exactly this with the real number:
ANNUAL_SAVING: [total annual saving as integer with no symbols or commas]`
        }]
      });

      const fullText = reportRes.content[0].type === "text" ? reportRes.content[0].text : "";

      // Extract annual saving from the report and strip the tag from display
      const annualSaving = extractAnnualSaving(fullText);
      const report = fullText.replace(/ANNUAL_SAVING:\s*\d+/g, "").trim();

      return NextResponse.json({
        report,
        isPro: true,
        summary: { totalMonthly, toolCount, annualSaving }
      });

    } else {
      // Free snapshot — calculate monthly spend from list, AI provides waste analysis
      const { totalMonthly, toolCount } = calculateMonthlySpend(subscriptions);

      const message = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 200,
        messages: [{
          role: "user",
          content: `Analyse this subscription list honestly. Return ONLY a JSON object with no markdown, no backticks:
{
  "wastePct": <genuine waste percentage as integer, based only on actual duplicates and overlaps you can see>,
  "annualSaving": <estimated annual saving as integer>,
  "biggestWaste": "<name of single biggest waste tool or overlap>"
}

SUBSCRIPTIONS:
${subscriptions}`
        }]
      });

      const text = message.content[0].type === "text" ? message.content[0].text : "{}";
      const clean = text.replace(/```json|```/g, "").trim();
      try {
        const data = JSON.parse(clean);
        // Use precise monthly spend from list, not AI estimate
        return NextResponse.json({
          teaser: {
            totalMonthly,
            toolCount,
            wastePct: data.wastePct,
            annualSaving: data.annualSaving,
            biggestWaste: data.biggestWaste
          },
          isPro: false
        });
      } catch {
        return NextResponse.json({ error: "Failed to parse analysis" }, { status: 500 });
      }
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
