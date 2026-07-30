import { Menu, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="relative z-20 flex justify-between items-start p-8 md:px-12 w-full">
      {/* Left: Empty for balance */}
      <div className="hidden md:flex w-32" />

      {/* Center: Abstract Geometric Logo */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-12 h-12 text-[#e2e8f0] hover:text-white transition-colors duration-500 cursor-pointer group">
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
  );
}
