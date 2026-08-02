import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "600"],
});

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { WalletProvider } from "@/context/WalletContext";

export const metadata: Metadata = {
  title: "FundRa | Crypto-Native Crowdfunding",
  description: "FundRa Protocol V2 - The First Crypto-Native Crowdfunding Launchpad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-fundra-bg text-fundra-text overflow-x-hidden">
        <WalletProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
