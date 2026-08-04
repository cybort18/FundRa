"use client";

import { useState } from "react";
import { DAppHeader } from "@/components/dapp/DAppHeader";
import { CampaignFeed } from "@/components/dapp/CampaignFeed";
import { PortfolioDashboard } from "@/components/dapp/PortfolioDashboard";
import { GovernancePortal } from "@/components/dapp/GovernancePortal";
import { ProjectDetailModal } from "@/components/dapp/ProjectDetailModal";
import { CreateCampaignWizard } from "@/components/dapp/CreateCampaignWizard";
import type { DAppTab, Campaign } from "@/types/dapp";

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<DAppTab>("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-fundra-bg">
      {/* Background Gradient Orbs — Subtle for DApp */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-5%] w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] opacity-10 blur-[160px] mix-blend-screen animate-float-slow" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[500px] rounded-full bg-gradient-to-bl from-[#0d9488] to-[#06b6d4] opacity-8 blur-[140px] mix-blend-screen animate-float-slower" />
      </div>

      {/* Grain Texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 mix-blend-overlay opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.99' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* DApp Header */}
      <DAppHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCreateCampaign={() => setIsWizardOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        {activeTab === "explore" && (
          <CampaignFeed
            searchQuery={searchQuery}
            onSelectCampaign={(c) => setSelectedCampaign(c)}
          />
        )}
        {activeTab === "portfolio" && <PortfolioDashboard />}
        {activeTab === "governance" && <GovernancePortal />}
      </main>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
      />

      {/* Create Campaign Wizard */}
      <CreateCampaignWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />
    </div>
  );
}
