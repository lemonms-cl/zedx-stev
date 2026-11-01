import dotenv from "dotenv";
dotenv.config();

export const config = {
  rpcUrl: process.env.RPC_URL || "https://eth.llamarpc.com",
  stakingAddress: process.env.STAKING_CONTRACT_ADDRESS,
  tokenAddress: process.env.TOKEN_CONTRACT_ADDRESS,
  port: process.env.PORT || 3000,
};