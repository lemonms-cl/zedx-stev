"use client";

import React, { useState } from 'react';
import './Section1.css';

export const Section1: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState(false);

  const handleCopy = () => {
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="zedx-s1-wrapper">
      {/* -------------------------------------------------------------
          ZIGZAG ROW 1: Graphic LEFT | Text RIGHT
          Theme: What Our Users Get (Self-Custodial Banking & Multi-Chain)
         ------------------------------------------------------------- */}
      <section className="zedx-s1-row zedx-s1-zigzag-left">
        {/* Interactive App-Style Graphic (Left) */}
        <div className="zedx-s1-graphic-container">
          <div className="zedx-s1-card-ui">
            <div className="zedx-s1-card-header">
              <span className="zedx-s1-pill-status">
                <span className="zedx-s1-dot-active"></span> SELF-CUSTODY ACTIVE
              </span>
              <span className="zedx-s1-badge-network">MULTI-CHAIN L2</span>
            </div>

            <div className="zedx-s1-key-box">
              <span className="zedx-s1-label">Encrypted Key Vault ID</span>
              <div className="zedx-s1-key-display">
                <code>0x9f8F...4B2c19E</code>
                <button className="zedx-s1-copy-btn" onClick={handleCopy}>
                  {copiedKey ? '✓ Copied' : 'Copy Key'}
                </button>
              </div>
            </div>

            <div className="zedx-s1-stats-grid">
              <div className="zedx-s1-stat-item">
                <span className="zedx-s1-stat-title">Gas Subsidy</span>
                <span className="zedx-s1-stat-value text-red">100% Covered</span>
              </div>
              <div className="zedx-s1-stat-item">
                <span className="zedx-s1-stat-title">Private Key Ownership</span>
                <span className="zedx-s1-stat-value">100% User</span>
              </div>
              <div className="zedx-s1-stat-item">
                <span className="zedx-s1-stat-title">Cross-Chain Speed</span>
                <span className="zedx-s1-stat-value">&lt; 400ms</span>
              </div>
              <div className="zedx-s1-stat-item">
                <span className="zedx-s1-stat-title">Yield Protocol</span>
                <span className="zedx-s1-stat-value text-red">Auto-Compound</span>
              </div>
            </div>

            <div className="zedx-s1-card-footer">
              <span className="zedx-s1-footer-text">
                🔒 Zero third-party escrow. Your assets remain under your direct control at all times.
              </span>
            </div>
          </div>
        </div>

        {/* Text Copy (Right) */}
        <div className="zedx-s1-text-container">
          <div className="zedx-s1-section-badge">WHAT YOU GET</div>
          <h2 className="zedx-s1-heading">
            Absolute Sovereignty Over <br />
            <span className="zedx-s1-red">Your Digital Wealth.</span>
          </h2>
          <p className="zedx-s1-description">
            Traditional banking relies on centralized gatekeepers. ZedX combines the security of self-custodial cryptographic keys with the speed of a modern financial application.
          </p>

          <ul className="zedx-s1-feature-list">
            <li>
              <span className="zedx-s1-check">✓</span>
              <div>
                <strong>Direct On-Chain Settlement</strong>
                <p>Execute peer-to-peer transfers, swaps, and staking instantly without central approvals.</p>
              </div>
            </li>
            <li>
              <span className="zedx-s1-check">✓</span>
              <div>
                <strong>Zero Bank Freeze Risks</strong>
                <p>Your cryptographic private keys stay locally encrypted. No single entity can lock or audit your funds.</p>
              </div>
            </li>
            <li>
              <span className="zedx-s1-check">✓</span>
              <div>
                <strong>Unified Multi-Chain Accounts</strong>
                <p>Manage Ethereum, Arbitrum, Solana, and L2 assets from a single unified wallet interface.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------------
          ZIGZAG ROW 2: Text LEFT | Graphic RIGHT
          Theme: Why ZedX (Institutional Security & Web3 Execution)
         ------------------------------------------------------------- */}
      <section className="zedx-s1-row zedx-s1-zigzag-right">
        {/* Text Copy (Left) */}
        <div className="zedx-s1-text-container">
          <div className="zedx-s1-section-badge">WHY ZEDX</div>
          <h2 className="zedx-s1-heading">
            Engineered for High-Frequency <br />
            <span className="zedx-s1-red">Defi Operations.</span>
          </h2>
          <p className="zedx-s1-description">
            Built from the ground up to eliminate high gas fees, slow settlement times, and fragmented interfaces. ZedX is your high-performance gateway to modern decentralized finance.
          </p>

          <div className="zedx-s1-pillars">
            <div className="zedx-s1-pillar-card">
              <div className="zedx-s1-pillar-icon">⚡</div>
              <h4>Optimized Routing</h4>
              <p>Automatically routes liquidity across top decentralized pools for lowest slippage.</p>
            </div>

            <div className="zedx-s1-pillar-card">
              <div className="zedx-s1-pillar-icon">🛡️</div>
              <h4>Hardware-Grade Encryption</h4>
              <p>Protected by multi-party computation (MPC) and local secure element enclave storage.</p>
            </div>
          </div>
        </div>

        {/* Interactive App-Style Graphic (Right) */}
        <div className="zedx-s1-graphic-container">
          <div className="zedx-s1-preview-terminal">
            <div className="zedx-s1-terminal-top">
              <span className="zedx-s1-terminal-title">ZedX Execution Engine v2.4</span>
              <span className="zedx-s1-terminal-ping">● LIVE</span>
            </div>

            <div className="zedx-s1-route-box">
              <div className="zedx-s1-route-step">
                <span className="zedx-s1-step-label">INPUT</span>
                <span className="zedx-s1-step-value">10,000 USDC</span>
              </div>
              <div className="zedx-s1-route-arrow">➔</div>
              <div className="zedx-s1-route-step highlight">
                <span className="zedx-s1-step-label">ZEDX L2 VAULT</span>
                <span className="zedx-s1-step-value">Optimal Yield</span>
              </div>
              <div className="zedx-s1-route-arrow">➔</div>
              <div className="zedx-s1-route-step">
                <span className="zedx-s1-step-label">OUTPUT</span>
                <span className="zedx-s1-step-value">3.24 ETH</span>
              </div>
            </div>

            <div className="zedx-s1-metrics-bar">
              <div className="zedx-s1-metric">
                <span className="zedx-s1-metric-label">Estimated Gas:</span>
                <span className="zedx-s1-metric-val">$0.001</span>
              </div>
              <div className="zedx-s1-metric">
                <span className="zedx-s1-metric-label">Execution:</span>
                <span className="zedx-s1-metric-val text-green">Optimal</span>
              </div>
            </div>

            <button className="zedx-s1-action-btn">
              Simulate Transaction Strategy
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section1;