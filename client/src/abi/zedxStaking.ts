export const zedxStakingAbi = [
  { type: "function", name: "zedx",        stateMutability: "view", inputs: [], outputs: [{ name: "", type: "address" }] },
  { type: "function", name: "aprBps",      stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "totalStaked", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { type: "function", name: "rewardPool",  stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  {
    type: "function", name: "pendingReward", stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function", name: "stakeOf", stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [
      { name: "amount",        type: "uint256" },
      { name: "stakedAt",      type: "uint256" },
      { name: "earned",        type: "uint256" },
      { name: "currentAprBps", type: "uint256" },
    ],
  },
  {
    type: "function", name: "stake", stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }], outputs: [],
  },
  {
    type: "function", name: "unstake", stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }], outputs: [],
  },
  { type: "function", name: "claimReward", stateMutability: "nonpayable", inputs: [], outputs: [] },
  { type: "function", name: "exitAll",     stateMutability: "nonpayable", inputs: [], outputs: [] },
  { type: "event", name: "Staked",        inputs: [{ name: "user",   type: "address", indexed: true }, { name: "amount", type: "uint256" }] },
  { type: "event", name: "Unstaked",      inputs: [{ name: "user",   type: "address", indexed: true }, { name: "amount", type: "uint256" }] },
  { type: "event", name: "RewardClaimed", inputs: [{ name: "user",   type: "address", indexed: true }, { name: "reward", type: "uint256" }] },
  { type: "event", name: "AprUpdated",    inputs: [{ name: "oldBps", type: "uint256" },                { name: "newBps", type: "uint256" }] },
] as const;
