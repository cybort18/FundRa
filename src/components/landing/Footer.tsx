"use client";

import { Sparkles, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Footer() {
  return (
    <footer className="relative z-20 w-full border-t border-white/10 bg-[#030014] py-8 px-6 md:px-12 mt-auto">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Left: Brand logo & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-fundra-text hover:text-white cursor-pointer transition-colors duration-300 group">
              <div className="relative flex items-center justify-center w-7 h-7">
                <div className="absolute rotate-45 border border-current w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-700 ease-in-out" />
                <div className="absolute border border-current w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
                <Sparkles className="w-2 h-2 absolute z-10 text-white" />
              </div>
              <span className="font-cormorant tracking-[0.15em] font-medium text-base uppercase">FUNDRA</span>
            </div>
            
            <span className="hidden sm:inline text-zinc-700">•</span>

            <span className="text-xs text-zinc-500 font-light tracking-wide">
              © {new Date().getFullYear()} FundRa Protocol. All rights reserved.
            </span>
          </div>

          {/* Right: Clean Documentation Link */}
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/cybort18/FundRa" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-zinc-400 hover:text-fundra-accent transition-colors duration-300 group"
            >
              {/* GitHub SVG Icon */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-zinc-400 group-hover:text-fundra-accent transition-colors">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span>Documentation</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-fundra-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </a>
          </div>

        </div>
      </ScrollReveal>
    </footer>
  );
}
