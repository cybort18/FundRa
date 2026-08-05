import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { castVote } from "@/lib/db/engine";

// POST /api/governance/vote — Cast a vote on a milestone
export async function POST(request: NextRequest) {
  ensureDb();

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { campaignId, milestoneId, walletAddress, vote } = body as Record<string, any>;

  if (!campaignId || typeof campaignId !== "string") {
    return NextResponse.json({ error: "campaignId is required" }, { status: 400 });
  }

  if (!milestoneId || typeof milestoneId !== "string") {
    return NextResponse.json({ error: "milestoneId is required" }, { status: 400 });
  }

  if (!walletAddress || typeof walletAddress !== "string") {
    return NextResponse.json({ error: "walletAddress is required" }, { status: 400 });
  }

  if (!vote || (vote !== "yes" && vote !== "no")) {
    return NextResponse.json({ error: "vote must be 'yes' or 'no'" }, { status: 400 });
  }

  const result = castVote({ campaignId, milestoneId, walletAddress, vote });

  if (result === "duplicate") {
    return NextResponse.json(
      { error: "Already voted on this milestone" },
      { status: 409 }
    );
  }

  if (!result) {
    return NextResponse.json(
      { error: "Campaign or milestone not found, or milestone is not active" },
      { status: 404 }
    );
  }

  return NextResponse.json(result, { status: 201 });
}
