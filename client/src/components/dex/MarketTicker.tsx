"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useMarketsStream } from "@/context/MarketsStreamContext";
import { TOKEN_ICONS } from "./tokenIcons";

function fmt(n: number, d = 2) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  if (n < 0.000001) return n.toFixed(10);
  if (n < 1) return n.toFixed(6);
  return n.toLocaleString(undefined, { maximumFractionDigits: d });
}

function fmtVol(n: number) {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  return `${(n / 1e3).toFixed(0)}K`;
}

type Market = {
  id: string; pair: string; base: string;
  mark_price: number; change_24h_pct: number;
  volume_24h: number; open_interest: number; funding_1h_pct: number;
};

function Tooltip({ m, anchorRect }: { m: Market; anchorRect: DOMRect }) {
  const icon = TOKEN_ICONS[m.base];
  const pos = m.change_24h_pct >= 0;
  const centerX = anchorRect.left + anchorRect.width / 2;
  const tooltipWidth = 220;
  const left = Math.min(Math.max(centerX - tooltipWidth / 2, 8), window.innerWidth - tooltipWidth - 8);
  const bottom = window.innerHeight - anchorRect.top + 10;

  return createPortal(
    <div className="font-mono pointer-events-none"
      style={{ position: "fixed", left, bottom, width: tooltipWidth, zIndex: 99999, animation: "tickerTooltipIn 0.15s ease forwards" }}>
      <div className="rounded-2xl px-4 py-3.5"
        style={{ background: "rgba(6,12,24,0.97)", border: "1px solid #3dffa0", boxShadow: "0 0 0 1px rgba(61,255,160,0.08), 0 8px 40px rgba(0,0,0,0.8), 0 0 32px rgba(61,255,160,0.12)", backdropFilter: "blur(16px)" }}>
        <div className="flex items-center gap-2.5 mb-3">
          {icon
            ? <img src={icon} alt={m.base} width={28} height={28} className="rounded-full shrink-0" />
            : <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: "rgba(61,255,160,0.15)", color: "#3dffa0" }}>{m.base.slice(0, 2)}</div>}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white leading-tight">{m.pair}</div>
            <div className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Perpetual · USDT</div>
          </div>
          <div className="shrink-0 rounded-lg px-2 py-1 text-xs font-bold"
            style={{ background: pos ? "rgba(61,255,160,0.12)" : "rgba(239,83,80,0.12)", color: pos ? "#3dffa0" : "#ef5350", border: `1px solid ${pos ? "rgba(61,255,160,0.25)" : "rgba(239,83,80,0.25)"}` }}>
            {pos ? "+" : ""}{m.change_24h_pct.toFixed(2)}%
          </div>
        </div>
        <div className="mb-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          {[
            { label: "Price",         value: fmt(m.mark_price, m.mark_price < 10 ? 6 : 2), highlight: true },
            { label: "24h Volume",    value: fmtVol(m.volume_24h) },
            { label: "Open Interest", value: fmtVol(m.open_interest) },
            { label: "1h Funding",    value: `${m.funding_1h_pct >= 0 ? "+" : ""}${(m.funding_1h_pct * 100).toFixed(4)}%`, color: m.funding_1h_pct >= 0 ? "rgba(255,255,255,0.85)" : "#ef5350" },
          ].map(({ label, value, highlight, color }) => (
            <div key={label}>
              <div className="text-[9px] uppercase tracking-widest mb-0.5 font-semibold" style={{ color: "#f0c040" }}>{label}</div>
              <div className="text-xs font-semibold" style={{ color: color ?? (highlight ? "#fff" : "rgba(255,255,255,0.8)") }}>{value}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2.5 text-center text-[10px] font-semibold tracking-wider" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(61,255,160,0.6)" }}>
          Click to trade →
        </div>
      </div>
      <div className="absolute" style={{ bottom: -6, left: centerX - left - 6, width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid #3dffa0" }} />
    </div>,
    document.body
  );
}

export function MarketTicker() {
  const { overview, connected } = useMarketsStream();
  const router = useRouter();
  const [priceFlash, setPriceFlash] = useState<Record<string, "up" | "down" | null>>({});
  const [tooltip, setTooltip] = useState<{ market: Market; rect: DOMRect } | null>(null);
  const prevPricesRef = useRef<Record<string, number>>({});

  useEffect(() => {
    if (!overview) return;
    const flash: Record<string, "up" | "down" | null> = {};
    for (const m of overview.markets) {
      const prev = prevPricesRef.current[m.id];
      if (prev !== undefined && prev !== m.mark_price) flash[m.id] = m.mark_price > prev ? "up" : "down";
      prevPricesRef.current[m.id] = m.mark_price;
    }
    setPriceFlash(flash);
    const timer = setTimeout(() => setPriceFlash({}), 500);
    return () => clearTimeout(timer);
  }, [overview]);

  if (!overview?.markets.length) return null;
  const items = overview.markets;
  const durationSec = Math.max(items.length * 5, 60);
  const paused = tooltip !== null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 flex h-8 items-center font-mono text-xs bg-black" style={{ borderTop: "1px solid #3dffa0" }}>
        <span className="flex shrink-0 items-center gap-1.5 px-4" style={{ borderRight: "1px solid #1a1a1a" }}>
          <span className="relative flex h-2 w-2">
            {connected && <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: "#3dffa0" }} />}
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: connected ? "#3dffa0" : "#ef5350" }} />
          </span>
          <span style={{ color: connected ? "rgba(255,255,255,0.4)" : "#ef5350" }}>{connected ? "Live" : "Off"}</span>
        </span>
        <div className="flex-1 overflow-hidden">
          <div className="flex w-max items-center gap-10 whitespace-nowrap"
            style={{ animation: `tickerScroll ${durationSec}s linear infinite`, animationPlayState: paused ? "paused" : "running" }}>
            {[...items, ...items].map((m, i) => {
              const flash = priceFlash[m.id];
              const icon = TOKEN_ICONS[m.base];
              const isHovered = tooltip?.market.id === m.id;
              const pos = m.change_24h_pct >= 0;
              return (
                <span key={`${m.id}-${i}`}
                  className="flex shrink-0 items-center gap-1.5 cursor-pointer rounded px-1.5 py-0.5 transition-colors"
                  style={{ background: isHovered ? "rgba(61,255,160,0.07)" : "transparent" }}
                  onMouseEnter={(e) => { const rect = (e.currentTarget as HTMLElement).getBoundingClientRect(); setTooltip({ market: m as Market, rect }); }}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={() => router.push(`/trade/${m.id}`)}>
                  {icon
                    ? <img src={icon} alt={m.base} width={14} height={14} className="rounded-full shrink-0" />
                    : <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold" style={{ background: "rgba(61,255,160,0.15)", color: "#3dffa0" }}>{m.base.slice(0, 1)}</span>}
                  <span className="font-semibold" style={{ color: isHovered ? "#fff" : "rgba(255,255,255,0.8)" }}>{m.pair}</span>
                  <span className="transition-colors duration-300" style={{ color: flash === "up" ? "#3dffa0" : flash === "down" ? "#ef5350" : "rgba(255,255,255,0.6)" }}>
                    {fmt(m.mark_price, m.mark_price < 10 ? 6 : 2)}
                  </span>
                  <span style={{ color: pos ? "#3dffa0" : "#ef5350" }}>{pos ? "+" : ""}{m.change_24h_pct.toFixed(2)}%</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {tooltip && <Tooltip m={tooltip.market} anchorRect={tooltip.rect} />}
      <style>{`
        @keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes tickerTooltipIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}
