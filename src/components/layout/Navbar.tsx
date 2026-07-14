"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

const navLinks = [
  { name: "Collection", href: "#collection" },
  { name: "Our Story", href: "#story" },
  { name: "Ingredients", href: "#ingredients" },
  { name: "Business", href: "#business" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { toggleCart, items } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-500",
          isScrolled ? "glass-panel shadow-sm py-4" : "bg-transparent py-6"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 md:px-12 max-w-7xl flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <span className="font-heading text-3xl tracking-tight text-foreground">
              SpiceNest
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium tracking-wide uppercase hover:text-terracotta transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6 relative z-50">
            <button 
              aria-label="Cart" 
              onClick={toggleCart}
              className="hover:text-terracotta transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {mounted && itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-terracotta text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
            <button 
              aria-label="Menu" 
              className="md:hidden hover:text-terracotta transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 pb-6 flex flex-col"
          >
            <nav className="flex flex-col gap-8 mt-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link 
                    href={link.href}
                    className="font-heading text-5xl hover:text-terracotta transition-colors block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto pb-8">
              <p className="text-sm text-foreground/60 uppercase tracking-widest">
                Every Jar Has A Story
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
