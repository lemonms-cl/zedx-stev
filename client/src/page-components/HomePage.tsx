"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMarketsStream } from "@/context/MarketsStreamContext";
import { TOKEN_ICONS } from "@/components/dex/tokenIcons";

const HERO_TOKENS = [
  { symbol: "BTC",    name: "Bitcoin",       id: "btc-usdt",    change: +2.4  },
  { symbol: "ETH",    name: "Ethereum",      id: "eth-usdt",    change: +1.8  },
  { symbol: "BNB",    name: "BNB",           id: "bnb-usdt",    change: +0.9  },
  { symbol: "SOL",    name: "Solana",        id: "sol-usdt",    change: +5.2  },
  { symbol: "XRP",    name: "XRP",           id: "xrp-usdt",    change: -1.1  },
  { symbol: "AVAX",   name: "Avalanche",     id: "avax-usdt",   change: +3.4  },
  { symbol: "DOGE",   name: "Dogecoin",      id: "doge-usdt",   change: +7.1  },
  { symbol: "ADA",    name: "Cardano",       id: "ada-usdt",    change: -0.6  },
  { symbol: "LINK",   name: "Chainlink",     id: "link-usdt",   change: +4.2  },
  { symbol: "DOT",    name: "Polkadot",      id: "dot-usdt",    change: -2.3  },
  { symbol: "MATIC",  name: "Polygon",       id: "matic-usdt",  change: +1.5  },
  { symbol: "UNI",    name: "Uniswap",       id: "uni-usdt",    change: +2.9  },
  { symbol: "ATOM",   name: "Cosmos",        id: "atom-usdt",   change: -0.8  },
  { symbol: "NEAR",   name: "NEAR Protocol", id: "near-usdt",   change: +6.3  },
  { symbol: "ARB",    name: "Arbitrum",      id: "arb-usdt",    change: +3.1  },
  { symbol: "OP",     name: "Optimism",      id: "op-usdt",     change: +2.7  },
  { symbol: "APT",    name: "Aptos",         id: "apt-usdt",    change: -1.4  },
  { symbol: "LTC",    name: "Litecoin",      id: "ltc-usdt",    change: +0.5  },
  { symbol: "INJ",    name: "Injective",     id: "inj-usdt",    change: +8.4  },
  { symbol: "SUI",    name: "Sui",           id: "sui-usdt",    change: +4.6  },
  { symbol: "TIA",    name: "Celestia",      id: "tia-usdt",    change: -3.2  },
  { symbol: "SEI",    name: "Sei",           id: "sei-usdt",    change: +5.8  },
  { symbol: "WLD",    name: "Worldcoin",     id: "wld-usdt",    change: +1.2  },
  { symbol: "JUP",    name: "Jupiter",       id: "jup-usdt",    change: +9.1  },
  { symbol: "PEPE",   name: "Pepe",          id: "pepe-usdt",   change: +12.3 },
  { symbol: "SHIB",   name: "Shiba Inu",     id: "shib-usdt",   change: -0.4  },
  { symbol: "FET",    name: "Fetch.ai",      id: "fet-usdt",    change: +6.7  },
  { symbol: "RENDER", name: "Render",        id: "render-usdt", change: +4.1  },
  { symbol: "GRT",    name: "The Graph",     id: "grt-usdt",    change: -1.9  },
  { symbol: "LDO",    name: "Lido DAO",      id: "ldo-usdt",    change: +2.2  },
  { symbol: "AAVE",   name: "Aave",          id: "aave-usdt",   change: +3.8  },
  { symbol: "CRV",    name: "Curve",         id: "crv-usdt",    change: -0.7  },
];

