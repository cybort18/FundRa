# FundRa — Database Schema

## Storage Engine

FundRa uses a **file-based JSON persistence engine** located at `src/lib/db/engine.ts`. Data is stored in `.fundra-data/db.json` at the project root. This approach requires zero external dependencies and works on any Node.js host.

The `.fundra-data/` directory is added to `.gitignore` to prevent committing user-generated data.

---

## Entity Relationship

```
Campaign (1) ──── (N) Milestone
Campaign (1) ──── (N) VaultDeposit
Campaign (1) ──── (N) GovernanceVote (via Milestone)
```

---

## Schema Definitions

### Campaign

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Auto | Unique ID, format: `camp_<nanoid>` |
| `title` | string | Yes | Campaign name |
| `creator` | string | Yes | Creator display name |
| `creatorAddress` | string | Yes | Creator ETH wallet address |
| `description` | string | Yes | Short description (max 500 chars) |
| `longDescription` | string | No | Extended project description |
| `category` | enum | Yes | `DeFi` \| `Infrastructure` \| `AI` \| `Gaming` \| `Public Goods` |
| `network` | enum | Yes | `ethereum` \| `base` \| `arbitrum` \| `optimism` |
| `tvl` | number | Auto | Total value locked (sum of deposits) |
| `aaveApy` | number | Auto | Simulated Aave yield (randomized on creation) |
| `yieldGenerated` | number | Auto | Calculated from TVL × APY × time |
| `backerCount` | number | Auto | Count of unique depositors |
| `status` | enum | Auto | `active` \| `completed` \| `paused` |
| `tags` | string[] | No | Descriptive tags |
| `targetRaise` | number | No | Funding target in USD |
| `milestones` | Milestone[] | Yes | Array of milestones (min 2) |
| `bondingCurve` | BondingCurve | Yes | Token configuration |
| `createdAt` | string | Auto | ISO 8601 timestamp |

### Milestone

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Auto | Unique ID, format: `ms_<campaignShort>_<index>` |
| `title` | string | Yes | Milestone name |
| `description` | string | Yes | Deliverable description |
| `payoutPercentage` | number | Yes | % of escrow released (0–100) |
| `status` | enum | Auto | `upcoming` \| `active` \| `completed` \| `rejected` |
| `votesFor` | number | Auto | Approve vote count |
| `votesAgainst` | number | Auto | Reject vote count |
| `quorumRequired` | number | Auto | Calculated from backer count |
| `deliverableUrl` | string | No | Link to proof of work |
| `completedAt` | string | No | ISO 8601 timestamp |

### BondingCurve

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `tokenName` | string | Yes | Full token name |
| `tokenTicker` | string | Yes | Ticker symbol (2–6 chars) |
| `currentPrice` | number | Auto | Current price on curve |
| `initialPrice` | number | Yes | Starting price |
| `reserveRatio` | number | Yes | Curve steepness (0.1–0.9) |
| `totalSupply` | number | Auto | Total minted tokens |
| `marketCap` | number | Auto | currentPrice × totalSupply |

### VaultDeposit

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Auto | Unique ID, format: `dep_<nanoid>` |
| `campaignId` | string | Yes | Reference to campaign |
| `walletAddress` | string | Yes | Depositor wallet address |
| `amount` | number | Yes | Deposit amount in USD |
| `tokensReceived` | number | Auto | Tokens minted via bonding curve |
| `apy` | number | Auto | APY at time of deposit |
| `createdAt` | string | Auto | ISO 8601 timestamp |

### GovernanceVote

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Auto | Unique ID, format: `vote_<nanoid>` |
| `campaignId` | string | Yes | Reference to campaign |
| `milestoneId` | string | Yes | Reference to milestone |
| `walletAddress` | string | Yes | Voter wallet address |
| `vote` | enum | Yes | `yes` \| `no` |
| `createdAt` | string | Auto | ISO 8601 timestamp |

---

## Database File Structure

```json
// .fundra-data/db.json
{
  "campaigns": [...],
  "deposits": [...],
  "votes": [...]
}
```

---

## Constraints & Business Rules

1. Milestone payout percentages within a campaign must sum to exactly 100.
2. The first milestone of a new campaign is set to `active`; all others are `upcoming`.
3. A wallet address can only vote once per milestone (enforced by unique `walletAddress + milestoneId`).
4. When a deposit is created, the campaign's `tvl` and `backerCount` are recalculated.
5. Campaign `aaveApy` is assigned a simulated value between 3.5–6.0% on creation.
