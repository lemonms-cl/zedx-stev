"use client";

import React, { useState } from 'react';
import './Hero.css';

export const Hero: React.FC = () => {
  const [balance, setBalance] = useState<number>(348760.55);
  const [activeTab, setActiveTab] = useState<'overview' | 'send' | 'receive'>('overview');

  return (
    <section className="zedx-hero-container">
      {/* Top Main Section: Left Text + Right Vertical Smartphone */}
      <div className="zedx-hero-main-grid">
        
        {/* LEFT SIDE: Citibank-inspired Typography & Content */}
        <div className="zedx-hero-text-content">
          <div className="zedx-brand-badge">
            <span className="zedx-badge-dot"></span>
            NEXT-GEN CRYPTO BANKING & ASSET MANAGEMENT
          </div>

          <h1 className="zedx-citi-title">
            FINANCIAL FREEDOM. <br />
            <span className="zedx-text-crimson">REDEFINED FOR WEB3.</span>
          </h1>

          <p className="zedx-citi-subtitle">
            Experience enterprise-grade digital asset custody, zero-latency settlement, and high-yield staking powered by the ZedX decentralized banking protocol.
          </p>

          <div className="zedx-feature-pills">
            <div className="zedx-pill">
              <span className="zedx-pill-icon">⚡</span> Instant L2 Settlement
            </div>
            <div className="zedx-pill">
              <span className="zedx-pill-icon">🛡️</span> Multi-Sig Vault Security
            </div>
            <div className="zedx-pill">
              <span className="zedx-pill-icon">📈</span> Up to 14.2% APY Yield
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Upright Vertical Smartphone Container */}
        <div className="zedx-phone-wrapper">
          <div className="zedx-phone-body">
            {/* Camera Cutout */}
            <div className="zedx-phone-camera"></div>
            
            {/* Phone Screen UI */}
            <div className="zedx-phone-screen">
              {/* Status Bar */}
              <div className="zedx-phone-status-bar">
                <span>09:41</span>
                <span className="zedx-status-icons">📶 5G 🔋 98%</span>
              </div>

              {/* Bank Header */}
              <div className="zedx-app-header">
                <span className="zedx-app-title">ZEDX BANK</span>
                <span className="zedx-app-bell">🔔</span>
              </div>

              {/* Balance Card */}
              <div className="zedx-app-card">
                <span className="zedx-card-label">TOTAL PORTFOLIO VALUE</span>
                <h2 className="zedx-card-balance">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                <div className="zedx-card-change">+12.4% this month</div>
              </div>

              {/* Navigation Tabs */}
              <div className="zedx-app-tabs">
                <button 
                  className={`zedx-app-tab ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`zedx-app-tab ${activeTab === 'send' ? 'active' : ''}`}
                  onClick={() => setActiveTab('send')}
                >
                  Send
                </button>
                <button 
                  className={`zedx-app-tab ${activeTab === 'receive' ? 'active' : ''}`}
                  onClick={() => setActiveTab('receive')}
                >
                  Receive
                </button>
              </div>

              {/* Dynamic Crypto Asset List */}
              <div className="zedx-crypto-list">
                <div className="zedx-crypto-item">
                  <div className="zedx-crypto-icon btc">₿</div>
                  <div className="zedx-crypto-info">
                    <span className="zedx-crypto-name">Bitcoin</span>
                    <span className="zedx-crypto-amount">4.25 BTC</span>
                  </div>
                  <div className="zedx-crypto-value">$284,500.00</div>
                </div>

                <div className="zedx-crypto-item">
                  <div className="zedx-crypto-icon eth">Ξ</div>
                  <div className="zedx-crypto-info">
                    <span className="zedx-crypto-name">Ethereum</span>
                    <span className="zedx-crypto-amount">18.5 ETH</span>
                  </div>
                  <div className="zedx-crypto-value">$64,260.55</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: Flat 2D Action Buttons Placed Below Both Parts */}
      <div className="zedx-hero-bottom-actions">
        <button 
          className="zedx-btn-flat zedx-btn-primary"
          onClick={() => setBalance(prev => prev + 1000)}
        >
          Open Free ZedX Account
        </button>
        
        <button className="zedx-btn-flat zedx-btn-secondary">
          Explore Protocol Documentation
        </button>
      </div>
    </section>
  );
};

export default Hero;