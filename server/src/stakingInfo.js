// Staking contract read helpers using ethers ABI encoding
import { Interface } from "ethers";
import { ethCall } from "./ethCall.js";

const STAKING_ABI = [
  "function aprBps() view returns (uint256)",
  "function totalStaked() view returns (uint256)",
  "function rewardPool() view returns (uint256)",
  "function pendingReward(address user) view returns (uint256)",
  "function stakeOf(address user) view returns (uint256 amount, uint256 stakedAt, uint256 earned, uint256 currentAprBps)",
];

const TOKEN_ABI = [
  "function totalSupply() view returns (uint256)",
  "function mintPriceWei() view returns (uint256)",
  "function MAX_SUPPLY() view returns (uint256)",
  "function remainingSupply() view returns (uint256)",
];

const iStaking = new Interface(STAKING_ABI);
const iToken   = new Interface(TOKEN_ABI);

async function callContract(rpcUrl, to, iface, fn, args = []) {
  const data = iface.encodeFunctionData(fn, args);
  const res  = await ethCall(rpcUrl, to, data);
  if (!res.ok) throw new Error(res.error || `RPC call failed: ${fn}`);
  return iface.decodeFunctionResult(fn, res.result);
}

export async function getStakingInfo(rpcUrl, stakingAddr, tokenAddr) {
  const [aprBps, totalStaked, rewardPool] = await Promise.all([
    callContract(rpcUrl, stakingAddr, iStaking, "aprBps"),
    callContract(rpcUrl, stakingAddr, iStaking, "totalStaked"),
    callContract(rpcUrl, stakingAddr, iStaking, "rewardPool"),
  ]);

  let tokenInfo = {};
  const zeroAddr = "0x0000000000000000000000000000000000000000";
  if (tokenAddr && tokenAddr !== zeroAddr) {
    const [totalSupply, mintPrice, maxSupply, remaining] = await Promise.all([
      callContract(rpcUrl, tokenAddr, iToken, "totalSupply"),
      callContract(rpcUrl, tokenAddr, iToken, "mintPriceWei"),
      callContract(rpcUrl, tokenAddr, iToken, "MAX_SUPPLY"),
      callContract(rpcUrl, tokenAddr, iToken, "remainingSupply"),
    ]);
    tokenInfo = {
      total_supply:     totalSupply[0].toString(),
      mint_price_wei:   mintPrice[0].toString(),
      max_supply:       maxSupply[0].toString(),
      remaining_supply: remaining[0].toString(),
    };
  }

  return {
    apr_bps:      aprBps[0].toString(),
    apr_pct:      (Number(aprBps[0]) / 100).toFixed(2),
    total_staked: totalStaked[0].toString(),
    reward_pool:  rewardPool[0].toString(),
    token: tokenInfo,
  };
}

export async function getUserStakeInfo(rpcUrl, stakingAddr, userAddress) {
  const result = await callContract(rpcUrl, stakingAddr, iStaking, "stakeOf", [userAddress]);
  return {
    address:         userAddress,
    staked_amount:   result.amount.toString(),
    staked_at:       result.stakedAt.toString(),
    earned:          result.earned.toString(),
    current_apr_bps: result.currentAprBps.toString(),
    current_apr_pct: (Number(result.currentAprBps) / 100).toFixed(2),
  };
}
