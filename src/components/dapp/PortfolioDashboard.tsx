"use client";

import { useState, useEffect } from "react";
import { Wallet, LogOut } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import type { DbDeposit } from "@/lib/db/engine";

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(2)}`;
}

export function PortfolioDashboard() {
  const { address } = useWallet();
  const [deposits, setDeposits] = useState<DbDeposit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!address) {
      setDeposits([]);
      setLoading(false);
      return;
    }

    fetch(`/api/vaults/deposit?wallet=${address}`)
      .then((res) => res.json())
      .then((data) => setDeposits(data.deposits || []))
      .catch(() => setDeposits([]))
      .finally(() => setLoading(false));
  }, [address]);

  const totalDeposited = deposits.reduce((sum, d) => sum + d.amount, 0);
  const avgApy = deposits.length > 0
    ? deposits.reduce((sum, d) => sum + d.apy, 0) / deposits.length
    : 0;

  if (!address) {
    return (
      <div className="py-20 text-center">
        <Wallet className="w-8 h-8 text-[#27272a] mx-auto mb-3" />
        <p className="text-sm text-[#52525b]">Connect your wallet to view your portfolio.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="py-20 text-center text-sm text-[#52525b]">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center gap-8 text-xs text-[#a1a1aa]">
        <div>
          <span className="text-[#52525b]">Deposited </span>
          <span className="text-white font-mono">{formatCurrency(totalDeposited)}</span>
        </div>
        <div>
          <span className="text-[#52525b]">Positions </span>
          <span className="text-white font-mono">{deposits.length}</span>
        </div>
        <div>
          <span className="text-[#52525b]">Avg APY </span>
          <span className="text-emerald-500 font-mono">{avgApy.toFixed(2)}%</span>
        </div>
      </div>

      {deposits.length === 0 ? (
        <div className="py-16 text-center text-sm text-[#52525b]">
          No active positions. Deposit into a campaign to get started.
        </div>
      ) : (
        <div className="border border-[#27272a] rounded-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1fr_100px_80px_80px] gap-4 px-4 py-2.5 bg-[#18181b] text-[10px] text-[#52525b] uppercase tracking-wider border-b border-[#27272a]">
            <span>Campaign</span>
            <span className="text-right">Deposited</span>
            <span className="text-right">Tokens</span>
            <span className="text-right">APY</span>
          </div>

          {/* Rows */}
          {deposits.map((dep) => (
            <div
              key={dep.id}
              className="grid grid-cols-[1fr_100px_80px_80px] gap-4 items-center px-4 py-3 border-b border-[#27272a] last:border-b-0"
            >
              <div className="min-w-0">
                <p className="text-sm text-white truncate">{dep.campaignId}</p>
                <p className="text-[10px] text-[#3f3f46] mt-0.5">
                  {new Date(dep.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className="text-right text-xs font-mono text-white">
                {formatCurrency(dep.amount)}
              </span>
              <span className="text-right text-xs font-mono text-[#a1a1aa]">
                {dep.tokensReceived.toLocaleString()}
              </span>
              <span className="text-right text-xs font-mono text-emerald-500">
                {dep.apy}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
