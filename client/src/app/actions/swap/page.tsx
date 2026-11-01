"use client";

import { useState } from "react";
import { SwapShell, TabNav, Card, Label, BigInput, FlipBtn, ConnectBtn, ActionBtn, TokenDropdown, TxStatus, useSwapQuote, useExecuteSwap, useWallet, TOKENS, type Token } from "@/components/SwapPanel";
import { useConfig } from "@/context/ConfigContext";

export default function SwapPage() {
  const { address, openConnectModal } = useWallet();
  const cfg = useConfig();
  const [sellToken, setSellToken] = useState<Token>(TOKENS[0]);
  const [buyToken, setBuyToken]   = useState<Token | null>(null);
  const [sellAmt, setSellAmt]     = useState("");

  const { quote, loading: quoteLoading, error: quoteError } = useSwapQuote(sellToken.symbol, buyToken?.symbol ?? "", sellAmt);
  const { execute, pending, txHash, txError } = useExecuteSwap();

  function flip() {
    if (!buyToken) return;
    const prev = sellToken; setSellToken(buyToken); setBuyToken(prev); setSellAmt("");
  }

  const canSwap = !!address && !!buyToken && !!sellAmt && parseFloat(sellAmt) > 0;
  const btnLabel = quoteLoading ? "Getting quote…" : quoteError ? "No route found" : "Swap";

  return (
    <SwapShell>
      <TabNav />
      <Card>
        <Label>Sell</Label>
        <div className="flex items-center justify-between gap-3">
          <BigInput value={sellAmt} onChange={setSellAmt} />
          <TokenDropdown value={sellToken} onChange={setSellToken} exclude={buyToken?.symbol} />
        </div>
        <p className="mt-2 text-xs text-white/35">$0</p>
      </Card>
      <FlipBtn onClick={flip} />
      <Card>
        <Label>Buy</Label>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[2.6rem] font-light leading-none" style={{ color: quote ? "#fff" : "rgba(255,255,255,0.2)" }}>
            {quote ? parseFloat(quote.amount_out).toFixed(6) : "0"}
          </span>
          <TokenDropdown value={buyToken} onChange={setBuyToken} exclude={sellToken.symbol} placeholder="Select token" />
        </div>
        {quote && <p className="mt-1 text-xs text-white/35">Price impact: <span style={{ color: quote.price_impact_pct > 2 ? "#ef5350" : "#3dffa0" }}>{quote.price_impact_pct.toFixed(2)}%</span></p>}
      </Card>
      {!address ? <ConnectBtn onClick={openConnectModal} /> : <ActionBtn disabled={!canSwap || !!quoteError} loading={pending} onClick={() => quote && execute(quote)}>{btnLabel}</ActionBtn>}
      <TxStatus hash={txHash} error={txError} chainId={cfg.chain_id} />
    </SwapShell>
  );
}
