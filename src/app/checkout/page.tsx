"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerAddress: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          total: getTotal(),
          items: items.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price }))
        }),
      });
      if (res.ok) {
        setStatus("success");
        clearCart();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <main className="min-h-screen pt-32 bg-background flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-terracotta/10 text-terracotta rounded-full flex items-center justify-center mb-8">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-heading text-5xl md:text-7xl mb-6 text-center">Order Confirmed</h1>
        <p className="text-foreground/70 text-lg mb-12 text-center max-w-md font-light">
          Thank you for choosing SpiceNest. Your authentic handmade pickles will be shipped shortly.
        </p>
        <Link href="/products" className="bg-foreground text-background px-8 py-4 rounded-full uppercase tracking-widest text-xs font-semibold hover:bg-terracotta transition-colors">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 bg-background">
      <div className="container mx-auto px-6 max-w-7xl mb-32">
        
        <Link href="/products" className="inline-flex items-center gap-2 text-foreground/50 hover:text-foreground transition-colors mb-12 uppercase tracking-widest text-xs font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-7">
            <h1 className="font-heading text-5xl mb-12">Checkout</h1>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-heading text-2xl mb-4 border-b border-foreground/10 pb-2">Contact Information</h3>
                <div className="space-y-2">
                  <label className="uppercase tracking-widest text-xs text-foreground/50">Full Name</label>
                  <input required type="text" value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} className="w-full bg-white border border-foreground/10 rounded-lg p-4 focus:border-terracotta outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="uppercase tracking-widest text-xs text-foreground/50">Email Address</label>
                  <input required type="email" value={formData.customerEmail} onChange={(e) => setFormData({...formData, customerEmail: e.target.value})} className="w-full bg-white border border-foreground/10 rounded-lg p-4 focus:border-terracotta outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-2xl mb-4 border-b border-foreground/10 pb-2">Shipping Details</h3>
                <div className="space-y-2">
                  <label className="uppercase tracking-widest text-xs text-foreground/50">Full Address</label>
                  <textarea required rows={3} value={formData.customerAddress} onChange={(e) => setFormData({...formData, customerAddress: e.target.value})} className="w-full bg-white border border-foreground/10 rounded-lg p-4 focus:border-terracotta outline-none transition-all resize-none" />
                </div>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-foreground/5 rounded-3xl p-8 sticky top-32">
              <h3 className="font-heading text-2xl mb-8">Order Summary</h3>
              
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-4">
                {items.length === 0 ? (
                  <p className="text-foreground/50 text-sm">Your cart is empty.</p>
                ) : (
                  items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-20 rounded-md overflow-hidden bg-white">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-heading text-lg">{item.name}</h4>
                        <p className="text-foreground/50 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-foreground/10 pt-6 space-y-4">
                <div className="flex justify-between text-foreground/60">
                  <span>Subtotal</span>
                  <span>₹{getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/60">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between items-center text-xl font-heading pt-4 border-t border-foreground/10">
                  <span>Total</span>
                  <span className="text-terracotta">₹{getTotal().toFixed(2)}</span>
                </div>
              </div>

              <button 
                form="checkout-form"
                disabled={status === "loading" || items.length === 0}
                type="submit" 
                className="w-full bg-terracotta text-white py-5 rounded-full hover:bg-terracotta/90 transition-colors uppercase tracking-widest text-sm font-semibold disabled:opacity-50 mt-8"
              >
                {status === "loading" ? "Processing..." : "Place Order"}
              </button>
              {status === "error" && <p className="text-red-500 text-sm text-center mt-4">Payment failed. Please try again.</p>}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