const TOKEN_POSITIONS = [
  { l: 2,  t: 8,  s: 56, d: 0,   dur: 7   },
  { l: 7,  t: 38, s: 48, d: 1.5, dur: 8   },
  { l: 4,  t: 68, s: 44, d: 0.8, dur: 6.5 },
  { l: 11, t: 85, s: 48, d: 2.2, dur: 7.5 },
  { l: 14, t: 55, s: 34, d: 1.0, dur: 9   },
  { l: 15, t: 20, s: 42, d: 3.1, dur: 7   },
  { l: 22, t: 92, s: 30, d: 0.4, dur: 8.5 },
  { l: 86, t: 6,  s: 54, d: 0.7, dur: 7   },
  { l: 91, t: 32, s: 46, d: 2.0, dur: 8   },
  { l: 88, t: 68, s: 40, d: 1.3, dur: 6.5 },
  { l: 94, t: 82, s: 36, d: 0.2, dur: 9   },
  { l: 35, t: 6,  s: 44, d: 2.8, dur: 7.5 },
  { l: 76, t: 13, s: 38, d: 1.6, dur: 8   },
  { l: 83, t: 90, s: 32, d: 3.4, dur: 7   },
  { l: 72, t: 72, s: 36, d: 0.6, dur: 8.5 },
  { l: 3,  t: 52, s: 32, d: 2.5, dur: 6   },
  { l: 9,  t: 15, s: 36, d: 1.9, dur: 7.5 },
  { l: 17, t: 35, s: 28, d: 0.3, dur: 9   },
  { l: 48, t: 35, s: 70, d: 1.1, dur: 7   },
  { l: 68, t: 88, s: 48, d: 2.7, dur: 8   },
  { l: 25, t: 75, s: 36, d: 3.8, dur: 6.5 },
  { l: 50, t: 55, s: 32, d: 0.9, dur: 7.5 },
  { l: 55, t: 25, s: 48, d: 2.3, dur: 8   },
  { l: 60, t: 78, s: 46, d: 1.7, dur: 9   },
  { l: 55, t: 10, s: 30, d: 3.2, dur: 7   },
  { l: 50, t: 88, s: 44, d: 0.5, dur: 8.5 },
  { l: 45, t: 65, s: 48, d: 2.1, dur: 6   },
  { l: 42, t: 20, s: 46, d: 1.4, dur: 7.5 },
  { l: 40, t: 83, s: 44, d: 3.6, dur: 8   },
  { l: 30, t: 82, s: 42, d: 0.7, dur: 9   },
  { l: 96, t: 50, s: 46, d: 2.9, dur: 7   },
  { l: 13, t: 5,  s: 30, d: 1.8, dur: 8   },
];

type HeroToken = typeof HERO_TOKENS[number];
type TokenPos  = typeof TOKEN_POSITIONS[number];

