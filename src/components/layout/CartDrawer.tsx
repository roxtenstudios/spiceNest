"use client";

import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-foreground/10">
              <h2 className="font-heading text-2xl">Your Cart</h2>
              <button onClick={toggleCart} className="p-2 hover:bg-foreground/5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-foreground/40 gap-4">
                  <ShoppingBag className="w-12 h-12" />
                  <p className="uppercase tracking-widest text-sm">Cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-24 h-32 rounded-lg overflow-hidden bg-foreground/5 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-heading text-xl leading-tight">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-foreground/40 hover:text-terracotta">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-terracotta font-medium mt-1">₹{item.price.toFixed(2)}</p>
                      
                      {/* Quantity Control */}
                      <div className="mt-auto flex items-center gap-4 border border-foreground/20 rounded-full w-fit px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-terracotta">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-terracotta">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-foreground/10 bg-foreground/5">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-foreground/60">Subtotal</span>
                  <span className="font-heading text-2xl">₹{getTotal().toFixed(2)}</span>
                </div>
                <Link href="/checkout" onClick={toggleCart} className="block w-full py-4 bg-terracotta text-white text-center rounded-full uppercase tracking-widest text-sm font-semibold hover:bg-terracotta/90 transition-colors">
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
