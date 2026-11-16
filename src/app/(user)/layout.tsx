import type { Metadata } from "next";
import { JetBrains_Mono, Open_Sans } from "next/font/google";
import Navbar from "@/components/layout/user/main-navbar"; // Adjust import path
import Footer from "@/components/layout/user/main-footer"; // Adjust import path
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aixel",
  description: "Pemetaan kompetensi dan mentoring untuk tim startup",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${jetbrains.variable} ${openSans.variable}`}>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}