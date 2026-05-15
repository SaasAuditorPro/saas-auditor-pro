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
Write a specific day-by-day plan across four weeks. Each day must state exactly what to do, how to do it, and why. Reference the actual tools from the subscription list above — do not write generic advice.

Use this format exactly:
Week 1 — Cancel
Day 1 — [Tool name]: Log in, go to Settings then Billing, click Cancel Subscription. Before cancelling, export your data via Settings then Data Export. This removes £X/month immediately.
Day 2 — [Tool name]: Log in, go to Account then Subscription, select Downgrade or Cancel. If a free tier exists, downgrade rather than cancel to retain your data.
Day 3 — [Tool name]: Contact support via their in-app chat or support email to request cancellation — this tool does not allow self-serve cancellation.
Day 4 — Check your bank or card statement online. Confirm each cancellation from this week has stopped charging. Flag any that are still active and contact support.
Day 5 — Rest day. No action needed.

Week 2 — Migrate
Day 1 — Sign up for [replacement tool] on their free or lowest paid tier. Import your data using their import tool, usually found under Settings then Import or Data then Import CSV.
Day 2 — Run [old tool] and [replacement tool] in parallel for three days before switching fully. This ensures nothing is lost in the migration.
Day 3 — Move your active work into [replacement tool]. Notify any team members of the change.
Day 4 — Confirm [old tool] is no longer needed. Cancel it now if you have not already done so.
Day 5 — Log the saving in your records: old cost was £X/month, new cost is £Y/month.

Week 3 — Consolidate
Day 1 — [Overlapping tool A] and [Overlapping tool B] do the same job. Pick [Tool A] to keep because [specific reason]. Log into [Tool B] and export any data you need.
Day 2 — Cancel [Tool B]. Go to Settings then Billing then Cancel.
Day 3 — Move any remaining workflows from [Tool B] into [Tool A].
Day 4 — Test that everything in [Tool A] is working correctly before considering [Tool B] fully replaced.
Day 5 — Review your updated stack. Confirm all planned cancellations from Weeks 1 to 3 are complete.

Week 4 — Lock In
Day 1 — Log into your bank or card provider and review all recurring charges. Cross-reference against your updated subscription list. Cancel anything still showing that should have been removed.
Day 2 — Calculate your new monthly total and compare it to your starting spend of £${totalMonthly}. Record the saving.
Day 3 — Set a calendar reminder for 90 days from today to review your stack again. Subscriptions creep back silently.
Day 4 — Done. Your stack is leaner. Keep the reminder.

Only include days that have real actions based on the tools in this specific subscription list. Do not pad with generic advice. Do not mention subscription tracking or auditing tools.

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
