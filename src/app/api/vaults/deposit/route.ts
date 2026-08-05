import { NextRequest, NextResponse } from "next/server";
import { ensureDb } from "@/lib/db/init";
import { createDeposit, getDepositsByWallet } from "@/lib/db/engine";

// GET /api/vaults/deposit?wallet=0x... — Get deposits for a wallet
export async function GET(request: NextRequest) {
  ensureDb();

  const wallet = request.nextUrl.searchParams.get("wallet");
  if (!wallet) {
    return NextResponse.json({ error: "wallet query parameter is required" }, { status: 400 });
  }

  const deposits = getDepositsByWallet(wallet);
  return NextResponse.json({ deposits });
}

// POST /api/vaults/deposit — Record a vault deposit
export async function POST(request: NextRequest) {
  ensureDb();

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { campaignId, walletAddress, amount } = body as Record<string, any>;

  if (!campaignId || typeof campaignId !== "string") {
    return NextResponse.json({ error: "campaignId is required" }, { status: 400 });
  }

  if (!walletAddress || typeof walletAddress !== "string") {
    return NextResponse.json({ error: "walletAddress is required" }, { status: 400 });
  }

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return NextResponse.json({ error: "amount must be a positive number" }, { status: 400 });
  }

  const result = createDeposit({ campaignId, walletAddress, amount });

  if (!result) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  return NextResponse.json(result, { status: 201 });
}
