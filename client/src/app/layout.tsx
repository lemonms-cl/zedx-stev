import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/homepage/Nav";
import Footer from "@/components/homepage/Footer";
import { ConfigProvider } from "@/context/ConfigContext";
import type { ApiConfig } from "@/types";
import "./globals.css"; // Include your global styles here

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZedX - Next-Gen Crypto Banking",
  description: "Non-custodial digital asset architecture and high-yield staking.",
};

// Define default configuration values required by your app during SSR/prerendering
const defaultConfig: ApiConfig = {
  // Add your default configuration properties here matching ApiConfig
} as ApiConfig;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#090d16] text-white antialiased`}>
        <ConfigProvider value={defaultConfig}>
          {/* Main page content container */}
          <div className="flex flex-col min-h-screen">
            {/* Navigation Bar rendered globally at the top of every page */}
            <Nav />

            <main className="flex-grow">
              {children}
            </main>
            
            {/* Footer rendered globally at the bottom of every page */}
            <Footer />
          </div>
        </ConfigProvider>
      </body>
    </html>
  );
}