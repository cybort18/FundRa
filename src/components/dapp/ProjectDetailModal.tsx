"use client";

import { useState } from "react";
import {
  X,
  ExternalLink,
  TrendingUp,
  Zap,
  Vote,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import type { Campaign, Milestone } from "@/types/dapp";
import { formatCurrency, formatNumber, getCategoryColor } from "@/data/mockProjects";

interface ProjectDetailModalProps {
  campaign: Campaign | null;
  onClose: () => void;
}

type DetailTab = "overview" | "vault" | "tokenomics" | "governance";

export function ProjectDetailModal({ campaign, onClose }: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");
  const [depositAmount, setDepositAmount] = useState("");
  const [voteState, setVoteState] = useState<Record<string, "yes" | "no" | null>>({});

  if (!campaign) return null;

  const tabs: { id: DetailTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "vault", label: "Vault Deposit" },
    { id: "tokenomics", label: "Tokenomics" },
    { id: "governance", label: "Governance" },
  ];

  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;
    alert(
      `Simulated: Depositing $${depositAmount} into ${campaign.title} ERC-4626 vault.\nEstimated annual yield: $${(parseFloat(depositAmount) * campaign.aaveApy / 100).toFixed(2)}`
    );
    setDepositAmount("");
  };

  const handleVote = (milestoneId: string, vote: "yes" | "no") => {
    setVoteState((prev) => ({ ...prev, [milestoneId]: vote }));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm animate-fade-in cursor-pointer"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-2xl bg-[#060618] border-l border-white/[0.06] shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#060618]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getCategoryColor(
                    campaign.category
                  )}`}
                >
                  {campaign.category}
                </span>
                <span className="text-[10px] font-mono text-fundra-muted">
                  {campaign.network.toUpperCase()}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-fundra-text leading-snug">
                {campaign.title}
              </h2>
              <p className="text-xs text-fundra-muted mt-0.5">
                by {campaign.creator} • {campaign.creatorAddress}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/[0.06] text-fundra-muted hover:text-fundra-text transition-all cursor-pointer"
              aria-label="Close project detail"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <nav className="flex items-center gap-1 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-fundra-accent/15 text-fundra-accent"
                    : "text-fundra-muted hover:text-fundra-text hover:bg-white/[0.05]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {activeTab === "overview" && (
            <OverviewTab campaign={campaign} />
          )}
          {activeTab === "vault" && (
            <VaultTab
              campaign={campaign}
              depositAmount={depositAmount}
              onDepositChange={setDepositAmount}
              onDeposit={handleDeposit}
            />
          )}
          {activeTab === "tokenomics" && (
            <TokenomicsTab campaign={campaign} />
          )}
          {activeTab === "governance" && (
            <GovernanceTab
              campaign={campaign}
              voteState={voteState}
              onVote={handleVote}
            />
          )}
        </div>
      </div>
    </>
  );
}

// ── Overview Tab ──────────────────────────────────────────

function OverviewTab({ campaign }: { campaign: Campaign }) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "TVL", value: formatCurrency(campaign.tvl), color: "text-fundra-text" },
          { label: "Aave APY", value: `${campaign.aaveApy}%`, color: "text-emerald-400" },
          { label: "Yield Generated", value: formatCurrency(campaign.yieldGenerated), color: "text-amber-400" },
          { label: "Backers", value: formatNumber(campaign.backerCount), color: "text-sky-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
          >
            <p className="text-[10px] text-fundra-muted uppercase tracking-wider mb-1">{stat.label}</p>
            <p className={`text-lg font-mono font-semibold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div>
        <h3 className="text-sm font-semibold text-fundra-text mb-3">About This Project</h3>
        <div className="text-sm text-fundra-muted/80 leading-relaxed whitespace-pre-line">
          {campaign.longDescription}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {campaign.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] text-fundra-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Milestone Timeline */}
      <div>
        <h3 className="text-sm font-semibold text-fundra-text mb-4">Milestone Roadmap</h3>
        <div className="space-y-1">
          {campaign.milestones.map((ms, idx) => (
            <MilestoneItem key={ms.id} milestone={ms} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MilestoneItem({ milestone, index }: { milestone: Milestone; index: number }) {
  const statusConfig = {
    completed: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", label: "Completed" },
    active: { icon: Zap, color: "text-amber-400", bg: "bg-amber-400/10", label: "Active" },
    upcoming: { icon: Clock, color: "text-fundra-muted", bg: "bg-white/[0.05]", label: "Upcoming" },
    rejected: { icon: AlertCircle, color: "text-red-400", bg: "bg-red-400/10", label: "Rejected" },
  };

  const config = statusConfig[milestone.status];

  return (
    <div className="flex gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
      <div className={`shrink-0 p-2 rounded-lg ${config.bg}`}>
        <config.icon className={`w-4 h-4 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-fundra-text">
            {index + 1}. {milestone.title}
          </p>
          <span className={`text-[10px] font-mono ${config.color}`}>{config.label}</span>
        </div>
        <p className="text-xs text-fundra-muted mt-0.5">{milestone.description}</p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-[10px] font-mono text-fundra-accent">{milestone.payoutPercentage}% payout</span>
          {milestone.status !== "upcoming" && (
            <span className="text-[10px] font-mono text-fundra-muted">
              {milestone.votesFor} for / {milestone.votesAgainst} against
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Vault Deposit Tab ─────────────────────────────────────

function VaultTab({
  campaign,
  depositAmount,
  onDepositChange,
  onDeposit,
}: {
  campaign: Campaign;
  depositAmount: string;
  onDepositChange: (v: string) => void;
  onDeposit: () => void;
}) {
  const amount = parseFloat(depositAmount) || 0;
  const estimatedYield = (amount * campaign.aaveApy) / 100;

  return (
    <div className="space-y-6">
      {/* Vault Info */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-fundra-accent/5 to-transparent border border-fundra-accent/15">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-fundra-accent" />
          <h3 className="text-sm font-semibold text-fundra-text">ERC-4626 Yield Vault</h3>
        </div>
        <p className="text-xs text-fundra-muted leading-relaxed mb-4">
          Deposit capital into this non-custodial vault. Your principal is routed to Aave V3 lending pools.
          The generated yield funds the creator&apos;s milestones, while your principal remains 100% protected and redeemable at any time.
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-white/[0.04]">
            <p className="text-[10px] text-fundra-muted mb-0.5">Current APY</p>
            <p className="text-lg font-mono font-bold text-emerald-400">{campaign.aaveApy}%</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.04]">
            <p className="text-[10px] text-fundra-muted mb-0.5">Total TVL</p>
            <p className="text-lg font-mono font-bold text-fundra-text">{formatCurrency(campaign.tvl)}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.04]">
            <p className="text-[10px] text-fundra-muted mb-0.5">Yield Earned</p>
            <p className="text-lg font-mono font-bold text-amber-400">{formatCurrency(campaign.yieldGenerated)}</p>
          </div>
        </div>
      </div>

      {/* Deposit Widget */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-fundra-text">Deposit Capital</h3>
        <div className="relative">
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => onDepositChange(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-4 text-2xl font-mono text-fundra-text placeholder:text-fundra-muted/30 focus:outline-none focus:border-fundra-accent/40 transition-all"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-mono text-fundra-muted">
            USDC
          </span>
        </div>

        {/* Yield Projection */}
        {amount > 0 && (
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
            <div className="flex justify-between text-xs text-fundra-muted">
              <span>Estimated Annual Yield</span>
              <span className="text-emerald-400 font-mono">${estimatedYield.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-fundra-muted">
              <span>Estimated Monthly Yield</span>
              <span className="text-emerald-400 font-mono">${(estimatedYield / 12).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-fundra-muted">
              <span>Tokens Minted (est.)</span>
              <span className="text-fundra-accent font-mono">
                ~{Math.floor(amount / campaign.bondingCurve.currentPrice).toLocaleString()} ${campaign.bondingCurve.tokenTicker}
              </span>
            </div>
            <div className="flex justify-between text-xs border-t border-white/[0.06] pt-2 mt-2">
              <span className="text-fundra-text font-medium">Principal Protected</span>
              <span className="text-emerald-400 font-mono font-bold">100%</span>
            </div>
          </div>
        )}

        <button
          onClick={onDeposit}
          disabled={!depositAmount || amount <= 0}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-fundra-accent to-blue-600 text-white font-semibold text-sm tracking-wider uppercase hover:shadow-[0_0_40px_rgba(56,189,248,0.25)] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          Deposit to Vault
        </button>
      </div>
    </div>
  );
}

// ── Tokenomics Tab ────────────────────────────────────────

function TokenomicsTab({ campaign }: { campaign: Campaign }) {
  const bc = campaign.bondingCurve;
  const priceIncrease = ((bc.currentPrice - bc.initialPrice) / bc.initialPrice * 100);

  return (
    <div className="space-y-6">
      {/* Token Overview */}
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-fundra-text">{bc.tokenName}</h3>
            <p className="text-xs text-fundra-muted font-mono">${bc.tokenTicker}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-mono font-bold text-fundra-text">${bc.currentPrice.toFixed(2)}</p>
            <p className="text-xs text-emerald-400 font-mono flex items-center justify-end gap-1">
              <ArrowUpRight className="w-3 h-3" />
              +{priceIncrease.toFixed(0)}% from launch
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-white/[0.04]">
            <p className="text-[10px] text-fundra-muted mb-0.5">Market Cap</p>
            <p className="text-sm font-mono font-semibold text-fundra-text">{formatCurrency(bc.marketCap)}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.04]">
            <p className="text-[10px] text-fundra-muted mb-0.5">Total Supply</p>
            <p className="text-sm font-mono font-semibold text-fundra-text">{formatNumber(bc.totalSupply)}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.04]">
            <p className="text-[10px] text-fundra-muted mb-0.5">Reserve Ratio</p>
            <p className="text-sm font-mono font-semibold text-fundra-text">{(bc.reserveRatio * 100).toFixed(0)}%</p>
          </div>
        </div>
      </div>

      {/* Bonding Curve Visualization */}
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        <h3 className="text-sm font-semibold text-fundra-text mb-4">Bonding Curve</h3>
        <div className="relative h-48 border border-white/[0.06] rounded-xl overflow-hidden bg-white/[0.02]">
          <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(56,189,248)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(56,189,248)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Area under curve */}
            <path
              d="M 0 190 Q 100 185 150 160 Q 200 130 250 90 Q 300 50 350 25 Q 380 12 400 5 L 400 200 L 0 200 Z"
              fill="url(#curveGrad)"
            />
            {/* Curve line */}
            <path
              d="M 0 190 Q 100 185 150 160 Q 200 130 250 90 Q 300 50 350 25 Q 380 12 400 5"
              fill="none"
              stroke="rgb(56,189,248)"
              strokeWidth="2"
            />
            {/* Current price marker */}
            <circle cx="280" cy="70" r="5" fill="rgb(56,189,248)" stroke="#030014" strokeWidth="2" />
          </svg>
          {/* Labels */}
          <div className="absolute bottom-2 left-3 text-[10px] font-mono text-fundra-muted">Supply →</div>
          <div className="absolute top-2 left-3 text-[10px] font-mono text-fundra-muted">Price ↑</div>
          <div className="absolute top-14 right-16 text-[10px] font-mono text-fundra-accent bg-fundra-accent/10 px-1.5 py-0.5 rounded">
            Current
          </div>
        </div>
        <p className="text-xs text-fundra-muted mt-3 leading-relaxed">
          Token price follows a polynomial bonding curve with {(bc.reserveRatio * 100).toFixed(0)}% reserve ratio.
          As more tokens are minted, the price increases algorithmically, rewarding early backers.
        </p>
      </div>

      {/* Buy/Sell Calculator */}
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
        <h3 className="text-sm font-semibold text-fundra-text mb-3">Quick Calculator</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-white/[0.04] text-center">
            <p className="text-[10px] text-fundra-muted mb-1">$100 buys</p>
            <p className="text-lg font-mono font-bold text-fundra-accent">
              ~{Math.floor(100 / bc.currentPrice).toLocaleString()}
            </p>
            <p className="text-[10px] font-mono text-fundra-muted">${bc.tokenTicker}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.04] text-center">
            <p className="text-[10px] text-fundra-muted mb-1">$1,000 buys</p>
            <p className="text-lg font-mono font-bold text-fundra-accent">
              ~{Math.floor(1000 / bc.currentPrice).toLocaleString()}
            </p>
            <p className="text-[10px] font-mono text-fundra-muted">${bc.tokenTicker}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Governance Tab ────────────────────────────────────────

function GovernanceTab({
  campaign,
  voteState,
  onVote,
}: {
  campaign: Campaign;
  voteState: Record<string, "yes" | "no" | null>;
  onVote: (milestoneId: string, vote: "yes" | "no") => void;
}) {
  const activeMilestones = campaign.milestones.filter(
    (m) => m.status === "active"
  );

  return (
    <div className="space-y-6">
      {activeMilestones.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Vote className="w-10 h-10 text-fundra-muted/30 mb-4" />
          <p className="text-sm text-fundra-muted">No active governance proposals for this campaign.</p>
        </div>
      ) : (
        activeMilestones.map((ms) => {
          const totalVotes = ms.votesFor + ms.votesAgainst;
          const quorumProgress = Math.min((totalVotes / ms.quorumRequired) * 100, 100);
          const forPercentage = totalVotes > 0 ? (ms.votesFor / totalVotes) * 100 : 0;
          const userVote = voteState[ms.id] || null;

          return (
            <div
              key={ms.id}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-4"
            >
              <div>
                <h3 className="text-sm font-semibold text-fundra-text">{ms.title}</h3>
                <p className="text-xs text-fundra-muted mt-1">{ms.description}</p>
              </div>

              {ms.deliverableUrl && (
                <a
                  href={ms.deliverableUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-fundra-accent hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Deliverable
                </a>
              )}

              {/* Quorum Progress */}
              <div>
                <div className="flex justify-between text-[10px] text-fundra-muted mb-1.5">
                  <span>Quorum Progress</span>
                  <span className="font-mono">{totalVotes} / {ms.quorumRequired} votes</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-fundra-accent/60 transition-all duration-500"
                    style={{ width: `${quorumProgress}%` }}
                  />
                </div>
              </div>

              {/* Vote Split */}
              <div className="flex items-center gap-2 h-3 rounded-full overflow-hidden bg-white/[0.06]">
                <div
                  className="h-full bg-emerald-500/70 rounded-l-full transition-all"
                  style={{ width: `${forPercentage}%` }}
                />
                <div
                  className="h-full bg-red-500/70 rounded-r-full transition-all"
                  style={{ width: `${100 - forPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-fundra-muted font-mono">
                <span className="text-emerald-400">✓ {ms.votesFor + (userVote === "yes" ? 1 : 0)} For</span>
                <span className="text-red-400">✗ {ms.votesAgainst + (userVote === "no" ? 1 : 0)} Against</span>
              </div>

              {/* Vote Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => onVote(ms.id, "yes")}
                  disabled={!!userVote}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer active:scale-[0.98] ${
                    userVote === "yes"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : userVote === "no"
                      ? "bg-white/[0.03] text-fundra-muted/30 cursor-not-allowed"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                  }`}
                >
                  {userVote === "yes" ? "✓ Voted Yes" : "Vote Yes"}
                </button>
                <button
                  onClick={() => onVote(ms.id, "no")}
                  disabled={!!userVote}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer active:scale-[0.98] ${
                    userVote === "no"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : userVote === "yes"
                      ? "bg-white/[0.03] text-fundra-muted/30 cursor-not-allowed"
                      : "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                  }`}
                >
                  {userVote === "no" ? "✗ Voted No" : "Vote No"}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
