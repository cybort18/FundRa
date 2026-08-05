# FundRa — System Architecture

## Overview

FundRa is a fullstack Web3 crowdfunding protocol built as a Next.js monorepo. The application uses a layered architecture: a React frontend communicates with Next.js API Routes (backend), which persist data through a lightweight file-based database engine. The Web3 layer connects to EVM wallets via a custom provider context.

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────┐
│                     Client (Browser)                     │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ Landing Page │  │  DApp Page  │  │  Wallet Context  │  │
│  │   (/)       │  │  (/app)     │  │  (EIP-1193)      │  │
│  └──────┬──────┘  └──────┬──────┘  └────────┬─────────┘  │
│         │                │                   │            │
│         └────────┬───────┘                   │            │
│                  │                           │            │
│          fetch("/api/...")          window.ethereum       │
└──────────────────┼───────────────────────────┼───────────┘
                   │                           │
┌──────────────────┼───────────────────────────┼───────────┐
│                  ▼           Server           │           │
│  ┌───────────────────────────────────┐        │           │
│  │      Next.js API Routes           │        │           │
│  │  /api/campaigns  (GET, POST)      │        │           │
│  │  /api/campaigns/[id] (GET)        │        ▼           │
│  │  /api/vaults/deposit (POST)       │   EVM RPC Node     │
│  │  /api/governance/vote (POST)      │   (Alchemy/Infura) │
│  └──────────────┬────────────────────┘        │           │
│                 │                              │           │
│                 ▼                              │           │
│  ┌───────────────────────────────────┐        │           │
│  │      Database Engine              │        │           │
│  │  src/lib/db/engine.ts             │        │           │
│  │  (File-based JSON persistence)    │        │           │
│  │  Data: .fundra-data/db.json       │        │           │
│  └───────────────────────────────────┘        │           │
└───────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
FundRa/
├── docs/                         # Technical documentation
├── contracts/                    # Smart contract specs (future)
├── src/
│   ├── app/
│   │   ├── api/                  # REST API Routes (backend logic)
│   │   │   ├── campaigns/        # Campaign CRUD endpoints
│   │   │   ├── vaults/           # Vault deposit/withdraw endpoints
│   │   │   └── governance/       # Governance voting endpoints
│   │   ├── app/                  # DApp main page route
│   │   ├── globals.css           # Design tokens & base styles
│   │   ├── layout.tsx            # Root layout (fonts, providers)
│   │   └── page.tsx              # Landing page
│   │
│   ├── components/
│   │   ├── common/               # Shared UI primitives
│   │   ├── dapp/                 # DApp-specific components
│   │   ├── landing/              # Landing page sections
│   │   ├── providers/            # Client-side providers
│   │   └── ui/                   # shadcn/ui components
│   │
│   ├── context/                  # React Context providers
│   │   └── WalletContext.tsx     # EVM wallet connection state
│   │
│   ├── lib/
│   │   ├── db/                   # Database engine & seed data
│   │   └── utils.ts              # General utilities
│   │
│   └── types/                    # TypeScript type definitions
│       └── dapp.ts               # Campaign, Milestone, Vault, Governance types
│
├── PRD.md                        # Product Requirement Document
└── README.md                     # Project overview
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 16 (App Router) | Server & client rendering |
| Language | TypeScript (strict) | Type safety |
| Styling | Tailwind CSS v4 | Utility-first CSS |
| Scroll | Lenis | Smooth inertial scrolling |
| Icons | Lucide React | Consistent iconography |
| Web3 | Custom EIP-1193 Context | Wallet connection (MetaMask, Bitget) |
| Backend | Next.js API Routes | REST endpoints |
| Database | File-based JSON engine | Zero-dependency persistence |
| Contracts | Solidity (future) | ERC-4626, ERC-1167, ERC-20 |

---

## Data Flow

### Campaign Creation
1. User fills Create Campaign form on `/app`
2. Frontend sends `POST /api/campaigns` with campaign data
3. API Route validates input, generates unique ID, writes to database
4. Response returns the created campaign
5. Frontend refreshes campaign list via `GET /api/campaigns`

### Vault Deposit
1. User selects campaign, enters deposit amount
2. Frontend sends `POST /api/vaults/deposit` with campaign ID, amount, wallet address
3. API Route creates deposit record, updates campaign TVL
4. Response confirms deposit with updated position data

### Governance Voting
1. User views active milestone proposals
2. User casts vote (approve/reject)
3. Frontend sends `POST /api/governance/vote` with proposal ID, vote, wallet address
4. API Route records vote, updates vote tallies
5. Response returns updated proposal state
