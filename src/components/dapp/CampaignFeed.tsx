"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import type { CampaignCategory } from "@/types/dapp";
import type { DbCampaign } from "@/lib/db/engine";

interface CampaignFeedProps {
  searchQuery: string;
  onSelectCampaign: (campaign: DbCampaign) => void;
}

const CATEGORIES: ("All" | CampaignCategory)[] = [
  "All",
  "DeFi",
  "Infrastructure",
  "AI",
  "Gaming",
  "Public Goods",
];

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

function getMilestoneProgress(campaign: DbCampaign): number {
  const completed = campaign.milestones.filter((m) => m.status === "completed").length;
  return Math.round((completed / campaign.milestones.length) * 100);
}

export function CampaignFeed({ searchQuery, onSelectCampaign }: CampaignFeedProps) {
  const [activeCategory, setActiveCategory] = useState<"All" | CampaignCategory>("All");
  const [campaigns, setCampaigns] = useState<DbCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (activeCategory !== "All") params.set("category", activeCategory);
      if (searchQuery) params.set("search", searchQuery);

      const res = await fetch(`/api/campaigns?${params.toString()}`);
      const data = await res.json();
      setCampaigns(data.campaigns || []);
    } catch (err) {
      console.error("Failed to fetch campaigns:", err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  // Aggregate stats
  const totalTVL = campaigns.reduce((sum, c) => sum + c.tvl, 0);
  const totalBackers = campaigns.reduce((sum, c) => sum + c.backerCount, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex items-center gap-6 text-xs text-[#a1a1aa]">
        <div>
          <span className="text-[#52525b]">TVL </span>
          <span className="text-white font-mono">{formatCurrency(totalTVL)}</span>
        </div>
        <div>
          <span className="text-[#52525b]">Campaigns </span>
          <span className="text-white font-mono">{campaigns.length}</span>
        </div>
        <div>
          <span className="text-[#52525b]">Backers </span>
          <span className="text-white font-mono">{totalBackers.toLocaleString()}</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-md text-xs transition-colors cursor-pointer ${
              activeCategory === cat
                ? "text-white bg-[#27272a]"
                : "text-[#71717a] hover:text-[#a1a1aa] hover:bg-[#18181b]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Campaign List */}
      {loading ? (
        <div className="py-16 text-center text-sm text-[#52525b]">Loading...</div>
      ) : campaigns.length === 0 ? (
        <div className="py-16 text-center text-sm text-[#52525b]">
          No campaigns found.
        </div>
      ) : (
        <div className="border border-[#27272a] rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_80px_80px_80px_60px_24px] gap-4 px-4 py-2.5 bg-[#18181b] text-[10px] text-[#52525b] uppercase tracking-wider border-b border-[#27272a]">
            <span>Campaign</span>
            <span className="text-right">TVL</span>
            <span className="text-right">APY</span>
            <span className="text-right">Backers</span>
            <span className="text-right">Progress</span>
            <span />
          </div>

          {/* Rows */}
          {campaigns.map((campaign) => {
            const progress = getMilestoneProgress(campaign);
            return (
              <button
                key={campaign.id}
                onClick={() => onSelectCampaign(campaign)}
                className="grid grid-cols-[1fr_80px_80px_80px_60px_24px] gap-4 items-center px-4 py-3 w-full text-left border-b border-[#27272a] last:border-b-0 hover:bg-[#18181b] transition-colors cursor-pointer group"
              >
                {/* Title + Meta */}
                <div className="min-w-0">
                  <p className="text-sm text-white truncate group-hover:text-[#fafafa]">
                    {campaign.title}
                  </p>
                  <p className="text-[11px] text-[#52525b] mt-0.5">
                    {campaign.creator}
                    <span className="mx-1.5">·</span>
                    <span className="text-[#3f3f46]">{campaign.category}</span>
                  </p>
                </div>

                {/* TVL */}
                <span className="text-right text-xs font-mono text-[#a1a1aa]">
                  {formatCurrency(campaign.tvl)}
                </span>

                {/* APY */}
                <span className="text-right text-xs font-mono text-emerald-500">
                  {campaign.aaveApy}%
                </span>

                {/* Backers */}
                <span className="text-right text-xs font-mono text-[#a1a1aa]">
                  {campaign.backerCount.toLocaleString()}
                </span>

                {/* Progress */}
                <div className="flex items-center justify-end gap-2">
                  <span className="text-[10px] font-mono text-[#52525b]">{progress}%</span>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-3.5 h-3.5 text-[#3f3f46] group-hover:text-[#71717a] transition-colors" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
