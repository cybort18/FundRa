# FundRa: Crypto-Native Crowdfunding Launchpad Protocol

FundRa is a decentralized, fully on-chain crowdfunding launchpad engineered to provide complete capital alignment, zero principal risk, and milestone-based governance for the decentralized creator economy. 

Unlike traditional crowdfunding platforms, FundRa replaces central intermediaries and blind trust with audited smart contracts, allowing backers to support innovative projects through non-custodial yield vaults and govern capital releases dynamically.

---

## Core Pillars

### 1. No-Loss Yield Mechanisms (ERC-4626)
Rather than placing principal at risk, backers deposit capital into optimized ERC-4626 Tokenized Vaults. These vaults aggregate deposits and route them into Aave lending protocols, generating yields that fund the creators while preserving the backers' principal.

### 2. Bonding Curve Tokenomics
Every campaign automatically deploys its own ERC-20 utility tokens via a customizable bonding curve. Backers mint tokens upon donation, providing immediate liquidity, access pass capabilities, and governance weight.

### 3. Milestone-Based Governance (DAO Voting)
Creators cannot withdraw the entire campaign pool at once. Capital is held in escrow and released sequentially based on a milestone roadmap. Backers vote with their campaign tokens to approve or reject subsequent fund releases.

### 4. Gas-Efficient Architecture (ERC-1167 Clones)
To ensure accessibility, the FundRaFactory utilizes ERC-1167 Minimal Proxy Clones to deploy campaigns. This reduces the gas cost of campaign creation by up to 90%.

---

## Tech Stack

This frontend prototype is built with modern, high-performance web technologies:

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4 (incorporating a custom Grainy Gradient and Frosted Glassmorphism design system)
- **Language:** TypeScript
- **UI Components:** Shadcn UI & Lucide Icons

---

## Getting Started

### Prerequisites

Ensure you have Node.js (v18.x or later) and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/FundRa.git
   cd FundRa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To launch the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified in your console) to view the application.

---

## Architecture Overview

```
src/
├── app/
│   ├── globals.css      # Core styles, tailwind v4 overrides, and Grainy Gradient animations
│   ├── layout.tsx       # Root layout loaded with display fonts (Cormorant Garamond, Space Grotesk, etc.)
│   └── page.tsx         # Interactive Landing Page (Hero and About sections)
├── components/
│   └── ui/              # Shadcn components (Button, etc.)
└── lib/
    └── utils.ts         # Tailwind merger and conditional class helper utilities
```

---

## Development Roadmap

- **Phase 1 (Current):** Premium Frontend UI Prototyping & Landing Page.
- **Phase 2:** Smart Contract Integration (Wagmi, Viem, AppKit) and Local Testnet Mocking (Hardhat/Foundry).
- **Phase 3:** Aave Integration & Dynamic On-Chain SVG NFT Renderers.
- **Phase 4:** Account Abstraction Integration (Privy + Biconomy Paymaster).
- **Phase 5:** Identity & Anti-Sybil Verification (Gitcoin Passport / World ID).
