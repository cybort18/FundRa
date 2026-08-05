"use client";

import { useState, useCallback } from "react";
import { DAppHeader } from "@/components/dapp/DAppHeader";
import { CampaignFeed } from "@/components/dapp/CampaignFeed";
import { PortfolioDashboard } from "@/components/dapp/PortfolioDashboard";
import { GovernancePortal } from "@/components/dapp/GovernancePortal";
import { ProjectDetailModal } from "@/components/dapp/ProjectDetailModal";
import { CreateCampaignWizard } from "@/components/dapp/CreateCampaignWizard";
import type { DAppTab } from "@/types/dapp";
import type { DbCampaign } from "@/lib/db/engine";

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<DAppTab>("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<DbCampaign | null>(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <DAppHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCreateCampaign={() => setIsWizardOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="max-w-screen-xl mx-auto px-5 py-6" key={refreshKey}>
        {activeTab === "explore" && (
          <CampaignFeed
            searchQuery={searchQuery}
            onSelectCampaign={setSelectedCampaign}
          />
        )}
        {activeTab === "portfolio" && <PortfolioDashboard />}
        {activeTab === "governance" && <GovernancePortal />}
      </main>

      <ProjectDetailModal
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        onDataChange={triggerRefresh}
      />

      <CreateCampaignWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onCreated={() => {
          triggerRefresh();
          setActiveTab("explore");
        }}
      />
    </div>
  );
}
