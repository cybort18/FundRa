"use client";

import { useState } from "react";
import { ArrowLeft, Wallet, LogOut, Plus, Search } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { WalletModal } from "@/components/ui/WalletModal";
import type { DAppTab } from "@/types/dapp";
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

export function DAppHeader({
  activeTab,
  onTabChange,
  onCreateCampaign,
  searchQuery,
  onSearchChange,
}: DAppHeaderProps) {
  const { address, isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const shortenedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#09090b]/95 backdrop-blur-md border-b border-[#27272a]">
        <div className="flex items-center justify-between px-5 h-14 max-w-screen-xl mx-auto">
          {/* Left: Back + Brand */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-[#a1a1aa] hover:text-white transition-colors"
              aria-label="Back to Landing Page"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-sm font-semibold tracking-wide text-white">
              FundRa
            </span>

            {/* Tabs */}
            <nav className="hidden sm:flex items-center gap-1 ml-6">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? "text-white bg-[#27272a]"
                      : "text-[#a1a1aa] hover:text-white hover:bg-[#18181b]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right: Search + Create + Wallet */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#52525b]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search..."
                className="w-48 bg-[#18181b] border border-[#27272a] rounded-md pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#3f3f46] transition-colors"
              />
            </div>

            {/* Create */}
            <button
              onClick={onCreateCampaign}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-xs text-[#a1a1aa] hover:text-white hover:border-[#3f3f46] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Create</span>
            </button>

            {/* Wallet */}
            {isConnected ? (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#18181b] border border-[#27272a] text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-[#a1a1aa]">{shortenedAddress}</span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="p-1.5 rounded-md hover:bg-[#18181b] text-[#52525b] hover:text-[#a1a1aa] transition-colors cursor-pointer"
                  aria-label="Disconnect wallet"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-[#09090b] text-xs font-medium hover:bg-[#e4e4e7] transition-colors cursor-pointer"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Connect</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Tabs */}
        <nav className="sm:hidden flex items-center gap-1 px-5 pb-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "text-white bg-[#27272a]"
                  : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

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
