import { ArrowDown, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030014] text-[#f8fafc] flex flex-col font-sans selection:bg-[#06b6d4]/30">
      
      {/* --- VIBRANT AURA GRAINY GRADIENT BACKGROUND --- */}
      {/* Base deep background */}
      <div className="absolute inset-0 bg-[#030014]" />
      
      {/* Dynamic Glowing Mesh Orbs (Refined Sapphire-Teal-Emerald Vibe) */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] max-w-[800px] rounded-full bg-gradient-to-tr from-[#4f46e5] to-[#3b82f6] opacity-30 blur-[140px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] left-[10%] w-[60vw] h-[60vw] max-w-[700px] rounded-full bg-gradient-to-br from-[#0d9488] to-[#06b6d4] opacity-20 blur-[110px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-[20%] right-[-10%] w-[65vw] h-[65vw] max-w-[800px] rounded-full bg-gradient-to-bl from-[#6366f1] to-[#14b8a6] opacity-25 blur-[140px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] right-[30%] w-[40vw] h-[40vw] max-w-[500px] rounded-full bg-gradient-to-tr from-[#a855f7] to-[#ec4899] opacity-12 blur-[100px] pointer-events-none mix-blend-screen" />

      {/* High-contrast coarse grain texture overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay opacity-[0.38]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* --- HEADER --- */}
      <header className="relative z-20 flex justify-between items-start p-8 md:px-12 w-full">
        {/* Left: Empty for balance or could hold social links later */}
        <div className="hidden md:flex w-32" />

        {/* Center: Abstract Logo (Original interpretation of the flower/geo shape) */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center w-12 h-12 text-[#e2e8f0] hover:text-white transition-colors duration-500 cursor-pointer group">
            {/* Minimalist geometric shapes for logo */}
            <div className="absolute rotate-45 border border-current w-6 h-6 group-hover:rotate-90 transition-transform duration-700 ease-in-out" />
            <div className="absolute border border-current w-6 h-6 group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
            <Sparkles className="w-3 h-3 absolute z-10 text-white" />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6 text-sm font-medium tracking-wider w-32 justify-end">
          <button className="hidden md:block hover:text-white transition-colors uppercase">
            Connect Wallet
          </button>
          <button className="flex items-center gap-2 hover:text-white transition-colors uppercase group">
            Menu
            <Menu className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </header>

      {/* --- HERO CONTENT --- */}
      <div className="relative z-10 min-h-[calc(100vh-180px)] flex flex-col items-center justify-center px-4 w-full">
        <h1 
          className="font-cormorant text-[4.5rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem] font-normal leading-[1.0] text-center tracking-wide text-[#dbeafe] drop-shadow-sm mb-6 uppercase"
        >
          FUNDRA
        </h1>
        
        <p className="text-lg md:text-xl text-[#94a3b8] font-light tracking-wide text-center max-w-3xl leading-relaxed">
          Sovereign Crowdfunding Infrastructure. Yield-Generating ERC-4626 Vaults. <br className="hidden md:block"/>
          Milestone-Based Governance for the Decentralized Creator Economy.
        </p>

        {/* Subtle CTA buttons for the hero (optional, keeps it minimal) */}
        <div className="mt-12 flex gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <Button variant="outline" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white backdrop-blur-md px-8">
            Launch Project
          </Button>
        </div>
      </div>

      {/* --- SCROLL INDICATOR --- */}
      <div className="relative z-10 flex flex-col items-center pb-24 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <span className="text-xs uppercase tracking-[0.3em] mb-4 text-[#94a3b8]">Scroll Down</span>
        <ArrowDown className="w-4 h-4 text-[#94a3b8] animate-bounce" />
      </div>

      {/* --- ABOUT SECTION --- */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-48 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center border-t border-white/5">
        <div className="md:col-span-7">
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] font-normal leading-[1.1] text-[#f8fafc]">
            Engineered for <br/>
            Fully On-Chain <br/>
            Trust
          </h2>
        </div>
        <div className="md:col-span-5 border-l border-white/10 pl-6 md:pl-8 py-2">
          <p className="text-[#94a3b8] text-base md:text-lg font-light leading-relaxed">
            FundRa operates purely on-chain, utilizing ERC-1167 minimal proxy clones to cut campaign deployment gas fees by 90% and ERC-4626 vaults to generate Aave-backed lending yields. 
            We replace blind trust with verifiable code: backers retain governance power through bonding curve utility tokens, releasing escrowed capital only upon approved milestones.
          </p>
        </div>
      </section>

    </main>
  );
}
