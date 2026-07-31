import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function About() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-48 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
      {/* Left Column: Title with immediate scroll reveal */}
      <div className="md:col-span-7">
        <ScrollReveal>
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] font-normal leading-[1.1] text-[#f8fafc]">
            Engineered for <br/>
            Fully On-Chain <br/>
            Trust
          </h2>
        </ScrollReveal>
      </div>

      {/* Right Column: Paragraph with slightly delayed scroll reveal */}
      <div className="md:col-span-5 border-l border-white/10 pl-6 md:pl-8 py-2">
        <ScrollReveal delay={200}>
          <p className="text-[#94a3b8] text-base md:text-lg font-light leading-relaxed">
            FundRa operates purely on-chain, utilizing ERC-1167 minimal proxy clones to cut campaign deployment gas fees by 90% and ERC-4626 vaults to generate Aave-backed lending yields. 
            We replace blind trust with verifiable code: backers retain governance power through bonding curve utility tokens, releasing escrowed capital only upon approved milestones.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
