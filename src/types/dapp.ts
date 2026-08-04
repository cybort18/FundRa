// ═══════════════════════════════════════════════════════════
// FundRa DApp — TypeScript Interfaces & Types
// ═══════════════════════════════════════════════════════════

/** Supported campaign categories */
export type CampaignCategory = "DeFi" | "Infrastructure" | "AI" | "Gaming" | "Public Goods";

/** Milestone status indicators */
export type MilestoneStatus = "completed" | "active" | "upcoming" | "rejected";

/** Governance proposal vote */
export type VoteType = "yes" | "no" | "abstain";

/** Network identifiers */
export type NetworkId = "ethereum" | "base" | "arbitrum" | "optimism";

// ── Campaign ──────────────────────────────────────────────

export interface Milestone {
  id: string;
  title: string;
  description: string;
  payoutPercentage: number; // 0–100
  status: MilestoneStatus;
  votesFor: number;
  votesAgainst: number;
  quorumRequired: number; // number of votes required
  deliverableUrl?: string;
  completedAt?: string; // ISO date
}

export interface BondingCurveData {
  tokenTicker: string;
  tokenName: string;
  currentPrice: number; // in USD
  initialPrice: number;
  reserveRatio: number; // 0–1
  totalSupply: number;
  marketCap: number;
}

export interface Campaign {
  id: string;
  title: string;
  creator: string; // display name
  creatorAddress: string; // ETH address
  description: string;
  longDescription: string;
  category: CampaignCategory;
  imageUrl?: string;
  tvl: number; // total value locked in USD
  aaveApy: number; // current yield percentage
  yieldGenerated: number; // total yield generated so far in USD
  backerCount: number;
  network: NetworkId;
  milestones: Milestone[];
  bondingCurve: BondingCurveData;
  createdAt: string; // ISO date
  status: "active" | "completed" | "paused";
  tags: string[];
}

// ── Portfolio ─────────────────────────────────────────────

export interface VaultPosition {
  campaignId: string;
  campaignTitle: string;
  depositedAmount: number; // principal in USD
  currentYield: number; // accrued yield in USD
  tokenBalance: number; // campaign tokens held
  tokenTicker: string;
  depositedAt: string; // ISO date
  apy: number;
}

// ── Governance ────────────────────────────────────────────

export interface GovernanceProposal {
  id: string;
  campaignId: string;
  campaignTitle: string;
  milestoneId: string;
  milestoneTitle: string;
  milestoneIndex: number; // 0-indexed
  description: string;
  deliverableUrl: string;
  votesFor: number;
  votesAgainst: number;
  quorumRequired: number;
  deadline: string; // ISO date
  status: "active" | "passed" | "rejected" | "pending";
  userVote?: VoteType;
}

// ── Creator Wizard ────────────────────────────────────────

export interface WizardMilestone {
  title: string;
  description: string;
  payoutPercentage: number;
}

export interface CampaignDraft {
  title: string;
  description: string;
  category: CampaignCategory;
  socialLinks: {
    website?: string;
    twitter?: string;
    discord?: string;
    github?: string;
  };
  milestones: WizardMilestone[];
  tokenTicker: string;
  tokenName: string;
  initialPrice: number;
  reserveRatio: number;
  targetRaise: number; // in USD
}

// ── DApp Navigation ───────────────────────────────────────

export type DAppTab = "explore" | "portfolio" | "governance";
