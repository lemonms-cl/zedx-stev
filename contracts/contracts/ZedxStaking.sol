// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title  ZedxStaking — Single-asset ZEDX staking with configurable APR
/// @notice Users stake ZEDX and earn ZEDX rewards at a fixed annual rate.
///         Owner funds the reward pool and can adjust the APR.
contract ZedxStaking is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Constants
    uint256 public constant PRECISION = 1e18;
    uint256 public constant SECONDS_PER_YEAR = 365 days;

    // State
    IERC20 public immutable zedx;

    /// @notice Annual percentage rate in basis points (e.g. 1200 = 12% APR).
    uint256 public aprBps;

    /// @notice Total ZEDX currently staked by all users.
    uint256 public totalStaked;

    /// @notice Reward tokens deposited by owner but not yet claimed.
    uint256 public rewardPool;

    struct StakeInfo {
        uint256 amount;        // tokens staked
        uint256 stakedAt;      // timestamp of last stake/claim
        uint256 pendingReward; // accumulated but unclaimed reward
    }

    mapping(address => StakeInfo) public stakes;

    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);
    event RewardPoolFunded(uint256 amount);
    event AprUpdated(uint256 oldBps, uint256 newBps);

    // Errors
    error ZeroAmount();
    error InsufficientStake();
    error InsufficientRewardPool();
    error NothingToClaim();

    // Constructor
    constructor(address zedxToken, uint256 initialAprBps) Ownable(msg.sender) {
        zedx = IERC20(zedxToken);
        aprBps = initialAprBps;
    }

    // Owner functions

    /// @notice Deposit ZEDX into the reward pool (owner funds rewards).
    function fundRewardPool(uint256 amount) external onlyOwner {
        if (amount == 0) revert ZeroAmount();
        zedx.safeTransferFrom(msg.sender, address(this), amount);
        rewardPool += amount;
        emit RewardPoolFunded(amount);
    }

    /// @notice Update the APR. Takes effect on next reward calculation.
    function setApr(uint256 newAprBps) external onlyOwner {
        uint256 old = aprBps;
        aprBps = newAprBps;
        emit AprUpdated(old, newAprBps);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    // User functions

    /// @notice Stake ZEDX tokens.
    function stake(uint256 amount) external nonReentrant whenNotPaused {
        if (amount == 0) revert ZeroAmount();

        // Settle any pending reward before changing stake amount
        _settle(msg.sender);

        zedx.safeTransferFrom(msg.sender, address(this), amount);
        stakes[msg.sender].amount += amount;
        totalStaked += amount;

        emit Staked(msg.sender, amount);
    }

    /// @notice Unstake ZEDX tokens (does NOT auto-claim rewards).
    function unstake(uint256 amount) external nonReentrant {
        StakeInfo storage s = stakes[msg.sender];
        if (amount == 0) revert ZeroAmount();
        if (s.amount < amount) revert InsufficientStake();

        // Settle pending reward before reducing stake
        _settle(msg.sender);

        s.amount -= amount;
        totalStaked -= amount;
        zedx.safeTransfer(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    /// @notice Claim all accumulated rewards.
    function claimReward() external nonReentrant {
        _settle(msg.sender);
        StakeInfo storage s = stakes[msg.sender];
        uint256 reward = s.pendingReward;
        if (reward == 0) revert NothingToClaim();
        if (rewardPool < reward) revert InsufficientRewardPool();

        s.pendingReward = 0;
        rewardPool -= reward;
        zedx.safeTransfer(msg.sender, reward);

        emit RewardClaimed(msg.sender, reward);
    }

    /// @notice Unstake everything and claim all rewards in one tx.
    function exitAll() external nonReentrant {
        StakeInfo storage s = stakes[msg.sender];
        _settle(msg.sender);

        uint256 stakeAmt = s.amount;
        uint256 reward   = s.pendingReward;

        if (stakeAmt == 0 && reward == 0) revert ZeroAmount();

        if (stakeAmt > 0) {
            s.amount = 0;
            totalStaked -= stakeAmt;
            emit Unstaked(msg.sender, stakeAmt);
        }

        if (reward > 0) {
            if (rewardPool < reward) revert InsufficientRewardPool();
            s.pendingReward = 0;
            rewardPool -= reward;
            emit RewardClaimed(msg.sender, reward);
        }

        uint256 total = stakeAmt + reward;
        if (total > 0) zedx.safeTransfer(msg.sender, total);
    }

    // View helpers

    /// @notice Pending reward for a user (not yet claimed).
    function pendingReward(address user) external view returns (uint256) {
        StakeInfo storage s = stakes[user];
        return s.pendingReward + _accrued(s);
    }

    /// @notice Full stake info for a user.
    function stakeOf(address user) external view returns (
        uint256 amount,
        uint256 stakedAt,
        uint256 earned,
        uint256 currentAprBps
    ) {
        StakeInfo storage s = stakes[user];
        amount = s.amount;
        stakedAt = s.stakedAt;
        earned = s.pendingReward + _accrued(s);
        currentAprBps = aprBps;
    }

    // Internal

    /// @dev Accrue rewards since last settlement without writing state.
    function _accrued(StakeInfo storage s) internal view returns (uint256) {
        if (s.amount == 0 || s.stakedAt == 0) return 0;
        uint256 elapsed = block.timestamp - s.stakedAt;
        // reward = amount * aprBps / 10000 * elapsed / SECONDS_PER_YEAR
        return (s.amount * aprBps * elapsed) / (10_000 * SECONDS_PER_YEAR);
    }

    /// @dev Settle accrued rewards into pendingReward and reset timer.
    function _settle(address user) internal {
        StakeInfo storage s = stakes[user];
        if (s.stakedAt > 0) {
            s.pendingReward += _accrued(s);
        }
        s.stakedAt = block.timestamp;
    }
}
