"use client";

import { useState } from "react";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  Zap,
} from "lucide-react";
import type { DbCampaign, DbMilestone } from "@/lib/db/engine";
import { useWallet } from "@/context/WalletContext";

interface ProjectDetailModalProps {
  campaign: DbCampaign | null;
  onClose: () => void;
  onDataChange?: () => void;
}

type DetailTab = "overview" | "vault" | "governance";

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(2)}`;
}

export function ProjectDetailModal({ campaign, onClose, onDataChange }: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");
  const [depositAmount, setDepositAmount] = useState("");
  const [depositing, setDepositing] = useState(false);
  const [voteState, setVoteState] = useState<Record<string, "yes" | "no">>({});
  const { address } = useWallet();

  if (!campaign) return null;

  const tabs: { id: DetailTab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "vault", label: "Deposit" },
    { id: "governance", label: "Votes" },
  ];

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0 || !address) return;

    setDepositing(true);
    try {
      const res = await fetch("/api/vaults/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: campaign.id,
          walletAddress: address,
          amount,
        }),
      });
      if (res.ok) {
        setDepositAmount("");
        onDataChange?.();
      }
    } catch (err) {
      console.error("Deposit failed:", err);
    } finally {
      setDepositing(false);
    }
  };

  const handleVote = async (milestoneId: string, vote: "yes" | "no") => {
    if (!address) return;

    try {
      const res = await fetch("/api/governance/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignId: campaign.id,
          milestoneId,
          walletAddress: address,
          vote,
        }),
      });
      if (res.ok) {
        setVoteState((prev) => ({ ...prev, [milestoneId]: vote }));
        onDataChange?.();
      }
    } catch (err) {
      console.error("Vote failed:", err);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-lg bg-[#09090b] border-l border-[#27272a] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#09090b] border-b border-[#27272a] px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] text-[#52525b] uppercase tracking-wider mb-1">
                {campaign.category} · {campaign.network}
              </p>
              <h2 className="text-base font-semibold text-white leading-snug">
                {campaign.title}
              </h2>
              <p className="text-xs text-[#52525b] mt-0.5">{campaign.creator}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-[#18181b] text-[#52525b] hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#27272a] text-white"
                    : "text-[#52525b] hover:text-[#a1a1aa]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-5 py-5 space-y-6">
          {activeTab === "overview" && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "TVL", value: formatCurrency(campaign.tvl) },
                  { label: "APY", value: `${campaign.aaveApy}%`, cls: "text-emerald-500" },
                  { label: "Yield", value: formatCurrency(campaign.yieldGenerated) },
                  { label: "Backers", value: campaign.backerCount.toLocaleString() },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-lg bg-[#18181b] border border-[#27272a]">
                    <p className="text-[10px] text-[#52525b] uppercase tracking-wider">{s.label}</p>
                    <p className={`text-sm font-mono mt-1 ${s.cls || "text-white"}`}>{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs text-[#52525b] uppercase tracking-wider mb-2">About</h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed whitespace-pre-line">
                  {campaign.longDescription}
                </p>
              </div>

              {/* Tags */}
              {campaign.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {campaign.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[10px] text-[#52525b]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Token */}
              <div className="p-3 rounded-lg bg-[#18181b] border border-[#27272a]">
                <h3 className="text-xs text-[#52525b] uppercase tracking-wider mb-2">Token</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">{campaign.bondingCurve.tokenName}</span>
                  <div className="text-right">
                    <span className="text-sm font-mono text-white">${campaign.bondingCurve.currentPrice.toFixed(4)}</span>
                    <span className="text-[10px] text-[#52525b] ml-2">${campaign.bondingCurve.tokenTicker}</span>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div>
                <h3 className="text-xs text-[#52525b] uppercase tracking-wider mb-3">Milestones</h3>
                <div className="space-y-1">
                  {campaign.milestones.map((ms, idx) => (
                    <MilestoneRow key={ms.id} milestone={ms} index={idx} />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "vault" && (
            <>
              <div className="p-4 rounded-lg bg-[#18181b] border border-[#27272a]">
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  Deposit capital into this ERC-4626 vault. Your principal is routed to Aave V3. 
                  Generated yield funds the creator. Principal is 100% redeemable.
                </p>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div>
                    <p className="text-[10px] text-[#52525b]">APY</p>
                    <p className="text-sm font-mono text-emerald-500">{campaign.aaveApy}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#52525b]">TVL</p>
                    <p className="text-sm font-mono text-white">{formatCurrency(campaign.tvl)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#52525b]">Protection</p>
                    <p className="text-sm font-mono text-white">100%</p>
                  </div>
                </div>
              </div>

              {!address ? (
                <p className="text-xs text-[#52525b] text-center py-4">
                  Connect your wallet to deposit.
                </p>
              ) : (
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full bg-[#18181b] border border-[#27272a] rounded-lg px-4 py-3 text-lg font-mono text-white placeholder:text-[#3f3f46] focus:outline-none focus:border-[#3f3f46] transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#52525b] font-mono">
                      USDC
                    </span>
                  </div>

                  {parseFloat(depositAmount) > 0 && (
                    <div className="p-3 rounded-lg bg-[#18181b] border border-[#27272a] space-y-1.5 text-xs">
                      <div className="flex justify-between text-[#71717a]">
                        <span>Annual yield est.</span>
                        <span className="text-emerald-500 font-mono">
                          ${(parseFloat(depositAmount) * campaign.aaveApy / 100).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#71717a]">
                        <span>Tokens received est.</span>
                        <span className="text-white font-mono">
                          ~{Math.floor(parseFloat(depositAmount) / campaign.bondingCurve.currentPrice).toLocaleString()} {campaign.bondingCurve.tokenTicker}
                        </span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleDeposit}
                    disabled={depositing || !depositAmount || parseFloat(depositAmount) <= 0}
                    className="w-full py-3 rounded-lg bg-white text-[#09090b] text-sm font-medium hover:bg-[#e4e4e7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    {depositing ? "Processing..." : "Deposit"}
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === "governance" && (
            <>
              {campaign.milestones.filter((m) => m.status === "active").length === 0 ? (
                <p className="text-xs text-[#52525b] text-center py-8">
                  No active proposals.
                </p>
              ) : (
                campaign.milestones
                  .filter((m) => m.status === "active")
                  .map((ms) => {
                    const total = ms.votesFor + ms.votesAgainst;
                    const quorumPct = Math.min((total / ms.quorumRequired) * 100, 100);
                    const userVote = voteState[ms.id] || null;

                    return (
                      <div key={ms.id} className="p-4 rounded-lg bg-[#18181b] border border-[#27272a] space-y-3">
                        <div>
                          <h4 className="text-sm text-white">{ms.title}</h4>
                          <p className="text-xs text-[#52525b] mt-0.5">{ms.description}</p>
                        </div>

                        {ms.deliverableUrl && (
                          <a
                            href={ms.deliverableUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[#a1a1aa] hover:text-white"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Deliverable
                          </a>
                        )}

                        {/* Quorum */}
                        <div>
                          <div className="flex justify-between text-[10px] text-[#52525b] mb-1">
                            <span>Quorum</span>
                            <span className="font-mono">{total}/{ms.quorumRequired}</span>
                          </div>
                          <div className="w-full h-1 rounded-full bg-[#27272a]">
                            <div className="h-full rounded-full bg-[#52525b] transition-all" style={{ width: `${quorumPct}%` }} />
                          </div>
                        </div>

                        {/* Votes */}
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-emerald-500">{ms.votesFor + (userVote === "yes" ? 1 : 0)} for</span>
                          <span className="text-red-400">{ms.votesAgainst + (userVote === "no" ? 1 : 0)} against</span>
                        </div>

                        {/* Vote Buttons */}
                        {!address ? (
                          <p className="text-[10px] text-[#3f3f46]">Connect wallet to vote</p>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleVote(ms.id, "yes")}
                              disabled={!!userVote}
                              className={`flex-1 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                                userVote === "yes"
                                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                  : userVote
                                  ? "bg-[#18181b] text-[#3f3f46] cursor-not-allowed"
                                  : "bg-[#09090b] text-[#a1a1aa] border border-[#27272a] hover:text-emerald-500 hover:border-emerald-500/30"
                              }`}
                            >
                              {userVote === "yes" ? "Voted Yes" : "Approve"}
                            </button>
                            <button
                              onClick={() => handleVote(ms.id, "no")}
                              disabled={!!userVote}
                              className={`flex-1 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                                userVote === "no"
                                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                  : userVote
                                  ? "bg-[#18181b] text-[#3f3f46] cursor-not-allowed"
                                  : "bg-[#09090b] text-[#a1a1aa] border border-[#27272a] hover:text-red-400 hover:border-red-500/30"
                              }`}
                            >
                              {userVote === "no" ? "Voted No" : "Reject"}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

function MilestoneRow({ milestone, index }: { milestone: DbMilestone; index: number }) {
  const statusIcon = {
    completed: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />,
    active: <Zap className="w-3.5 h-3.5 text-amber-500" />,
    upcoming: <Clock className="w-3.5 h-3.5 text-[#3f3f46]" />,
    rejected: <AlertCircle className="w-3.5 h-3.5 text-red-400" />,
  };

  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-[#18181b] transition-colors">
      {statusIcon[milestone.status]}
      <div className="flex-1 min-w-0">
        <span className="text-xs text-white">{index + 1}. {milestone.title}</span>
      </div>
      <span className="text-[10px] font-mono text-[#52525b]">{milestone.payoutPercentage}%</span>
    </div>
  );
}
