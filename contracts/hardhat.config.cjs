require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
const path = require("path");

const DEPLOYER_KEY = process.env.DEPLOYER_PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Hardhat #0

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // Testnets — set DEPLOYER_PRIVATE_KEY + RPC URLs in .env to use
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: DEPLOYER_KEY ? [DEPLOYER_KEY] : [],
      chainId: 11155111,
    },
    arbitrumSepolia: {
      url: process.env.ARB_SEPOLIA_RPC_URL || "",
      accounts: DEPLOYER_KEY ? [DEPLOYER_KEY] : [],
      chainId: 421614,
    },
    // Mainnets
    arbitrum: {
      url: process.env.ARB_RPC_URL || "",
      accounts: DEPLOYER_KEY ? [DEPLOYER_KEY] : [],
      chainId: 42161,
    },
    base: {
      url: process.env.BASE_RPC_URL || "",
      accounts: DEPLOYER_KEY ? [DEPLOYER_KEY] : [],
      chainId: 8453,
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
      accounts: DEPLOYER_KEY ? [DEPLOYER_KEY] : [],
      chainId: 137,
    },
    polygonAmoy: {
      url: process.env.POLYGON_AMOY_RPC_URL || "",
      accounts: DEPLOYER_KEY ? [DEPLOYER_KEY] : [],
      chainId: 80002,
    },
  },
  etherscan: {
    apiKey: {
      sepolia:         process.env.ETHERSCAN_API_KEY || "",
      arbitrumSepolia: process.env.ARBISCAN_API_KEY  || "",
      arbitrumOne:     process.env.ARBISCAN_API_KEY  || "",
      base:            process.env.BASESCAN_API_KEY  || "",
      polygon:         process.env.POLYGONSCAN_API_KEY || "",
      polygonAmoy:     process.env.POLYGONSCAN_API_KEY || "",
    },
  },
  paths: {
    sources:   path.join(__dirname, "contracts"),
    tests:     path.join(__dirname, "test"),
    cache:     path.join(__dirname, "cache"),
    artifacts: path.join(__dirname, "artifacts"),
  },
  mocha: { timeout: 120000 },
};
