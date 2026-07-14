"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/layout/Footer";

export default function BusinessPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    type: "Distributor",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", company: "", email: "", type: "Distributor", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen pt-32 bg-background">
      <div className="container mx-auto px-6 max-w-7xl mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-6xl md:text-8xl mb-8"
            >
              Partner <br /> With Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-foreground/70 text-lg leading-relaxed max-w-md font-light mb-12"
            >
              Whether you are a luxury retailer, a fine dining restaurant, or a distributor looking for authentic heritage products, we would love to collaborate.
            </motion.p>
            
            <div className="space-y-8">
              <div>
                <h4 className="uppercase tracking-widest text-xs font-semibold mb-2">Corporate Office</h4>
                <p className="text-foreground/60 font-light text-sm">124 Heritage Lane, Old City<br/>Hyderabad, India 500002</p>
              </div>
              <div>
                <h4 className="uppercase tracking-widest text-xs font-semibold mb-2">Direct Contact</h4>
                <p className="text-foreground/60 font-light text-sm">partners@spicenest.com<br/>+91 98765 43210</p>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-12 rounded-3xl shadow-xl"
          >
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-24">
                <div className="w-16 h-16 bg-terracotta/10 text-terracotta rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-3xl">Inquiry Received</h3>
                <p className="text-foreground/60 font-light">Our partnership team will contact you within 24 hours.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-terracotta uppercase tracking-widest text-xs font-semibold hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="uppercase tracking-widest text-xs text-foreground/50">Full Name</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-foreground/5 border-none rounded-lg p-4 focus:ring-2 focus:ring-terracotta outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="uppercase tracking-widest text-xs text-foreground/50">Company</label>
                    <input required type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-foreground/5 border-none rounded-lg p-4 focus:ring-2 focus:ring-terracotta outline-none transition-all" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="uppercase tracking-widest text-xs text-foreground/50">Email Address</label>
                  <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-foreground/5 border-none rounded-lg p-4 focus:ring-2 focus:ring-terracotta outline-none transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="uppercase tracking-widest text-xs text-foreground/50">Partnership Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full bg-foreground/5 border-none rounded-lg p-4 focus:ring-2 focus:ring-terracotta outline-none transition-all">
                    <option>Distributor</option>
                    <option>Retail Store</option>
                    <option>Restaurant</option>
                    <option>Corporate Gifting</option>
                    <option>Export</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="uppercase tracking-widest text-xs text-foreground/50">Message</label>
                  <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-foreground/5 border-none rounded-lg p-4 focus:ring-2 focus:ring-terracotta outline-none transition-all resize-none" />
                </div>

                <button 
                  disabled={status === "loading"}
                  type="submit" 
                  className="w-full bg-foreground text-background py-5 rounded-full hover:bg-terracotta transition-colors uppercase tracking-widest text-sm font-semibold disabled:opacity-50"
                >
                  {status === "loading" ? "Submitting..." : "Submit Inquiry"}
                </button>
                {status === "error" && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
              </form>
            )}
          </motion.div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
