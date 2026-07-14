"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const solutions = [
  { title: "Distributor Program", desc: "Join our global network of premium stockists." },
  { title: "Restaurant Partners", desc: "Elevate your menu with authentic flavors." },
  { title: "Corporate Gifting", desc: "Bespoke luxury hampers for special occasions." },
];

export function BusinessSolutions() {
  return (
    <section id="business" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-16 justify-between items-start">
          
          <div className="w-full md:w-1/3">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-heading text-5xl md:text-6xl text-foreground mb-6"
            >
              Partner with <br/> Tradition.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-foreground/70 text-lg font-light max-w-sm mb-12"
            >
              From luxury retail to culinary partnerships, we collaborate with those who value authenticity.
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="uppercase tracking-widest text-sm border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              Contact Sales
            </motion.button>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-6">
            {solutions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group border border-foreground/10 hover:border-terracotta/50 p-8 rounded-2xl flex justify-between items-center cursor-pointer transition-all hover:bg-white"
              >
                <div>
                  <h3 className="font-heading text-3xl text-foreground mb-2 group-hover:text-terracotta transition-colors">{item.title}</h3>
                  <p className="text-foreground/60 font-light">{item.desc}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-terracotta group-hover:border-terracotta group-hover:text-white transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
