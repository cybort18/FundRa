"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const guaranteesData = [
  {
    num: "I",
    headline: "NON-CUSTODIAL",
    manifesto: "We don't hold your money.",
    highlight: "Immutable smart contracts do.",
    stamp: "[EIP-4626 // VAULT_LOCKED]"
  },
  {
    num: "II",
    headline: "MILESTONE-LOCKED",
    manifesto: "Creators unlock funds only when",
    highlight: "backers vote yes on progress.",
    stamp: "[ESCROW_VERIFIED_OK]"
  },
  {
    num: "III",
    headline: "100% ON-CHAIN",
    manifesto: "No centralized servers.",
    highlight: "Publicly auditable forever.",
    stamp: "[ON-CHAIN // AUDIT_PASSED]"
  }
];

export function Guarantees() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="guarantees" className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">
      
      {/* Header Newspaper / Editorial Style */}
      <div className="w-full flex flex-col items-center mb-16 md:mb-20 text-center">
        <ScrollReveal>
          <span className="text-xs uppercase tracking-[0.35em] text-fundra-accent mb-3 block font-semibold">
            The Sovereign Covenant
          </span>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-fundra-text font-normal tracking-wide italic">
            The 3 Manifesto Guarantees
          </h2>
        </ScrollReveal>
      </div>

      {/* Editorial Grid Border Box */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 border-y border-white/10 bg-white/[0.005]">
        {guaranteesData.map((item, idx) => {
          const isHovered = hoveredIndex === idx;
          const isAnyHovered = hoveredIndex !== null;
          
          // Smooth focus fade classes
          const focusClass = isHovered
            ? "opacity-100 scale-[1.01]"
            : isAnyHovered
            ? "opacity-25 scale-[0.99] blur-[0.5px]"
            : "opacity-85";

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative overflow-hidden p-10 md:p-12 flex flex-col justify-between min-h-[340px] transition-all duration-500 ease-out border-b md:border-b-0 md:border-r border-white/5 last:border-b-0 last:border-r-0 ${focusClass}`}
            >
              
              {/* Top Section: Number & Headline */}
              <div>
                <div className="flex justify-between items-baseline mb-8">
                  <span className={`font-cormorant italic text-3xl font-light transition-colors duration-500 ${
                    isHovered ? "text-fundra-accent" : "text-zinc-600"
                  }`}>
                    {item.num}
                  </span>
                  
                  {/* Ledger Stamp (Watermark) */}
                  <span className={`font-mono text-[9px] tracking-wider transition-colors duration-500 ${
                    isHovered ? "text-fundra-accent/40" : "text-zinc-700"
                  }`}>
                    {item.stamp}
                  </span>
                </div>
                
                <h3 className="font-sans text-xs tracking-[0.25em] text-zinc-500 font-semibold mb-4">
                  {item.headline}
                </h3>
              </div>

              {/* Middle Section: Manifesto Typographic Sentence */}
              <div className="relative z-10 flex-grow flex items-center">
                <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed tracking-wide">
                  {item.manifesto}{" "}
                  <span className={`font-medium transition-colors duration-500 block sm:inline ${
                    isHovered ? "text-fundra-accent drop-shadow-[0_0_15px_rgba(56,189,248,0.15)]" : "text-white"
                  }`}>
                    {item.highlight}
                  </span>
                </p>
              </div>

              {/* Soft background glow on hovered card */}
              <div className={`absolute inset-0 bg-gradient-to-t from-fundra-accent/[0.015] to-transparent pointer-events-none transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`} />
              
            </div>
          );
        })}
      </div>

    </section>
  );
}
