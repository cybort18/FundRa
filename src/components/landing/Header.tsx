"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { WalletModal } from "@/components/ui/WalletModal";

export function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHoveredDisconnect, setIsHoveredDisconnect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { 
    address, 
    isConnected, 
    isConnecting, 
    connectWallet, 
    disconnectWallet 
  } = useWallet();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleWalletClick = () => {
    if (isConnected) {
      disconnectWallet();
      setIsHoveredDisconnect(false);
    } else {
      setIsModalOpen(true);
    }
  };

  // Text display logic for the Web3 button
  let buttonText = "Connect Wallet";
  if (isConnecting) {
    buttonText = "Connecting...";
  } else if (isConnected && address) {
    buttonText = isHoveredDisconnect 
      ? "Disconnect" 
      : `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  return (
    <>
      <header className={`relative z-20 flex justify-between items-center p-8 md:px-12 w-full transition-all duration-[1200ms] ease-out transform ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}>
        {/* Left: Flex helper to balance logo positioning */}
        <div className="flex-1" />

        {/* Center: Abstract Geometric Logo */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center w-12 h-12 text-fundra-text hover:text-white transition-colors duration-500 cursor-pointer group">
            <div className="absolute rotate-45 border border-current w-6 h-6 group-hover:rotate-90 transition-transform duration-700 ease-in-out" />
            <div className="absolute border border-current w-6 h-6 group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
            <Sparkles className="w-3 h-3 absolute z-10 text-white" />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end">
          <button 
            onClick={handleWalletClick}
            onMouseEnter={() => isConnected && setIsHoveredDisconnect(true)}
            onMouseLeave={() => setIsHoveredDisconnect(false)}
            disabled={isConnecting}
            className={`px-6 py-2.5 border text-sm font-semibold rounded-2xl transition-all duration-300 whitespace-nowrap shadow-sm active:scale-95 flex items-center justify-center min-w-[150px] ${
              isConnected
                ? isHoveredDisconnect
                  ? "bg-red-950/40 border-red-500/30 text-red-400 hover:bg-red-900/40 cursor-pointer"
                  : "bg-emerald-950/20 border-emerald-500/20 text-fundra-text"
                : "bg-[#0f2147] hover:bg-[#163066] border-white/5 text-white hover:shadow-[0_0_20px_rgba(22,48,102,0.3)] cursor-pointer"
            }`}
          >
            {isConnected && !isHoveredDisconnect && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-2" />
            )}
            {buttonText}
          </button>
        </div>
      </header>

      {/* Wallet Connection Dialog Modal */}
      <WalletModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={connectWallet}
        isConnecting={isConnecting}
        isConnected={isConnected}
      />
    </>
  );
}
