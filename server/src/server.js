import { config as loadEnv } from "dotenv";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { mkdirSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
loadEnv({ path: join(__dirname, "../../.env") });
loadEnv({ path: join(__dirname, "../../.env.local") });

import http from "node:http";
import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";

import { MarketEngine } from "./marketEngine.js";
import { createMatchingEngine, MatchError } from "./matchingEngine.js";
import { mergeBookWithResting, mergeTrades, quoteDp, formatPrice } from "./merge.js";
import { getZedxBalance } from "./zedxBalance.js";
import { getSwapQuote } from "./swapQuote.js";

function envStr(key, fallback) {
  const v = process.env[key];
  return v != null && v !== "" ? v : fallback;
}

function envU64(key, fallback) {
  const v = process.env[key];
  if (v == null || v === "") return fallback;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
}

function quoteDecimalsForQuote(quote) {
  switch (quote) {
    case "ETH":
      return 8;
    case "BTC":
      return 2;
    default:
      return 4;
  }
}

function orderToJson(o, decimals) {
  return {
    id: o.id,
    market_id: o.market_id,
    side: o.side,
    order_type: o.order_type,
    price: o.price == null ? null : formatPrice(o.price, decimals),
    size: o.size_original.toFixed(8),
    size_remaining: o.size_remaining.toFixed(8),
    status: o.status,
    created_at: o.created_at,
  };
}

function tradeToJson(t, decimals) {
  return {
    id: t.id,
    price: formatPrice(t.price, decimals),
    size: t.size.toFixed(8),
    maker_order_id: t.maker_order_id,
    taker_order_id: t.taker_order_id,
    taker_side: t.taker_side,
    ts: t.ts,
  };
}

function sendApi(res, r) {
  if (r.text != null) {
    return res.status(r.status).type("text/plain").send(r.text);
  }
  if (r.json != null) {
    return res.status(r.status).json(r.json);
  }
  return res.status(r.status).end();
}

const company = envStr("COMPANY_NAME", "ZedAI");
const appName = envStr("APP_NAME", "ZedX");
const chainId = envU64("CHAIN_ID", 137);
const rpcUrl = envStr("RPC_URL", "https://polygon-bor-rpc.publicnode.com");
const zedxTokenAddress = envStr("ZEDX_TOKEN_ADDRESS", "0xc22F38cB56933b7eF1998f27CF02c021c3A42755");
const zedaiTagline = envStr("ZEDAI_TAGLINE", "The AI-Powered DeFi Trading & Analytics Platform.");
const premiumMinWei = envStr("ZEDAI_PREMIUM_MIN_WEI", "").trim() || null;
const swapRouterAddress = envStr("SWAP_ROUTER_ADDRESS", "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff");
const wethAddress = envStr("WETH_ADDRESS", "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270");
const swapDeadlineSecs = envU64("SWAP_DEADLINE_SECS", 600);
const matchingPath = envStr("MATCHING_DATA_PATH", join(__dirname, "../data/matching_state.json"));

const dataDir = join(__dirname, "../data");
mkdirSync(dataDir, { recursive: true });

const markets = new MarketEngine();
const matching = createMatchingEngine(matchingPath);

const state = {
  company,
  app_name: appName,
  chain_id: chainId,
  rpc_url: rpcUrl,
  zedx_token_address: zedxTokenAddress,
  zedx_staking_address: envStr("ZEDX_STAKING_ADDRESS", "0x862c75E8c736C5067b436126890c6153fc711C44"),
  zedai_tagline: zedaiTagline,
  premium_min_wei: premiumMinWei,
  swap_router_address: swapRouterAddress,
  weth_address: wethAddress,
  swap_deadline_secs: swapDeadlineSecs,
  markets,
  matching,
};

const app = express();
app.use(cors());
app.use(express.json());

app.get("/binance/api/v3/klines", async (req, res) => {
  try {
    const qs = new URLSearchParams(req.query).toString();
    const url = `https://api.binance.com/api/v3/klines?${qs}`;
    const r = await fetch(url, { signal: AbortSignal.timeout(10_000) });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch {
    res.status(502).json({ error: "Binance proxy failed" });
  }
});

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "zedx-token-api",
  });
});

