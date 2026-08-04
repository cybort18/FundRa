# 📄 Product Requirement Document (PRD) — FundRa Protocol

> **Single Source of Truth (SSOT)** for developers, designers, and AI assistants working on the FundRa project.

---

## 1. Product Overview

- **Product Name:** FundRa
- **Tagline:** Sovereign Crowdfunding Infrastructure
- **Target Ecosystem:** Ethereum Mainnet & EVM-Compatible Layer-2 Networks (Base, Arbitrum, Optimism, Polygon)
- **Primary Objective:** Provide a decentralized, non-custodial crowdfunding launchpad that replaces central intermediaries and blind trust with audited smart contracts, yield-generating vaults, and milestone-based DAO governance.

---

## 2. Problem Statement & The FundRa Paradigm

### **The Traditional Problem (Web2 Crowdfunding)**
1. **100% Principal Loss:** On traditional platforms (e.g., Kickstarter, Indiegogo), if a project fails or creator abandons work, backers lose 100% of pledged capital.
2. **Centralized Intermediaries:** High platform fees (5–10%), arbitrary campaign freezes, and delayed payouts.
3. **Unchecked Capital Release:** Creators receive 100% of funds upfront before delivering any working product, creating moral hazard and rug-pull risks.

### **The FundRa Solution**
1. **Zero-Loss Yield Vaults (ERC-4626):** Backers deposit capital into tokenized vaults routed to Aave V3 lending pools. Creators are funded using the generated yield, while backer principal remains 100% protected and redeemable.
2. **Milestone Escrow Governance:** Campaign funds are escrowed and released sequentially only when backers vote to approve milestone completion.
3. **Bonding Curve Liquidity (ERC-20):** Contributions dynamically mint campaign utility tokens via a bonding curve, offering immediate secondary market liquidity and access pass privileges.
4. **Gas-Efficient Deployment (ERC-1167):** Campaign deployment costs are reduced by up to 90% using minimal proxy clones.

---

## 3. Core Architectural Pillars

| Pillar | Standard / Protocol | Functional Description |
| :--- | :--- | :--- |
| **1. No-Loss Vaults** | `ERC-4626` + Aave V3 | Non-custodial vaults routing deposits to lending protocols to fund campaigns via yield while preserving principal. |
| **2. Bonding Curves** | `ERC-20` Custom Curve | Mathematical pricing model minting utility/governance tokens upon backing for instant liquidity. |
| **3. Milestone DAO** | On-Chain Governance | Milestone-locked escrow where capital release requires backer quorum approval via token voting. |
| **4. Gas Efficiency** | `ERC-1167` Proxy Clones | Factory contract deploying lightweight campaign instances to minimize gas deployment fees. |

---

## 4. Technology Stack & Design System

### **Frontend & Framework**
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (Strict mode enabled)
- **Styling:** Tailwind CSS v4 + Custom `@theme` inline tokens
- **Smooth Scroll:** Lenis (`lenis/react`)
- **Icons:** Lucide Icons (`lucide-react`) + Custom Inline Vector SVGs

### **Design System & Aesthetics**
- **Theme:** Deep Dark Mode (Aura Mesh Gradients + Velvety Grain Overlay)
- **Typography:**
  - **Heading / Display:** Cormorant Garamond (`font-cormorant`)
  - **Body / Sans:** Geist Sans (`font-sans`)
  - **Code / Mono:** Geist Mono (`font-mono`)
- **Design Tokens (`globals.css`):**
  - `--color-fundra-bg` (`#030014`) — Deep velvet background
  - `--color-fundra-accent` (`#38bdf8`) — Electric sky cyan accent
  - `--color-fundra-text` (`#f8fafc`) — Primary crisp white text
  - `--color-fundra-muted` (`#94a3b8`) — Secondary slate text

### **Web3 Integration Layer**
- **Architecture:** Zero-dependency React Context (`WalletContext.tsx`)
- **Supported Providers:** MetaMask (`isMetaMask`), Bitget Wallet (`bitkeep` / `isBitKeep` / `isBitget`), and EIP-1193 Injected Providers.
- **Account Selection Protocol:** Enforces `wallet_requestPermissions` RPC calls to trigger browser extension popups on re-connection.

---

## 5. Information Architecture & Page Structure

