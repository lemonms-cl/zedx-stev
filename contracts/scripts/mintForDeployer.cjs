const hre = require("hardhat");

async function main() {
  const tokenAddress = process.env.ZEDX_TOKEN_ADDRESS || "0xc22F38cB56933b7eF1998f27CF02c021c3A42755";
  if (!tokenAddress) throw new Error("ZEDX_TOKEN_ADDRESS not set in .env");

  const [deployer] = await hre.ethers.getSigners();
  const token = await hre.ethers.getContractAt("ZedxToken", tokenAddress);

  const amount = hre.ethers.parseEther("10000");
  await (await token.mintTo(deployer.address, amount)).wait();
  console.log("Minted 10,000 ZEDX to", deployer.address);
}

main().catch(e => { console.error(e); process.exit(1); });