app.get("/api/v1/config", (_req, res) => {
  res.json({
    company: state.company,
    app_name: state.app_name,
    chain_id: state.chain_id,
    rpc_url: state.rpc_url,
    zedx_token_address: state.zedx_token_address,
    zedx_staking_address: state.zedx_staking_address,
    zedai_tagline: state.zedai_tagline,
  });
});

app.get("/api/v1/wallets/:address/zedx-balance", async (req, res) => {
  const r = await getZedxBalance(state, req.params.address, {
    min_wei: typeof req.query.min_wei === "string" ? req.query.min_wei : undefined,
  });
  sendApi(res, r);
});

app.get("/api/v1/swap/quote", async (req, res) => {
  const q = {
    amount_in: String(req.query.amount_in ?? ""),
    from: String(req.query.from ?? ""),
    to: String(req.query.to ?? ""),
    path: typeof req.query.path === "string" ? req.query.path : undefined,
    recipient: typeof req.query.recipient === "string" ? req.query.recipient : undefined,
    slippage_bps: req.query.slippage_bps != null ? Number.parseInt(String(req.query.slippage_bps), 10) : undefined,
    deadline: req.query.deadline != null ? Number.parseInt(String(req.query.deadline), 10) : undefined,
  };
  const r = await getSwapQuote(state, q);
  if (r.text != null) {
    return res.status(r.status).type("text/plain").send(r.text);
  }
  return res.status(r.status).json(r.json);
});

app.get("/api/v1/markets", (_req, res) => {
  res.json(markets.overview());
});

app.get("/api/v1/markets/:id", async (req, res) => {
  const id = req.params.id;
  const d = markets.detail(id);
  if (!d) {
    return res.status(404).send("not found");
  }
  const qd = quoteDp(d.quote);
  const { bids: rb, asks: ra } = await matching.restingDepth(id);
  const synthBook = d.book;
  d.book = mergeBookWithResting(synthBook, rb, ra, qd, 14);
  const mt = await matching.recentTrades(id, 24);
  const synthTrades = d.trades;
  d.trades = mergeTrades(mt, synthTrades, qd, 48);
  res.json(d);
});

app.get("/api/v1/orders", async (req, res) => {
  const marketId = typeof req.query.market_id === "string" ? req.query.market_id : undefined;
  const openOnly = req.query.open_only === "true" || req.query.open_only === "1";
  const list = await matching.listOrders(marketId, openOnly);
  let decimals = 8;
  if (marketId) {
    const d = markets.detail(marketId.trim());
    decimals = d ? quoteDecimalsForQuote(d.quote) : 4;
  }
  res.json({
    orders: list.map((o) => orderToJson(o, decimals)),
  });
});

app.post("/api/v1/orders", async (req, res) => {
  const body = req.body ?? {};
  const sideRaw = String(body.side ?? "").toLowerCase();
  const side = sideRaw === "buy" ? "buy" : sideRaw === "sell" ? "sell" : null;
  if (!side) {
    return res.status(400).type("text/plain").send("side must be buy or sell");
  }
  const otRaw = String(body.order_type ?? "").toLowerCase();
  const orderType = otRaw === "limit" ? "limit" : otRaw === "market" ? "market" : null;
  if (!orderType) {
    return res.status(400).type("text/plain").send("order_type must be limit or market");
  }

  let size;
  try {
    size = Number.parseFloat(String(body.size ?? "").trim());
  } catch {
    size = NaN;
  }
  if (!Number.isFinite(size)) {
    return res.status(400).type("text/plain").send("invalid size");
  }

  let price = null;
  if (body.price != null && String(body.price).trim() !== "") {
    price = Number.parseFloat(String(body.price).trim());
    if (!Number.isFinite(price)) {
      return res.status(400).type("text/plain").send("invalid price");
    }
  }

  const mid = String(body.market_id ?? "").trim();
  const d = markets.detail(mid);
  if (!d) {
    return res.status(404).type("text/plain").send("unknown market_id");
  }
  const decimals = quoteDecimalsForQuote(d.quote);
  const now = Math.floor(Date.now() / 1000);

  try {
    const { order, trades } = await matching.submit(mid, side, orderType, price, size, now);
    res.json({
      order: orderToJson(order, decimals),
      trades: trades.map((t) => tradeToJson(t, decimals)),
    });
  } catch (e) {
    if (e instanceof MatchError) {
      if (e.code === "BAD_REQUEST") return res.status(400).type("text/plain").send(e.message);
      if (e.code === "NOT_FOUND") return res.status(404).type("text/plain").send("not found");
    }
    throw e;
  }
});

