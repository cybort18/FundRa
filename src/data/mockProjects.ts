// ═══════════════════════════════════════════════════════════
// FundRa DApp — High-Fidelity Mock Campaign Dataset
// ═══════════════════════════════════════════════════════════

import type {
  Campaign,
  VaultPosition,
  GovernanceProposal,
} from "@/types/dapp";

// ── Mock Campaigns ────────────────────────────────────────

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "camp-aura-ai",
    title: "Aura AI — Decentralized Compute Network",
    creator: "NeuroLabs",
    creatorAddress: "0x1a2B...3c4D",
    description:
      "A decentralized GPU compute marketplace enabling permissionless AI model training and inference at 60% lower cost than centralized cloud providers.",
    longDescription:
      "Aura AI is building the first fully decentralized compute infrastructure for AI workloads. By aggregating idle GPU capacity from data centers, miners, and consumer hardware through a tokenized incentive layer, Aura AI offers enterprise-grade machine learning compute at a fraction of centralized cloud costs.\n\nThe protocol uses a novel proof-of-compute consensus mechanism to verify GPU task execution, paired with ERC-4626 yield vaults that enable backers to fund compute capacity expansion while earning sustainable yield from network fees.",
    category: "AI",
    tvl: 2_450_000,
    aaveApy: 4.82,
    yieldGenerated: 48_300,
    backerCount: 1243,
    network: "base",
    status: "active",
    tags: ["GPU", "Machine Learning", "Compute", "Infrastructure"],
    createdAt: "2026-03-15T00:00:00Z",
    milestones: [
      {
        id: "ms-aura-1",
        title: "Core Protocol Architecture",
        description: "Finalize compute verification consensus and deploy testnet contracts.",
        payoutPercentage: 20,
        status: "completed",
        votesFor: 892,
        votesAgainst: 34,
        quorumRequired: 500,
        completedAt: "2026-05-01T00:00:00Z",
      },
      {
        id: "ms-aura-2",
        title: "GPU Node SDK & Dashboard",
        description: "Ship node operator SDK, monitoring dashboard, and staking integration.",
        payoutPercentage: 30,
        status: "active",
        votesFor: 310,
        votesAgainst: 12,
        quorumRequired: 500,
        deliverableUrl: "https://github.com/neurolabs/aura-sdk",
      },
      {
        id: "ms-aura-3",
        title: "Mainnet Launch & Partnerships",
        description: "Deploy to mainnet, onboard initial compute providers, and establish enterprise partnerships.",
        payoutPercentage: 50,
        status: "upcoming",
        votesFor: 0,
        votesAgainst: 0,
        quorumRequired: 500,
      },
    ],
    bondingCurve: {
      tokenTicker: "AURA",
      tokenName: "Aura Compute Token",
      currentPrice: 0.34,
      initialPrice: 0.01,
      reserveRatio: 0.33,
      totalSupply: 18_500_000,
      marketCap: 6_290_000,
    },
  },
  {
    id: "camp-zkshield",
    title: "zkShield — Zero-Knowledge Privacy Layer",
    creator: "CipherCore",
    creatorAddress: "0x5e6F...7a8B",
    description:
      "A modular ZK privacy middleware enabling confidential transactions, private voting, and shielded DeFi positions across any EVM chain.",
    longDescription:
      "zkShield provides a composable zero-knowledge proof layer that any DApp can integrate to add transaction privacy, confidential voting, and shielded asset management. Built on Halo2 proving system for efficient proof generation.\n\nThe protocol introduces 'Privacy Pools' — shared anonymity sets backed by ERC-4626 vaults where depositors earn yield while contributing to the overall privacy guarantees of the network.",
    category: "Infrastructure",
    tvl: 1_875_000,
    aaveApy: 5.14,
    yieldGenerated: 32_100,
    backerCount: 876,
    network: "ethereum",
    status: "active",
    tags: ["ZK Proofs", "Privacy", "Middleware", "Halo2"],
    createdAt: "2026-04-02T00:00:00Z",
    milestones: [
      {
        id: "ms-zk-1",
        title: "ZK Circuit Design & Audit",
        description: "Complete Halo2 circuit design, formal verification, and third-party security audit.",
        payoutPercentage: 25,
        status: "completed",
        votesFor: 654,
        votesAgainst: 18,
        quorumRequired: 400,
        completedAt: "2026-06-10T00:00:00Z",
      },
      {
        id: "ms-zk-2",
        title: "Testnet Privacy Pools",
        description: "Deploy shielded transaction pools on Sepolia testnet with browser-based proof generation.",
        payoutPercentage: 35,
        status: "active",
        votesFor: 201,
        votesAgainst: 8,
        quorumRequired: 400,
        deliverableUrl: "https://github.com/ciphercore/zkshield-testnet",
      },
      {
        id: "ms-zk-3",
        title: "Mainnet & SDK Release",
        description: "Launch on Ethereum mainnet with developer SDK and integration documentation.",
        payoutPercentage: 40,
        status: "upcoming",
        votesFor: 0,
        votesAgainst: 0,
        quorumRequired: 400,
      },
    ],
    bondingCurve: {
      tokenTicker: "ZKS",
      tokenName: "zkShield Token",
      currentPrice: 0.52,
      initialPrice: 0.02,
      reserveRatio: 0.25,
      totalSupply: 9_200_000,
      marketCap: 4_784_000,
    },
  },
  {
    id: "camp-sovereign-storage",
    title: "Sovereign Storage Protocol",
    creator: "DataVault Labs",
    creatorAddress: "0x9c0D...1e2F",
    description:
      "Decentralized, censorship-resistant data storage with built-in redundancy proofs and pay-per-use economics powered by yield-generating deposit vaults.",
    longDescription:
      "Sovereign Storage reimagines decentralized file storage by combining erasure-coded redundancy with proof-of-retrievability consensus. Storage providers stake collateral and earn fees, while users deposit into ERC-4626 vaults that fund storage costs from generated yield — enabling effectively free perpetual storage.\n\nThe bonding curve token grants prioritized retrieval speeds and governance rights over protocol parameter updates.",
    category: "Infrastructure",
    tvl: 980_000,
    aaveApy: 4.21,
    yieldGenerated: 15_800,
    backerCount: 542,
    network: "arbitrum",
    status: "active",
    tags: ["Storage", "Censorship-Resistant", "Data", "Redundancy"],
    createdAt: "2026-05-20T00:00:00Z",
    milestones: [
      {
        id: "ms-ss-1",
        title: "Storage Node Protocol",
        description: "Implement proof-of-retrievability consensus and erasure coding engine.",
        payoutPercentage: 30,
        status: "completed",
        votesFor: 412,
        votesAgainst: 22,
        quorumRequired: 300,
        completedAt: "2026-07-15T00:00:00Z",
      },
      {
        id: "ms-ss-2",
        title: "Client SDK & Gateway API",
        description: "Build HTTP gateway, TypeScript SDK, and S3-compatible API layer.",
        payoutPercentage: 35,
        status: "upcoming",
        votesFor: 0,
        votesAgainst: 0,
        quorumRequired: 300,
      },
      {
        id: "ms-ss-3",
        title: "Incentivized Testnet",
        description: "Launch incentivized testnet with storage mining rewards and community stress testing.",
        payoutPercentage: 35,
        status: "upcoming",
        votesFor: 0,
        votesAgainst: 0,
        quorumRequired: 300,
      },
    ],
    bondingCurve: {
      tokenTicker: "SOV",
      tokenName: "Sovereign Token",
      currentPrice: 0.18,
      initialPrice: 0.005,
      reserveRatio: 0.4,
      totalSupply: 25_000_000,
      marketCap: 4_500_000,
    },
  },
  {
    id: "camp-liquidflow",
    title: "LiquidFlow — Cross-Chain DeFi Engine",
    creator: "FlowFi",
    creatorAddress: "0x3a4B...5c6D",
    description:
      "An intent-based cross-chain DeFi aggregator providing MEV-protected swaps, unified yield farming, and single-click multi-chain position management.",
    longDescription:
      "LiquidFlow abstracts away the complexity of multi-chain DeFi by providing an intent-based execution layer. Users express desired outcomes (swap, yield farm, bridge + deposit) and solvers compete to fill orders with optimal execution, full MEV protection, and gas optimization.\n\nThe protocol generates revenue from solver fees, which flows back to ERC-4626 vault depositors as sustainable yield.",
    category: "DeFi",
    tvl: 3_120_000,
    aaveApy: 5.67,
    yieldGenerated: 72_400,
    backerCount: 1876,
    network: "ethereum",
    status: "active",
    tags: ["DEX", "Aggregator", "Cross-Chain", "MEV Protection"],
    createdAt: "2026-02-08T00:00:00Z",
    milestones: [
      {
        id: "ms-lf-1",
        title: "Intent Engine Core",
        description: "Build order book, solver network, and intent matching engine.",
        payoutPercentage: 20,
        status: "completed",
        votesFor: 1245,
        votesAgainst: 45,
        quorumRequired: 800,
        completedAt: "2026-04-20T00:00:00Z",
      },
      {
        id: "ms-lf-2",
        title: "Cross-Chain Bridge Integration",
        description: "Integrate LayerZero and Hyperlane for seamless cross-chain intent settlement.",
        payoutPercentage: 30,
        status: "completed",
        votesFor: 1089,
        votesAgainst: 67,
        quorumRequired: 800,
        completedAt: "2026-06-28T00:00:00Z",
      },
      {
        id: "ms-lf-3",
        title: "Public Mainnet & Yield Optimizer",
        description: "Launch mainnet aggregator with automated yield farming strategy router.",
        payoutPercentage: 50,
        status: "active",
        votesFor: 534,
        votesAgainst: 21,
        quorumRequired: 800,
        deliverableUrl: "https://github.com/flowfi/liquidflow-v2",
      },
    ],
    bondingCurve: {
      tokenTicker: "FLOW",
      tokenName: "LiquidFlow Token",
      currentPrice: 1.24,
      initialPrice: 0.05,
      reserveRatio: 0.3,
      totalSupply: 12_000_000,
      marketCap: 14_880_000,
    },
  },
  {
    id: "camp-arkade",
    title: "Arkade — On-Chain Gaming Infrastructure",
    creator: "PixelForge",
    creatorAddress: "0x7e8F...9a0B",
    description:
      "A fully on-chain game engine providing verifiable randomness, composable game state, and player-owned economies with zero gas fees via session keys.",
    longDescription:
      "Arkade provides the missing infrastructure layer for fully on-chain games. The engine handles verifiable random number generation (VRF), composable ECS game state stored on-chain, and gasless player interactions via ERC-4337 session keys.\n\nGame developers deploy through the FundRa launchpad, using ERC-4626 vaults to crowdfund development while giving players governance over game design decisions through milestone voting.",
    category: "Gaming",
    tvl: 1_340_000,
    aaveApy: 4.45,
    yieldGenerated: 23_600,
    backerCount: 2134,
    network: "base",
    status: "active",
    tags: ["Gaming", "On-Chain", "VRF", "Session Keys", "ECS"],
    createdAt: "2026-04-18T00:00:00Z",
    milestones: [
      {
        id: "ms-ark-1",
        title: "Game Engine Core & VRF",
        description: "Implement ECS state machine, Chainlink VRF integration, and session key module.",
        payoutPercentage: 25,
        status: "completed",
        votesFor: 1567,
        votesAgainst: 89,
        quorumRequired: 1000,
        completedAt: "2026-06-30T00:00:00Z",
      },
      {
        id: "ms-ark-2",
        title: "SDK & Demo Game",
        description: "Ship TypeScript game SDK, Unity bridge, and launch demo dungeon-crawler game.",
        payoutPercentage: 35,
        status: "active",
        votesFor: 423,
        votesAgainst: 15,
        quorumRequired: 1000,
        deliverableUrl: "https://github.com/pixelforge/arkade-sdk",
      },
      {
        id: "ms-ark-3",
        title: "Marketplace & Tournament System",
        description: "Build player asset marketplace and competitive tournament framework.",
        payoutPercentage: 40,
        status: "upcoming",
        votesFor: 0,
        votesAgainst: 0,
        quorumRequired: 1000,
      },
    ],
    bondingCurve: {
      tokenTicker: "ARK",
      tokenName: "Arkade Token",
      currentPrice: 0.09,
      initialPrice: 0.003,
      reserveRatio: 0.35,
      totalSupply: 50_000_000,
      marketCap: 4_500_000,
    },
  },
  {
    id: "camp-verdant",
    title: "Verdant — Regenerative Finance Protocol",
    creator: "GreenDAO",
    creatorAddress: "0x2b3C...4d5E",
    description:
      "A ReFi protocol funding verified carbon credit retirement, biodiversity conservation, and renewable energy projects through transparent on-chain governance.",
    longDescription:
      "Verdant brings regenerative finance to the FundRa ecosystem. The protocol channels yield vault proceeds toward verified environmental impact projects — carbon credit retirement, reforestation bonds, and community solar installations.\n\nEvery dollar of yield generated is publicly auditable on-chain, with milestone governance ensuring funds reach verified environmental outcomes before creator payouts are released.",
    category: "Public Goods",
    tvl: 720_000,
    aaveApy: 3.95,
    yieldGenerated: 11_200,
    backerCount: 634,
    network: "optimism",
    status: "active",
    tags: ["ReFi", "Carbon Credits", "Climate", "Public Goods"],
    createdAt: "2026-06-01T00:00:00Z",
    milestones: [
      {
        id: "ms-ver-1",
        title: "Carbon Registry Integration",
        description: "Integrate Toucan Protocol and KlimaDAO for on-chain carbon credit verification.",
        payoutPercentage: 30,
        status: "active",
        votesFor: 189,
        votesAgainst: 7,
        quorumRequired: 300,
        deliverableUrl: "https://github.com/greendao/verdant-registry",
      },
      {
        id: "ms-ver-2",
        title: "Impact Dashboard & Reporting",
        description: "Build public impact dashboard showing real-time environmental metrics.",
        payoutPercentage: 35,
        status: "upcoming",
        votesFor: 0,
        votesAgainst: 0,
        quorumRequired: 300,
      },
      {
        id: "ms-ver-3",
        title: "Community Grants Program",
        description: "Launch decentralized grants program for local environmental initiatives.",
        payoutPercentage: 35,
        status: "upcoming",
        votesFor: 0,
        votesAgainst: 0,
        quorumRequired: 300,
      },
    ],
    bondingCurve: {
      tokenTicker: "VRD",
      tokenName: "Verdant Token",
      currentPrice: 0.07,
      initialPrice: 0.002,
      reserveRatio: 0.5,
      totalSupply: 30_000_000,
      marketCap: 2_100_000,
    },
  },
];

