-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "creatorAddress" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "tvl" REAL NOT NULL DEFAULT 0,
    "aaveApy" REAL NOT NULL,
    "yieldGenerated" REAL NOT NULL DEFAULT 0,
    "backerCount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'active',
    "tags" TEXT NOT NULL,
    "targetRaise" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Milestone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campaignId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "payoutPercentage" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'upcoming',
    "votesFor" INTEGER NOT NULL DEFAULT 0,
    "votesAgainst" INTEGER NOT NULL DEFAULT 0,
    "quorumRequired" INTEGER NOT NULL DEFAULT 10,
    "deliverableUrl" TEXT,
    "completedAt" DATETIME,
    CONSTRAINT "Milestone_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BondingCurve" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campaignId" TEXT NOT NULL,
    "tokenName" TEXT NOT NULL,
    "tokenTicker" TEXT NOT NULL,
    "currentPrice" REAL NOT NULL,
    "initialPrice" REAL NOT NULL,
    "reserveRatio" REAL NOT NULL,
    "totalSupply" REAL NOT NULL DEFAULT 0,
    "marketCap" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "BondingCurve_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Deposit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campaignId" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "tokensReceived" REAL NOT NULL,
    "apy" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campaignId" TEXT NOT NULL,
    "milestoneId" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "vote" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "BondingCurve_campaignId_key" ON "BondingCurve"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_milestoneId_walletAddress_key" ON "Vote"("milestoneId", "walletAddress");
