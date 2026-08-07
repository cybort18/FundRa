/**
 * FundRa — Database Engine (Prisma Relational Implementation)
 *
 * Provides real database persistence using Prisma.
 * Binds SQLite locally and PostgreSQL/Supabase in production.
 */

import { prisma } from "./prisma";

// ── Types mapping for frontend compatibility ────────────────

export interface DbMilestone {
  id: string;
  title: string;
  description: string;
  payoutPercentage: number;
  status: "completed" | "active" | "upcoming" | "rejected";
  votesFor: number;
  votesAgainst: number;
  quorumRequired: number;
  deliverableUrl?: string | null;
  completedAt?: string | null;
}

export interface DbBondingCurve {
  tokenName: string;
  tokenTicker: string;
  currentPrice: number;
  initialPrice: number;
  reserveRatio: number;
  totalSupply: number;
  marketCap: number;
}

export interface DbCampaign {
  id: string;
  title: string;
  creator: string;
  creatorAddress: string;
  description: string;
  longDescription: string;
  category: string;
  network: string;
  tvl: number;
  aaveApy: number;
  yieldGenerated: number;
  backerCount: number;
  status: "active" | "completed" | "paused";
  tags: string[];
  targetRaise: number;
  milestones: DbMilestone[];
  bondingCurve: DbBondingCurve;
  createdAt: string;
}

export interface DbDeposit {
  id: string;
  campaignId: string;
  walletAddress: string;
  amount: number;
  tokensReceived: number;
  apy: number;
  createdAt: string;
}

export interface DbVote {
  id: string;
  campaignId: string;
  milestoneId: string;
  walletAddress: string;
  vote: "yes" | "no";
  createdAt: string;
}

// Helper to convert database campaign model to frontend format
function mapCampaign(c: any): DbCampaign {
  return {
    id: c.id,
    title: c.title,
    creator: c.creator,
    creatorAddress: c.creatorAddress,
    description: c.description,
    longDescription: c.longDescription,
    category: c.category,
    network: c.network,
    tvl: c.tvl,
    aaveApy: c.aaveApy,
    yieldGenerated: c.yieldGenerated,
    backerCount: c.backerCount,
    status: c.status as any,
    tags: c.tags ? c.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
    targetRaise: c.targetRaise,
    createdAt: c.createdAt.toISOString(),
    milestones: (c.milestones || []).map((m: any) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      payoutPercentage: m.payoutPercentage,
      status: m.status as any,
      votesFor: m.votesFor,
      votesAgainst: m.votesAgainst,
      quorumRequired: m.quorumRequired,
      deliverableUrl: m.deliverableUrl,
      completedAt: m.completedAt ? m.completedAt.toISOString() : null,
    })),
    bondingCurve: c.bondingCurve
      ? {
          tokenName: c.bondingCurve.tokenName,
          tokenTicker: c.bondingCurve.tokenTicker,
          currentPrice: c.bondingCurve.currentPrice,
          initialPrice: c.bondingCurve.initialPrice,
          reserveRatio: c.bondingCurve.reserveRatio,
          totalSupply: c.bondingCurve.totalSupply,
          marketCap: c.bondingCurve.marketCap,
        }
      : {
          tokenName: "",
          tokenTicker: "",
          currentPrice: 0,
          initialPrice: 0,
          reserveRatio: 0.33,
          totalSupply: 0,
          marketCap: 0,
        },
  };
}

// ── Core Read/Write compatibility placeholders ─────────────

export function readDb() {
  return { campaigns: [], deposits: [], votes: [] };
}

export function writeDb(db: any) {
  // No-op in Prisma
}

// ── ID Generation ─────────────────────────────────────────

