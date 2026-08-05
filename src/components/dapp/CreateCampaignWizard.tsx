"use client";

import { useState } from "react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  Trash2,
} from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import type { CampaignCategory } from "@/types/dapp";

interface CreateCampaignWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const CATEGORIES: CampaignCategory[] = ["DeFi", "Infrastructure", "AI", "Gaming", "Public Goods"];

interface MilestoneDraft {
  title: string;
  description: string;
  payoutPercentage: number;
}

interface FormState {
  title: string;
  description: string;
  category: CampaignCategory;
  targetRaise: number;
  milestones: MilestoneDraft[];
  tokenTicker: string;
  tokenName: string;
  initialPrice: number;
  reserveRatio: number;
}

const INITIAL: FormState = {
  title: "",
  description: "",
  category: "DeFi",
  targetRaise: 100000,
  milestones: [
    { title: "", description: "", payoutPercentage: 50 },
    { title: "", description: "", payoutPercentage: 50 },
  ],
  tokenTicker: "",
  tokenName: "",
  initialPrice: 0.01,
  reserveRatio: 0.33,
};

export function CreateCampaignWizard({ isOpen, onClose, onCreated }: CreateCampaignWizardProps) {
  const { address } = useWallet();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({ ...INITIAL });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const steps = ["Project", "Milestones", "Token", "Review"];
  const totalPayout = form.milestones.reduce((s, m) => s + m.payoutPercentage, 0);

  const canNext = () => {
    if (step === 0) return form.title.length >= 3 && form.description.length >= 10;
    if (step === 1) return form.milestones.length >= 2 && form.milestones.every((m) => m.title) && totalPayout === 100;
    if (step === 2) return form.tokenTicker.length >= 2 && form.tokenName.length >= 2;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          creator: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Anonymous",
          creatorAddress: address || "0x0000000000000000000000000000000000000000",
          description: form.description,
          category: form.category,
          network: "ethereum",
          tags: [],
          targetRaise: form.targetRaise,
          milestones: form.milestones,
          bondingCurve: {
            tokenName: form.tokenName,
            tokenTicker: form.tokenTicker,
            initialPrice: form.initialPrice,
            reserveRatio: form.reserveRatio,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to create campaign");
        return;
      }

      // Success
      onCreated?.();
      onClose();
      setStep(0);
      setForm({ ...INITIAL });
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-4 md:inset-y-12 md:inset-x-auto md:max-w-lg md:mx-auto z-[90] bg-[#09090b] border border-[#27272a] rounded-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#27272a]">
          <div>
            <h2 className="text-sm font-medium text-white">Create Campaign</h2>
            <p className="text-[10px] text-[#52525b] mt-0.5">
              Step {step + 1}/{steps.length} — {steps[step]}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[#18181b] text-[#52525b] hover:text-white transition-colors cursor-pointer" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-1 px-5 py-3 border-b border-[#18181b]">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-1 flex-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono ${
                i < step ? "bg-white text-[#09090b]" : i === step ? "bg-[#27272a] text-white" : "bg-[#18181b] text-[#3f3f46]"
              }`}>
                {i < step ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-[#52525b]" : "bg-[#18181b]"}`} />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {step === 0 && (
            <>
              <Field label="Title" required>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Campaign name..." className="input-field" />
              </Field>
              <Field label="Description" required>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What are you building?" rows={3} className="input-field resize-none" />
              </Field>
              <Field label="Category">
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((c) => (
                    <button key={c} onClick={() => setForm({ ...form, category: c })} className={`px-3 py-1 rounded-md text-xs cursor-pointer transition-colors ${form.category === c ? "bg-[#27272a] text-white" : "bg-[#18181b] text-[#52525b] hover:text-[#a1a1aa]"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Target Raise (USD)">
                <input type="number" value={form.targetRaise} onChange={(e) => setForm({ ...form, targetRaise: parseFloat(e.target.value) || 0 })} className="input-field" />
              </Field>
            </>
          )}

          {step === 1 && (
            <>
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#52525b]">Min 2 milestones. Total must equal 100%.</p>
                <span className={`text-xs font-mono ${totalPayout === 100 ? "text-emerald-500" : "text-amber-500"}`}>{totalPayout}%</span>
              </div>
              {form.milestones.map((ms, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#18181b] border border-[#27272a] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#52525b] font-mono">#{idx + 1}</span>
                    {form.milestones.length > 2 && (
                      <button onClick={() => setForm({ ...form, milestones: form.milestones.filter((_, i) => i !== idx) })} className="p-1 rounded hover:bg-[#27272a] text-[#3f3f46] hover:text-red-400 transition-colors cursor-pointer" aria-label="Remove">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <input value={ms.title} onChange={(e) => { const m = [...form.milestones]; m[idx] = { ...m[idx], title: e.target.value }; setForm({ ...form, milestones: m }); }} placeholder="Title" className="input-field text-xs" />
                  <textarea value={ms.description} onChange={(e) => { const m = [...form.milestones]; m[idx] = { ...m[idx], description: e.target.value }; setForm({ ...form, milestones: m }); }} placeholder="Deliverables..." rows={2} className="input-field text-xs resize-none" />
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#52525b]">Payout %</span>
                    <input type="number" min={0} max={100} value={ms.payoutPercentage} onChange={(e) => { const m = [...form.milestones]; m[idx] = { ...m[idx], payoutPercentage: parseInt(e.target.value) || 0 }; setForm({ ...form, milestones: m }); }} className="w-16 input-field text-xs font-mono" />
                  </div>
                </div>
              ))}
              <button onClick={() => setForm({ ...form, milestones: [...form.milestones, { title: "", description: "", payoutPercentage: 0 }] })} className="w-full py-2 rounded-md border border-dashed border-[#27272a] text-xs text-[#52525b] hover:text-[#a1a1aa] hover:border-[#3f3f46] transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                <Plus className="w-3 h-3" /> Add milestone
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Token Name">
                  <input value={form.tokenName} onChange={(e) => setForm({ ...form, tokenName: e.target.value })} placeholder="My Token" className="input-field" />
                </Field>
                <Field label="Ticker">
                  <input value={form.tokenTicker} onChange={(e) => setForm({ ...form, tokenTicker: e.target.value.toUpperCase() })} placeholder="MTK" maxLength={6} className="input-field font-mono" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Initial Price ($)">
                  <input type="number" step="0.001" value={form.initialPrice} onChange={(e) => setForm({ ...form, initialPrice: parseFloat(e.target.value) || 0.01 })} className="input-field font-mono" />
                </Field>
                <Field label="Reserve Ratio (0.1–0.9)">
                  <input type="number" step="0.01" min={0.1} max={0.9} value={form.reserveRatio} onChange={(e) => setForm({ ...form, reserveRatio: parseFloat(e.target.value) || 0.33 })} className="input-field font-mono" />
                </Field>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-3 text-xs">
                <Row label="Title" value={form.title} />
                <Row label="Category" value={form.category} />
                <Row label="Target" value={`$${form.targetRaise.toLocaleString()}`} />
                <Row label="Milestones" value={`${form.milestones.length} (${totalPayout}%)`} />
                <Row label="Token" value={`$${form.tokenTicker} — ${form.tokenName}`} />
                <Row label="Initial Price" value={`$${form.initialPrice}`} />
                <Row label="Reserve Ratio" value={`${(form.reserveRatio * 100).toFixed(0)}%`} />
              </div>

              {error && (
                <p className="text-xs text-red-400 bg-red-500/5 border border-red-500/10 rounded-md px-3 py-2">
                  {error}
                </p>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-[#27272a]">
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="text-xs text-[#52525b] hover:text-white disabled:opacity-20 transition-colors cursor-pointer flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Back
          </button>

          {step < 3 ? (
            <button onClick={() => setStep((s) => s + 1)} disabled={!canNext()} className="flex items-center gap-1 px-4 py-2 rounded-md bg-white text-[#09090b] text-xs font-medium hover:bg-[#e4e4e7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer">
              Next <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} className="px-4 py-2 rounded-md bg-white text-[#09090b] text-xs font-medium hover:bg-[#e4e4e7] disabled:opacity-50 transition-colors cursor-pointer">
              {submitting ? "Creating..." : "Create Campaign"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] text-[#52525b] uppercase tracking-wider mb-1.5">
        {label}{required && " *"}
      </label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-[#18181b]">
      <span className="text-[#52525b]">{label}</span>
      <span className="text-white font-mono">{value}</span>
    </div>
  );
}
