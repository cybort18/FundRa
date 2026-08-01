"use client";

import { useEffect, useState } from "react";
import { Menu, Sparkles } from "lucide-react";

export function Header() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className={`relative z-20 flex justify-between items-center p-8 md:px-12 w-full transition-all duration-[1200ms] ease-out transform ${
      isMounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
    }`}>
      {/* Left: Flex helper to balance logo positioning */}
      <div className="flex-1" />

      {/* Center: Abstract Geometric Logo */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-12 h-12 text-[#e2e8f0] hover:text-white transition-colors duration-500 cursor-pointer group">
          <div className="absolute rotate-45 border border-current w-6 h-6 group-hover:rotate-90 transition-transform duration-700 ease-in-out" />
          <div className="absolute border border-current w-6 h-6 group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
          <Sparkles className="w-3 h-3 absolute z-10 text-white" />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex-1 flex justify-end">
        <button className="px-6 py-2.5 bg-[#0f2147] hover:bg-[#163066] border border-white/5 text-white font-semibold rounded-2xl text-sm transition-all duration-300 whitespace-nowrap shadow-sm hover:shadow-[0_0_20px_rgba(22,48,102,0.3)] active:scale-95">
          Connect Wallet
        </button>
      </div>
    </header>
  );
}
