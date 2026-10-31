"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { WalletBar } from "@/components/WalletBar";
import { useConfig } from "@/context/ConfigContext";
import { MarketTicker } from "./MarketTicker";

const SWAP_ITEMS = [
  { to: "/swap",  label: "Swap",  desc: "Swap any token instantly",  icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-4 w-4"><path d="M4 10V4m0 0L2 6m2-2l2 2M12 6v6m0 0l2-2m-2 2l-2-2"/></svg> },
  { to: "/limit", label: "Limit", desc: "Trade at your target price", icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-4 w-4"><path d="M2 4h12M2 8h8M2 12h5"/></svg> },
  { to: "/buy",   label: "Buy",   desc: "Buy crypto with USD amount", icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-4 w-4"><path d="M8 2v12M3 7l5-5 5 5"/></svg> },
  { to: "/sell",  label: "Sell",  desc: "Sell tokens for USD value",  icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-4 w-4"><path d="M8 2v12M3 9l5 5 5-5"/></svg> },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5 group">
      <div className="relative transition-all duration-300 group-hover:scale-110">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="ZedX" className="h-9 w-9 rounded-xl object-contain" style={{ filter: "drop-shadow(0 0 8px rgba(61,255,160,0.4))" }} />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-base font-black tracking-wider"><span style={{ color: "#3dffa0" }}>ZED</span><span className="text-white">X</span></span>
        <span className="text-[9px] tracking-[0.2em] uppercase font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>DeFi</span>
      </div>
    </div>
  );
}

function SwapDropdown({ swapActive }: { swapActive: boolean }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(v => !v)}
        className="relative z-10 flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-semibold tracking-wide transition-all duration-200"
        style={{ color: swapActive ? "#3dffa0" : "rgba(255,255,255,0.5)" }}>
        Swap
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3 w-3 transition-transform duration-200" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          <path d="M2 4l4 4 4-4"/>
        </svg>
        {swapActive && <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full" style={{ background: "#3dffa0", boxShadow: "0 0 6px #3dffa0" }} />}
      </button>
      {open && (
        <div className="absolute left-1/2 top-full mt-2 rounded-2xl p-1.5"
          style={{ transform: "translateX(-50%)", width: 220, background: "rgba(6,12,24,0.97)", border: "1px solid rgba(61,255,160,0.2)", boxShadow: "0 8px 40px rgba(0,0,0,0.7)", backdropFilter: "blur(20px)", animation: "dropdownIn 0.18s ease forwards" }}>
          {SWAP_ITEMS.map(({ to, label, desc, icon }) => (
            <button key={to} type="button"
              onClick={() => { router.push(to); setOpen(false); }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150 hover:bg-[rgba(61,255,160,0.07)]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(61,255,160,0.1)", color: "#3dffa0" }}>{icon}</div>
              <div>
                <div className="text-sm font-bold text-white">{label}</div>
                <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>{desc}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const NAV_LINKS = [
  { to: "/mint",    label: "Mint" },
  { to: "/staking", label: "Staking" },
  { to: "/markets", label: "Markets" },
  { to: "/trade",   label: "Trade",   href: "/trade/btc-usdt" },
  { to: "/api",     label: "API" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const cfg = useConfig();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const el = document.documentElement;
      setScrollPct(Math.min((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100, 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setScrollPct(0); }, [pathname]);

  function isActive(to: string) {
    if (to === "/trade") return pathname.startsWith("/trade");
    return pathname.startsWith(to);
  }

  const swapActive = ["/swap", "/limit", "/buy", "/sell"].some(p => pathname === p);

  return (
    <div className="min-h-screen font-sans text-white" style={{ background: "#000" }}>
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 relative"
        style={{
          height: "3.75rem",
          background: scrolled ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.4)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(61,255,160,0.15)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.6)" : "none",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.5s ease, transform 0.5s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}>
        <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden" style={{ zIndex: 1 }}>
          <div className="h-full" style={{ width: `${scrollPct}%`, background: "linear-gradient(90deg, #3dffa0, #38bdf8)", boxShadow: "0 0 8px rgba(61,255,160,0.6)", transition: scrollPct === 0 ? "none" : "width 0.1s ease-out" }} />
        </div>

        <Link href="/" className="shrink-0"><Logo /></Link>

        <nav className="relative hidden items-center gap-1 sm:flex">
          {/* Home */}
          <Link href="/"
            className="relative z-10 rounded-lg px-4 py-1.5 text-sm font-semibold tracking-wide transition-all duration-200"
            style={{ color: pathname === "/" ? "#3dffa0" : "rgba(255,255,255,0.5)" }}>
            Home
            {pathname === "/" && <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full" style={{ background: "#3dffa0", boxShadow: "0 0 6px #3dffa0" }} />}
          </Link>

          <SwapDropdown swapActive={swapActive} />

          {NAV_LINKS.map(({ to, label, href }) => {
            const active = isActive(to);
            return (
              <Link key={to} href={href ?? to}
                className="relative z-10 rounded-lg px-4 py-1.5 text-sm font-semibold tracking-wide transition-all duration-200"
                style={{ color: active ? "#3dffa0" : "rgba(255,255,255,0.5)" }}>
                {label}
                {active && <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full" style={{ background: "#3dffa0", boxShadow: "0 0 6px #3dffa0" }} />}
              </Link>
            );
          })}
        </nav>

        <WalletBar expectedChainId={cfg.chain_id} />
      </header>

      <main>{children}</main>
      <MarketTicker />

      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
