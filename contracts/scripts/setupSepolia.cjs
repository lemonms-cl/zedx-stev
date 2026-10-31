// One-shot setup script: mints ZEDX + creates Uniswap V2 liquidity pool.
// Run this AFTER deploying contracts to Sepolia:
//   npm run deploy -- --network sepolia
//   npx hardhat run contracts/scripts/setupSepolia.cjs --network sepolia --config contracts/hardhat.config.cjs

const hre = require("hardhat");

const ROUTER_ADDRESS = "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008"; // Uniswap V2 Router on Sepolia

const ROUTER_ABI = [
  "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) payable returns (uint, uint, uint)",
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function balanceOf(address) view returns (uint256)",
];

const TOKEN_ABI = [
  "function mintTo(address to, uint256 amount) external",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function balanceOf(address) view returns (uint256)",
];

async function main() {
  const tokenAddress = process.env.ZEDX_TOKEN_ADDRESS || "0xc22F38cB56933b7eF1998f27CF02c021c3A42755";
  if (!tokenAddress) throw new Error("ZEDX_TOKEN_ADDRESS not set in .env");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Setup with:", deployer.address);
  console.log("ETH balance:", hre.ethers.formatEther(
    await hre.ethers.provider.getBalance(deployer.address)
  ), "ETH\n");

  const token  = new hre.ethers.Contract(tokenAddress, TOKEN_ABI, deployer);
  const router = new hre.ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, deployer);

  // Step 1: Mint 10,000 ZEDX to deployer wallet
  console.log("Step 1: Minting 10,000 ZEDX to deployer...");
  await (await token.mintTo(deployer.address, hre.ethers.parseEther("10000"))).wait();
  const bal = await token.balanceOf(deployer.address);
  console.log("ZEDX balance:", hre.ethers.formatEther(bal), "ZEDX\n");

  // Step 2: Approve router to spend ZEDX
  const tokenAmount = hre.ethers.parseEther("1000"); // 1,000 ZEDX into pool
  const ethAmount   = hre.ethers.parseEther("0.01"); // 0.01 ETH into pool
  // This sets initial price: 0.01 ETH / 1000 ZEDX = 0.00001 ETH per ZEDX

  console.log("Step 2: Approving Uniswap router...");
  await (await token.approve(ROUTER_ADDRESS, tokenAmount)).wait();
  console.log("Approved\n");

  // Step 3: Add liquidity — creates the pool if it doesn't exist
  console.log("Step 3: Adding liquidity to Uniswap V2 pool...");
  console.log("  ZEDX:", hre.ethers.formatEther(tokenAmount));
  console.log("  ETH: ", hre.ethers.formatEther(ethAmount));

  const deadline = Math.floor(Date.now() / 1000) + 600;
  const tx = await router.addLiquidityETH(
    tokenAddress,
    tokenAmount,
    tokenAmount * 95n / 100n, // min ZEDX (5% slippage)
    ethAmount   * 95n / 100n, // min ETH  (5% slippage)
    deployer.address,
    deadline,
    { value: ethAmount }
  );
  const receipt = await tx.wait();
  console.log("Pool created! Tx:", receipt.hash);

  console.log("\n=== Setup Complete ===");
  console.log("ZEDX/ETH pool is live on Uniswap V2 Sepolia.");
  console.log("Initial price: 1 ETH = 100,000 ZEDX");
  console.log("\nNext steps:");
  console.log("1. Restart your server: npm run server");
  console.log("2. Open your app and connect MetaMask on Sepolia");
  console.log("3. Try swapping ETH <-> ZEDX");
}

main().catch(e => { console.error(e); process.exit(1); });
