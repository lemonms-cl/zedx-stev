import type { Config } from "tailwindcss";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],

  theme: {
    extend: {
      // ─── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },

      // ─── Brand colour palette ─────────────────────────────────────────────
      colors: {
        // Primary accent – ZedX green
        brand: {
          DEFAULT: "#3dffa0",
          dim: "rgba(61,255,160,0.6)",
          muted: "rgba(61,255,160,0.15)",
          border: "rgba(61,255,160,0.25)",
          glow: "rgba(61,255,160,0.35)",
        },
        // Secondary accent – sky blue
        accent: {
          DEFAULT: "#38bdf8",
          muted: "rgba(56,189,248,0.12)",
        },
        // DEX teal (used in TradeEntryPanel / PairSelector / FavoritesBar)
        teal: {
          DEFAULT: "#00d9c0",
          muted: "rgba(0,217,192,0.15)",
          subtle: "rgba(0,217,192,0.12)",
        },
        // Green variants (TradeEntryPanel buy side)
        bull: {
          DEFAULT: "#3dd68c",
          muted: "rgba(61,214,140,0.2)",
        },
        // Red variants (sell side, negative change, errors)
        bear: {
          DEFAULT: "#ef5350",
          alt: "#ff5c5c",
          muted: "rgba(239,83,80,0.12)",
          border: "rgba(239,83,80,0.25)",
        },
        // Positive/negative market change colours (DEX pair rows)
        up: "#26a69a",
        down: "#ef5350",
        // Gold (ticker labels, favourites star)
        gold: "#f0c040",
        // Background layers
        bg: {
          base: "#000000",
          deep: "#020508",
          mid: "#050a0f",
          surface: "#060c18",
          card: "#0b1217",
          panel: "#0b1120",
          elevated: "#0d1424",
          overlay: "#111827",
          trade: "#121519",
          row: "#1a2235",
          input: "#060809",
          dark: "#080a0c",
          ticker: "#000000",
        },
      },

      // ─── Background gradients (as CSS variables / utilities) ───────────────
      backgroundImage: {
        // CTA / button gradient
        "brand-gradient": "linear-gradient(135deg, #3dffa0, #38bdf8)",
        "brand-gradient-90": "linear-gradient(90deg, #3dffa0, #38bdf8)",
        // Hero / section ambient gradients
        "hero-radial": "radial-gradient(ellipse 90% 70% at 60% 20%, rgba(56,189,248,0.10) 0%, rgba(61,255,160,0.06) 40%, transparent 70%)",
        "stats-radial": "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(61,255,160,0.04) 0%, transparent 70%)",
        "features-radial": "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56,189,248,0.05) 0%, transparent 70%)",
        // Dot grid (decorative overlay)
        "dot-grid": [
          "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        ].join(", "),
        // Global body gradient (matches globals.css)
        "body-bg": [
          "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(0,217,192,0.06), transparent 50%)",
          "radial-gradient(ellipse 130% 95% at 50% 42%, #0b1217 0%, #050a0f 52%, #020508 100%)",
        ].join(", "),
      },

      // ─── Box shadows ──────────────────────────────────────────────────────
      boxShadow: {
        "brand-sm": "0 4px 20px rgba(61,255,160,0.35)",
        "brand-md": "0 4px 24px rgba(61,255,160,0.30)",
        "brand-lg": "0 6px 30px rgba(61,255,160,0.35)",
        "brand-glow": "0 0 8px rgba(61,255,160,0.60)",
        "panel": "0 32px 80px rgba(0,0,0,0.60)",
        "card": "0 8px 40px rgba(0,0,0,0.80)",
        "header": "0 4px 32px rgba(0,0,0,0.60)",
        "dropdown": "0 8px 40px rgba(0,0,0,0.70)",
      },

      // ─── Border radius ────────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
      },

      // ─── Spacing / sizing extras ──────────────────────────────────────────
      height: {
        header: "3.75rem",   // sticky nav height
        ticker: "2rem",      // market ticker bar
      },
      maxWidth: {
        content: "1200px",
        panel: "460px",
      },
      backgroundSize: {
        "grid-60": "60px 60px",
      },

      // ─── Keyframe animations ──────────────────────────────────────────────
      keyframes: {
        // Loading spinner (globals.css)
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        // Pulsing opacity
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        // Horizontal ticker marquee (globals.css)
        "ticker-marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        // Floating token cards (HomePage)
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        // Three-dot loading indicator
        dotPulse: {
          "0%, 80%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "40%": { opacity: "1", transform: "scale(1.2)" },
        },
        // Nav dropdown reveal (AppLayout)
        dropdownIn: {
          from: { opacity: "0", transform: "translateX(-50%) translateY(-8px)" },
          to: { opacity: "1", transform: "translateX(-50%) translateY(0)" },
        },
        // Market ticker item scroll
        tickerScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Ticker tooltip appear
        tickerTooltipIn: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // Generic fade + slide in
        fadeSlideIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        // Re-exposes Tailwind's default `animate-spin` with the project's keyframe
        "spin": "spin 0.8s linear infinite",
        "ping": "ping 1s cubic-bezier(0,0,0.2,1) infinite",
        // Ticker bar
        "ticker-marquee": "ticker-marquee 36s linear infinite",
        "ticker-scroll": "tickerScroll 60s linear infinite",
        // UI transitions
        "float-y": "floatY 7s ease-in-out infinite",
        "dot-pulse": "dotPulse 1.2s ease-in-out infinite",
        "dropdown-in": "dropdownIn 0.18s ease forwards",
        "tooltip-in": "tickerTooltipIn 0.15s ease forwards",
        "fade-slide-in": "fadeSlideIn 0.18s ease forwards",
      },
    },
  },

  plugins: [
    require('tailwindcss-visual-kit')({
      duration: '300ms', // Change default animation duration
      delay: '1s', // Add default delay
      iterationCount: '1' // Make animations repeat infinitely
    })
  ],
};

export default config;
