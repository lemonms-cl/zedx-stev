"use client";

import { useCallback, useEffect, useState } from "react";
import { formatEther, parseEther, isAddress, zeroAddress } from "viem";
import { zedxAbi } from "@/abi/zedx";
import { zedxStakingAbi } from "@/abi/zedxStaking";
import { useWallet } from "@/wallet/WalletContext";
import { useConfig } from "@/context/ConfigContext";
import { SwapShell, Card, Label, ActionBtn, ConnectBtn, TxStatus } from "@/components/SwapPanel";

function isZeroAddr(a: string) { return !isAddress(a) || a.toLowerCase() === zeroAddress; }

type StakingInfo = { apr_bps: string; apr_pct: string; total_staked: string; reward_pool: string };

export function StakingPage() {
  const cfg = useConfig();
  const { address, walletChainId, publicClient, walletClient, chain, openConnectModal } = useWallet();
  const stakingAddress = cfg.zedx_staking_address as `0x${string}`;
  const tokenAddress   = cfg.zedx_token_address as `0x${string}`;
  const stakingReady   = !isZeroAddr(stakingAddress);
  const tokenReady     = !isZeroAddr(cfg.zedx_token_address);
  const wrongChain     = Boolean(address) && walletChainId !== undefined && walletChainId !== cfg.chain_id;

  const [serverInfo, setServerInfo]   = useState<StakingInfo | null>(null);
  const [stakedAmt, setStakedAmt]     = useState<bigint>(0n);
  const [earned, setEarned]           = useState<bigint>(0n);
  const [aprBps, setAprBps]           = useState<bigint>(0n);
  const [totalStaked, setTotalStaked] = useState<bigint>(0n);
  const [rewardPool, setRewardPool]   = useState<bigint>(0n);
  const [balance, setBalance]         = useState<bigint>(0n);
  const [allowance, setAllowance]     = useState<bigint>(0n);
  const [stakeInput, setStakeInput]   = useState("");
  const [unstakeInput, setUnstakeInput] = useState("");
  const [txPending, setTxPending]     = useState(false);
  const [txHash, setTxHash]           = useState<string | null>(null);
  const [txError, setTxError]         = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/v1/staking/info").then(r => r.ok ? r.json() : null).then(d => d && setServerInfo(d)).catch(() => {});
  }, []);

  const refresh = useCallback(async () => {
    if (!stakingReady || !tokenReady) return;
    try {
      const [apr, tot, pool] = await Promise.all([
        publicClient.readContract({ address: stakingAddress, abi: zedxStakingAbi, functionName: "aprBps" }),
        publicClient.readContract({ address: stakingAddress, abi: zedxStakingAbi, functionName: "totalStaked" }),
        publicClient.readContract({ address: stakingAddress, abi: zedxStakingAbi, functionName: "rewardPool" }),
      ]);
      setAprBps(apr); setTotalStaked(tot); setRewardPool(pool);
    } catch { /* ignore */ }
    if (!address) return;
    try {
      const [stakeInfo, bal, alw] = await Promise.all([
        publicClient.readContract({ address: stakingAddress, abi: zedxStakingAbi, functionName: "stakeOf", args: [address] }),
        publicClient.readContract({ address: tokenAddress, abi: zedxAbi, functionName: "balanceOf", args: [address] }),
        publicClient.readContract({ address: tokenAddress, abi: zedxAbi, functionName: "allowance", args: [address, stakingAddress] }),
      ]);
      setStakedAmt(stakeInfo[0]); setEarned(stakeInfo[2]); setBalance(bal); setAllowance(alw);
    } catch { /* ignore */ }
  }, [stakingReady, tokenReady, stakingAddress, tokenAddress, publicClient, address]);

  useEffect(() => { void refresh(); }, [refresh]);

  async function sendTx(fn: () => Promise<`0x${string}`>) {
    setTxError(null); setTxHash(null); setTxPending(true);
    try { const hash = await fn(); setTxHash(hash); await publicClient.waitForTransactionReceipt({ hash }); await refresh(); }
    catch (e) { setTxError(e instanceof Error ? e.message : "Transaction failed"); }
    finally { setTxPending(false); }
  }

  const onApprove = async () => {
    if (!address || !walletClient || !stakeInput) return;
    await sendTx(() => walletClient.writeContract({ address: tokenAddress, abi: zedxAbi, functionName: "approve", args: [stakingAddress, parseEther(stakeInput)], account: address, chain }));
  };
  const onStake = async () => {
    if (!address || !walletClient || !stakeInput) return;
    await sendTx(() => walletClient.writeContract({ address: stakingAddress, abi: zedxStakingAbi, functionName: "stake", args: [parseEther(stakeInput)], account: address, chain }));
    setStakeInput("");
  };
  const onUnstake = async () => {
    if (!address || !walletClient || !unstakeInput) return;
    await sendTx(() => walletClient.writeContract({ address: stakingAddress, abi: zedxStakingAbi, functionName: "unstake", args: [parseEther(unstakeInput)], account: address, chain }));
    setUnstakeInput("");
  };
  const onClaim = async () => { if (!address || !walletClient) return; await sendTx(() => walletClient.writeContract({ address: stakingAddress, abi: zedxStakingAbi, functionName: "claimReward", args: [], account: address, chain })); };
  const onExit  = async () => { if (!address || !walletClient) return; await sendTx(() => walletClient.writeContract({ address: stakingAddress, abi: zedxStakingAbi, functionName: "exitAll",     args: [], account: address, chain })); };

  const displayApr   = serverInfo?.apr_pct ?? (Number(aprBps) / 100).toFixed(2);
  const displayTotal = serverInfo?.total_staked ? formatEther(BigInt(serverInfo.total_staked)) : formatEther(totalStaked);
  const displayPool  = serverInfo?.reward_pool  ? formatEther(BigInt(serverInfo.reward_pool))  : formatEther(rewardPool);
  const needsApprove = stakeInput ? allowance < parseEther(stakeInput || "0") : false;

  return (
    <SwapShell>
      <h2 className="mb-5 text-lg font-bold text-white">Stake ZEDX</h2>
      {!stakingReady && <Card className="mb-4"><p className="text-sm text-white/60">Set <code className="text-[#3dffa0]">ZEDX_STAKING_ADDRESS</code> in <code className="text-[#3dffa0]">.env</code> and restart the server to enable staking.</p></Card>}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <Card><p className="mb-1 text-xs text-white/45 uppercase tracking-wider">APR</p><p className="font-mono text-sm text-[#3dffa0]">{displayApr}%</p></Card>
        <Card><p className="mb-1 text-xs text-white/45 uppercase tracking-wider">Total staked</p><p className="font-mono text-sm text-white/80">{Number(displayTotal).toLocaleString()}</p></Card>
        <Card><p className="mb-1 text-xs text-white/45 uppercase tracking-wider">Reward pool</p><p className="font-mono text-sm text-white/80">{Number(displayPool).toLocaleString()}</p></Card>
      </div>
      {address && (
        <div className="mb-4 grid grid-cols-2 gap-3">
          <Card><p className="mb-1 text-xs text-white/45 uppercase tracking-wider">Staked</p><p className="font-mono text-sm text-white">{formatEther(stakedAmt)} ZEDX</p></Card>
          <Card><p className="mb-1 text-xs text-white/45 uppercase tracking-wider">Pending rewards</p><p className="font-mono text-sm text-[#3dffa0]">{formatEther(earned)} ZEDX</p></Card>
          <Card className="col-span-2"><p className="mb-1 text-xs text-white/45 uppercase tracking-wider">Wallet balance</p><p className="font-mono text-sm text-white/80">{formatEther(balance)} ZEDX</p></Card>
        </div>
      )}
      {!address ? <ConnectBtn onClick={openConnectModal} /> : wrongChain ? <ActionBtn disabled>Wrong network</ActionBtn> : (
        <div className="space-y-3">
          <Card>
            <Label>Stake ZEDX</Label>
            <input value={stakeInput} onChange={e => setStakeInput(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="0.0" className="mb-3 w-full bg-transparent text-2xl font-light text-white outline-none placeholder:text-white/25" />
            {needsApprove ? <ActionBtn onClick={onApprove} loading={txPending}>Approve ZEDX</ActionBtn> : <ActionBtn onClick={onStake} loading={txPending} disabled={!stakeInput || parseEther(stakeInput || "0") === 0n || !stakingReady}>Stake</ActionBtn>}
          </Card>
          <Card>
            <Label>Unstake ZEDX</Label>
            <input value={unstakeInput} onChange={e => setUnstakeInput(e.target.value.replace(/[^0-9.]/g, ""))} placeholder="0.0" className="mb-3 w-full bg-transparent text-2xl font-light text-white outline-none placeholder:text-white/25" />
            <ActionBtn onClick={onUnstake} loading={txPending} disabled={!unstakeInput || parseEther(unstakeInput || "0") === 0n || stakedAmt === 0n}>Unstake</ActionBtn>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <ActionBtn onClick={onClaim} loading={txPending} disabled={earned === 0n}>Claim rewards</ActionBtn>
            <ActionBtn onClick={onExit}  loading={txPending} disabled={stakedAmt === 0n && earned === 0n}>Exit all</ActionBtn>
          </div>
        </div>
      )}
      <TxStatus hash={txHash} error={txError} chainId={cfg.chain_id} />
    </SwapShell>
  );
}
