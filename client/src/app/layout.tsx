import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/homepage/Nav";
import Footer from "@/components/homepage/Footer";
import "./globals.css";

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
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}