function FloatingToken({ tk, pos, liveChange, onClick }: { tk: HeroToken; pos: TokenPos; liveChange?: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const change = liveChange ?? tk.change;
  const pos24 = change >= 0;
  const tooltipLeft = pos.l > 55;

  return (
    <div className="absolute hidden lg:block"
      style={{ left: `${pos.l}%`, top: `${pos.t}%`, animation: `floatY ${pos.dur}s ease-in-out ${pos.d}s infinite`, zIndex: hovered ? 20 : 1 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <button type="button" onClick={onClick} className="relative block rounded-full transition-all duration-300"
        style={{ width: pos.s, height: pos.s, opacity: hovered ? 1 : 0.22, transform: hovered ? "scale(1.25)" : "scale(1)",
          filter: hovered ? `drop-shadow(0 0 16px ${pos24 ? "rgba(61,255,160,0.7)" : "rgba(239,83,80,0.7)"})` : "drop-shadow(0 0 8px rgba(61,255,160,0.3))" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={TOKEN_ICONS[tk.symbol]} alt={tk.symbol} width={pos.s} height={pos.s} className="rounded-full object-contain w-full h-full" />
        {hovered && <span className="absolute inset-0 rounded-full animate-ping" style={{ border: `2px solid ${pos24 ? "#3dffa0" : "#ef5350"}`, opacity: 0.5 }} />}
      </button>
      {hovered && (
        <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ [tooltipLeft ? "right" : "left"]: pos.s + 10, animation: "fadeSlideIn 0.18s ease forwards", minWidth: 140 }}>
          <div className="rounded-xl px-3 py-2.5 text-left shadow-2xl"
            style={{ background: "rgba(10,16,30,0.96)", border: `1px solid ${pos24 ? "rgba(61,255,160,0.3)" : "rgba(239,83,80,0.3)"}`, backdropFilter: "blur(12px)" }}>
            <div className="flex items-center gap-2 mb-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={TOKEN_ICONS[tk.symbol]} alt={tk.symbol} className="h-5 w-5 rounded-full" />
              <span className="font-bold text-white text-sm">{tk.symbol}</span>
            </div>
            <div className="text-xs text-white/50 mb-1.5">{tk.name}</div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold" style={{ color: pos24 ? "#3dffa0" : "#ef5350" }}>{pos24 ? "+" : ""}{change.toFixed(2)}%</span>
              <span className="text-[10px] text-white/35">24h</span>
            </div>
            <div className="mt-1.5 text-[10px] font-medium" style={{ color: pos24 ? "rgba(61,255,160,0.7)" : "rgba(239,83,80,0.7)" }}>Click to trade →</div>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2"
            style={{ [tooltipLeft ? "right" : "left"]: -5, width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent",
              [tooltipLeft ? "borderLeft" : "borderRight"]: `5px solid ${pos24 ? "rgba(61,255,160,0.3)" : "rgba(239,83,80,0.3)"}` }} />
        </div>
      )}
    </div>
  );
}

function fmtPrice(n: number) {
  if (n >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (n < 0.01) return n.toFixed(6);
  return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

function useCountUp(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!target || started.current) return;
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return { val, ref };
}

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`;
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      observer.disconnect();
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.07] last:border-0 px-3">
      <button type="button" onClick={() => setOpen(v => !v)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
        <span className="text-base font-medium text-white/90">{q}</span>
        <span className="shrink-0 text-white/40 transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
        </span>
      </button>
      <div style={{ maxHeight: open ? "300px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <p className="pb-5 text-sm leading-relaxed text-white/55">{a}</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode; title: string; desc: string; delay: number }) {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className="rounded-2xl p-6 transition-all hover:border-white/[0.15]" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "rgba(61,255,160,0.1)", color: "#3dffa0" }}>{icon}</div>
      <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/50">{desc}</p>
    </div>
  );
}

type MarketRow = { id: string; base: string; quote: string; mark_price: number; change_24h_pct: number; max_leverage: number };
const BASE_IMG: Record<string, string> = {
  BTC: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
  ETH: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
  SOL: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png",
  XRP: "https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png",
  DOGE:"https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png",
  ARB: "https://assets.coingecko.com/coins/images/16547/thumb/photo_2023-03-29_21.47.00.jpeg",
  OP:  "https://assets.coingecko.com/coins/images/25244/thumb/Optimism.png",
};

function MarketCard({ m, delay, onClick }: { m: MarketRow; delay: number; onClick: () => void }) {
  const ref = useFadeIn(delay);
  const pos = m.change_24h_pct >= 0;
  return (
    <div ref={ref}>
      <button type="button" onClick={onClick} className="group flex w-full items-center justify-between rounded-2xl p-4 text-left transition-all hover:border-white/[0.15]" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BASE_IMG[m.base] ?? BASE_IMG.ETH} alt={m.base} className="h-9 w-9 rounded-full" />
          <div>
            <div className="font-semibold text-white">{m.base}<span className="text-white/40">/{m.quote}</span></div>
            <div className="text-xs text-white/40">Max {m.max_leverage}× leverage</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono font-semibold text-white">{fmtPrice(m.mark_price)}</div>
          <div className={`text-xs font-medium ${pos ? "text-[#3dffa0]" : "text-red-400"}`}>{pos ? "+" : ""}{m.change_24h_pct.toFixed(2)}%</div>
        </div>
      </button>
    </div>
  );
}

const SWAP_TOKENS = [
  { symbol: "ETH",  img: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png" },
  { symbol: "BTC",  img: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png" },
  { symbol: "SOL",  img: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png" },
  { symbol: "USDT", img: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png" },
];

function MiniSwapWidget() {
  const router = useRouter();
  const [from, setFrom] = useState(SWAP_TOKENS[0]);
  const [to, setTo]     = useState(SWAP_TOKENS[3]);
  const [amt, setAmt]   = useState("");
  function flip() { const t = from; setFrom(to); setTo(t); }
  return (
    <div className="w-full rounded-3xl p-5"
      style={{ background: "rgba(11,17,32,0.95)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-white">Quick Swap</span>
      </div>
      <div className="rounded-2xl p-4" style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.08)" }}>
        <p className="mb-2 text-xs text-white/50">You pay</p>
        <div className="flex items-center gap-3">
          <input value={amt} onChange={e => setAmt(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="0.0" inputMode="decimal"
            className="w-full bg-transparent text-3xl font-light text-white outline-none placeholder:text-white/20" />
          <button type="button" onClick={flip} className="flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-white"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={from.img} alt={from.symbol} className="h-5 w-5 rounded-full" />
            {from.symbol}
            <svg className="h-3 w-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        </div>
      </div>
      <div className="relative z-10 flex justify-center" style={{ marginTop: -10, marginBottom: -10 }}>
        <button type="button" onClick={flip} className="flex h-8 w-8 items-center justify-center rounded-xl text-white/60 hover:text-white transition-all"
          style={{ background: "#1a2235", border: "1px solid rgba(255,255,255,0.1)" }}>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </button>
      </div>
      <div className="rounded-2xl p-4 mb-4 -mt-4" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="mb-2 text-xs text-white/50">You receive</p>
        <div className="flex items-center gap-3">
          <span className="w-full text-3xl font-light text-white/25">0.0</span>
          <button type="button" className="flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-bold text-[#0b1120]"
            style={{ background: "linear-gradient(135deg,#3dffa0,#38bdf8)", boxShadow: "0 4px 16px rgba(61,255,160,0.3)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={to.img} alt={to.symbol} className="h-5 w-5 rounded-full" />
            {to.symbol}
            <svg className="h-3 w-3 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        </div>
      </div>
      <button type="button" onClick={() => router.push("/swap")} className="w-full rounded-2xl py-3.5 text-base font-bold text-[#060c18] transition-all hover:opacity-90"
        style={{ background: "linear-gradient(135deg,#3dffa0,#38bdf8)", boxShadow: "0 4px 24px rgba(61,255,160,0.3)" }}>
        Get Started
      </button>
    </div>
  );
}

const FEATURES = [
  { title: "Mint ZEDX",        desc: "Buy ZEDX tokens directly with ETH at a fixed price. Public mint is open — no whitelist, no waiting.", delay: 0,    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
  { title: "Stake & Earn",      desc: "Stake ZEDX and earn 12% APR. Rewards accrue every second. Claim anytime or exit with one transaction.", delay: 0.08, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg> },
  { title: "Non-Custodial",     desc: "Your keys, your crypto. We never hold your funds — connect any EVM wallet and interact directly with smart contracts.", delay: 0.16, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg> },
  { title: "Swap Tokens",       desc: "Swap any token pair instantly via Uniswap V2 routing. Live quotes, minimal slippage, no account needed.", delay: 0.24, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg> },
  { title: "Perpetual Trading", desc: "Trade 35+ perpetual markets with up to 50× leverage. Full TradingView charts, order book, and real-time funding rates.", delay: 0.32, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> },
  { title: "ZEDX Token",        desc: "The native utility token of the ZedAI ecosystem. Stake for yield, unlock fee discounts, and participate in governance.", delay: 0.40, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> },
];

const HOW_STEPS = [
  { n: "01", title: "Connect your wallet",  desc: "Connect MetaMask or any EVM wallet. No account, no email, no KYC — just your wallet address." },
  { n: "02", title: "Mint or acquire ZEDX", desc: "Buy ZEDX directly with ETH on the Mint page at a fixed price, or swap for it on the Swap page." },
  { n: "03", title: "Stake & earn yield",   desc: "Deposit ZEDX into the staking contract and earn 12% APR. Rewards accrue every second on-chain." },
  { n: "04", title: "Trade the markets",    desc: "Swap tokens or trade 35+ perpetual markets with leverage. Real-time prices, no intermediaries." },
];

const FAQS = [
  { q: "What is ZedX?", a: "ZedX is the DeFi platform of ZedAI — an innovative software company building next-generation digital solutions. ZedX lets you mint ZEDX tokens, stake for yield, swap crypto, and trade perpetual futures, all without giving up custody of your assets." },
  { q: "What is the ZEDX token?", a: "ZEDX is the native utility token of the ZedAI ecosystem. You can mint it with ETH, stake it to earn 12% APR, and use it for fee discounts and governance. Max supply is 1 billion ZEDX." },
  { q: "How does staking work?", a: "Deposit ZEDX into the staking contract and earn 12% APR. Rewards accrue every second on-chain. You can claim rewards anytime or use 'Exit All' to unstake and claim in one transaction." },
  { q: "How do I mint ZEDX?", a: "Go to the Mint page, connect your wallet, enter the amount you want to mint, and confirm the transaction. ZEDX tokens arrive in your wallet instantly." },
  { q: "Which wallets are supported?", a: "Any EIP-6963 or EIP-1193 compatible wallet: MetaMask, Coinbase Wallet, Rainbow, Trust Wallet, and more. Hardware wallets via MetaMask are also supported." },
  { q: "Is ZedX safe to use?", a: "ZedX is non-custodial — your funds never leave your wallet until you sign a transaction. Smart contracts are open-source and verifiable on-chain. Always verify contract addresses before interacting." },
  { q: "Which chains are supported?", a: "ZedX is currently deployed on Polygon Mainnet. Multi-chain support is on the roadmap." },
  { q: "What are perpetual futures?", a: "Perpetuals are derivatives that let you trade with leverage without an expiry date. You can go long or short on 35+ markets including BTC, ETH, SOL, and more." },
];

export function HomePage() {
  const { overview } = useMarketsStream();
  const router = useRouter();
  const topMarkets = (overview?.markets.slice(0, 6) ?? []) as MarketRow[];

  const vol  = useCountUp(overview ? Math.round(overview.volume_24h_total / 1e9) : 4, 2000);
  const oi   = useCountUp(overview ? Math.round(overview.total_open_interest / 1e9) : 2, 2000);
  const mkts = useCountUp(overview?.markets.length ?? 7, 1500);
  const featHeadRef = useFadeIn(0);
  const statsRef    = useFadeIn(0);
  const howHeadRef  = useFadeIn(0);
  const faqRef      = useFadeIn(0);

  return (
    <div className="overflow-x-hidden" style={{ background: "#060c18" }}>

      {/* HERO */}
      <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 70% at 60% 20%, rgba(56,189,248,0.1) 0%, rgba(61,255,160,0.06) 40%, transparent 70%)" }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        {HERO_TOKENS.map((tk, i) => {
          const pos = TOKEN_POSITIONS[i];
          if (!pos) return null;
          const live = overview?.markets.find(m => m.id === tk.id);
          return <FloatingToken key={tk.symbol} tk={tk} pos={pos} liveChange={live?.change_24h_pct} onClick={() => router.push(`/trade/${tk.id}`)} />;
        })}
        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-16 px-6 pb-20 pt-20 mt-20 lg:flex-row lg:pt-28">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="mb-5 text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
              The ZedAI<br />
              <span style={{ background: "linear-gradient(135deg,#3dffa0,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DeFi ecosystem</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/55 mx-auto lg:mx-0">Mint ZEDX, stake for yield, and trade 35+ perpetual markets — all non-custodial, powered by real-time data and the ZEDX utility token.</p>
            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <button type="button" onClick={() => router.push("/mint")} className="rounded-2xl px-7 py-3.5 text-base font-bold text-[#060c18] transition-all hover:opacity-90 hover:scale-[1.02]" style={{ background: "linear-gradient(135deg,#3dffa0,#38bdf8)", boxShadow: "0 6px 30px rgba(61,255,160,0.35)" }}>Mint ZEDX</button>
              <button type="button" onClick={() => router.push("/staking")} className="rounded-2xl border px-7 py-3.5 text-base font-semibold text-white/80 transition-all hover:text-white hover:border-white/30" style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)" }}>Start Staking</button>
            </div>
          </div>
          <div className="w-full max-w-[420px] shrink-0"><MiniSwapWidget /></div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative overflow-hidden" style={{ borderTop: "1px solid rgba(61,255,160,0.12)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(61,255,160,0.04) 0%, transparent 70%)" }} />
        <div ref={statsRef} className="relative mx-auto grid max-w-[1200px] grid-cols-2 md:grid-cols-4">
          {[
            { label: "24h Volume",    prefix: "$", suffix: "B+", ref: vol.ref,  val: vol.val,  note: "traded today" },
            { label: "Open Interest", prefix: "$", suffix: "B+", ref: oi.ref,   val: oi.val,   note: "across all markets" },
            { label: "Markets",       prefix: "",  suffix: "+",  ref: mkts.ref, val: mkts.val, note: "perpetual pairs" },
            { label: "Staking APR",   prefix: "",  suffix: "%",  ref: null,     val: null,     note: "fixed annual yield", fixed: "12" },
          ].map(({ label, prefix, suffix, ref: r, val, fixed, note }, idx) => (
            <div key={label} ref={r ?? undefined} className="group relative flex flex-col items-center justify-center py-12 text-center"
              style={{ borderRight: idx < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div className="mb-1 font-mono text-5xl font-black tracking-tight text-white transition-all duration-300 group-hover:scale-105" style={{ textShadow: "0 0 40px rgba(61,255,160,0.2)" }}>
                {fixed ?? `${prefix}${val}`}<span style={{ color: "#3dffa0" }}>{suffix}</span>
              </div>
              <div className="text-sm font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</div>
              <div className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>{note}</div>
              <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full transition-all duration-300 group-hover:w-16" style={{ background: "linear-gradient(90deg,#3dffa0,#38bdf8)" }} />
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative overflow-hidden py-32">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56,189,248,0.05) 0%, transparent 70%)" }} />
        <div className="mx-auto max-w-[1200px] px-6">
          <div ref={featHeadRef} className="mb-20 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]" style={{ background: "rgba(61,255,160,0.08)", border: "1px solid rgba(61,255,160,0.2)", color: "#3dffa0" }}>Why ZedX</div>
            <h2 className="mt-4 text-5xl font-black text-white leading-tight">One platform.<br /><span style={{ background: "linear-gradient(135deg,#3dffa0,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Full DeFi stack.</span></h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_360px_1fr] lg:gap-0 lg:items-stretch">
            <div className="flex flex-col gap-4 lg:pr-8 lg:justify-between">
              {FEATURES.slice(0, 3).map(f => <FeatureCard key={f.title} {...f} />)}
            </div>
            <div className="relative hidden lg:flex items-center justify-center" style={{ minHeight: 420 }}>
              <div className="relative" style={{ width: 340, height: 340 }}>
                <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(61,255,160,0.1)" }} />
                <div className="absolute rounded-full" style={{ inset: 30, border: "1px dashed rgba(56,189,248,0.12)" }} />
                <div className="absolute rounded-full" style={{ inset: 65, border: "1px solid rgba(255,255,255,0.05)" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg,rgba(61,255,160,0.15),rgba(56,189,248,0.15))", border: "1px solid rgba(61,255,160,0.3)", boxShadow: "0 0 40px rgba(61,255,160,0.15)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo.png" alt="ZedX" className="h-12 w-12 rounded-xl object-contain" />
                  </div>
                </div>
                {[{ img: TOKEN_ICONS.BTC, s: 0 }, { img: TOKEN_ICONS.ETH, s: 45 }, { img: TOKEN_ICONS.SOL, s: 90 }, { img: TOKEN_ICONS.BNB, s: 135 }, { img: TOKEN_ICONS.AVAX, s: 180 }, { img: TOKEN_ICONS.LINK, s: 225 }, { img: TOKEN_ICONS.UNI, s: 270 }, { img: TOKEN_ICONS.ARB, s: 315 }].map(({ img, s }) => (
                  <div key={s} className="absolute" style={{ left: "50%", top: "50%", width: 36, height: 36, marginLeft: -18, marginTop: -18, animation: `orbitOuter 20s linear infinite`, animationDelay: `${-(s / 360) * 20}s` }}>
                    <div style={{ animation: `orbitOuterReverse 20s linear infinite`, animationDelay: `${-(s / 360) * 20}s` }}>
                      <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-black" style={{ boxShadow: "0 0 12px rgba(61,255,160,0.25)" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt="" className="h-full w-full object-contain" />
                      </div>
                    </div>
                  </div>
                ))}
                {[{ img: TOKEN_ICONS.DOGE, s: 22 }, { img: TOKEN_ICONS.DOT, s: 112 }, { img: TOKEN_ICONS.NEAR, s: 202 }, { img: TOKEN_ICONS.INJ, s: 292 }].map(({ img, s }) => (
                  <div key={`i${s}`} className="absolute" style={{ left: "50%", top: "50%", width: 26, height: 26, marginLeft: -13, marginTop: -13, animation: `orbitInner 14s linear infinite`, animationDelay: `${-(s / 360) * 14}s` }}>
                    <div style={{ animation: `orbitInnerReverse 14s linear infinite`, animationDelay: `${-(s / 360) * 14}s` }}>
                      <div className="h-[26px] w-[26px] rounded-full overflow-hidden ring-1 ring-black" style={{ boxShadow: "0 0 8px rgba(56,189,248,0.25)" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt="" className="h-full w-full object-contain" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:pl-8 lg:justify-between">
              {FEATURES.slice(3).map(f => <FeatureCard key={f.title} {...f} />)}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden py-28" style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div ref={howHeadRef} className="mb-16 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div><div className="mb-2 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#38bdf8" }}>How it works</div><h2 className="text-4xl font-black text-white">Four steps.<br />Full DeFi.</h2></div>
            <p className="max-w-xs text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>No sign-up, no KYC, no custody. Mint, stake, and trade in minutes.</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0" style={{ scrollSnapType: "x mandatory" }}>
            {HOW_STEPS.map((s, i) => (
              <div key={s.n} className="relative shrink-0 w-72 lg:w-auto rounded-2xl p-6 transition-all duration-300 hover:border-white/[0.15]"
                style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.07)", scrollSnapAlign: "start" }}>
                <div className="mb-4 font-black text-6xl leading-none select-none" style={{ color: "rgba(56,189,248,0.12)" }}>{s.n}</div>
                <h3 className="mb-2 text-base font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
                {i < HOW_STEPS.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 lg:flex items-center justify-center h-6 w-6 rounded-full z-10" style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 6h8M7 3l3 3-3 3"/></svg>
                  </div>
                )}
                <div className="absolute bottom-0 left-6 right-6 h-[1px] rounded-full" style={{ background: `linear-gradient(90deg, ${i % 2 === 0 ? "#3dffa0" : "#38bdf8"}, transparent)`, opacity: 0.3 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE MARKETS */}
      {topMarkets.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-6 py-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2"><span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "#3dffa0" }} /><span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#3dffa0" }}>Live markets</span></div>
              <h2 className="text-3xl font-black text-white">Top trading pairs</h2>
            </div>
            <button type="button" onClick={() => router.push("/markets")} className="hidden items-center gap-1.5 text-sm font-semibold transition-all hover:gap-3 sm:flex" style={{ color: "#38bdf8" }}>View all <span>→</span></button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topMarkets.map((m, i) => <MarketCard key={m.id} m={m} delay={i * 0.06} onClick={() => router.push(`/trade/${m.id}`)} />)}
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section className="mx-auto max-w-[1200px] px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl px-8 py-16 text-center" style={{ background: "#0d1424", border: "1px solid rgba(61,255,160,0.2)" }}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl" style={{ background: "rgba(61,255,160,0.12)" }} />
          <div className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl" style={{ background: "rgba(56,189,248,0.12)" }} />
          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest" style={{ background: "rgba(61,255,160,0.1)", border: "1px solid rgba(61,255,160,0.25)", color: "#3dffa0" }}>Live on Polygon</div>
            <h2 className="mb-3 text-5xl font-black text-white">Start your DeFi journey.</h2>
            <p className="mx-auto mb-8 max-w-md text-lg" style={{ color: "rgba(255,255,255,0.5)" }}>Mint ZEDX, stake for yield, and trade markets — all in one platform. No account needed.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button type="button" onClick={() => router.push("/mint")} className="rounded-2xl px-10 py-4 text-base font-bold text-[#060c18] transition-all hover:opacity-90 hover:scale-[1.02]" style={{ background: "linear-gradient(135deg,#3dffa0,#38bdf8)", boxShadow: "0 8px 32px rgba(61,255,160,0.35)" }}>Mint ZEDX</button>
              <button type="button" onClick={() => router.push("/staking")} className="rounded-2xl border px-10 py-4 text-base font-semibold text-white/80 transition-all hover:text-white" style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.04)" }}>Start Staking</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto max-w-[800px] px-6 py-24">
          <div ref={faqRef} className="mb-14 text-center">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#38bdf8" }}>FAQ</div>
            <h2 className="text-4xl font-black text-white">Got questions?</h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Everything you need to know about ZedX and the ZEDX token.</p>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            {FAQS.map((f, i) => (
              <div key={f.q} style={{ borderBottom: i < FAQS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", background: "#0a0f1a" }}>
                <FaqItem q={f.q} a={f.a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes floatY { 0%,100% { transform: translateY(0px) rotate(0deg); } 33% { transform: translateY(-14px) rotate(3deg); } 66% { transform: translateY(-7px) rotate(-2deg); } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(-50%) translateX(-6px); } to { opacity: 1; transform: translateY(-50%) translateX(0); } }
        @keyframes orbitOuter { from { transform: rotate(0deg) translateX(150px); } to { transform: rotate(360deg) translateX(150px); } }
        @keyframes orbitOuterReverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes orbitInner { from { transform: rotate(0deg) translateX(95px); } to { transform: rotate(-360deg) translateX(95px); } }
        @keyframes orbitInnerReverse { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
