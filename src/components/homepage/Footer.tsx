"use client";

import React, { useState, useEffect } from 'react';
import './Footer.css';

interface TickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export const Footer: React.FC = () => {
  // Live ticker data state
  const [tickers] = useState<TickerItem[]>([
    { symbol: 'BTC', name: 'Bitcoin', price: '$68,420.50', change: '+2.4%', isPositive: true },
    { symbol: 'ETH', name: 'Ethereum', price: '$3,540.25', change: '+3.8%', isPositive: true },
    { symbol: 'SOL', name: 'Solana', price: '$148.90', change: '-0.6%', isPositive: false },
    { symbol: 'ARB', name: 'Arbitrum', price: '$1.12', change: '+5.1%', isPositive: true },
    { symbol: 'OP', name: 'Optimism', price: '$2.45', change: '+1.2%', isPositive: true },
    { symbol: 'AVAX', name: 'Avalanche', price: '$28.70', change: '-1.1%', isPositive: false },
  ]);

  return (
    <footer className="zedx-footer-container">
      {/* -------------------------------------------------------------
          TOP BAR: Real-Time Live Crypto Ticker
         ------------------------------------------------------------- */}
      <div className="zedx-footer-ticker-bar">
        <div className="zedx-ticker-track">
          {/* Double map for seamless infinite scrolling effect */}
          {[...tickers, ...tickers].map((item, index) => (
            <div className="zedx-ticker-item" key={index}>
              <span className="zedx-ticker-symbol">{item.symbol}</span>
              <span className="zedx-ticker-name">{item.name}</span>
              <span className="zedx-ticker-price">{item.price}</span>
              <span className={`zedx-ticker-change ${item.isPositive ? 'pos' : 'neg'}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------------
          MAIN FOOTER: Bank-Grade Navigation & App Info
         ------------------------------------------------------------- */}
      <div className="zedx-footer-main">
        <div className="zedx-footer-content">
          
          {/* Brand & Security Notice */}
          <div className="zedx-footer-brand-col">
            <h3 className="zedx-footer-logo-text">
              ZED<span className="zedx-text-red">X</span> BANK
            </h3>
            <p className="zedx-footer-tagline">
              Non-custodial digital asset architecture. Decentralized finance execution, high-yield staking, and multi-chain settlement.
            </p>
            <div className="zedx-footer-security-badge">
              <span className="zedx-security-icon">🛡️</span>
              <span>Encrypted Local Custody & MPC Vault Support</span>
            </div>
          </div>

          {/* Nav Links Column 1: Protocol */}
          <div className="zedx-footer-col">
            <h4>Protocol & App</h4>
            <ul>
              <li><a href="#swap">Self-Custodial Swap</a></li>
              <li><a href="#vaults">Staking Vaults</a></li>
              <li><a href="#bridge">Cross-Chain Bridge</a></li>
              <li><a href="#l2">ZedX L2 Explorer</a></li>
              <li><a href="#rates">Yield & Rates</a></li>
            </ul>
          </div>

          {/* Nav Links Column 2: Governance & Docs */}
          <div className="zedx-footer-col">
            <h4>Governance & Developers</h4>
            <ul>
              <li><a href="#docs">Protocol Documentation</a></li>
              <li><a href="#audits">Security Audits</a></li>
              <li><a href="#github">GitHub Repository</a></li>
              <li><a href="#whitepaper">Banking Whitepaper</a></li>
              <li><a href="#bug-bounty">Bug Bounty ($2M)</a></li>
            </ul>
          </div>

          {/* Nav Links Column 3: Legal & Support */}
          <div className="zedx-footer-col">
            <h4>Compliance & Safety</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#risk">Risk Disclosure</a></li>
              <li><a href="#status">Network Status (100%)</a></li>
              <li><a href="#support">24/7 Security Center</a></li>
            </ul>
          </div>

        </div>

        {/* -------------------------------------------------------------
            BOTTOM SECTION: Legal Disclaimer & Copyright
           ------------------------------------------------------------- */}
        <div className="zedx-footer-disclaimer">
          <p>
            <strong>Regulatory & Self-Custody Disclaimer:</strong> ZedX operates as a fully non-custodial, decentralized software protocol. ZedX does not hold, manage, or take custody of user funds, secret recovery phrases, or private keys at any time. Digital asset balances displayed in the user interface represent on-chain balance queries executed directly against public multi-chain ledger RPC endpoints. Cryptocurrency investments and decentralized finance activities carry inherent financial risks, market volatility, and smart contract protocol risks.
          </p>
          <div className="zedx-footer-bottom-bar">
            <span>&copy; {new Date().getFullYear()} ZedX Decentralized Financial Protocol. All Rights Reserved.</span>
            <div className="zedx-footer-status">
              <span className="zedx-status-dot"></span> All Systems Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;