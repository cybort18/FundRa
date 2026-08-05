"use client";

import { Sparkles, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-20 w-full bg-[#060612] border-t border-white/[0.08] py-12 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <Link href="/" className="flex items-center gap-2.5 text-white hover:text-fundra-accent transition-colors group">
            <div className="relative flex items-center justify-center w-6 h-6">
              <div className="absolute rotate-45 border border-current w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-500" />
              <div className="absolute border border-current w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
              <Sparkles className="w-2 h-2 absolute z-10 text-white" />
            </div>
            <span className="font-cormorant tracking-[0.2em] font-medium text-lg uppercase">
              FUNDRA
            </span>
          </Link>

          <span className="hidden sm:inline text-white/20">|</span>

          <p className="text-xs text-fundra-muted/70 font-light">
            Sovereign Crowdfunding & Non-Custodial Vault Protocol
          </p>
        </div>

        {/* Center: System Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Contracts Verified · Non-Custodial</span>
        </div>

        {/* Right: Navigation & GitHub Documentation */}
        <div className="flex items-center gap-6 text-xs text-fundra-muted">
          <Link href="/app" className="hover:text-white transition-colors">
            Protocol App
          </Link>
          <a
            href="https://github.com/cybort18/FundRa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span>Documentation</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>

      {/* Bottom Bar: Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between text-[11px] text-fundra-muted/50 gap-2">
        <p>© {new Date().getFullYear()} FundRa Protocol. All rights reserved.</p>
        <p className="font-mono">Built for the Sovereign Creator Economy</p>
      </div>
    </footer>
  );
}