function generateId(prefix: string): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}_${id}`;
}

// ── Campaign Operations ───────────────────────────────────

export async function getAllCampaigns(filters?: {
  category?: string;
  search?: string;
  status?: string;
}): Promise<DbCampaign[]> {
  const whereClause: any = {};

  if (filters?.category && filters.category !== "All") {
    whereClause.category = filters.category;
  }

  if (filters?.status) {
    whereClause.status = filters.status;
  }

  if (filters?.search) {
    const searchString = filters.search.toLowerCase();
    whereClause.OR = [
      { title: { contains: searchString } },
      { creator: { contains: searchString } },
      { description: { contains: searchString } },
      { tags: { contains: searchString } },
    ];
  }

  const campaigns = await prisma.campaign.findMany({
    where: whereClause,
    include: {
      milestones: true,
      bondingCurve: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return campaigns.map(mapCampaign);
}

export async function getCampaignById(id: string): Promise<DbCampaign | undefined> {
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      milestones: true,
      bondingCurve: true,
    },
  });

  if (!campaign) return undefined;
  return mapCampaign(campaign);
}

export async function createCampaign(input: {
  title: string;
  creator: string;
  creatorAddress: string;
  description: string;
  longDescription?: string;
  category: string;
  network?: string;
  tags?: string[];
  targetRaise?: number;
  milestones: { title: string; description: string; payoutPercentage: number }[];
  bondingCurve: {
    tokenName: string;
    tokenTicker: string;
    initialPrice: number;
    reserveRatio: number;
  };
}): Promise<DbCampaign> {
  const id = generateId("camp");
  const apy = +(3.5 + Math.random() * 2.5).toFixed(2); // 3.5–6.0%

  const tagsString = input.tags ? input.tags.join(",") : "";

  const createdCampaign = await prisma.$transaction(async (tx) => {
    await tx.campaign.create({
      data: {
        id,
        title: input.title,
        creator: input.creator,
        creatorAddress: input.creatorAddress,
        description: input.description,
        longDescription: input.longDescription || input.description,
        category: input.category,
        network: input.network || "ethereum",
        tvl: 0,
        aaveApy: apy,
        yieldGenerated: 0,
        backerCount: 0,
        status: "active",
        tags: tagsString,
        targetRaise: input.targetRaise || 0,
      },
    });

    // Create bonding curve
    await tx.bondingCurve.create({
      data: {
        campaignId: id,
        tokenName: input.bondingCurve.tokenName,
        tokenTicker: input.bondingCurve.tokenTicker,
        currentPrice: input.bondingCurve.initialPrice,
        initialPrice: input.bondingCurve.initialPrice,
        reserveRatio: input.bondingCurve.reserveRatio,
        totalSupply: 0,
        marketCap: 0,
      },
    });

    // Create milestones
    for (let i = 0; i < input.milestones.length; i++) {
      const m = input.milestones[i];
      await tx.milestone.create({
        data: {
          id: `ms_${id.slice(5, 10)}_${i}`,
          campaignId: id,
          title: m.title,
          description: m.description,
          payoutPercentage: m.payoutPercentage,
          status: i === 0 ? "active" : "upcoming",
          votesFor: 0,
          votesAgainst: 0,
          quorumRequired: 10,
        },
      });
    }

    return tx.campaign.findUnique({
      where: { id },
      include: {
        milestones: true,
        bondingCurve: true,
      },
    });
  });

  return mapCampaign(createdCampaign);
}

// ── Deposit Operations ────────────────────────────────────

export async function createDeposit(input: {
  campaignId: string;
  walletAddress: string;
  amount: number;
}): Promise<{ deposit: DbDeposit; updatedCampaign: Pick<DbCampaign, "tvl" | "backerCount"> } | null> {
  const campaign = await prisma.campaign.findUnique({
    where: { id: input.campaignId },
    include: { bondingCurve: true },
  });

  if (!campaign || !campaign.bondingCurve) return null;

  const tokensReceived = Math.floor(input.amount / campaign.bondingCurve.currentPrice);
  const depositId = generateId("dep");

  const result = await prisma.$transaction(async (tx) => {
    // Create deposit
    const deposit = await tx.deposit.create({
      data: {
        id: depositId,
        campaignId: input.campaignId,
        walletAddress: input.walletAddress,
        amount: input.amount,
        tokensReceived,
        apy: campaign.aaveApy,
      },
    });

    // Update bonding curve
    const newTotalSupply = campaign.bondingCurve!.totalSupply + tokensReceived;
    // Simulate price increase on bonding curve
    let newPrice =
      campaign.bondingCurve!.initialPrice *
      Math.pow(
        (newTotalSupply + 1) / 1000,
        1 / campaign.bondingCurve!.reserveRatio
      );
    newPrice = +newPrice.toFixed(4);

    await tx.bondingCurve.update({
      where: { campaignId: input.campaignId },
      data: {
        totalSupply: newTotalSupply,
        currentPrice: newPrice,
        marketCap: newPrice * newTotalSupply,
      },
    });

    // Recalculate unique backers count
    const deposits = await tx.deposit.findMany({
      where: { campaignId: input.campaignId },
      select: { walletAddress: true },
    });
    const uniqueBackers = new Set(deposits.map((d) => d.walletAddress.toLowerCase()));

    // Update campaign
    const updatedCampaign = await tx.campaign.update({
      where: { id: input.campaignId },
      data: {
        tvl: { increment: input.amount },
        backerCount: uniqueBackers.size,
      },
    });

    // Update milestones quorum
    const newQuorum = Math.max(10, Math.floor(uniqueBackers.size * 0.5));
    await tx.milestone.updateMany({
      where: { campaignId: input.campaignId },
      data: { quorumRequired: newQuorum },
    });

    return {
      deposit: {
        id: deposit.id,
        campaignId: deposit.campaignId,
        walletAddress: deposit.walletAddress,
        amount: deposit.amount,
        tokensReceived: deposit.tokensReceived,
        apy: deposit.apy,
        createdAt: deposit.createdAt.toISOString(),
      },
      updatedCampaign: {
        tvl: updatedCampaign.tvl,
        backerCount: updatedCampaign.backerCount,
      },
    };
  });

  return result;
}

export async function getDepositsByWallet(walletAddress: string): Promise<DbDeposit[]> {
  const deposits = await prisma.deposit.findMany({
    where: {
      walletAddress: {
        equals: walletAddress,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return deposits.map((d) => ({
    id: d.id,
    campaignId: d.campaignId,
    walletAddress: d.walletAddress,
    amount: d.amount,
    tokensReceived: d.tokensReceived,
    apy: d.apy,
    createdAt: d.createdAt.toISOString(),
  }));
}

// ── Governance Operations ─────────────────────────────────

export async function castVote(input: {
  campaignId: string;
  milestoneId: string;
  walletAddress: string;
  vote: "yes" | "no";
}): Promise<{ vote: DbVote; updatedMilestone: Pick<DbMilestone, "votesFor" | "votesAgainst"> } | null | "duplicate"> {
  // Check for duplicate vote
  const existing = await prisma.vote.findUnique({
    where: {
      milestoneId_walletAddress: {
        milestoneId: input.milestoneId,
        walletAddress: input.walletAddress.toLowerCase(),
      },
    },
  });

  if (existing) return "duplicate";

  const milestone = await prisma.milestone.findFirst({
    where: { id: input.milestoneId, campaignId: input.campaignId },
  });

  if (!milestone || milestone.status !== "active") return null;

  const voteId = generateId("vote");

  const result = await prisma.$transaction(async (tx) => {
    // Record vote
    const vote = await tx.vote.create({
      data: {
        id: voteId,
        campaignId: input.campaignId,
        milestoneId: input.milestoneId,
        walletAddress: input.walletAddress.toLowerCase(),
        vote: input.vote,
      },
    });

    // Update milestone vote counts
    const updatedMilestone = await tx.milestone.update({
      where: { id: input.milestoneId },
      data: {
        votesFor: input.vote === "yes" ? { increment: 1 } : undefined,
        votesAgainst: input.vote === "no" ? { increment: 1 } : undefined,
      },
    });

    return {
      vote: {
        id: vote.id,
        campaignId: vote.campaignId,
        milestoneId: vote.milestoneId,
        walletAddress: vote.walletAddress,
        vote: vote.vote as any,
        createdAt: vote.createdAt.toISOString(),
      },
      updatedMilestone: {
        votesFor: updatedMilestone.votesFor,
        votesAgainst: updatedMilestone.votesAgainst,
      },
    };
  });

  return result;
}
