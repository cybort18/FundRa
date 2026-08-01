import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Cinzel, Cormorant_Garamond, Space_Grotesk, Syncopate } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${cinzel.variable} ${cormorant.variable} ${spaceGrotesk.variable} ${syncopate.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[#030014] text-[#f8fafc] overflow-x-hidden">
        <WalletProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
