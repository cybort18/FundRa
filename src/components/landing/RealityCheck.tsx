import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function RealityCheck() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-48 border-t border-white/5">
      
      {/* Header section with refined, minimal layout */}
      <div className="flex flex-col items-center mb-24 md:mb-32">
        <ScrollReveal>
          <span className="text-xs uppercase tracking-[0.3em] text-[#38bdf8] mb-4 block font-medium">Comparative Analysis</span>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-center text-[#f8fafc] tracking-wide">
            The Reality Check
          </h2>
        </ScrollReveal>
      </div>

      {/* Spacious, Borderless Typographic Split Screen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-stretch relative">
        
        {/* Left Side: The Old Way (Muted, Slate, Obsolescence) */}
        <div className="flex flex-col justify-between pr-0 md:pr-12">
          <ScrollReveal className="flex flex-col h-full justify-between">
            <div className="space-y-8">
              <span className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-medium block">The Traditional Risk</span>
              
              <div className="space-y-3">
                <span className="font-cormorant text-6xl sm:text-7xl md:text-8xl text-zinc-600/80 font-light block leading-none">
                  $1,000.00
                </span>
                <span className="text-xs font-mono tracking-widest text-zinc-600 uppercase block">Principal Pledged</span>
              </div>
              
              <p className="text-zinc-500 text-base sm:text-lg font-light leading-relaxed max-w-md">
                You back a creator's vision. The project stalls, milestones are missed, and the campaign fails. 
                Your capital is gone forever, swallowed by the lack of structural recourse.
              </p>
            </div>
            
            <div className="mt-16 pt-6 border-t border-white/5 flex justify-between items-center text-xs font-mono tracking-wider text-zinc-600 uppercase">
              <span>Capital Recovered</span>
              <span className="font-sans font-medium text-zinc-500">0% ($0.00)</span>
            </div>
          </ScrollReveal>
        </div>

        {/* Vertical Separator Line (Hidden on mobile) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 hidden md:block" />

        {/* Right Side: The FundRa Way (Sapphire, Sky Blue, Future) */}
        <div className="flex flex-col justify-between pl-0 md:pl-12">
          <ScrollReveal delay={200} className="flex flex-col h-full justify-between">
            <div className="space-y-8">
              <span className="text-xs uppercase tracking-[0.25em] text-[#38bdf8] font-medium block">The FundRa Paradigm</span>
              
              <div className="space-y-3">
                <span className="font-cormorant text-6xl sm:text-7xl md:text-8xl text-[#f8fafc] font-light block leading-none">
                  $1,000<span className="text-3xl sm:text-4xl md:text-5xl text-[#38bdf8] font-sans font-light">.00 + Yield</span>
                </span>
                <span className="text-xs font-mono tracking-widest text-[#38bdf8]/70 uppercase block">Sovereign Escrow</span>
              </div>
              
              <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed max-w-md">
                You deposit capital into a secure ERC-4626 vault. The project fails. 
                You retrieve your full principal plus the auto-compounding Aave yield. Zero loss, complete protection.
              </p>
            </div>
            
            <div className="mt-16 pt-6 border-t border-white/5 flex justify-between items-center text-xs font-mono tracking-wider text-zinc-400 uppercase">
              <span className="text-[#38bdf8]/70">Capital Recovered</span>
              <span className="font-sans font-medium text-[#f8fafc]">100% + Aave Yield</span>
            </div>
          </ScrollReveal>
        </div>

      </div>

    </section>
  );
}
