const hre = require("hardhat");
const fs  = require("fs");
const path = require("path");

const DEFAULT_MINT_PRICE = hre.ethers.parseEther("0.0001");
const DEFAULT_APR_BPS    = 1200;

// Update a key=value line in .env, or append it if missing
function updateEnv(envPath, key, value) {
  let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  const regex = new RegExp(`^${key}=.*$`, "m");
  if (regex.test(content)) {
    content = content.replace(regex, `${key}=${value}`);
  } else {
    content = content.trimEnd() + `\n${key}=${value}\n`;
  }
  fs.writeFileSync(envPath, content);
}

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);
  console.log("Balance:", hre.ethers.formatEther(
    await hre.ethers.provider.getBalance(deployer.address)
  ), "ETH");

  const mintPrice = process.env.MINT_PRICE_WEI
    ? BigInt(process.env.MINT_PRICE_WEI)
    : DEFAULT_MINT_PRICE;

  const aprBps = process.env.STAKING_APR_BPS
    ? Number(process.env.STAKING_APR_BPS)
    : DEFAULT_APR_BPS;

  // Deploy ZedxToken
  const Token = await hre.ethers.getContractFactory("ZedxToken");
  const token = await Token.deploy(mintPrice);
  await token.waitForDeployment();
  const tokenAddr = await token.getAddress();
  console.log("\nZedxToken deployed:", tokenAddr);

  // Deploy ZedxStaking
  const Staking = await hre.ethers.getContractFactory("ZedxStaking");
  const staking = await Staking.deploy(tokenAddr, aprBps);
  await staking.waitForDeployment();
  const stakingAddr = await staking.getAddress();
  console.log("ZedxStaking deployed:", stakingAddr);
  console.log("APR:", aprBps / 100, "%");

  // Seed reward pool on local dev
  if (hre.network.name === "hardhat" || hre.network.name === "localhost") {
    const seed = hre.ethers.parseEther("10000");
    await (await token.mintTo(deployer.address, seed)).wait();
    await (await token.approve(stakingAddr, seed)).wait();
    await (await staking.fundRewardPool(seed)).wait();
    console.log("Reward pool seeded with 10,000 ZEDX");
  }

  // Auto-update root .env so you never have to copy addresses manually
  const envPath = path.resolve(__dirname, "../../.env");
  updateEnv(envPath, "ZEDX_TOKEN_ADDRESS",   tokenAddr);
  updateEnv(envPath, "ZEDX_STAKING_ADDRESS", stakingAddr);
  console.log("\n.env updated automatically:");
  console.log("  ZEDX_TOKEN_ADDRESS=" + tokenAddr);
  console.log("  ZEDX_STAKING_ADDRESS=" + stakingAddr);
  console.log("\nRestart the server for changes to take effect.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
