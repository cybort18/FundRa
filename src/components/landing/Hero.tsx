"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Hero() {
  const router = useRouter();

  return (
    <div className="relative z-10 min-h-[calc(100vh-180px)] flex flex-col items-center justify-center px-4 w-full">
      
      {/* Title Reveal */}
      <ScrollReveal delay={300}>
        <h1 className="font-cormorant text-[4.5rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem] font-normal leading-[1.0] text-center tracking-wide text-fundra-text drop-shadow-sm mb-6 uppercase">
          FUNDRA
        </h1>
      </ScrollReveal>
      
      {/* Subtitle Reveal */}
      <ScrollReveal delay={500} className="w-full flex justify-center">
        <p className="text-lg md:text-xl text-fundra-muted font-light tracking-wide text-center max-w-3xl leading-relaxed">
          Sovereign Crowdfunding Infrastructure. Yield-Generating ERC-4626 Vaults. <br className="hidden md:block"/>
          Milestone-Based Governance for the Decentralized Creator Economy.
        </p>
      </ScrollReveal>

      {/* CTA Buttons Reveal */}
      <ScrollReveal delay={700}>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <Button 
            onClick={() => document.getElementById("reality-check")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full bg-fundra-accent text-fundra-bg hover:bg-[#00f0ff] font-semibold px-8 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 active:scale-95 text-xs tracking-wider uppercase font-sans py-6"
          >
            Explore Protocol
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push("/app")}
            className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white backdrop-blur-md px-8 cursor-pointer active:scale-95 text-xs tracking-wider uppercase font-sans py-6"
          >
            Launch Project
          </Button>
        </div>
      </ScrollReveal>

    </div>
  );
}

