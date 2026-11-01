"use client";

import { useEffect, useState } from "react";
import { defineChain } from "viem";
import type { ApiConfig } from "@/types";
import { ConfigProvider } from "@/context/ConfigContext";
import { WalletProvider } from "@/wallet/WalletContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { MarketsStreamProvider } from "@/context/MarketsStreamContext";
import { PaperTradeProvider } from "@/context/PaperTradeContext";

// Startup screen — shown once per browser session
const STARTUP_SHOWN_KEY = "zedx_startup_shown";

const STARTUP_STEPS = [
  { text: "Connecting to Polygon network...", duration: 2000 },
  { text: "Verifying smart contracts...",     duration: 2500 },
  { text: "Loading market data...",          duration: 2000 },
  { text: "Syncing price feeds...",          duration: 2000 },
  { text: "Almost there...",                 duration: 1500 },
];

function StartupScreen({ onDone }: { onDone: () => void }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let elapsed = 0;
    const total = STARTUP_STEPS.reduce((s, x) => s + x.duration, 0);
    let stepStart = 0;
    const runStep = (idx: number) => {
      if (idx >= STARTUP_STEPS.length) {
        setProgress(100);
        setTimeout(() => onDone(), 300);
        return;
      }
      setStepIdx(idx);
      const step = STARTUP_STEPS[idx];
      const interval = setInterval(() => {
        elapsed += 50;
        setProgress(Math.min((elapsed / total) * 100, 100));
      }, 50);
      setTimeout(() => {
        clearInterval(interval);
        stepStart += step.duration;
        runStep(idx + 1);
      }, step.duration);
    };
    runStep(0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const currentText = STARTUP_STEPS[stepIdx]?.text ?? "Almost there...";

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#060c18" }}>
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(61,255,160,0.08) 0%, transparent 70%)" }} />
      <div className="relative flex flex-col items-center gap-8 px-8 text-center">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="ZedX" className="h-12 w-12 rounded-2xl object-contain"
            style={{ filter: "drop-shadow(0 0 16px rgba(61,255,160,0.5))" }} />
          <div className="text-left">
            <div className="text-2xl font-black tracking-wider">
              <span style={{ color: "#3dffa0" }}>ZED</span>
              <span className="text-white">X</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.25em] font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
              DeFi Platform
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium transition-all duration-500" style={{ color: "#3dffa0" }}>
            {currentText}
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Polygon Mainnet</p>
        </div>
        <div className="w-64 overflow-hidden rounded-full" style={{ height: 3, background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, #3dffa0, #38bdf8)", boxShadow: "0 0 8px rgba(61,255,160,0.6)" }} />
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#3dffa0", animation: `dotPulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

async function loadConfig(): Promise<ApiConfig> {
  const base = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
  const url = base ? `${base}/api/v1/config` : "/api/v1/config";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`config ${res.status}`);
  return res.json() as Promise<ApiConfig>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [cfg, setCfg] = useState<ApiConfig | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showStartup, setShowStartup] = useState<boolean | null>(null); // null = deciding

  useEffect(() => {
    const shown = sessionStorage.getItem(STARTUP_SHOWN_KEY) === "1";
    loadConfig()
      .then(config => {
        setCfg(config);
        setShowStartup(!shown);
      })
      .catch(() => {
        setLoadError("Could not load API config. Make sure the server is running on port 5000.");
        setShowStartup(false);
      });
  }, []);

  // Waiting for config
  if (showStartup === null) return null;

  if (showStartup) {
    return (
      <StartupScreen onDone={() => {
        sessionStorage.setItem(STARTUP_SHOWN_KEY, "1");
        setShowStartup(false);
      }} />
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-sm rounded-xl border border-white/[0.06] bg-[rgba(12,14,24,0.7)] p-8 text-center backdrop-blur-xl">
          <h2 className="mb-2 text-base font-semibold">Configuration error</h2>
          <p className="m-0 text-sm leading-relaxed text-white/55">{loadError}</p>
        </div>
      </div>
    );
  }

  if (!cfg) return null;

  const chain = defineChain({
    id: cfg.chain_id,
    name: cfg.chain_id === 137 ? "Polygon" : cfg.chain_id === 80002 ? "Polygon Amoy" : "ZedX Network",
    nativeCurrency: cfg.chain_id === 137 || cfg.chain_id === 80002
      ? { name: "POL", symbol: "POL", decimals: 18 }
      : { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: { default: { http: [cfg.rpc_url] } },
    blockExplorers: cfg.chain_id === 137
      ? { default: { name: "Polygonscan", url: "https://polygonscan.com" } }
      : cfg.chain_id === 80002
      ? { default: { name: "Amoy Polygonscan", url: "https://amoy.polygonscan.com" } }
      : undefined,
  });

  return (
    <ConfigProvider value={cfg}>
      <WalletProvider chain={chain} rpcUrl={cfg.rpc_url}>
        <FavoritesProvider>
          <MarketsStreamProvider>
            <PaperTradeProvider>
              {children}
            </PaperTradeProvider>
          </MarketsStreamProvider>
        </FavoritesProvider>
      </WalletProvider>
    </ConfigProvider>
  );
}