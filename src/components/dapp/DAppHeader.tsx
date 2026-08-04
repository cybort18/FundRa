"use client";

import { useState } from "react";
import {
  Search,
  Fuel,
  ChevronDown,
  ArrowLeft,
  Wallet,
  LogOut,
  Plus,
} from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { WalletModal } from "@/components/ui/WalletModal";
import type { DAppTab, NetworkId } from "@/types/dapp";
import Link from "next/link";

interface DAppHeaderProps {
  activeTab: DAppTab;
  onTabChange: (tab: DAppTab) => void;
  onCreateCampaign: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const TABS: { id: DAppTab; label: string }[] = [
  { id: "explore", label: "Explore" },
  { id: "portfolio", label: "Portfolio" },
  { id: "governance", label: "Governance" },
];

const NETWORKS: { id: NetworkId; label: string; color: string }[] = [
  { id: "ethereum", label: "Ethereum", color: "#627eea" },
  { id: "base", label: "Base", color: "#0052ff" },
  { id: "arbitrum", label: "Arbitrum", color: "#28a0f0" },
  { id: "optimism", label: "Optimism", color: "#ff0420" },
];

export function DAppHeader({
  activeTab,
  onTabChange,
  onCreateCampaign,
  searchQuery,
  onSearchChange,
}: DAppHeaderProps) {
  const { address, isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkId>("ethereum");

  const currentNetwork = NETWORKS.find((n) => n.id === selectedNetwork)!;

  const shortenedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-fundra-bg/80 backdrop-blur-2xl">
        {/* Top Row */}
        <div className="flex items-center justify-between px-4 md:px-8 h-16">
          {/* Left: Back + Brand */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-fundra-muted hover:text-fundra-text transition-colors duration-200 group"
              aria-label="Back to Landing Page"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </Link>
            <span className="font-cormorant text-2xl font-semibold tracking-wide text-fundra-text">
              FUNDRA
            </span>
            <span className="hidden sm:inline text-[10px] font-mono text-fundra-accent/70 uppercase tracking-[0.2em] bg-fundra-accent/10 px-2 py-0.5 rounded-full border border-fundra-accent/20">
              Protocol
            </span>
          </div>

          {/* Center: Search (desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fundra-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search campaigns, tokens, creators..."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-fundra-text placeholder:text-fundra-muted/50 focus:outline-none focus:border-fundra-accent/40 focus:bg-white/[0.06] transition-all duration-300"
              />
            </div>
          </div>

          {/* Right: Network + Gas + Wallet */}
          <div className="flex items-center gap-3">
            {/* Network Selector */}
            <div className="relative">
              <button
                onClick={() => setIsNetworkOpen(!isNetworkOpen)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-fundra-text hover:bg-white/[0.08] transition-all cursor-pointer"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: currentNetwork.color }}
                />
                <span className="text-xs font-mono">{currentNetwork.label}</span>
                <ChevronDown className="w-3 h-3 text-fundra-muted" />
              </button>

              {isNetworkOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#0a0a1a] border border-white/[0.08] shadow-2xl overflow-hidden z-50">
                  {NETWORKS.map((net) => (
                    <button
                      key={net.id}
                      onClick={() => {
                        setSelectedNetwork(net.id);
                        setIsNetworkOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-white/[0.06] transition-colors cursor-pointer ${
                        selectedNetwork === net.id
                          ? "text-fundra-accent bg-fundra-accent/5"
                          : "text-fundra-muted"
                      }`}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: net.color }}
                      />
                      {net.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Simulated Gas Indicator */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03] text-fundra-muted">
              <Fuel className="w-3 h-3" />
              <span className="text-[11px] font-mono">12 gwei</span>
            </div>

            {/* Wallet Button */}
            {isConnected ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-fundra-accent/10 border border-fundra-accent/20 text-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-fundra-text">
                    {shortenedAddress}
                  </span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="p-2 rounded-lg bg-white/[0.04] hover:bg-red-500/10 text-fundra-muted hover:text-red-400 transition-all cursor-pointer"
                  aria-label="Disconnect wallet"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-fundra-accent text-fundra-bg text-sm font-semibold hover:bg-[#5bcffa] transition-all cursor-pointer active:scale-95"
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Connect</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Row: Tab Navigation + Create Button */}
        <div className="flex items-center justify-between px-4 md:px-8 h-12 border-t border-white/[0.04]">
          <nav className="flex items-center gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer rounded-lg ${
                  activeTab === tab.id
                    ? "text-fundra-accent"
                    : "text-fundra-muted hover:text-fundra-text"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-fundra-accent rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={onCreateCampaign}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-fundra-text hover:bg-white/[0.10] hover:border-fundra-accent/30 transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 text-fundra-accent" />
            <span className="hidden sm:inline">Create Campaign</span>
          </button>
        </div>
      </header>

      {/* Wallet Connection Modal */}
      <WalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={connectWallet}
        isConnecting={isConnecting}
        isConnected={isConnected}
      />
    </>
  );
}
