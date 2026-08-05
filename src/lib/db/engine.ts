/**
 * FundRa — File-based JSON Database Engine
 *
 * Zero-dependency persistence layer.
 * Data is stored in `.fundra-data/db.json` at project root.
 * This file is automatically created on first write and
 * should be added to `.gitignore`.
 */

import fs from "fs";
import path from "path";

// ── Types ─────────────────────────────────────────────────

export interface DbMilestone {
  id: string;
  title: string;
  description: string;
  payoutPercentage: number;
  status: "completed" | "active" | "upcoming" | "rejected";
  votesFor: number;
  votesAgainst: number;
  quorumRequired: number;
  deliverableUrl?: string;
  completedAt?: string;
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

export interface Database {
  campaigns: DbCampaign[];
  deposits: DbDeposit[];
  votes: DbVote[];
}

// ── Config ────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), ".fundra-data");
const DB_FILE = path.join(DATA_DIR, "db.json");

const EMPTY_DB: Database = {
  campaigns: [],
  deposits: [],
  votes: [],
};

// ── ID Generation ─────────────────────────────────────────

function generateId(prefix: string): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}_${id}`;
}

// ── Core Read/Write ───────────────────────────────────────

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readDb(): Database {
  ensureDataDir();
  if (!fs.existsSync(DB_FILE)) {
    writeDb(EMPTY_DB);
    return { ...EMPTY_DB };
  }
  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw) as Database;
  } catch {
    return { ...EMPTY_DB };
  }
}

export function writeDb(db: Database): void {
  ensureDataDir();
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
}

// ── Campaign Operations ───────────────────────────────────

export function getAllCampaigns(filters?: {
  category?: string;
  search?: string;
  status?: string;
}): DbCampaign[] {
  const db = readDb();
  let campaigns = db.campaigns;

  if (filters?.category && filters.category !== "All") {
    campaigns = campaigns.filter((c) => c.category === filters.category);
  }

  if (filters?.status) {
    campaigns = campaigns.filter((c) => c.status === filters.status);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    campaigns = campaigns.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.creator.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return campaigns;
}

export function getCampaignById(id: string): DbCampaign | undefined {
  const db = readDb();
  return db.campaigns.find((c) => c.id === id);
}

export function createCampaign(input: {
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
}): DbCampaign {
  const db = readDb();
  const id = generateId("camp");
  const apy = +(3.5 + Math.random() * 2.5).toFixed(2); // 3.5–6.0%

  const milestones: DbMilestone[] = input.milestones.map((m, i) => ({
    id: `ms_${id.slice(5, 10)}_${i}`,
    title: m.title,
    description: m.description,
    payoutPercentage: m.payoutPercentage,
    status: i === 0 ? "active" : "upcoming",
    votesFor: 0,
    votesAgainst: 0,
    quorumRequired: 10, // initial low quorum, scales with backers
  }));

  const campaign: DbCampaign = {
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
    tags: input.tags || [],
    targetRaise: input.targetRaise || 0,
    milestones,
    bondingCurve: {
      tokenName: input.bondingCurve.tokenName,
      tokenTicker: input.bondingCurve.tokenTicker,
      currentPrice: input.bondingCurve.initialPrice,
      initialPrice: input.bondingCurve.initialPrice,
      reserveRatio: input.bondingCurve.reserveRatio,
      totalSupply: 0,
      marketCap: 0,
    },
    createdAt: new Date().toISOString(),
  };

  db.campaigns.push(campaign);
  writeDb(db);
  return campaign;
}

// ── Deposit Operations ────────────────────────────────────

export function createDeposit(input: {
  campaignId: string;
  walletAddress: string;
  amount: number;
}): { deposit: DbDeposit; updatedCampaign: Pick<DbCampaign, "tvl" | "backerCount"> } | null {
  const db = readDb();
  const campaignIdx = db.campaigns.findIndex((c) => c.id === input.campaignId);
  if (campaignIdx === -1) return null;

  const campaign = db.campaigns[campaignIdx];
  const tokensReceived = Math.floor(input.amount / campaign.bondingCurve.currentPrice);

  const deposit: DbDeposit = {
    id: generateId("dep"),
    campaignId: input.campaignId,
    walletAddress: input.walletAddress,
    amount: input.amount,
    tokensReceived,
    apy: campaign.aaveApy,
    createdAt: new Date().toISOString(),
  };

  db.deposits.push(deposit);

  // Update campaign stats
  campaign.tvl += input.amount;
  campaign.bondingCurve.totalSupply += tokensReceived;
  campaign.bondingCurve.marketCap =
    campaign.bondingCurve.currentPrice * campaign.bondingCurve.totalSupply;

  // Recalculate unique backers
  const uniqueBackers = new Set(
    db.deposits
      .filter((d) => d.campaignId === input.campaignId)
      .map((d) => d.walletAddress)
  );
  campaign.backerCount = uniqueBackers.size;

  // Simulate price increase on bonding curve (simplified)
  campaign.bondingCurve.currentPrice =
    campaign.bondingCurve.initialPrice *
    Math.pow(
      (campaign.bondingCurve.totalSupply + 1) / 1000,
      1 / campaign.bondingCurve.reserveRatio
    );
  campaign.bondingCurve.currentPrice = +campaign.bondingCurve.currentPrice.toFixed(4);

  // Update quorum based on backer count
  for (const ms of campaign.milestones) {
    ms.quorumRequired = Math.max(10, Math.floor(campaign.backerCount * 0.5));
  }

  db.campaigns[campaignIdx] = campaign;
  writeDb(db);

  return {
    deposit,
    updatedCampaign: { tvl: campaign.tvl, backerCount: campaign.backerCount },
  };
}

export function getDepositsByWallet(walletAddress: string): DbDeposit[] {
  const db = readDb();
  return db.deposits.filter((d) => d.walletAddress.toLowerCase() === walletAddress.toLowerCase());
}

// ── Governance Operations ─────────────────────────────────

export function castVote(input: {
  campaignId: string;
  milestoneId: string;
  walletAddress: string;
  vote: "yes" | "no";
}): { vote: DbVote; updatedMilestone: Pick<DbMilestone, "votesFor" | "votesAgainst"> } | null | "duplicate" {
  const db = readDb();

  // Check for duplicate vote
  const existing = db.votes.find(
    (v) =>
      v.milestoneId === input.milestoneId &&
      v.walletAddress.toLowerCase() === input.walletAddress.toLowerCase()
  );
  if (existing) return "duplicate";

  // Find campaign and milestone
  const campaignIdx = db.campaigns.findIndex((c) => c.id === input.campaignId);
  if (campaignIdx === -1) return null;

  const campaign = db.campaigns[campaignIdx];
  const milestoneIdx = campaign.milestones.findIndex((m) => m.id === input.milestoneId);
  if (milestoneIdx === -1) return null;

  const milestone = campaign.milestones[milestoneIdx];
  if (milestone.status !== "active") return null;

  const vote: DbVote = {
    id: generateId("vote"),
    campaignId: input.campaignId,
    milestoneId: input.milestoneId,
    walletAddress: input.walletAddress,
    vote: input.vote,
    createdAt: new Date().toISOString(),
  };

  db.votes.push(vote);

  // Update milestone vote counts
  if (input.vote === "yes") {
    milestone.votesFor += 1;
  } else {
    milestone.votesAgainst += 1;
  }

  campaign.milestones[milestoneIdx] = milestone;
  db.campaigns[campaignIdx] = campaign;
  writeDb(db);

  return {
    vote,
    updatedMilestone: { votesFor: milestone.votesFor, votesAgainst: milestone.votesAgainst },
  };
}
