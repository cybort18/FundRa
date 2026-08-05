"use client";

import { useState, useEffect } from "react";
import { ExternalLink, CheckCircle2, XCircle } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import type { DbCampaign } from "@/lib/db/engine";

export function GovernancePortal() {
  const { address } = useWallet();
  const [campaigns, setCampaigns] = useState<DbCampaign[]>([]);
  const [voteState, setVoteState] = useState<Record<string, "yes" | "no">>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then((data) => setCampaigns(data.campaigns || []))
      .catch(() => setCampaigns([]))
      .finally(() => setLoading(false));
  }, []);

  const handleVote = async (campaignId: string, milestoneId: string, vote: "yes" | "no") => {
    if (!address) return;

    try {
      const res = await fetch("/api/governance/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignId, milestoneId, walletAddress: address, vote }),
      });
      if (res.ok) {
        setVoteState((prev) => ({ ...prev, [milestoneId]: vote }));
      }
    } catch (err) {
      console.error("Vote failed:", err);
    }
  };

  // Collect all active milestones across campaigns
  const activeProposals = campaigns.flatMap((c) =>
    c.milestones
      .filter((m) => m.status === "active")
      .map((m, idx) => ({
        campaign: c,
        milestone: m,
        milestoneIndex: c.milestones.indexOf(m),
      }))
  );

  if (loading) {
    return <div className="py-20 text-center text-sm text-[#52525b]">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-white">Milestone Governance</h2>
          <p className="text-xs text-[#52525b] mt-0.5">Vote to approve or reject fund releases.</p>
        </div>
        <span className="text-[10px] font-mono text-[#52525b] bg-[#18181b] border border-[#27272a] px-2 py-1 rounded-md">
          {activeProposals.length} active
        </span>
      </div>

      {activeProposals.length === 0 ? (
        <div className="py-16 text-center text-sm text-[#52525b]">
          No active governance proposals.
        </div>
      ) : (
        <div className="space-y-3">
          {activeProposals.map(({ campaign, milestone, milestoneIndex }) => {
            const total = milestone.votesFor + milestone.votesAgainst;
            const quorumPct = Math.min((total / milestone.quorumRequired) * 100, 100);
            const userVote = voteState[milestone.id] || null;

            return (
              <div
                key={milestone.id}
                className="p-4 rounded-lg bg-[#18181b] border border-[#27272a] space-y-3"
              >
                <div>
                  <p className="text-[10px] text-[#3f3f46] uppercase tracking-wider">
                    {campaign.title}
                  </p>
                  <h4 className="text-sm text-white mt-0.5">
                    #{milestoneIndex + 1}: {milestone.title}
                  </h4>
                  <p className="text-xs text-[#52525b] mt-1">{milestone.description}</p>
                </div>

                {milestone.deliverableUrl && (
                  <a
                    href={milestone.deliverableUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#a1a1aa] hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View deliverable
                  </a>
                )}

                {/* Quorum */}
                <div>
                  <div className="flex justify-between text-[10px] text-[#52525b] mb-1">
                    <span>Quorum</span>
                    <span className="font-mono">{total}/{milestone.quorumRequired}</span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-[#27272a]">
                    <div className="h-full rounded-full bg-[#52525b] transition-all" style={{ width: `${quorumPct}%` }} />
                  </div>
                </div>

                {/* Vote counts */}
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {milestone.votesFor + (userVote === "yes" ? 1 : 0)} for
                  </span>
                  <span className="text-red-400 flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    {milestone.votesAgainst + (userVote === "no" ? 1 : 0)} against
                  </span>
                </div>

                {/* Vote */}
                {!address ? (
                  <p className="text-[10px] text-[#3f3f46]">Connect wallet to vote</p>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVote(campaign.id, milestone.id, "yes")}
                      disabled={!!userVote}
                      className={`flex-1 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        userVote === "yes"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : userVote
                          ? "bg-[#09090b] text-[#27272a] cursor-not-allowed"
                          : "bg-[#09090b] border border-[#27272a] text-[#a1a1aa] hover:text-emerald-500 hover:border-emerald-500/30"
                      }`}
                    >
                      {userVote === "yes" ? "Voted Yes" : "Approve"}
                    </button>
                    <button
                      onClick={() => handleVote(campaign.id, milestone.id, "no")}
                      disabled={!!userVote}
                      className={`flex-1 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                        userVote === "no"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : userVote
                          ? "bg-[#09090b] text-[#27272a] cursor-not-allowed"
                          : "bg-[#09090b] border border-[#27272a] text-[#a1a1aa] hover:text-red-400 hover:border-red-500/30"
                      }`}
                    >
                      {userVote === "no" ? "Voted No" : "Reject"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
