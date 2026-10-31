// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title  ZedxToken — ZEDX utility token for ZedAI
/// @notice Public mint: send ETH at `mintPriceWei` per 1 full token.
///         Owner can treasury-mint, update price, pause minting, and withdraw.
contract ZedxToken is ERC20, ERC20Burnable, Ownable, Pausable, ReentrancyGuard {

    // Constants
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10 ** 18; // 1 billion

    // State
    /// @notice ETH cost in wei to mint 1 full ZEDX (1e18 token wei).
    uint256 public mintPriceWei;

    // Events
    event MintPriceUpdated(uint256 oldPrice, uint256 newPrice);
    event TokensMinted(address indexed to, uint256 tokenAmount, uint256 ethPaid);
    event TreasuryMint(address indexed to, uint256 amount);
    event Withdrawn(address indexed to, uint256 amount);

    // Errors
    error CapExceeded();
    error ZeroAmount();
    error ZeroAddress();
    error MintingPaused();
    error NativeTransferFailed();

    // Constructor
    constructor(uint256 initialMintPriceWei)
        ERC20("Zedx", "ZEDX")
        Ownable(msg.sender)
    {
        mintPriceWei = initialMintPriceWei;
    }

    // Owner functions

    /// @notice Update the public mint price.
    function setMintPrice(uint256 newPriceWei) external onlyOwner {
        uint256 old = mintPriceWei;
        mintPriceWei = newPriceWei;
        emit MintPriceUpdated(old, newPriceWei);
    }

    /// @notice Pause public minting (emergency stop).
    function pause() external onlyOwner { _pause(); }

    /// @notice Resume public minting.
    function unpause() external onlyOwner { _unpause(); }

    /// @notice Treasury / airdrop mint — no ETH required, capped by MAX_SUPPLY.
    function mintTo(address to, uint256 amount) external onlyOwner {
        if (to == address(0)) revert ZeroAddress();
        if (amount == 0) revert ZeroAmount();
        if (totalSupply() + amount > MAX_SUPPLY) revert CapExceeded();
        _mint(to, amount);
        emit TreasuryMint(to, amount);
    }

    /// @notice Withdraw accumulated ETH from public mints.
    function withdraw() external onlyOwner nonReentrant {
        uint256 bal = address(this).balance;
        if (bal == 0) revert ZeroAmount();
        (bool ok, ) = payable(owner()).call{value: bal}("");
        if (!ok) revert NativeTransferFailed();
        emit Withdrawn(owner(), bal);
    }

    // Public mint

    /// @notice Buy ZEDX by sending ETH. Excess ETH is refunded.
    function mintWithEth() external payable nonReentrant whenNotPaused {
        if (mintPriceWei == 0) revert ZeroAmount();
        if (msg.value == 0) revert ZeroAmount();

        // How many whole tokens does msg.value buy?
        uint256 tokenAmount = (msg.value * 10 ** 18) / mintPriceWei;
        if (tokenAmount == 0) revert ZeroAmount();
        if (totalSupply() + tokenAmount > MAX_SUPPLY) revert CapExceeded();

        // Exact ETH cost (avoids keeping dust)
        uint256 costWei = (tokenAmount * mintPriceWei) / 10 ** 18;
        _mint(msg.sender, tokenAmount);
        emit TokensMinted(msg.sender, tokenAmount, costWei);

        // Refund any excess
        uint256 refund = msg.value - costWei;
        if (refund > 0) {
            (bool ok, ) = payable(msg.sender).call{value: refund}("");
            if (!ok) revert NativeTransferFailed();
        }
    }

    // View helpers

    /// @notice Remaining tokens available for public mint.
    function remainingSupply() external view returns (uint256) {
        return MAX_SUPPLY - totalSupply();
    }

    /// @notice How many ZEDX tokens `ethAmount` wei would buy at current price.
    function tokensForEth(uint256 ethAmount) external view returns (uint256) {
        if (mintPriceWei == 0) return 0;
        return (ethAmount * 10 ** 18) / mintPriceWei;
    }

    /// @notice How much ETH is needed to buy `tokenAmount` full tokens.
    function ethForTokens(uint256 tokenAmount) external view returns (uint256) {
        return (tokenAmount * mintPriceWei) / 10 ** 18;
    }

    // Safety
    receive() external payable {
        revert("use mintWithEth");
    }
}
