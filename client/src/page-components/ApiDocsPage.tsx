"use client";

import { useState } from "react";

type Method = "GET" | "POST" | "DELETE" | "WS";
interface Param { name: string; in: "query" | "path" | "body"; required: boolean; type: string; desc: string; }
interface Endpoint { method: Method; path: string; summary: string; desc: string; params?: Param[]; response: string; example?: string; }

const ENDPOINTS: Endpoint[] = [
  { method: "GET", path: "/health", summary: "Health check", desc: "Returns server status.", response: `{ "status": "ok", "service": "zedx-token-api" }` },
  { method: "GET", path: "/api/v1/config", summary: "App configuration", desc: "Returns chain ID, contract addresses, and app metadata.", response: `{ "company": "ZedAI", "chain_id": 137, "rpc_url": "...", "zedx_token_address": "0x...", "zedx_staking_address": "0x..." }` },
  { method: "GET", path: "/api/v1/markets", summary: "All markets overview", desc: "Returns real-time overview of all perpetual markets.", response: `{ "markets": [{ "id": "btc-usdt", "pair": "BTC-USDT", "mark_price": 66420, "change_24h_pct": 2.4, ... }] }` },
  { method: "GET", path: "/api/v1/markets/:id", summary: "Single market detail", desc: "Returns full market detail including merged order book and recent trades.", params: [{ name: "id", in: "path", required: true, type: "string", desc: "Market ID e.g. btc-usdt" }], response: `{ "id": "btc-usdt", "book": { "asks": [...], "bids": [...] }, "trades": [...] }`, example: "GET /api/v1/markets/btc-usdt" },
  { method: "WS", path: "/ws/markets", summary: "Real-time market stream", desc: "WebSocket. Sends snapshot on connect, then tick updates every 2 seconds.", response: `{ "type": "snapshot" | "tick", "overview": { ...markets... } }`, example: `const ws = new WebSocket("ws://localhost:5000/ws/markets");` },
  { method: "GET", path: "/api/v1/orders", summary: "List orders", desc: "Returns paper trade orders.", params: [{ name: "market_id", in: "query", required: false, type: "string", desc: "Filter by market" }, { name: "open_only", in: "query", required: false, type: "boolean", desc: "Return only open orders" }], response: `{ "orders": [{ "id": "uuid", "side": "buy", "order_type": "limit", "status": "open", ... }] }` },
  { method: "POST", path: "/api/v1/orders", summary: "Submit order", desc: "Places a paper trade order.", params: [{ name: "market_id", in: "body", required: true, type: "string", desc: "Market ID" }, { name: "side", in: "body", required: true, type: "buy | sell", desc: "Order side" }, { name: "order_type", in: "body", required: true, type: "market | limit", desc: "Order type" }, { name: "size", in: "body", required: true, type: "number", desc: "Size in base currency" }, { name: "price", in: "body", required: false, type: "number", desc: "Limit price" }], response: `{ "order": { ... }, "trades": [...] }` },
  { method: "DELETE", path: "/api/v1/orders/:id", summary: "Cancel order", desc: "Cancels an open limit order.", params: [{ name: "id", in: "path", required: true, type: "UUID", desc: "Order ID" }], response: "204 No Content" },
  { method: "GET", path: "/api/v1/swap/quote", summary: "Swap quote", desc: "Returns a Uniswap V2 swap quote with calldata.", params: [{ name: "from", in: "query", required: true, type: "string", desc: "Token to sell" }, { name: "to", in: "query", required: true, type: "string", desc: "Token to buy" }, { name: "amount_in", in: "query", required: true, type: "string (wei)", desc: "Amount to sell" }, { name: "slippage_bps", in: "query", required: false, type: "number", desc: "Slippage bps (default 100)" }], response: `{ "amount_out": "...", "swap_call": { "to": "0x...", "data": "0x..." }, "value_wei": "..." }` },
  { method: "GET", path: "/api/v1/staking/info", summary: "Staking protocol info", desc: "Reads staking contract state on-chain.", response: `{ "apr_bps": "1200", "apr_pct": "12.00", "total_staked": "...", "reward_pool": "..." }` },
  { method: "GET", path: "/api/v1/staking/user/:address", summary: "User staking position", desc: "Reads a user's staking position.", params: [{ name: "address", in: "path", required: true, type: "0x address", desc: "User wallet address" }], response: `{ "staked_amount": "...", "earned": "...", "current_apr_pct": "12.00" }` },
  { method: "GET", path: "/api/v1/wallets/:address/zedx-balance", summary: "ZEDX token balance", desc: "Reads a wallet's ZEDX balance on-chain.", params: [{ name: "address", in: "path", required: true, type: "0x address", desc: "Wallet address" }, { name: "min_wei", in: "query", required: false, type: "string (wei)", desc: "Minimum balance threshold" }], response: `{ "balance_wei": "...", "balance_zedx": "1000.0", "meets_minimum": true }` },
];

const METHOD_COLORS: Record<Method, { bg: string; text: string; border: string }> = {
  GET:    { bg: "rgba(56,189,248,0.1)",  text: "#38bdf8", border: "rgba(56,189,248,0.3)"  },
  POST:   { bg: "rgba(61,255,160,0.1)",  text: "#3dffa0", border: "rgba(61,255,160,0.3)"  },
  DELETE: { bg: "rgba(239,83,80,0.1)",   text: "#ef5350", border: "rgba(239,83,80,0.3)"   },
  WS:     { bg: "rgba(251,191,36,0.1)",  text: "#fbbf24", border: "rgba(251,191,36,0.3)"  },
};

