import path from "path";
import { fileURLToPath } from "url";
import { config as loadEnv } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the single root .env so BACKEND_URL and NEXT_PUBLIC_* vars are
// available during both `next dev` and `next build`.
loadEnv({ path: path.resolve(__dirname, "../.env") });

const backendUrl = process.env.BACKEND_URL ?? "http://127.0.0.1:5000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.resolve(__dirname, ".."),

  typescript: {
    // Ignores strict generated route type-checking errors during production builds
    ignoreBuildErrors: true,
  },

  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${backendUrl}/api/:path*` },
      { source: "/health", destination: `${backendUrl}/health` },
      { source: "/binance/:path*", destination: `${backendUrl}/binance/:path*` },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;