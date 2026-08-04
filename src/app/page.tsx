"use client";

import { ArrowDown } from "lucide-react";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Guarantees } from "@/components/landing/Guarantees";
import { About } from "@/components/landing/About";
import { RealityCheck } from "@/components/landing/RealityCheck";
import { Pillars } from "@/components/landing/Pillars";
import { Gateway } from "@/components/landing/Gateway";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col font-sans overflow-hidden">
      
      {/* --- VIBRANT AURA GRAINY GRADIENT BACKGROUND --- */}
      {/* Base deep background */}
      <div className="absolute inset-0 bg-fundra-bg" />
      
      {/* Dynamic Glowing Mesh Orbs (Refined Sapphire-Teal-Emerald Vibe + Slow Floating Animation) */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] max-w-[800px] rounded-full bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] opacity-30 blur-[140px] pointer-events-none mix-blend-screen animate-float-slow" />
      <div className="absolute bottom-[-10%] left-[10%] w-[60vw] h-[60vw] max-w-[700px] rounded-full bg-gradient-to-br from-[#0d9488] to-[#06b6d4] opacity-20 blur-[110px] pointer-events-none mix-blend-screen animate-float-slower" />
      <div className="absolute top-[20%] right-[-10%] w-[65vw] h-[65vw] max-w-[800px] rounded-full bg-gradient-to-bl from-[#6366f1] to-[#14b8a6] opacity-25 blur-[140px] pointer-events-none mix-blend-screen animate-float-slowest" />
      <div className="absolute bottom-[10%] right-[30%] w-[40vw] h-[40vw] max-w-[500px] rounded-full bg-gradient-to-tr from-[#a855f7] to-[#ec4899] opacity-12 blur-[100px] pointer-events-none mix-blend-screen animate-float-slow" />

      {/* Ultra-fine, velvety grain texture overlay (Matching reference image - increased visibility) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay opacity-[0.22]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.99' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* --- HEADER NAV --- */}
      <Header />

      {/* --- HERO CONTENT --- */}
      <Hero />

      {/* --- SCROLL INDICATOR --- */}
      <ScrollIndicator />

      {/* --- GUARANTEES MANIFESTO SECTION --- */}
      <Guarantees />

      {/* --- ABOUT SECTION --- */}
      <About />

      {/* --- REALITY CHECK SECTION --- */}
      <RealityCheck />

      {/* --- PILLARS SECTION --- */}
      <Pillars />

      {/* --- GATEWAY (FINAL CTA) SECTION --- */}
      <Gateway />

      {/* --- FOOTER --- */}
      <Footer />

    </main>
  );
}

/* Client component for scroll indicator with onClick handler */
function ScrollIndicator() {
  return (
    <div
      onClick={() => document.getElementById('guarantees')?.scrollIntoView({ behavior: 'smooth' })}
      className="relative z-10 flex flex-col items-center pb-24 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label="Scroll to Guarantees section"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          document.getElementById('guarantees')?.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    >
      <span className="text-xs uppercase tracking-[0.3em] mb-4 text-fundra-muted">Scroll Down</span>
      <ArrowDown className="w-4 h-4 text-fundra-muted animate-bounce" />
    </div>
  );
}
