"use client";

import {
  TrendingUp,
  Wallet,
  Zap,
  ArrowDownRight,
  ArrowUpRight,
  LogOut,
} from "lucide-react";
import { MOCK_PORTFOLIO, formatCurrency, formatNumber } from "@/data/mockProjects";

export function PortfolioDashboard() {
  const totalDeposited = MOCK_PORTFOLIO.reduce((sum, p) => sum + p.depositedAmount, 0);
  const totalYield = MOCK_PORTFOLIO.reduce((sum, p) => sum + p.currentYield, 0);
  const avgApy = MOCK_PORTFOLIO.length > 0
    ? MOCK_PORTFOLIO.reduce((sum, p) => sum + p.apy, 0) / MOCK_PORTFOLIO.length
    : 0;

  return (
    <div className="space-y-8">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-fundra-accent/8 to-transparent border border-fundra-accent/15">
          <div className="flex items-center gap-2 mb-3">
            <Wallet className="w-5 h-5 text-fundra-accent" />
            <span className="text-xs text-fundra-muted uppercase tracking-wider">Total Deposited</span>
          </div>
          <p className="text-3xl font-mono font-bold text-fundra-text">
            {formatCurrency(totalDeposited)}
          </p>
          <p className="text-xs text-fundra-muted mt-1">Principal • 100% Protected</p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/8 to-transparent border border-emerald-500/15">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span className="text-xs text-fundra-muted uppercase tracking-wider">Total Yield Earned</span>
          </div>
          <p className="text-3xl font-mono font-bold text-emerald-400">
            +{formatCurrency(totalYield)}
          </p>
          <p className="text-xs text-fundra-muted mt-1">From Aave V3 lending pools</p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/8 to-transparent border border-amber-500/15">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-xs text-fundra-muted uppercase tracking-wider">Avg. APY</span>
          </div>
          <p className="text-3xl font-mono font-bold text-amber-400">
            {avgApy.toFixed(2)}%
          </p>
          <p className="text-xs text-fundra-muted mt-1">Across all active vaults</p>
        </div>
      </div>

      {/* Active Vault Positions */}
      <div>
        <h3 className="text-sm font-semibold text-fundra-text mb-4">Active Vault Positions</h3>
        <div className="space-y-3">
          {MOCK_PORTFOLIO.map((position) => (
            <div
              key={position.campaignId}
              className="group p-5 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-fundra-text truncate">
                    {position.campaignTitle}
                  </h4>
                  <p className="text-xs text-fundra-muted mt-0.5">
                    Deposited {new Date(position.depositedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                  {position.apy}% APY
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] text-fundra-muted uppercase tracking-wider mb-0.5">Principal</p>
                  <p className="text-sm font-mono font-semibold text-fundra-text">
                    {formatCurrency(position.depositedAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-fundra-muted uppercase tracking-wider mb-0.5">Yield Accrued</p>
                  <p className="text-sm font-mono font-semibold text-emerald-400">
                    +${position.currentYield.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-fundra-muted uppercase tracking-wider mb-0.5">Token Balance</p>
                  <p className="text-sm font-mono font-semibold text-fundra-accent">
                    {formatNumber(position.tokenBalance)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-fundra-muted uppercase tracking-wider mb-0.5">Token</p>
                  <p className="text-sm font-mono font-semibold text-fundra-text">
                    ${position.tokenTicker}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4 pt-4 border-t border-white/[0.05]">
                <button
                  onClick={() => alert(`Simulated: Withdrawing principal of ${formatCurrency(position.depositedAmount)} from ${position.campaignTitle} vault.`)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs text-fundra-muted hover:text-red-400 hover:border-red-400/20 hover:bg-red-500/5 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Withdraw Principal
                </button>
                <button
                  onClick={() => alert(`Simulated: Claiming ${position.currentYield.toFixed(2)} USDC yield from ${position.campaignTitle}.`)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
                >
                  <ArrowDownRight className="w-3.5 h-3.5" />
                  Claim Yield
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty state if no positions */}
      {MOCK_PORTFOLIO.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Wallet className="w-12 h-12 text-fundra-muted/20 mb-4" />
          <p className="text-sm text-fundra-muted">No active vault positions.</p>
          <p className="text-xs text-fundra-muted/60 mt-1">Explore campaigns and deposit to earn yield.</p>
        </div>
      )}
    </div>
  );
}
