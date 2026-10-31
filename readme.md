# ZedX

ZedX is a non-custodial DeFi app on Polygon. Users connect a wallet and can mint ZEDX with POL, stake it for yield, swap tokens, and trade perpetual markets with leverage. Funds stay in the user's wallet.

v1 is live on Polygon mainnet. AI for trading signals, risk checks, and an assistant is planned for later.

## Quick Start

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

| Service | URL |
|---------|-----|
| App | http://localhost:3000 |
| API | http://localhost:5000 |

`npm run dev` starts the API and the frontend together. The Polygon contracts and public RPC are already set, so the app runs without a `.env` file.

## Key points

- **Mint** — buy ZEDX with POL
- **Stake** — earn yield on staked ZEDX
- **Swap** — swap tokens through Uniswap V2 on Polygon
- **Trade** — perpetual markets with live prices, charts, and an order book
- **Wallet** — MetaMask, Coinbase, or any EIP-6963 wallet

| Command | What it does |
|---------|----------------|
| `npm run dev` | API + frontend, with API reload |
| `npm start` | API + frontend |
| `npm run server` | API only |
| `npm run test:contracts` | Contract tests |
| `npm run compile` | Compile the contracts |

Contract addresses, token and staking parameters, the API, environment variables, and the repository layout are in [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md).
