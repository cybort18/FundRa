"use client";

import { useState } from "react";
import {
  Vote,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { MOCK_PROPOSALS, formatNumber } from "@/data/mockProjects";
import type { GovernanceProposal } from "@/types/dapp";

export function GovernancePortal() {
  const [voteState, setVoteState] = useState<Record<string, "yes" | "no" | null>>({});

  const handleVote = (proposalId: string, vote: "yes" | "no") => {
    setVoteState((prev) => ({ ...prev, [proposalId]: vote }));
  };

  const activeProposals = MOCK_PROPOSALS.filter((p) => p.status === "active");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-fundra-text">Milestone DAO Governance</h2>
          <p className="text-xs text-fundra-muted mt-1">
            Review creator deliverables and vote to approve or reject milestone fund releases.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-fundra-accent/10 border border-fundra-accent/20">
          <Vote className="w-3.5 h-3.5 text-fundra-accent" />
          <span className="text-xs font-mono text-fundra-accent">
            {activeProposals.length} Active
          </span>
        </div>
      </div>

      {/* Proposals */}
      {activeProposals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Vote className="w-12 h-12 text-fundra-muted/20 mb-4" />
          <p className="text-sm text-fundra-muted">No active governance proposals.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeProposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              userVote={voteState[proposal.id] || null}
              onVote={handleVote}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Proposal Card ─────────────────────────────────────────

function ProposalCard({
  proposal,
  userVote,
  onVote,
}: {
  proposal: GovernanceProposal;
  userVote: "yes" | "no" | null;
  onVote: (id: string, vote: "yes" | "no") => void;
}) {
  const totalVotes = proposal.votesFor + proposal.votesAgainst + (userVote ? 1 : 0);
  const adjustedFor = proposal.votesFor + (userVote === "yes" ? 1 : 0);
  const adjustedAgainst = proposal.votesAgainst + (userVote === "no" ? 1 : 0);
  const quorumProgress = Math.min((totalVotes / proposal.quorumRequired) * 100, 100);
  const forPercentage = totalVotes > 0 ? (adjustedFor / totalVotes) * 100 : 0;

  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(proposal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    )
  );

  return (
    <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <p className="text-[10px] text-fundra-muted uppercase tracking-wider mb-1">
            {proposal.campaignTitle}
          </p>
          <h3 className="text-sm font-semibold text-fundra-text">
            Milestone #{proposal.milestoneIndex + 1}: {proposal.milestoneTitle}
          </h3>
        </div>
        <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
          <Clock className="w-3 h-3 text-amber-400" />
          <span className="text-[10px] font-mono text-amber-400">{daysLeft}d left</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-fundra-muted/80 leading-relaxed mb-4">
        {proposal.description}
      </p>

      {/* Deliverable Link */}
      {proposal.deliverableUrl && (
        <a
          href={proposal.deliverableUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-fundra-accent hover:underline mb-4"
        >
          <ExternalLink className="w-3 h-3" />
          View Deliverable on GitHub
        </a>
      )}

      {/* Quorum Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-fundra-muted mb-1.5">
          <span>Quorum Progress</span>
          <span className="font-mono">
            {totalVotes} / {proposal.quorumRequired} votes ({quorumProgress.toFixed(0)}%)
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-fundra-accent/60 to-blue-500/60 transition-all duration-700"
            style={{ width: `${quorumProgress}%` }}
          />
        </div>
      </div>

      {/* Vote Split Bar */}
      <div className="mb-4">
        <div className="flex items-center gap-1 h-3 rounded-full overflow-hidden bg-white/[0.06]">
          {forPercentage > 0 && (
            <div
              className="h-full bg-emerald-500/60 rounded-l-full transition-all duration-500"
              style={{ width: `${forPercentage}%` }}
            />
          )}
          {(100 - forPercentage) > 0 && (
            <div
              className="h-full bg-red-500/50 rounded-r-full transition-all duration-500"
              style={{ width: `${100 - forPercentage}%` }}
            />
          )}
        </div>
        <div className="flex justify-between text-[10px] font-mono mt-1.5">
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {adjustedFor} For ({forPercentage.toFixed(1)}%)
          </span>
          <span className="text-red-400 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            {adjustedAgainst} Against ({(100 - forPercentage).toFixed(1)}%)
          </span>
        </div>
      </div>

      {/* Vote Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => onVote(proposal.id, "yes")}
          disabled={!!userVote}
          className={`flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all cursor-pointer active:scale-[0.98] ${
            userVote === "yes"
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : userVote === "no"
              ? "bg-white/[0.02] text-fundra-muted/20 cursor-not-allowed"
              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
          }`}
        >
          {userVote === "yes" ? "✓ Voted Yes" : "Approve Release"}
        </button>
        <button
          onClick={() => onVote(proposal.id, "no")}
          disabled={!!userVote}
          className={`flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all cursor-pointer active:scale-[0.98] ${
            userVote === "no"
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : userVote === "yes"
              ? "bg-white/[0.02] text-fundra-muted/20 cursor-not-allowed"
              : "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
          }`}
        >
          {userVote === "no" ? "✗ Voted No" : "Reject Release"}
        </button>
      </div>
    </div>
  );
}
