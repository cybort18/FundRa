import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative z-10 min-h-[calc(100vh-180px)] flex flex-col items-center justify-center px-4 w-full">
      <h1 className="font-cormorant text-[4.5rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[10rem] font-normal leading-[1.0] text-center tracking-wide text-[#dbeafe] drop-shadow-sm mb-6 uppercase">
        FUNDRA
      </h1>
      
      <p className="text-lg md:text-xl text-[#94a3b8] font-light tracking-wide text-center max-w-3xl leading-relaxed">
        Sovereign Crowdfunding Infrastructure. Yield-Generating ERC-4626 Vaults. <br className="hidden md:block"/>
        Milestone-Based Governance for the Decentralized Creator Economy.
      </p>

      {/* Subtle CTA buttons for the hero */}
      <div className="mt-12 flex gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
        <Button variant="outline" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 text-white backdrop-blur-md px-8">
          Launch Project
        </Button>
      </div>
    </div>
  );
}
