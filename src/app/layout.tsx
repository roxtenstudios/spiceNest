import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SpiceNest | Premium Homemade Pickles",
  description: "Crafted using authentic homemade recipes, premium ingredients, and generations of tradition. Every jar has a story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="antialiased bg-background text-foreground selection:bg-terracotta/20 selection:text-terracotta">
        <SmoothScroll>
          <Navbar />
          <CartDrawer />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
