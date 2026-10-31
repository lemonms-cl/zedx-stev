"use client";

import type { WalletId } from "./walletCatalog";

// In Next.js, public assets are served from /public — no BASE_URL needed
const WALLET_SRC: Record<WalletId, string> = {
  metamask: "/wallets/metamask.svg",
  coinbase: "/wallets/coinbase.png",
  trust:    "/wallets/trust.png",
  rainbow:  "/wallets/rainbow.png",
  phantom:  "/wallets/phantom.png",
  exodus:   "/wallets/exodus.png",
  binance:  "/wallets/binance.svg",
  safepal:  "/wallets/safepal.png",
};

export function WalletBrandIcon({ id }: { id: WalletId }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={WALLET_SRC[id]} alt="" width={32} height={32} className="wc-brand-img" loading="lazy" decoding="async" />;
}
