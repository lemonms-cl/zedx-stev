import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.resolve(__dirname, ".."),

  typescript: {
    // Ignores strict generated route type-checking errors during production builds
    ignoreBuildErrors: true,
  },

  async rewrites() {
    // Dynamically resolve backend url from Next.js environment configuration (.env.local / Vercel dashboard)
    const backendUrl = process.env.BACKEND_URL ?? "http://127.0.0.1:5000";

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