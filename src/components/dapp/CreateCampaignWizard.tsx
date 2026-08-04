"use client";

import { useState } from "react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Globe,
  GitFork,
  Rocket,
  Plus,
  Trash2,
} from "lucide-react";
import type { CampaignCategory, CampaignDraft, WizardMilestone } from "@/types/dapp";

interface CreateCampaignWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES: CampaignCategory[] = ["DeFi", "Infrastructure", "AI", "Gaming", "Public Goods"];

const INITIAL_DRAFT: CampaignDraft = {
  title: "",
  description: "",
  category: "DeFi",
  socialLinks: {},
  milestones: [
    { title: "", description: "", payoutPercentage: 50 },
    { title: "", description: "", payoutPercentage: 50 },
  ],
  tokenTicker: "",
  tokenName: "",
  initialPrice: 0.01,
  reserveRatio: 0.33,
  targetRaise: 100000,
};

export function CreateCampaignWizard({ isOpen, onClose }: CreateCampaignWizardProps) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<CampaignDraft>({ ...INITIAL_DRAFT });

  if (!isOpen) return null;

  const steps = [
    { title: "Project Info", subtitle: "Basic project metadata" },
    { title: "Milestones", subtitle: "Define your roadmap" },
    { title: "Token Config", subtitle: "Bonding curve setup" },
    { title: "Review", subtitle: "Confirm & deploy" },
  ];

  const canProceed = () => {
    if (step === 0) return draft.title.length > 0 && draft.description.length > 0;
    if (step === 1) return draft.milestones.length >= 2 && draft.milestones.every((m) => m.title.length > 0);
    if (step === 2) return draft.tokenTicker.length > 0 && draft.tokenName.length > 0;
    return true;
  };

  const totalPayout = draft.milestones.reduce((sum, m) => sum + m.payoutPercentage, 0);

  const handleDeploy = () => {
    alert(
      `Simulated ERC-1167 Minimal Proxy Clone Deployment:\n\n` +
      `Campaign: ${draft.title}\n` +
      `Category: ${draft.category}\n` +
      `Milestones: ${draft.milestones.length}\n` +
      `Token: $${draft.tokenTicker} (${draft.tokenName})\n` +
      `Initial Price: $${draft.initialPrice}\n` +
      `Reserve Ratio: ${(draft.reserveRatio * 100).toFixed(0)}%\n` +
      `Target Raise: $${draft.targetRaise.toLocaleString()}\n\n` +
      `Transaction simulated successfully! ✓`
    );
    onClose();
    setStep(0);
    setDraft({ ...INITIAL_DRAFT });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-x-auto md:inset-y-8 md:max-w-2xl md:mx-auto z-[90] bg-[#060618] border border-white/[0.06] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div>
            <h2 className="text-base font-semibold text-fundra-text">Create New Campaign</h2>
            <p className="text-xs text-fundra-muted mt-0.5">
              Step {step + 1} of {steps.length}: {steps[step].subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/[0.06] text-fundra-muted hover:text-fundra-text transition-all cursor-pointer"
            aria-label="Close wizard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-white/[0.04]">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono shrink-0 transition-all ${
                  i < step
                    ? "bg-fundra-accent text-fundra-bg"
                    : i === step
                    ? "bg-fundra-accent/20 text-fundra-accent border border-fundra-accent/40"
                    : "bg-white/[0.05] text-fundra-muted"
                }`}
              >
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-px transition-all ${
                    i < step ? "bg-fundra-accent/40" : "bg-white/[0.06]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 0 && <StepProjectInfo draft={draft} setDraft={setDraft} />}
          {step === 1 && <StepMilestones draft={draft} setDraft={setDraft} totalPayout={totalPayout} />}
          {step === 2 && <StepTokenConfig draft={draft} setDraft={setDraft} />}
          {step === 3 && <StepReview draft={draft} totalPayout={totalPayout} />}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.06]">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-fundra-muted hover:text-fundra-text disabled:opacity-20 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-fundra-accent text-fundra-bg text-sm font-semibold hover:bg-[#5bcffa] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleDeploy}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-fundra-accent to-blue-600 text-white text-sm font-semibold hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all cursor-pointer active:scale-95"
            >
              <Rocket className="w-4 h-4" />
              Deploy Campaign
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ── Step 1: Project Info ──────────────────────────────────

function StepProjectInfo({
  draft,
  setDraft,
}: {
  draft: CampaignDraft;
  setDraft: (d: CampaignDraft) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs text-fundra-muted mb-1.5">Campaign Title *</label>
        <input
          type="text"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          placeholder="e.g., Aura AI — Decentralized Compute Network"
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-fundra-text placeholder:text-fundra-muted/30 focus:outline-none focus:border-fundra-accent/40 transition-all"
        />
      </div>

      <div>
        <label className="block text-xs text-fundra-muted mb-1.5">Description *</label>
        <textarea
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          placeholder="A clear, concise description of your project..."
          rows={4}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-fundra-text placeholder:text-fundra-muted/30 focus:outline-none focus:border-fundra-accent/40 transition-all resize-none"
        />
      </div>

      <div>
        <label className="block text-xs text-fundra-muted mb-1.5">Category *</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setDraft({ ...draft, category: cat })}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                draft.category === cat
                  ? "bg-fundra-accent/15 text-fundra-accent border-fundra-accent/30"
                  : "bg-white/[0.03] text-fundra-muted border-white/[0.06] hover:bg-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs text-fundra-muted mb-1.5">Target Raise (USD)</label>
        <input
          type="number"
          value={draft.targetRaise}
          onChange={(e) => setDraft({ ...draft, targetRaise: parseFloat(e.target.value) || 0 })}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-fundra-text focus:outline-none focus:border-fundra-accent/40 transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-fundra-muted mb-1.5">
            <Globe className="w-3 h-3 inline mr-1" />
            Website
          </label>
          <input
            type="url"
            value={draft.socialLinks.website || ""}
            onChange={(e) => setDraft({ ...draft, socialLinks: { ...draft.socialLinks, website: e.target.value } })}
            placeholder="https://..."
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-fundra-text placeholder:text-fundra-muted/30 focus:outline-none focus:border-fundra-accent/40 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-fundra-muted mb-1.5">
            <GitFork className="w-3 h-3 inline mr-1" />
            GitHub
          </label>
          <input
            type="url"
            value={draft.socialLinks.github || ""}
            onChange={(e) => setDraft({ ...draft, socialLinks: { ...draft.socialLinks, github: e.target.value } })}
            placeholder="https://github.com/..."
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-fundra-text placeholder:text-fundra-muted/30 focus:outline-none focus:border-fundra-accent/40 transition-all"
          />
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Milestones ────────────────────────────────────

function StepMilestones({
  draft,
  setDraft,
  totalPayout,
}: {
  draft: CampaignDraft;
  setDraft: (d: CampaignDraft) => void;
  totalPayout: number;
}) {
  const addMilestone = () => {
    setDraft({
      ...draft,
      milestones: [...draft.milestones, { title: "", description: "", payoutPercentage: 0 }],
    });
  };

  const removeMilestone = (index: number) => {
    if (draft.milestones.length <= 2) return;
    setDraft({
      ...draft,
      milestones: draft.milestones.filter((_, i) => i !== index),
    });
  };

  const updateMilestone = (index: number, field: keyof WizardMilestone, value: string | number) => {
    const updated = [...draft.milestones];
    updated[index] = { ...updated[index], [field]: value };
    setDraft({ ...draft, milestones: updated });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-fundra-muted">
          Define at least 2 milestones. Total payout must equal 100%.
        </p>
        <span
          className={`text-xs font-mono ${
            totalPayout === 100 ? "text-emerald-400" : "text-amber-400"
          }`}
        >
          Total: {totalPayout}%
        </span>
      </div>

      <div className="space-y-3">
        {draft.milestones.map((ms, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-fundra-accent">Milestone #{idx + 1}</span>
              {draft.milestones.length > 2 && (
                <button
                  onClick={() => removeMilestone(idx)}
                  className="p-1 rounded hover:bg-red-500/10 text-fundra-muted hover:text-red-400 transition-all cursor-pointer"
                  aria-label={`Remove milestone ${idx + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <input
              type="text"
              value={ms.title}
              onChange={(e) => updateMilestone(idx, "title", e.target.value)}
              placeholder="Milestone title..."
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-fundra-text placeholder:text-fundra-muted/30 focus:outline-none focus:border-fundra-accent/40 transition-all"
            />
            <textarea
              value={ms.description}
              onChange={(e) => updateMilestone(idx, "description", e.target.value)}
              placeholder="Description of deliverables..."
              rows={2}
              className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-fundra-text placeholder:text-fundra-muted/30 focus:outline-none focus:border-fundra-accent/40 transition-all resize-none"
            />
            <div className="flex items-center gap-3">
              <label className="text-xs text-fundra-muted whitespace-nowrap">Payout %:</label>
              <input
                type="number"
                min={0}
                max={100}
                value={ms.payoutPercentage}
                onChange={(e) => updateMilestone(idx, "payoutPercentage", parseInt(e.target.value) || 0)}
                className="w-20 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-1.5 text-sm font-mono text-fundra-text focus:outline-none focus:border-fundra-accent/40 transition-all"
              />
              <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-fundra-accent/50 transition-all"
                  style={{ width: `${ms.payoutPercentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addMilestone}
        className="flex items-center gap-2 w-full justify-center py-3 rounded-xl border border-dashed border-white/[0.10] text-xs text-fundra-muted hover:text-fundra-text hover:border-fundra-accent/30 transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        Add Milestone
      </button>
    </div>
  );
}

// ── Step 3: Token Config ──────────────────────────────────

function StepTokenConfig({
  draft,
  setDraft,
}: {
  draft: CampaignDraft;
  setDraft: (d: CampaignDraft) => void;
}) {
  return (
    <div className="space-y-5">
      <p className="text-xs text-fundra-muted leading-relaxed">
        Configure your campaign&apos;s ERC-20 utility token. Tokens are minted via a bonding curve when backers contribute.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-fundra-muted mb-1.5">Token Name *</label>
          <input
            type="text"
            value={draft.tokenName}
            onChange={(e) => setDraft({ ...draft, tokenName: e.target.value })}
            placeholder="e.g., Aura Compute Token"
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-fundra-text placeholder:text-fundra-muted/30 focus:outline-none focus:border-fundra-accent/40 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-fundra-muted mb-1.5">Token Ticker *</label>
          <input
            type="text"
            value={draft.tokenTicker}
            onChange={(e) => setDraft({ ...draft, tokenTicker: e.target.value.toUpperCase() })}
            placeholder="e.g., AURA"
            maxLength={6}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-mono text-fundra-text placeholder:text-fundra-muted/30 focus:outline-none focus:border-fundra-accent/40 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-fundra-muted mb-1.5">Initial Price (USD)</label>
          <input
            type="number"
            step="0.001"
            min="0.001"
            value={draft.initialPrice}
            onChange={(e) => setDraft({ ...draft, initialPrice: parseFloat(e.target.value) || 0.01 })}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-mono text-fundra-text focus:outline-none focus:border-fundra-accent/40 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-fundra-muted mb-1.5">Reserve Ratio</label>
          <input
            type="number"
            step="0.01"
            min="0.1"
            max="0.9"
            value={draft.reserveRatio}
            onChange={(e) => setDraft({ ...draft, reserveRatio: parseFloat(e.target.value) || 0.33 })}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-mono text-fundra-text focus:outline-none focus:border-fundra-accent/40 transition-all"
          />
          <p className="text-[10px] text-fundra-muted mt-1">Higher = more price stability (0.1–0.9)</p>
        </div>
      </div>

      {/* Preview */}
      <div className="p-4 rounded-xl bg-fundra-accent/5 border border-fundra-accent/15">
        <h4 className="text-xs font-semibold text-fundra-text mb-2">Token Preview</h4>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-fundra-accent/20 flex items-center justify-center">
            <span className="text-sm font-mono font-bold text-fundra-accent">
              {draft.tokenTicker.slice(0, 3) || "???"}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-fundra-text">
              {draft.tokenName || "Token Name"}
            </p>
            <p className="text-xs font-mono text-fundra-muted">
              ${draft.tokenTicker || "TICK"} • ${draft.initialPrice.toFixed(3)} initial • {(draft.reserveRatio * 100).toFixed(0)}% reserve
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 4: Review ────────────────────────────────────────

function StepReview({
  draft,
  totalPayout,
}: {
  draft: CampaignDraft;
  totalPayout: number;
}) {
  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <h4 className="text-xs text-fundra-muted uppercase tracking-wider mb-2">Campaign</h4>
        <p className="text-base font-semibold text-fundra-text">{draft.title}</p>
        <p className="text-xs text-fundra-muted mt-1">{draft.description}</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-fundra-accent/10 text-fundra-accent border border-fundra-accent/20">
            {draft.category}
          </span>
          <span className="text-[10px] font-mono text-fundra-muted">
            Target: ${draft.targetRaise.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <h4 className="text-xs text-fundra-muted uppercase tracking-wider mb-2">
          Milestones ({draft.milestones.length})
        </h4>
        {draft.milestones.map((ms, idx) => (
          <div key={idx} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
            <span className="text-xs text-fundra-text">
              #{idx + 1} {ms.title}
            </span>
            <span className="text-xs font-mono text-fundra-accent">{ms.payoutPercentage}%</span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-2 mt-1 border-t border-white/[0.08]">
          <span className="text-xs font-semibold text-fundra-text">Total</span>
          <span
            className={`text-xs font-mono font-bold ${
              totalPayout === 100 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {totalPayout}%
          </span>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <h4 className="text-xs text-fundra-muted uppercase tracking-wider mb-2">Bonding Curve Token</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-fundra-muted">Name:</span>{" "}
            <span className="text-fundra-text font-medium">{draft.tokenName}</span>
          </div>
          <div>
            <span className="text-fundra-muted">Ticker:</span>{" "}
            <span className="text-fundra-accent font-mono">${draft.tokenTicker}</span>
          </div>
          <div>
            <span className="text-fundra-muted">Initial Price:</span>{" "}
            <span className="text-fundra-text font-mono">${draft.initialPrice.toFixed(3)}</span>
          </div>
          <div>
            <span className="text-fundra-muted">Reserve Ratio:</span>{" "}
            <span className="text-fundra-text font-mono">{(draft.reserveRatio * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
        <p className="text-xs text-emerald-400 leading-relaxed">
          ✓ Deploying via ERC-1167 Minimal Proxy Clone — estimated gas cost reduction: ~90%.
          Your campaign will be live and discoverable immediately after deployment.
        </p>
      </div>
    </div>
  );
}
