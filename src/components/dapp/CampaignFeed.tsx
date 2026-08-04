"use client";

import { useState } from "react";
import {
  TrendingUp,
  Users,
  Zap,
  ChevronRight,
} from "lucide-react";
import type { Campaign, CampaignCategory } from "@/types/dapp";
import {
  MOCK_CAMPAIGNS,
  formatCurrency,
  formatNumber,
  getMilestoneProgress,
  getCategoryColor,
} from "@/data/mockProjects";

interface CampaignFeedProps {
  searchQuery: string;
  onSelectCampaign: (campaign: Campaign) => void;
}

const CATEGORIES: ("All" | CampaignCategory)[] = [
  "All",
  "DeFi",
  "Infrastructure",
  "AI",
  "Gaming",
  "Public Goods",
];

export function CampaignFeed({ searchQuery, onSelectCampaign }: CampaignFeedProps) {
  const [activeCategory, setActiveCategory] = useState<"All" | CampaignCategory>("All");

  const filteredCampaigns = MOCK_CAMPAIGNS.filter((c) => {
    const matchesCategory = activeCategory === "All" || c.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Aggregate stats
  const totalTVL = MOCK_CAMPAIGNS.reduce((sum, c) => sum + c.tvl, 0);
  const totalYield = MOCK_CAMPAIGNS.reduce((sum, c) => sum + c.yieldGenerated, 0);
  const totalBackers = MOCK_CAMPAIGNS.reduce((sum, c) => sum + c.backerCount, 0);

  return (
    <div className="space-y-8">
      {/* Protocol Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Value Locked", value: formatCurrency(totalTVL), icon: TrendingUp, color: "text-emerald-400" },
          { label: "Yield Generated", value: formatCurrency(totalYield), icon: Zap, color: "text-amber-400" },
          { label: "Total Backers", value: formatNumber(totalBackers), icon: Users, color: "text-sky-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
          >
            <div className={`p-2.5 rounded-xl bg-white/[0.05] ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-semibold text-fundra-text font-mono">{stat.value}</p>
              <p className="text-xs text-fundra-muted">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 cursor-pointer border ${
              activeCategory === cat
                ? "bg-fundra-accent/15 text-fundra-accent border-fundra-accent/30"
                : "bg-white/[0.03] text-fundra-muted border-white/[0.06] hover:bg-white/[0.06] hover:text-fundra-text"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Campaign Cards Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-fundra-muted text-sm">No campaigns found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onSelect={onSelectCampaign}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Campaign Card ─────────────────────────────────────────

function CampaignCard({
  campaign,
  onSelect,
}: {
  campaign: Campaign;
  onSelect: (c: Campaign) => void;
}) {
  const milestoneProgress = getMilestoneProgress(campaign);
  const activeMilestone = campaign.milestones.find((m) => m.status === "active");

  return (
    <button
      onClick={() => onSelect(campaign)}
      className="group relative flex flex-col text-left p-5 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-fundra-accent/30 hover:bg-white/[0.04] transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-fundra-accent/5 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-fundra-text leading-snug line-clamp-2 group-hover:text-fundra-accent transition-colors duration-300">
            {campaign.title}
          </h3>
          <p className="mt-1 text-xs text-fundra-muted">by {campaign.creator}</p>
        </div>
        <span
          className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium border ${getCategoryColor(
            campaign.category
          )}`}
        >
          {campaign.category}
        </span>
      </div>

      {/* Description */}
      <p className="relative z-10 text-xs text-fundra-muted/80 leading-relaxed line-clamp-2 mb-5">
        {campaign.description}
      </p>

      {/* Stats */}
      <div className="relative z-10 grid grid-cols-3 gap-3 mb-4">
        <div>
          <p className="text-xs text-fundra-muted mb-0.5">TVL</p>
          <p className="text-sm font-mono font-semibold text-fundra-text">
            {formatCurrency(campaign.tvl)}
          </p>
        </div>
        <div>
          <p className="text-xs text-fundra-muted mb-0.5">Aave APY</p>
          <p className="text-sm font-mono font-semibold text-emerald-400">
            {campaign.aaveApy}%
          </p>
        </div>
        <div>
          <p className="text-xs text-fundra-muted mb-0.5">Backers</p>
          <p className="text-sm font-mono font-semibold text-fundra-text">
            {formatNumber(campaign.backerCount)}
          </p>
        </div>
      </div>

      {/* Milestone Progress */}
      <div className="relative z-10 mt-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-fundra-muted uppercase tracking-wider">Milestone Progress</span>
          <span className="text-[10px] font-mono text-fundra-accent">{milestoneProgress}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-fundra-accent to-blue-500 transition-all duration-700"
            style={{ width: `${milestoneProgress}%` }}
          />
        </div>
        {activeMilestone && (
          <p className="mt-2 text-[10px] text-fundra-muted flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Active: {activeMilestone.title}
          </p>
        )}
      </div>

      {/* Token Badge */}
      <div className="relative z-10 mt-4 flex items-center justify-between pt-3 border-t border-white/[0.05]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-fundra-muted bg-white/[0.05] px-2 py-0.5 rounded">
            ${campaign.bondingCurve.tokenTicker}
          </span>
          <span className="text-[10px] font-mono text-emerald-400">
            ${campaign.bondingCurve.currentPrice.toFixed(2)}
          </span>
        </div>
        <ChevronRight className="w-4 h-4 text-fundra-muted group-hover:text-fundra-accent group-hover:translate-x-0.5 transition-all" />
      </div>
    </button>
  );
}
