// Adds initial ZEDX/ETH liquidity to Uniswap V2 on Sepolia.
// Run AFTER deploying contracts:
//   npm run deploy -- --network sepolia
//   npx hardhat run contracts/scripts/addLiquidity.cjs --network sepolia --config contracts/hardhat.config.cjs

const hre = require("hardhat");

// Uniswap V2 Router on Sepolia
const ROUTER_ADDRESS = "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008";

const ROUTER_ABI = [
  "function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) payable returns (uint amountToken, uint amountETH, uint liquidity)",
  "function factory() view returns (address)",
];

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function balanceOf(address) view returns (uint256)",
];

async function main() {
  const tokenAddress = process.env.ZEDX_TOKEN_ADDRESS || "0xc22F38cB56933b7eF1998f27CF02c021c3A42755";
  if (!tokenAddress) throw new Error("ZEDX_TOKEN_ADDRESS not set in .env");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Adding liquidity with:", deployer.address);

  const token  = new hre.ethers.Contract(tokenAddress, ERC20_ABI, deployer);
  const router = new hre.ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, deployer);

  // Amount of ZEDX to add (1,000 ZEDX)
  const tokenAmount = hre.ethers.parseEther("1000");
  // Amount of ETH to pair with (0.01 ETH — sets initial price: 1 ETH = 100,000 ZEDX)
  const ethAmount   = hre.ethers.parseEther("0.01");

  const bal = await token.balanceOf(deployer.address);
  console.log("ZEDX balance:", hre.ethers.formatEther(bal));
  if (bal < tokenAmount) throw new Error("Not enough ZEDX. Mint some first.");

  // Approve router to spend ZEDX
  console.log("Approving router...");
  await (await token.approve(ROUTER_ADDRESS, tokenAmount)).wait();

  // Add liquidity
  console.log("Adding liquidity...");
  const deadline = Math.floor(Date.now() / 1000) + 600; // 10 min
  const tx = await router.addLiquidityETH(
    tokenAddress,
    tokenAmount,
    tokenAmount * 95n / 100n, // 5% slippage tolerance
    ethAmount   * 95n / 100n,
    deployer.address,
    deadline,
    { value: ethAmount }
  );
  const receipt = await tx.wait();
  console.log("Liquidity added! Tx:", receipt.hash);
  console.log("Pool created: ZEDX/ETH on Uniswap V2 Sepolia");
  console.log("\nYour .env SWAP_ROUTER_ADDRESS and WETH_ADDRESS are already correct for Sepolia.");
}

main().catch(e => { console.error(e); process.exit(1); });