```
FundRa Web Application
├── 1. Landing Page (Phase 1 - Active)
│   ├── Header Nav (Brand logo + Connect Wallet button & Modal)
│   ├── Hero Section ("FUNDRA" + Tagline + Dual CTA)
│   ├── Scroll Indicator
│   ├── The 3 Guarantees (Manifesto Editorial Grid)
│   ├── About Section ("Engineered for Fully On-Chain Trust")
│   ├── Reality Check (Comparative Analysis: Traditional vs. FundRa)
│   ├── Core Pillars (Interactive Focus-Mode List)
│   ├── The Gateway (Full-screen Final CTA: "Enter the Sovereign Era...")
│   └── Footer (Ultra-minimal: Brand, Copyright, GitHub Documentation link)
│
└── 2. DApp Protocol App (Phase 2 - Upcoming)
    ├── Campaign Discovery & Feed (Browse Vaults & Projects)
    ├── Creator Launchpad Wizard (Create Campaign, Bonding Curve, Milestones)
    ├── Vault Deposit & Staking Portal
    └── Milestone DAO Voting Dashboard
```

---

## 6. Project Directory Map

```
src/
├── app/
│   ├── globals.css              # Design tokens, keyframe animations, Lenis helpers
│   ├── layout.tsx               # Root layout, Google Font loaders, Wallet & Scroll Providers, SEO metadata
│   └── page.tsx                 # Main Landing Page composition
├── components/
│   ├── landing/
│   │   ├── Header.tsx           # Navigation bar with dynamic Web3 button
│   │   ├── Hero.tsx             # Hero banner with dual CTA buttons
│   │   ├── Guarantees.tsx       # 3 Manifesto Guarantees (Non-Custodial, Milestone-Locked, 100% On-Chain)
│   │   ├── About.tsx            # Trust & gas efficiency explanation
│   │   ├── RealityCheck.tsx     # Side-by-side risk & yield comparison
│   │   ├── Pillars.tsx          # Interactive mechanism list with focus-mode blur
│   │   ├── Gateway.tsx          # Full-screen final CTA
│   │   └── Footer.tsx           # Ultra-minimal footer with Documentation link
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx # Client-side Lenis initialization
│   └── ui/
│       ├── button.tsx           # Custom UI buttons
│       ├── ScrollReveal.tsx     # IntersectionObserver entrance animation wrapper
│       └── WalletModal.tsx      # Side-by-side MetaMask & Bitget connection modal
├── context/
│   └── WalletContext.tsx        # Web3 wallet connection state management & RPC handlers
└── types/
    └── global.d.ts              # Window.ethereum type extensions
```

---

## 7. Development Roadmap

- [x] **Phase 1: Premium Landing Page & Web3 Connection Modal**
  - Fully responsive, ultra-high aesthetic landing page.
  - Custom Web3 wallet provider supporting MetaMask and Bitget Wallet with account picker force.
  - Complete design system and Lenis smooth scrolling.

- [ ] **Phase 2: DApp Interface & Campaign Feed**
  - Build campaign listing UI, project detail pages, and deposit calculator.
  - Build creator campaign creation wizard.

- [ ] **Phase 3: Smart Contract Development & Testing**
  - Implement ERC-4626 vault wrapper using Foundry.
  - Implement ERC-1167 campaign factory contract.
  - Write unit tests & local testnet deployment scripts.

- [ ] **Phase 4: On-Chain Integration & Testnet Launch**
  - Connect Wagmi / Viem hooks to Next.js frontend.
  - Deploy contracts to Sepolia / Base Sepolia testnets.
  - Connect real Aave V3 testnet vaults.

---

## 8. Guidelines for AI Assistants & Developers

1. **Strict Design Token Usage:** Always use predefined design tokens (`bg-fundra-bg`, `text-fundra-text`, `text-fundra-accent`, `text-fundra-muted`) instead of hardcoding arbitrary hex colors.
2. **Responsive & Accessible:** Ensure all interactive elements include `role="button"`, `tabIndex={0}`, `aria-label`, and keyboard event handlers (`Enter` / `Space` / `Escape`).
3. **No Dummy Masking:** Never resolve Web3 errors by swallowing exceptions. Always handle user rejection (`code 4001`) and missing wallet extension states gracefully.
4. **Build Verification:** Always verify changes by running `npm run build` to ensure TypeScript compliance and static generation pass with 0 errors.

---
*Last Updated: August 2026 | Repository: [github.com/cybort18/FundRa](https://github.com/cybort18/FundRa)*