app.delete("/api/v1/orders/:id", async (req, res) => {
  let id = req.params.id?.trim();
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
    return res.status(400).type("text/plain").send("invalid order id");
  }
  id = id.toLowerCase();
  try {
    await matching.cancel(id);
    return res.status(204).end();
  } catch (e) {
    if (e instanceof MatchError) {
      if (e.code === "BAD_REQUEST") return res.status(400).type("text/plain").send(e.message);
      if (e.code === "NOT_FOUND") return res.status(404).type("text/plain").send("not found");
    }
    throw e;
  }
});

app.get("/api/v1/staking/info", async (_req, res) => {
  const stakingAddr = state.zedx_staking_address;
  if (!stakingAddr || stakingAddr === "0x0000000000000000000000000000000000000000") {
    return res.status(503).json({ error: "ZEDX_STAKING_ADDRESS not configured" });
  }
  try {
    const { getStakingInfo } = await import("./stakingInfo.js");
    const info = await getStakingInfo(state.rpc_url, stakingAddr, state.zedx_token_address);
    res.json(info);
  } catch (e) {
    res.status(502).json({ error: String(e) });
  }
});

app.get("/api/v1/staking/user/:address", async (req, res) => {
  const stakingAddr = state.zedx_staking_address;
  if (!stakingAddr || stakingAddr === "0x0000000000000000000000000000000000000000") {
    return res.status(503).json({ error: "ZEDX_STAKING_ADDRESS not configured" });
  }
  try {
    const { getUserStakeInfo } = await import("./stakingInfo.js");
    const info = await getUserStakeInfo(state.rpc_url, stakingAddr, req.params.address);
    res.json(info);
  } catch (e) {
    res.status(502).json({ error: String(e) });
  }
});

app.use((_req, res) => {
  res.status(404).type("text/plain").send("not found");
});

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

markets.on("broadcast", (json) => {
  for (const client of wss.clients) {
    if (client.readyState === 1) {
      try {
        client.send(json);
      } catch {
        /* ignore */
      }
    }
  }
});

server.on("upgrade", (req, socket, head) => {
  const path = req.url?.split("?")[0] ?? "";
  if (path === "/ws/markets" || path.startsWith("/ws/markets")) {
    wss.handleUpgrade(req, socket, head, (ws) => {
      const overview = markets.overview();
      ws.send(JSON.stringify({ type: "snapshot", overview }));
      wss.emit("connection", ws, req);
    });
  } else {
    socket.destroy();
  }
});

const host = envStr("BIND_HOST", "0.0.0.0");
const port = envU64("PORT", 5000);

let isServerRunning = false;
let marketEngineStarted = false;

/**
 * Call this function manually (e.g. from a UI button click or custom startup script) 
 * to boot up the HTTP server and market engine.
 */
export function startServer() {
  if (isServerRunning) {
    console.log("⚠️ Server is already running.");
    return server;
  }

  if (!marketEngineStarted) {
    markets.start();
    marketEngineStarted = true;
  }

  return new Promise((resolve) => {
    server.listen(port, host, () => {
      isServerRunning = true;
      console.log(`🚀 Server and market engine started on http://${host}:${port}`);
      resolve(server);
    });
  });
}

export function stopServer() {
  if (!isServerRunning) return;
  server.close(() => {
    isServerRunning = false;
    console.log("🛑 Server stopped.");
  });
}

export default app;