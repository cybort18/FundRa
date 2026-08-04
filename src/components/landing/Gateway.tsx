"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useWallet } from "@/context/WalletContext";
import { useState } from "react";
import { WalletModal } from "@/components/ui/WalletModal";

export function Gateway() {
  const router = useRouter();
  const { isConnected, connectWallet, isConnecting } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLaunchClick = () => {
    if (!isConnected) {
      setIsModalOpen(true);
    } else {
      router.push("/app");
    }
  };

  return (
    <>
      <section 
        id="gateway" 
        className="relative z-10 w-full min-h-[70vh] flex flex-col items-center justify-center px-6 md:px-12 py-24 md:py-36 text-center overflow-hidden"
      >
        {/* Subtle Ambient Radial Glow for the Gateway */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[900px] h-[400px] rounded-full bg-gradient-to-r from-indigo-600/20 via-sky-500/15 to-teal-500/10 blur-[130px] pointer-events-none mix-blend-screen" />

        {/* Poetic Giant Headline */}
        <ScrollReveal delay={150}>
          <h2 className="font-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-normal leading-[1.05] tracking-tight text-fundra-text max-w-5xl mx-auto italic drop-shadow-md">
            Enter the Sovereign Era of Venture Funding.
          </h2>
        </ScrollReveal>

        {/* Minimal Sub-caption */}
        <ScrollReveal delay={300}>
          <p className="mt-8 text-base md:text-xl text-fundra-muted font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Non-custodial yield vaults, milestone governance, and automated liquidity—all in one unified protocol interface.
          </p>
        </ScrollReveal>

        {/* Softly Glowing CTA Button */}
        <ScrollReveal delay={450}>
          <div className="mt-12 flex flex-col items-center gap-4">
            <button
              onClick={handleLaunchClick}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-sm tracking-wider uppercase shadow-[0_0_40px_rgba(56,189,248,0.25)] hover:shadow-[0_0_60px_rgba(56,189,248,0.45)] hover:scale-105 active:scale-95 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Internal shine highlight */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              
              <span className="relative z-10">Enter Protocol</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <span className="text-[11px] font-mono text-zinc-500 tracking-widest uppercase">
              {isConnected ? "Wallet Connected • Ready to Enter" : "No Account Required • Connect Web3 Wallet"}
            </span>
          </div>
        </ScrollReveal>
      </section>

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
