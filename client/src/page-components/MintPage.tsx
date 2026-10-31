"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { formatEther, parseEther, isAddress, zeroAddress, createPublicClient, custom, http, fallback } from "viem";
import { zedxAbi } from "@/abi/zedx";
import { useWallet } from "@/wallet/WalletContext";
import { useConfig } from "@/context/ConfigContext";
import { SwapShell, Card, Label, BigInput, ActionBtn, ConnectBtn, TxStatus } from "@/components/SwapPanel";

const POLYGON_RPCS = [
  "https://polygon-bor-rpc.publicnode.com",
  "https://rpc.ankr.com/polygon",
  "https://polygon.llamarpc.com",
];

function isZeroAddr(a: string) {
  return !isAddress(a) || a.toLowerCase() === zeroAddress;
}

export function MintPage() {
  const cfg = useConfig();
  const { address, walletChainId, publicClient, walletClient, chain, openConnectModal, eip1193Provider } = useWallet();
  const tokenAddress = cfg.zedx_token_address as `0x${string}`;
  const tokenReady   = !isZeroAddr(cfg.zedx_token_address);
  const wrongChain   = Boolean(address) && walletChainId !== undefined && walletChainId !== cfg.chain_id;

  const [amountIn, setAmountIn]       = useState("100");
  const [balance, setBalance]         = useState<bigint | undefined>();
  const [totalSupply, setTotalSupply] = useState<bigint | undefined>();
  const [maxSupply, setMaxSupply]     = useState<bigint | undefined>();
  const [readError, setReadError]     = useState<string | null>(null);
  const [txPending, setTxPending]     = useState(false);
  const [txHash, setTxHash]           = useState<string | null>(null);
  const [txError, setTxError]         = useState<string | null>(null);

  const readClient = useMemo(() => {
    if (eip1193Provider) {
      try { return createPublicClient({ chain, transport: custom(eip1193Provider as Parameters<typeof custom>[0]) }); }
      catch { /* fall through */ }
    }
    return createPublicClient({ chain, transport: fallback(POLYGON_RPCS.map(url => http(url))) });
  }, [eip1193Provider, chain]);

  const refresh = useCallback(async () => {
    if (!tokenReady) return;
    setReadError(null);
    const reader = address ?? zeroAddress;
    try {
      const [max, tot, bal] = await Promise.all([
        readClient.readContract({ address: tokenAddress, abi: zedxAbi, functionName: "MAX_SUPPLY" }),
        readClient.readContract({ address: tokenAddress, abi: zedxAbi, functionName: "totalSupply" }),
        readClient.readContract({ address: tokenAddress, abi: zedxAbi, functionName: "balanceOf", args: [reader] }),
      ]);
      setMaxSupply(max as bigint);
      setTotalSupply(tot as bigint);
      setBalance(address ? (bal as bigint) : undefined);
    } catch (e) { setReadError(e instanceof Error ? e.message : "Failed to read contract"); }
  }, [tokenReady, tokenAddress, readClient, address]);

  useEffect(() => { void refresh(); }, [refresh]);

  const parsedAmount = useMemo(() => {
    try { return parseEther(amountIn || "0"); } catch { return 0n; }
  }, [amountIn]);

  const canMint = tokenReady && !!address && !!walletClient && !wrongChain && parsedAmount > 0n;

  async function onMint() {
    if (!canMint || !address || !walletClient) return;
    setTxError(null); setTxHash(null); setTxPending(true);
    try {
      const hash = await walletClient.writeContract({
        address: tokenAddress, abi: zedxAbi, functionName: "mintWithEth",
        args: [parsedAmount], account: address, chain,
      });
      setTxHash(hash);
      await publicClient.waitForTransactionReceipt({ hash });
      await refresh();
    } catch (e) { setTxError(e instanceof Error ? e.message : "Transaction failed"); }
    finally { setTxPending(false); }
  }

  const supplyPct = maxSupply && totalSupply ? Number((totalSupply * 100n) / maxSupply) : 0;

  return (
    <SwapShell>
      <h2 className="mb-5 text-lg font-bold text-white">Mint ZEDX</h2>
      {!tokenReady && <Card className="mb-4"><p className="text-sm text-white/60">Contract not configured. Set <code className="text-[#3dffa0]">ZEDX_TOKEN_ADDRESS</code> in <code className="text-[#3dffa0]">.env</code> and restart the server.</p></Card>}
      {readError && <Card className="mb-4"><p className="mb-2 text-sm text-red-400">Failed to load contract data: {readError}</p><button onClick={() => void refresh()} className="text-xs text-[#3dffa0] underline">Retry</button></Card>}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <Card><p className="mb-1 text-xs text-white/45 uppercase tracking-wider">Mint price</p><p className="font-mono text-sm text-[#3dffa0]">Free</p></Card>
        <Card><p className="mb-1 text-xs text-white/45 uppercase tracking-wider">Your balance</p><p className="font-mono text-sm text-white">{balance != null ? `${formatEther(balance)} ZEDX` : "—"}</p></Card>
      </div>
      {maxSupply != null && totalSupply != null && (
        <Card className="mb-4">
          <p className="mb-1 text-xs text-white/45 uppercase tracking-wider">Supply</p>
          <p className="mb-2 font-mono text-sm text-white/80">{formatEther(totalSupply)} / {formatEther(maxSupply)} ZEDX</p>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full rounded-full" style={{ width: `${supplyPct}%`, background: "linear-gradient(90deg,#3dffa0,#38bdf8)" }} />
          </div>
        </Card>
      )}
      <Card className="mb-3">
        <Label>ZEDX to mint</Label>
        <BigInput value={amountIn} onChange={setAmountIn} />
        <p className="mt-2 text-xs text-white/45">Free — only a small gas fee applies</p>
      </Card>
      {!address ? <ConnectBtn onClick={openConnectModal} /> : wrongChain ? <ActionBtn disabled>Wrong network</ActionBtn> : <ActionBtn onClick={onMint} loading={txPending} disabled={!canMint}>Mint ZEDX</ActionBtn>}
      <TxStatus hash={txHash} error={txError} chainId={cfg.chain_id} />
    </SwapShell>
  );
}
