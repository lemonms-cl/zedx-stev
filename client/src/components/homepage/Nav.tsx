"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import './Nav.css';

export const Nav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Self-Custodial Swap', href: '/app' },
    { name: 'Staking Vaults', href: '/app' },
    { name: 'Cross-Chain Bridge', href: '/app' },
    { name: 'ZedX L2 Explorer', href: '/app' },
    { name: 'Yield & Rates', href: '/app' },
  ];

  return (
    <nav className="zedx-nav-container">
      <div className="zedx-nav-inner">
        
        {/* 1. LEFT ZONE (300px width reserved for Logo) */}
        <div className="zedx-nav-logo-zone">
          <Link href="/" className="zedx-nav-logo-link">
            ZED<span className="zedx-nav-red">X</span>
            <span className="zedx-nav-logo-sub">BANK</span>
          </Link>
        </div>

        {/* 2. CENTER/RIGHT NAVIGATION LINKS (Desktop) */}
        <div className="zedx-nav-links">
          {navLinks.map((link, idx) => (
            <Link key={idx} href={link.href} className="zedx-nav-link-item">
              {link.name}
            </Link>
          ))}
        </div>

        {/* 3. CTA BUTTON (Sign In) */}
        <div className="zedx-nav-cta-container">
          <Link href="/app" className="zedx-nav-signin-btn">
            Sign In
          </Link>
        </div>

        {/* MOBILE HAMBURGER TOGGLE */}
        <button 
          className="zedx-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="zedx-mobile-drawer">
          {navLinks.map((link, idx) => (
            <Link 
              key={idx} 
              href={link.href} 
              className="zedx-mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/app" 
            className="zedx-mobile-signin-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;