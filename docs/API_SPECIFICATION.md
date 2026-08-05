# FundRa — API Specification

Base URL: `/api`

---

## Campaigns

### List Campaigns
```
GET /api/campaigns
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | string | No | Filter by category: `DeFi`, `Infrastructure`, `AI`, `Gaming`, `Public Goods` |
| `search` | string | No | Search in title, creator, description, tags |
| `status` | string | No | Filter by status: `active`, `completed`, `paused` |

**Response:** `200 OK`
```json
{
  "campaigns": [
    {
      "id": "camp_abc123",
      "title": "Project Name",
      "creator": "Creator Name",
      "creatorAddress": "0x...",
      "description": "Short description",
      "category": "DeFi",
      "tvl": 250000,
      "aaveApy": 4.82,
      "yieldGenerated": 12400,
      "backerCount": 142,
      "network": "ethereum",
      "status": "active",
      "tags": ["DeFi", "Lending"],
      "milestones": [...],
      "bondingCurve": {...},
      "createdAt": "2026-08-01T00:00:00Z"
    }
  ],
  "total": 1
}
```

---

### Get Campaign by ID
```
GET /api/campaigns/[id]
```

**Response:** `200 OK` — Single campaign object (same shape as list item)

**Error:** `404 Not Found` — `{ "error": "Campaign not found" }`

---

### Create Campaign
```
POST /api/campaigns
```

**Request Body:**
```json
{
  "title": "Project Name",
  "creator": "Creator Name",
  "creatorAddress": "0x...",
  "description": "Short project description",
  "longDescription": "Detailed project description...",
  "category": "DeFi",
  "network": "ethereum",
  "tags": ["DeFi", "Lending"],
  "targetRaise": 100000,
  "milestones": [
    {
      "title": "Phase 1",
      "description": "Build core protocol",
      "payoutPercentage": 30
    },
    {
      "title": "Phase 2",
      "description": "Launch testnet",
      "payoutPercentage": 70
    }
  ],
  "bondingCurve": {
    "tokenName": "Project Token",
    "tokenTicker": "PRJ",
    "initialPrice": 0.01,
    "reserveRatio": 0.33
  }
}
```

**Validation Rules:**
- `title` — required, 3–100 characters
- `description` — required, 10–500 characters
- `category` — required, must be one of the valid categories
- `milestones` — required, minimum 2, payout percentages must sum to 100
- `bondingCurve.tokenTicker` — required, 2–6 uppercase characters
- `bondingCurve.initialPrice` — required, > 0
- `bondingCurve.reserveRatio` — required, 0.1–0.9

**Response:** `201 Created` — Created campaign object

**Error:** `400 Bad Request` — `{ "error": "Validation message" }`

---

## Vaults

### Record Deposit
```
POST /api/vaults/deposit
```

**Request Body:**
```json
{
  "campaignId": "camp_abc123",
  "walletAddress": "0x...",
  "amount": 1000
}
```

**Validation Rules:**
- `campaignId` — required, must reference existing campaign
- `walletAddress` — required, valid Ethereum address format
- `amount` — required, > 0

**Response:** `201 Created`
```json
{
  "deposit": {
    "id": "dep_xyz789",
    "campaignId": "camp_abc123",
    "walletAddress": "0x...",
    "amount": 1000,
    "estimatedApy": 4.82,
    "tokensReceived": 2941,
    "createdAt": "2026-08-05T00:00:00Z"
  },
  "updatedCampaign": {
    "tvl": 251000,
    "backerCount": 143
  }
}
```

---

## Governance

### Cast Vote
```
POST /api/governance/vote
```

**Request Body:**
```json
{
  "campaignId": "camp_abc123",
  "milestoneId": "ms_abc_1",
  "walletAddress": "0x...",
  "vote": "yes"
}
```

**Validation Rules:**
- `campaignId` — required, must reference existing campaign
- `milestoneId` — required, must reference an active milestone
- `walletAddress` — required, valid Ethereum address format
- `vote` — required, must be `"yes"` or `"no"`
- Duplicate votes from same wallet on same milestone are rejected

**Response:** `201 Created`
```json
{
  "vote": {
    "id": "vote_001",
    "milestoneId": "ms_abc_1",
    "walletAddress": "0x...",
    "vote": "yes",
    "createdAt": "2026-08-05T00:00:00Z"
  },
  "updatedMilestone": {
    "votesFor": 311,
    "votesAgainst": 12
  }
}
```

**Error:** `409 Conflict` — `{ "error": "Already voted on this milestone" }`
