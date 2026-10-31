# ZedX — Project Overview

## 1. Introduction

ZedX is an AI-Powered DeFi Trading & Analytics Platform. It is a non-custodial platform where users can mint the ZEDX utility token, stake it to earn yield, swap tokens, and trade 35+ perpetual futures markets with leverage — all without giving up custody of their assets.

The platform is live on Polygon Mainnet. Contracts are deployed and verified.

In the future, ZedX will integrate AI to provide trading signals, price predictions, risk detection, and a conversational assistant — helping beginners get started easily and supporting traders at every level.

---

## Deployed Contracts (Polygon Mainnet)

| Contract | Address | Explorer |
|----------|---------|---------|
| ZedxToken (ZEDX) | `0xc22F38cB56933b7eF1998f27CF02c021c3A42755` | [Polygonscan](https://polygonscan.com/token/0xc22F38cB56933b7eF1998f27CF02c021c3A42755) |
| ZedxStaking | `0x862c75E8c736C5067b436126890c6153fc711C44` | [Polygonscan](https://polygonscan.com/address/0x862c75E8c736C5067b436126890c6153fc711C44) |
| Network | Polygon Mainnet | Chain ID: 137 |
| Swap Router | `0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff` | Uniswap V2 |
| WMATIC | `0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270` | Wrapped POL |

---

## 2. ZEDX Token — Technical Specification

| Parameter | Value |
|-----------|-------|
| Token name | Zedx |
| Token symbol | ZEDX |
| Standard | ERC-20 (OpenZeppelin) |
| Decimals | 18 |
| Max supply | 1,000,000,000 ZEDX (1 billion) |
| Mint price | 0.0001 POL per 1 ZEDX |
| Mint mechanism | Public — send POL to `mintWithEth()` |
| Treasury mint | Owner-only `mintTo(address, amount)` |
| Burn | Supported via `ERC20Burnable` |
| Pause | Owner can pause/unpause public minting |
| Refund | Excess ETH automatically refunded |
| Contract | `ZedxToken.sol` |

### Token Distribution (planned)
| Allocation | Amount | Notes |
|------------|--------|-------|
| Public mint | 700,000,000 | Available via `mintWithEth()` |
| Treasury / team | 200,000,000 | Owner `mintTo()` — vesting TBD |
| Staking rewards | 100,000,000 | Pre-funded into staking contract |

---

## 3. Staking — Technical Specification

| Parameter | Value |
|-----------|-------|
| Staking token | ZEDX |
| Reward token | ZEDX |
| APR | 12% (1200 basis points) |
| APR type | Fixed, configurable by owner |
| Reward accrual | Per-second, on-chain |
| Minimum stake | None |
| Lock period | None — unstake anytime |
| Reward pool | Funded by owner via `fundRewardPool()` |
| Seed amount | 10,000 ZEDX (local dev) |
| Contract | `ZedxStaking.sol` |

### Staking functions
| Function | Description |
|----------|-------------|
| `stake(amount)` | Deposit ZEDX — requires prior `approve()` |
| `unstake(amount)` | Withdraw staked ZEDX |
| `claimReward()` | Claim accumulated rewards |
| `exitAll()` | Unstake + claim in one transaction |
| `pendingReward(address)` | View accrued rewards |
| `stakeOf(address)` | View full position info |

---

## 4. Swap — Technical Specification

| Parameter | Value |
|-----------|-------|
| Protocol | Uniswap V2 |
| Router (Polygon) | `0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff` |
| WMATIC (Polygon) | `0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270` |
| Slippage default | 1% (100 bps) |
| Deadline | 10 minutes |
| Quote source | Server-side via `eth_call` to router |
| Supported pairs | POL ↔ USDT, POL ↔ ZEDX (requires pool), token ↔ token |

> **Note:** ZEDX/POL liquidity pool must be created on Uniswap V2 (Polygon) before ZEDX swaps work.

---

## 5. Perpetual Trading — Technical Specification

| Parameter | Value |
|-----------|-------|
| Markets | 35+ perpetual pairs (BTC, ETH, SOL, etc.) |
| Max leverage | Up to 50× (BTC, ETH) |
| Price feed | Real-time Binance WebSocket stream |
| Order types | Market, Limit |
| Settlement | Paper trading (simulated, localStorage) |
| Chart | TradingView Advanced Chart widget |
| Order book | Synthetic + resting orders via matching engine |

> **Note:** Perpetual trading is currently paper trading only. On-chain settlement requires integration with a perps protocol (GMX, dYdX, or custom contracts).

---

## 6. Technology Stack

### Smart Contracts
| Component | Technology |
|-----------|-----------|
| Language | Solidity 0.8.24 |
| Framework | Hardhat |
| Libraries | OpenZeppelin 5.x (ERC20, Ownable, Pausable, ReentrancyGuard, SafeERC20) |
| Testing | Hardhat + Chai + Mocha |
| Networks | Hardhat local (31337), Polygon Mainnet (137) |

### Backend (Server)
| Component | Technology |
|-----------|-----------|
| Runtime | Node.js (ESM) |
| Framework | Express.js |
| Real-time | WebSocket (ws library) |
| Price feed | Binance WebSocket stream |
| RPC calls | Raw `eth_call` via HTTP JSON-RPC |
| ABI encoding | ethers.js `Interface` |

### Frontend (Client)
| Component | Technology |
|-----------|-----------|
| Framework | Next.js 15 + React 18 + TypeScript |
| Build tool | Next.js (App Router) |
| Styling | Tailwind CSS |
| Routing | Next.js App Router (file-based) |
| Blockchain | viem (wallet + contract interaction) |
| Charts | TradingView Advanced Chart widget |
| Wallet | EIP-6963 + EIP-1193 (MetaMask, Coinbase, etc.) |

---

## 7. Current Deployment Status

| Environment | Status | Chain ID | Notes |
|-------------|--------|----------|-------|
| Local Hardhat | Working | 31337 | Full functionality for development |
| Polygon Mainnet | Live | 137 | Contracts deployed and verified |

### Contract Addresses (Polygon Mainnet)
```
ZEDX_TOKEN_ADDRESS=0xc22F38cB56933b7eF1998f27CF02c021c3A42755
ZEDX_STAKING_ADDRESS=0x862c75E8c736C5067b436126890c6153fc711C44
```

---

## 8. Repository Structure

```
ZedX/
├── client/                  # Next.js 15 + React 18 + TypeScript frontend
│   ├── src/
│   │   ├── abi/             # Contract ABIs (zedx.ts, zedxStaking.ts)
│   │   ├── components/      # Shared UI components
│   │   │   └── dex/         # Trading-specific components
│   │   ├── context/         # React contexts (wallet, markets, etc.)
│   │   ├── app/             # Next.js App Router (pages & layouts)
│   │   └── wallet/          # Wallet connection logic
│   └── next.config.ts
├── contracts/               # Hardhat project
│   ├── contracts/
│   │   ├── ZedxToken.sol    # ERC-20 token with mint
│   │   └── ZedxStaking.sol  # Staking with fixed APR
│   ├── scripts/
│   │   ├── deploy.cjs       # Deploys both contracts, auto-updates .env
│   │   ├── setupSepolia.cjs # Mints ZEDX + creates Uniswap pool
│   │   └── addLiquidity.cjs # Adds ZEDX/ETH liquidity
│   ├── test/
│   │   └── ZedxToken.test.cjs  # Full test suite
│   └── hardhat.config.cjs
├── server/                  # Express + WebSocket backend
│   └── src/
│       ├── server.js        # Main server + API routes
│       ├── marketEngine.js  # Simulated market data
│       ├── matchingEngine.js# Order matching
│       ├── swapQuote.js     # Uniswap V2 quote encoding
│       ├── stakingInfo.js   # On-chain staking reads
│       └── zedxBalance.js   # Token balance reads
├── docs/                    # Project documentation
├── .env                     # Environment variables (not committed)
└── .env.example             # Template for .env
```

---

## 9. Key API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/config` | Chain ID, contract addresses, app config |
| GET | `/api/v1/markets` | All market overviews (real-time) |
| GET | `/api/v1/markets/:id` | Single market detail + order book |
| GET | `/api/v1/swap/quote` | Uniswap V2 swap quote |
| GET | `/api/v1/staking/info` | Protocol-level staking stats |
| GET | `/api/v1/staking/user/:address` | User staking position |
| GET | `/api/v1/wallets/:address/zedx-balance` | ZEDX token balance |
| WS | `/ws/markets` | Real-time market price stream |

---

## 10. Environment Variables

```bash
# Blockchain
CHAIN_ID=137
RPC_URL=https://polygon-rpc.com

# Contracts (Polygon Mainnet)
ZEDX_TOKEN_ADDRESS=0xc22F38cB56933b7eF1998f27CF02c021c3A42755
ZEDX_STAKING_ADDRESS=0x862c75E8c736C5067b436126890c6153fc711C44

# Swap (Uniswap V2 — Polygon Mainnet)
SWAP_ROUTER_ADDRESS=0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff
WETH_ADDRESS=0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270

# Server
PORT=5000
BIND_HOST=0.0.0.0

# Deployment (only needed for redeployment — keep secret)
DEPLOYER_PRIVATE_KEY=0x...
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
POLYGONSCAN_API_KEY=YOUR_KEY
```

---

## 11. Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start the app
npm run dev
```
