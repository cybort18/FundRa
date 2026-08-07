import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { getAllCampaigns, createCampaign } from "@/lib/db/engine";

// GET /api/campaigns — List all campaigns with optional filters
export async function GET(request: NextRequest) {
  ensureDb();

  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  const status = searchParams.get("status") || undefined;

  const campaigns = await getAllCampaigns({ category, search, status });

  return NextResponse.json({ campaigns, total: campaigns.length });
}

// POST /api/campaigns — Create a new campaign
export async function POST(request: NextRequest) {
  ensureDb();

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate required fields
  const { title, creator, creatorAddress, description, category, milestones, bondingCurve } =
    body as Record<string, any>;

  if (!title || typeof title !== "string" || title.length < 3 || title.length > 100) {
    return NextResponse.json(
      { error: "Title is required (3–100 characters)" },
      { status: 400 }
    );
  }

  if (!description || typeof description !== "string" || description.length < 10) {
    return NextResponse.json(
      { error: "Description is required (min 10 characters)" },
      { status: 400 }
    );
  }

  const validCategories = ["DeFi", "Infrastructure", "AI", "Gaming", "Public Goods"];
  if (!category || !validCategories.includes(category)) {
    return NextResponse.json(
      { error: `Category must be one of: ${validCategories.join(", ")}` },
      { status: 400 }
    );
  }

  if (!Array.isArray(milestones) || milestones.length < 2) {
    return NextResponse.json(
      { error: "At least 2 milestones are required" },
      { status: 400 }
    );
  }

  const totalPayout = milestones.reduce(
    (sum: number, m: any) => sum + (m.payoutPercentage || 0),
    0
  );
  if (totalPayout !== 100) {
    return NextResponse.json(
      { error: `Milestone payouts must sum to 100 (got ${totalPayout})` },
      { status: 400 }
    );
  }

  if (!bondingCurve || !bondingCurve.tokenTicker || !bondingCurve.tokenName) {
    return NextResponse.json(
      { error: "Bonding curve token configuration is required" },
      { status: 400 }
    );
  }

  if (bondingCurve.initialPrice <= 0) {
    return NextResponse.json(
      { error: "Initial price must be greater than 0" },
      { status: 400 }
    );
  }

  try {
    const campaign = await createCampaign({
      title,
      creator: creator || "Anonymous",
      creatorAddress: creatorAddress || "0x0000000000000000000000000000000000000000",
      description,
      longDescription: (body.longDescription as string) || description,
      category,
      network: (body.network as string) || "ethereum",
      tags: (body.tags as string[]) || [],
      targetRaise: (body.targetRaise as number) || 0,
      milestones,
      bondingCurve,
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create campaign" },
      { status: 500 }
    );
  }
}