function EndpointCard({ ep }: { ep: Endpoint }) {
  const [open, setOpen] = useState(false);
  const col = METHOD_COLORS[ep.method];
  return (
    <div className="rounded-2xl overflow-hidden transition-all" style={{ background: "#0d1424", border: `1px solid ${open ? col.border : "rgba(255,255,255,0.07)"}` }}>
      <button type="button" onClick={() => setOpen(v => !v)} className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]">
        <span className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-black tracking-wider" style={{ background: col.bg, color: col.text, border: `1px solid ${col.border}` }}>{ep.method}</span>
        <code className="flex-1 font-mono text-sm text-white/90">{ep.path}</code>
        <span className="hidden text-sm text-white/45 sm:block">{ep.summary}</span>
        <svg className="h-4 w-4 shrink-0 text-white/30 transition-transform duration-200" style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      {open && (
        <div className="border-t border-white/[0.06] px-5 py-5 space-y-5">
          <p className="text-sm leading-relaxed text-white/60">{ep.desc}</p>
          {ep.params && ep.params.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "#f0c040" }}>Parameters</p>
              <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <table className="w-full text-xs">
                  <thead><tr style={{ background: "rgba(255,255,255,0.03)" }}>{["Name","In","Required","Type","Description"].map(h => <th key={h} className="px-3 py-2.5 text-left font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>{h}</th>)}</tr></thead>
                  <tbody>{ep.params.map(p => <tr key={p.name} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}><td className="px-3 py-2.5 font-mono font-semibold" style={{ color: "#3dffa0" }}>{p.name}</td><td className="px-3 py-2.5 text-white/50">{p.in}</td><td className="px-3 py-2.5"><span className="rounded px-1.5 py-0.5 text-[10px] font-semibold" style={p.required ? { background: "rgba(239,83,80,0.15)", color: "#ef5350" } : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>{p.required ? "required" : "optional"}</span></td><td className="px-3 py-2.5 font-mono text-white/60">{p.type}</td><td className="px-3 py-2.5 text-white/55">{p.desc}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          )}
          {ep.example && <div><p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "#f0c040" }}>Example</p><pre className="overflow-x-auto rounded-xl p-4 text-xs leading-relaxed" style={{ background: "#060c18", border: "1px solid rgba(255,255,255,0.07)", color: "#38bdf8" }}>{ep.example}</pre></div>}
          <div><p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "#f0c040" }}>Response</p><pre className="overflow-x-auto rounded-xl p-4 text-xs leading-relaxed" style={{ background: "#060c18", border: "1px solid rgba(255,255,255,0.07)", color: "#3dffa0" }}>{ep.response}</pre></div>
        </div>
      )}
    </div>
  );
}

const GROUPS = [
  { label: "System",  endpoints: ENDPOINTS.filter(e => ["/health", "/api/v1/config"].includes(e.path)) },
  { label: "Markets", endpoints: ENDPOINTS.filter(e => e.path.startsWith("/api/v1/markets") || e.path === "/ws/markets") },
  { label: "Orders",  endpoints: ENDPOINTS.filter(e => e.path.startsWith("/api/v1/orders")) },
  { label: "Swap",    endpoints: ENDPOINTS.filter(e => e.path.startsWith("/api/v1/swap")) },
  { label: "Staking", endpoints: ENDPOINTS.filter(e => e.path.startsWith("/api/v1/staking")) },
  { label: "Wallets", endpoints: ENDPOINTS.filter(e => e.path.startsWith("/api/v1/wallets")) },
];

export function ApiDocsPage() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const filtered = activeGroup ? GROUPS.find(g => g.label === activeGroup)?.endpoints ?? [] : ENDPOINTS;

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#060c18" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 70% at 60% 20%, rgba(56,189,248,0.1) 0%, rgba(61,255,160,0.06) 40%, transparent 70%)" }} />
      <div className="relative mx-auto max-w-[900px] px-5 pb-20 pt-10">
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(61,255,160,0.08)", border: "1px solid rgba(61,255,160,0.2)", color: "#3dffa0" }}>REST + WebSocket</div>
          <h1 className="text-4xl font-black text-white">API Reference</h1>
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          <button type="button" onClick={() => setActiveGroup(null)} className="rounded-full px-4 py-1.5 text-sm font-semibold transition-all" style={!activeGroup ? { background: "rgba(61,255,160,0.15)", color: "#3dffa0", border: "1px solid rgba(61,255,160,0.3)" } : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>All</button>
          {GROUPS.map(g => <button key={g.label} type="button" onClick={() => setActiveGroup(g.label)} className="rounded-full px-4 py-1.5 text-sm font-semibold transition-all" style={activeGroup === g.label ? { background: "rgba(61,255,160,0.15)", color: "#3dffa0", border: "1px solid rgba(61,255,160,0.3)" } : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>{g.label} <span className="ml-1.5 text-xs opacity-60">{g.endpoints.length}</span></button>)}
        </div>
        <div className="space-y-3">{filtered.map(ep => <EndpointCard key={ep.path + ep.method} ep={ep} />)}</div>
        <div className="mt-8 rounded-2xl px-5 py-4 text-sm" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", color: "rgba(255,255,255,0.6)" }}>
          <span className="font-semibold" style={{ color: "#fbbf24" }}>WebSocket note:</span>{" "}
          Connect to <code className="font-mono text-xs" style={{ color: "#38bdf8" }}>ws://localhost:5000/ws/markets</code>. Sends a full snapshot on connect, then tick updates every 2s.
        </div>
      </div>
    </div>
  );
}
