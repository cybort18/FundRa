"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connectWallet: (type: "metamask" | "bitget") => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if wallet is connected on initial load
  const checkInitialConnection = useCallback(async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
        }
      } catch (err: any) {
        console.error("Failed to fetch initial accounts:", err);
      }
    }
  }, []);

  useEffect(() => {
    checkInitialConnection();
  }, [checkInitialConnection]);

  // Connect wallet handler
  const connectWallet = useCallback(async (type: "metamask" | "bitget") => {
    if (typeof window === "undefined") return;

    setError(null);
    setIsConnecting(true);

    let provider: any = null;

    if (type === "metamask") {
      if (window.ethereum) {
        if (window.ethereum.providers) {
          provider = window.ethereum.providers.find((p: any) => p.isMetaMask);
        } else if (window.ethereum.isMetaMask) {
          provider = window.ethereum;
        }
      }
      
      if (!provider) {
        setError("MetaMask is not installed.");
        setIsConnecting(false);
        if (confirm("MetaMask was not found. Would you like to install it?")) {
          window.open("https://metamask.io/download/", "_blank");
        }
        return;
      }
    } else if (type === "bitget") {
      provider = (window as any).bitkeep?.ethereum;
      
      if (!provider && window.ethereum) {
        if (window.ethereum.isBitKeep || (window.ethereum as any).isBitget) {
          provider = window.ethereum;
        } else if (window.ethereum.providers) {
          provider = window.ethereum.providers.find((p: any) => p.isBitKeep || p.isBitget);
        }
      }

      if (!provider) {
        setError("Bitget Wallet is not installed.");
        setIsConnecting(false);
        if (confirm("Bitget Wallet was not found. Would you like to install it?")) {
          window.open("https://web3.bitget.com/en/download", "_blank");
        }
        return;
      }
    }

    try {
      // Force the extension to open the account picker by requesting permissions
      try {
        await provider.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }]
        });
      } catch (permissionErr: any) {
        // If user rejected the permission popup, throw immediately
        if (permissionErr.code === 4001) {
          throw permissionErr;
        }
        // Fallback to standard request if requestPermissions is not supported by the provider
        console.warn("wallet_requestPermissions failed, falling back to eth_requestAccounts:", permissionErr);
      }

      // Retrieve the selected accounts
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
      }
    } catch (err: any) {
      console.error(`${type} connection error:`, err);
      if (err.code === 4001) {
        setError("Connection request rejected by user.");
      } else {
        setError(err.message || `Failed to connect to ${type}.`);
      }
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Disconnect handler
  const disconnectWallet = useCallback(() => {
    setAddress(null);
    setError(null);
  }, []);

  // Set up event listeners for accounts and chain switching
  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
      } else {
        setAddress(null);
      }
    };

    const handleChainChanged = () => {
      // Refresh the page on network change as recommended by MetaMask
      window.location.reload();
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  const value: WalletContextType = {
    address,
    isConnected: !!address,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
