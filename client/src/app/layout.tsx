import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/homepage/Nav";
import Footer from "@/components/homepage/Footer";
import "./globals.css"; // Include your global styles here

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZedX - Next-Gen Crypto Banking",
  description: "Non-custodial digital asset architecture and high-yield staking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#090d16] text-white antialiased`}>
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
      </body>
    </html>
  );
}