"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const pillarsData = [
  {
    num: "01",
    title: "Yield Custody",
    desc: "Your capital remains in your absolute control. Interest is generated continuously via Aave while your principal is locked securely in non-custodial smart contracts."
  },
  {
    num: "02",
    title: "Instant Liquidity",
    desc: "Every contribution instantly mints campaign-specific utility tokens via a mathematical bonding curve, enabling immediate secondary market access."
  },
  {
    num: "03",
    title: "Milestone DAO",
    desc: "Creators cannot withdraw funds arbitrarily. Capital is escrowed and released sequentially based on milestone completions approved by backer governance."
  }
];

export function Pillars() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="pillars" className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-48">
      
      {/* Header section with minimal typography */}
      <div className="flex flex-col items-start mb-20 md:mb-28">
        <ScrollReveal>
          <span className="text-xs uppercase tracking-[0.3em] text-fundra-accent mb-4 block font-medium">Core Mechanisms</span>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl text-fundra-text tracking-wide">
            The Protocol Pillars
          </h2>
        </ScrollReveal>
      </div>

      {/* Vertical Typographic List */}
      <div className="flex flex-col border-t border-white/5">
        {pillarsData.map((item, idx) => {
          const isHovered = hoveredIndex === idx;
          const isAnyHovered = hoveredIndex !== null;
          
          // Determine opacity and scaling transition based on hover state
          const opacityClass = isHovered 
            ? "opacity-100" 
            : isAnyHovered 
            ? "opacity-20 scale-[0.99] blur-[0.5px]" 
            : "opacity-75";

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`border-b border-white/5 py-12 md:py-16 flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8 items-start md:items-center transition-all duration-500 ease-out cursor-pointer origin-left ${opacityClass}`}
            >
              {/* Number Column */}
              <div className="md:col-span-2 font-mono text-2xl md:text-3xl text-zinc-500 tracking-wider">
                <span className={`transition-colors duration-500 ${isHovered ? "text-fundra-accent" : ""}`}>
                  {item.num}
                </span>
              </div>

              {/* Title Column */}
              <div className="md:col-span-4 font-cormorant text-3xl md:text-4xl text-fundra-text tracking-wide">
                <h3 className={`transition-all duration-500 ${isHovered ? "text-fundra-accent translate-x-2" : "translate-x-0"}`}>
                  {item.title}
                </h3>
              </div>

              {/* Description Column */}
              <div className="md:col-span-6 text-zinc-400 text-base md:text-lg font-light leading-relaxed">
                <p className={`transition-colors duration-500 ${isHovered ? "text-zinc-100" : ""}`}>
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