// ── Mock User Portfolio ───────────────────────────────────

export const MOCK_PORTFOLIO: VaultPosition[] = [
  {
    campaignId: "camp-aura-ai",
    campaignTitle: "Aura AI — Decentralized Compute Network",
    depositedAmount: 5000,
    currentYield: 124.5,
    tokenBalance: 14_705,
    tokenTicker: "AURA",
    depositedAt: "2026-04-10T00:00:00Z",
    apy: 4.82,
  },
  {
    campaignId: "camp-liquidflow",
    campaignTitle: "LiquidFlow — Cross-Chain DeFi Engine",
    depositedAmount: 10000,
    currentYield: 312.8,
    tokenBalance: 8_064,
    tokenTicker: "FLOW",
    depositedAt: "2026-03-01T00:00:00Z",
    apy: 5.67,
  },
  {
    campaignId: "camp-arkade",
    campaignTitle: "Arkade — On-Chain Gaming Infrastructure",
    depositedAmount: 2000,
    currentYield: 45.2,
    tokenBalance: 22_222,
    tokenTicker: "ARK",
    depositedAt: "2026-05-15T00:00:00Z",
    apy: 4.45,
  },
];

// ── Mock Governance Proposals ─────────────────────────────

export const MOCK_PROPOSALS: GovernanceProposal[] = [
  {
    id: "prop-aura-2",
    campaignId: "camp-aura-ai",
    campaignTitle: "Aura AI — Decentralized Compute Network",
    milestoneId: "ms-aura-2",
    milestoneTitle: "GPU Node SDK & Dashboard",
    milestoneIndex: 1,
    description:
      "NeuroLabs has submitted the GPU Node SDK (v0.8.2) and monitoring dashboard for community review. The SDK supports NVIDIA A100/H100 and consumer RTX cards. Review the deliverable and vote to release 30% of escrowed funds.",
    deliverableUrl: "https://github.com/neurolabs/aura-sdk",
    votesFor: 310,
    votesAgainst: 12,
    quorumRequired: 500,
    deadline: "2026-08-20T00:00:00Z",
    status: "active",
  },
  {
    id: "prop-zk-2",
    campaignId: "camp-zkshield",
    campaignTitle: "zkShield — Zero-Knowledge Privacy Layer",
    milestoneId: "ms-zk-2",
    milestoneTitle: "Testnet Privacy Pools",
    milestoneIndex: 1,
    description:
      "CipherCore has deployed Privacy Pools on Sepolia testnet with browser-based proof generation (avg 2.3s proving time). Community testing results show 99.7% proof validity rate. Vote to release 35% of escrowed funds.",
    deliverableUrl: "https://github.com/ciphercore/zkshield-testnet",
    votesFor: 201,
    votesAgainst: 8,
    quorumRequired: 400,
    deadline: "2026-08-25T00:00:00Z",
    status: "active",
  },
  {
    id: "prop-lf-3",
    campaignId: "camp-liquidflow",
    campaignTitle: "LiquidFlow — Cross-Chain DeFi Engine",
    milestoneId: "ms-lf-3",
    milestoneTitle: "Public Mainnet & Yield Optimizer",
    milestoneIndex: 2,
    description:
      "FlowFi has launched the public mainnet aggregator with 12 supported chains and automated yield farming router. TVL reached $3.1M within first week. Vote to release final 50% of escrowed funds.",
    deliverableUrl: "https://github.com/flowfi/liquidflow-v2",
    votesFor: 534,
    votesAgainst: 21,
    quorumRequired: 800,
    deadline: "2026-09-01T00:00:00Z",
    status: "active",
  },
  {
    id: "prop-ver-1",
    campaignId: "camp-verdant",
    campaignTitle: "Verdant — Regenerative Finance Protocol",
    milestoneId: "ms-ver-1",
    milestoneTitle: "Carbon Registry Integration",
    milestoneIndex: 0,
    description:
      "GreenDAO has completed integration with Toucan Protocol carbon bridge and KlimaDAO retirement aggregator. 142 tonnes CO2 have been retired on-chain during testnet phase.",
    deliverableUrl: "https://github.com/greendao/verdant-registry",
    votesFor: 189,
    votesAgainst: 7,
    quorumRequired: 300,
    deadline: "2026-08-28T00:00:00Z",
    status: "active",
  },
];

// ── Utility Helpers ───────────────────────────────────────

/** Format large numbers as compact strings (e.g. 2450000 -> "$2.45M") */
export function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(2)}`;
}

/** Format number with comma separators */
export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

/** Get the current active milestone index for a campaign */
export function getActiveMilestoneIndex(campaign: Campaign): number {
  return campaign.milestones.findIndex((m) => m.status === "active");
}

/** Calculate milestone completion percentage */
export function getMilestoneProgress(campaign: Campaign): number {
  const completed = campaign.milestones.filter((m) => m.status === "completed").length;
  return Math.round((completed / campaign.milestones.length) * 100);
}

/** Get category color classes */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    DeFi: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    Infrastructure: "bg-purple-500/15 text-purple-400 border-purple-500/20",
    AI: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    Gaming: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    "Public Goods": "bg-rose-500/15 text-rose-400 border-rose-500/20",
  };
  return colors[category] || "bg-white/10 text-white/60 border-white/10";
}
