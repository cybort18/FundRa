"use client";

import { useEffect, useState } from "react";
import { X, HelpCircle, Loader2 } from "lucide-react";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (type: "metamask" | "bitget") => Promise<void>;
  isConnecting: boolean;
  isConnected: boolean;
}

export function WalletModal({ isOpen, onClose, onConnect, isConnecting, isConnected }: WalletModalProps) {
  const [animate, setAnimate] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [hasBitget, setHasBitget] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
      document.body.style.overflow = "hidden";
      
      // Check which wallet is installed in the user's browser
      if (typeof window !== "undefined" && window.ethereum) {
        setHasMetaMask(!!window.ethereum.isMetaMask);
        setHasBitget(
          !!(window as any).bitkeep?.ethereum ||
          !!window.ethereum.isBitKeep ||
          !!(window.ethereum as any).isBitget
        );
      }
    } else {
      setAnimate(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isConnected) {
      onClose();
    }
  }, [isConnected, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
      animate ? "opacity-100" : "opacity-0"
    }`}>
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Redesigned Premium Wallet Modal Container */}
      <div className={`relative w-full max-w-2xl bg-[#070514]/90 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_0_50px_rgba(56,189,248,0.05)] flex flex-col items-center transition-all duration-300 transform overflow-hidden ${
        animate ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
      }`}>
        
        {/* Connection Loading Overlay (Fix #7) */}
        {isConnecting && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-30 transition-all duration-300">
            <Loader2 className="w-10 h-10 text-fundra-accent animate-spin mb-4" />
            <p className="text-fundra-text text-sm font-light tracking-wider animate-pulse">
              Requesting authorization from wallet extension...
            </p>
          </div>
        )}

        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Block */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-cormorant text-fundra-text font-medium tracking-wide">Select Wallet</h3>
          <p className="text-fundra-muted text-xs mt-2 max-w-[320px] mx-auto leading-relaxed font-sans">
            Connect MetaMask or Bitget Wallet to interact with the FundRa protocol.
          </p>
        </div>

        {/* Redesigned Side-by-Side Large Wallet Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Card 1: MetaMask */}
          <div
            onClick={() => onConnect("metamask")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onConnect("metamask");
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Connect with MetaMask"
            className="flex flex-col items-center justify-between text-center p-8 bg-white/[0.02] border border-white/5 hover:border-[#e2761b]/40 rounded-2xl transition-all duration-500 hover:bg-white/[0.04] group cursor-pointer relative hover:shadow-[0_0_35px_rgba(226,118,27,0.08)] outline-none focus-visible:ring-1 focus-visible:ring-[#e2761b]"
          >
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              {hasMetaMask ? (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono tracking-wider">
                  Installed
                </span>
              ) : (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-zinc-500 font-mono tracking-wider">
                  Popular
                </span>
              )}
            </div>

            {/* Wallet Logo */}
            <div className="w-20 h-20 rounded-full bg-[#1b120c] flex items-center justify-center border border-[#3d210a] mb-6 group-hover:scale-105 transition-transform duration-500">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                alt="MetaMask" 
                className="w-12 h-12 object-contain"
                loading="eager"
              />
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h4 className="text-base font-semibold text-zinc-200 group-hover:text-white transition-colors">MetaMask</h4>
              <p className="text-[11px] text-zinc-500 leading-normal max-w-[180px]">
                Connect using your MetaMask browser extension.
              </p>
            </div>
          </div>

          {/* Card 2: Bitget Wallet */}
          <div
            onClick={() => onConnect("bitget")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onConnect("bitget");
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Connect with Bitget Wallet"
            className="flex flex-col items-center justify-between text-center p-8 bg-white/[0.02] border border-white/5 hover:border-[#00f0ff]/40 rounded-2xl transition-all duration-500 hover:bg-white/[0.04] group cursor-pointer relative hover:shadow-[0_0_35px_rgba(0,240,255,0.08)] outline-none focus-visible:ring-1 focus-visible:ring-[#00f0ff]"
          >
            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              {hasBitget ? (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono tracking-wider">
                  Installed
                </span>
              ) : (
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-zinc-500 font-mono tracking-wider">
                  Popular
                </span>
              )}
            </div>

            {/* Wallet Logo (Direct official GitHub Raw Asset) */}
            <div className="w-20 h-20 rounded-full bg-[#031526] flex items-center justify-center border border-[#063156] mb-6 group-hover:scale-105 transition-transform duration-500 overflow-hidden p-2">
              <img 
                src="https://raw.githubusercontent.com/bitgetwallet/download/main/logo/png/bitget_wallet_logo_288_mini.png" 
                alt="Bitget Wallet" 
                className="w-full h-full object-contain rounded-xl"
                loading="eager"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://raw.githubusercontent.com/bitkeepwallet/download/main/logo/png/bitget%20wallet_logo_iOS.png";
                }}
              />
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h4 className="text-base font-semibold text-zinc-200 group-hover:text-white transition-colors">Bitget Wallet</h4>
              <p className="text-[11px] text-zinc-500 leading-normal max-w-[180px]">
                Connect using your Bitget browser extension.
              </p>
            </div>
          </div>

        </div>

        {/* Minimal Footer */}
        <div className="mt-10 pt-6 border-t border-white/5 w-full flex items-center justify-center gap-1.5 text-zinc-500 text-xs font-light">
          <HelpCircle className="w-4 h-4 text-zinc-500" />
          <span>
            New to Ethereum wallets?{" "}
            <a 
              href="https://ethereum.org/en/wallets/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-fundra-accent hover:text-[#00f0ff] hover:underline font-semibold transition-colors"
            >
              Learn more
            </a>
          </span>
        </div>

      </div>
    </div>
  );
}
