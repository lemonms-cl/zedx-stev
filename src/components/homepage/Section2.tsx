"use client";

import React, { useState } from 'react';
import './Section2.css';

export const Section2: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'security' | 'interop' | 'swap'>('security');

  return (
    <section className="zedx-s2-container">
      {/* Section Header */}
      <div className="zedx-s2-header">
        <span className="zedx-s2-badge">THE ZEDX ADVANTAGE</span>
        <h2 className="zedx-s2-title">
          Why ZedX Is Built For <br />
          <span className="zedx-s2-red">The Next Generation of Web3.</span>
        </h2>
        <p className="zedx-s2-subtitle">
          Combining non-custodial privacy, native dApp browser integration, and institutional-grade routing into a seamless gateway.
        </p>
      </div>

      {/* Interactive Strengths Grid */}
      <div className="zedx-s2-grid">
        {/* Card 1: Self-Custody & Privacy */}
        <div className="zedx-s2-card">
          <div className="zedx-s2-card-icon">🔑</div>
          <h3>100% Self-Custodial</h3>
          <p>
            Your seed phrase and private keys are encrypted locally on your device. We never store, track, or hold access to your secret recovery phrase.
          </p>
          <ul className="zedx-s2-list">
            <li><span>✓</span> Local hardware key encryption</li>
            <li><span>✓</span> No KYC required for wallet creation</li>
          </ul>
        </div>

        {/* Card 2: One-Click dApp Connectivity */}
        <div className="zedx-s2-card highlighted">
          <div className="zedx-s2-card-icon">🌐</div>
          <h3>Universal dApp Gateway</h3>
          <p>
            Seamlessly connect to thousands of Decentralized Applications (dApps), NFT marketplaces, and DeFi protocols across EVM and non-EVM chains.
          </p>
          <ul className="zedx-s2-list">
            <li><span>✓</span> In-app Web3 browser & extension</li>
            <li><span>✓</span> Auto-detect network configurations</li>
          </ul>
        </div>

        {/* Card 3: Native Token Swaps */}
        <div className="zedx-s2-card">
          <div className="zedx-s2-card-icon">🔄</div>
          <h3>Aggregated Liquidity Swaps</h3>
          <p>
            Swap tokens directly inside your wallet. ZedX queries multiple decentralized exchanges simultaneously to ensure optimal pricing and lowest gas impact.
          </p>
          <ul className="zedx-s2-list">
            <li><span>✓</span> Multi-DEX price aggregation</li>
            <li><span>✓</span> Built-in slippage protection</li>
          </ul>
        </div>
      </div>

      {/* Feature Deep Dive / Interactive Showcase */}
      <div className="zedx-s2-showcase">
        <div className="zedx-s2-showcase-nav">
          <button 
            className={`zedx-s2-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            🛡️ Zero-Knowledge Security
          </button>
          <button 
            className={`zedx-s2-tab ${activeTab === 'interop' ? 'active' : ''}`}
            onClick={() => setActiveTab('interop')}
          >
            ⛓️ Multi-Chain Interoperability
          </button>
          <button 
            className={`zedx-s2-tab ${activeTab === 'swap' ? 'active' : ''}`}
            onClick={() => setActiveTab('swap')}
          >
            ⚡ Gas-Optimized Execution
          </button>
        </div>

        <div className="zedx-s2-showcase-content">
          {activeTab === 'security' && (
            <div className="zedx-s2-tab-pane">
              <h4>Institutional Privacy & Local Encryption</h4>
              <p>
                Unlike traditional banking apps that monitor transactions, ZedX operates on zero-knowledge architecture. Your identity remains entirely anonymous while ensuring military-grade cryptographic protection.
              </p>
            </div>
          )}

          {activeTab === 'interop' && (
            <div className="zedx-s2-tab-pane">
              <h4>EVM & Non-EVM Multi-Chain Native</h4>
              <p>
                Switch between Ethereum, Arbitrum, Optimism, Polygon, and custom L2 networks in milliseconds without re-configuring RPC settings manually.
              </p>
            </div>
          )}

          {activeTab === 'swap' && (
            <div className="zedx-s2-tab-pane">
              <h4>Real-Time Smart Order Routing</h4>
              <p>
                Execute complex multi-hop trades with automated gas estimation and anti-frontrunning protection built right into every transaction prompt.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Section2;