# FundRa — Smart Contracts

This directory will contain Solidity smart contract specifications and interfaces for the FundRa protocol.

## Planned Contracts

| Contract | Standard | Purpose |
|----------|----------|---------|
| `FundRaVault.sol` | ERC-4626 | Non-custodial yield vault wrapping Aave V3 |
| `FundRaFactory.sol` | ERC-1167 | Minimal proxy factory for campaign deployment |
| `CampaignToken.sol` | ERC-20 | Bonding curve utility token per campaign |
| `MilestoneEscrow.sol` | Custom | Milestone-locked escrow with DAO voting |

## Development

Smart contracts will be developed using [Foundry](https://book.getfoundry.sh/).

```bash
# Future setup
forge init contracts
forge build
forge test
```
