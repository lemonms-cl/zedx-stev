const { expect } = require("chai");
const hre = require("hardhat");

describe("ZedxToken", function () {
  let token, owner, buyer, other;
  const PRICE = hre.ethers.parseEther("0.001"); // 0.001 ETH per ZEDX

  beforeEach(async function () {
    [owner, buyer, other] = await hre.ethers.getSigners();
    const Z = await hre.ethers.getContractFactory("ZedxToken");
    token = await Z.deploy(PRICE);
    await token.waitForDeployment();
  });

  it("mints correct amount for exact ETH", async function () {
    await token.connect(buyer).mintWithEth({ value: PRICE });
    expect(await token.balanceOf(buyer.address)).to.equal(hre.ethers.parseEther("1"));
  });

  it("emits TokensMinted event", async function () {
    await expect(token.connect(buyer).mintWithEth({ value: PRICE }))
      .to.emit(token, "TokensMinted")
      .withArgs(buyer.address, hre.ethers.parseEther("1"), PRICE);
  });

  it("refunds excess ETH", async function () {
    const excess = hre.ethers.parseEther("0.0005");
    const before = await hre.ethers.provider.getBalance(buyer.address);
    const tx = await token.connect(buyer).mintWithEth({ value: PRICE + excess });
    const receipt = await tx.wait();
    const gasCost = receipt.gasUsed * receipt.gasPrice;
    const after = await hre.ethers.provider.getBalance(buyer.address);
    // Paid PRICE + excess, got excess back → net cost = PRICE + gas
    expect(before - after).to.be.closeTo(PRICE + gasCost, hre.ethers.parseEther("0.0001"));
  });

  it("owner can pause and unpause minting", async function () {
    await token.pause();
    await expect(token.connect(buyer).mintWithEth({ value: PRICE }))
      .to.be.revertedWithCustomError(token, "EnforcedPause");
    await token.unpause();
    await token.connect(buyer).mintWithEth({ value: PRICE }); // should succeed
  });

  it("owner can update mint price", async function () {
    const newPrice = hre.ethers.parseEther("0.002");
    await expect(token.setMintPrice(newPrice))
      .to.emit(token, "MintPriceUpdated")
      .withArgs(PRICE, newPrice);
    expect(await token.mintPriceWei()).to.equal(newPrice);
  });

  it("owner can treasury-mint", async function () {
    const amount = hre.ethers.parseEther("1000");
    await expect(token.mintTo(other.address, amount))
      .to.emit(token, "TreasuryMint")
      .withArgs(other.address, amount);
    expect(await token.balanceOf(other.address)).to.equal(amount);
  });

  it("owner can withdraw ETH", async function () {
    await token.connect(buyer).mintWithEth({ value: PRICE });
    const before = await hre.ethers.provider.getBalance(owner.address);
    const tx = await token.withdraw();
    const receipt = await tx.wait();
    const gasCost = receipt.gasUsed * receipt.gasPrice;
    const after = await hre.ethers.provider.getBalance(owner.address);
    expect(after - before + gasCost).to.equal(PRICE);
  });

  it("tokensForEth and ethForTokens helpers are consistent", async function () {
    const eth = hre.ethers.parseEther("0.005");
    const tokens = await token.tokensForEth(eth);
    const ethBack = await token.ethForTokens(tokens / hre.ethers.parseEther("1"));
    expect(ethBack).to.be.lte(eth);
  });

  it("non-owner cannot call owner functions", async function () {
    await expect(token.connect(buyer).setMintPrice(1))
      .to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    await expect(token.connect(buyer).pause())
      .to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
    await expect(token.connect(buyer).withdraw())
      .to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
  });
});

describe("ZedxStaking", function () {
  let token, staking, owner, alice, bob;
  const PRICE = hre.ethers.parseEther("0.001");
  const APR   = 1200; // 12%
  const STAKE = hre.ethers.parseEther("1000");
  const POOL  = hre.ethers.parseEther("100000");

  beforeEach(async function () {
    [owner, alice, bob] = await hre.ethers.getSigners();

    const Z = await hre.ethers.getContractFactory("ZedxToken");
    token = await Z.deploy(PRICE);
    await token.waitForDeployment();

    const S = await hre.ethers.getContractFactory("ZedxStaking");
    staking = await S.deploy(await token.getAddress(), APR);
    await staking.waitForDeployment();

    // Fund reward pool
    await token.mintTo(owner.address, POOL);
    await token.approve(await staking.getAddress(), POOL);
    await staking.fundRewardPool(POOL);

    // Give alice tokens to stake
    await token.mintTo(alice.address, STAKE);
    await token.connect(alice).approve(await staking.getAddress(), STAKE);
  });

  it("user can stake and unstake", async function () {
    await expect(staking.connect(alice).stake(STAKE))
      .to.emit(staking, "Staked")
      .withArgs(alice.address, STAKE);

    expect(await staking.totalStaked()).to.equal(STAKE);

    await expect(staking.connect(alice).unstake(STAKE))
      .to.emit(staking, "Unstaked")
      .withArgs(alice.address, STAKE);

    expect(await staking.totalStaked()).to.equal(0n);
  });

  it("accrues rewards over time", async function () {
    await staking.connect(alice).stake(STAKE);

    // Fast-forward 30 days
    await hre.network.provider.send("evm_increaseTime", [30 * 24 * 3600]);
    await hre.network.provider.send("evm_mine");

    const pending = await staking.pendingReward(alice.address);
    // Expected: 1000 * 12% * (30/365) ≈ 9.86 ZEDX
    expect(pending).to.be.gt(hre.ethers.parseEther("9"));
    expect(pending).to.be.lt(hre.ethers.parseEther("11"));
  });

  it("user can claim reward", async function () {
    await staking.connect(alice).stake(STAKE);
    await hre.network.provider.send("evm_increaseTime", [365 * 24 * 3600]);
    await hre.network.provider.send("evm_mine");

    const before = await token.balanceOf(alice.address);
    await staking.connect(alice).claimReward();
    const after = await token.balanceOf(alice.address);

    // ~12% of 1000 = ~120 ZEDX after 1 year
    expect(after - before).to.be.gt(hre.ethers.parseEther("119"));
    expect(after - before).to.be.lt(hre.ethers.parseEther("121"));
  });

  it("exitAll returns stake + reward", async function () {
    await staking.connect(alice).stake(STAKE);
    await hre.network.provider.send("evm_increaseTime", [365 * 24 * 3600]);
    await hre.network.provider.send("evm_mine");

    const before = await token.balanceOf(alice.address);
    await staking.connect(alice).exitAll();
    const after = await token.balanceOf(alice.address);

    // Should get back stake + ~120 reward
    expect(after - before).to.be.gt(STAKE + hre.ethers.parseEther("119"));
  });

  it("owner can update APR", async function () {
    await expect(staking.setApr(2400))
      .to.emit(staking, "AprUpdated")
      .withArgs(APR, 2400);
    expect(await staking.aprBps()).to.equal(2400);
  });
});
