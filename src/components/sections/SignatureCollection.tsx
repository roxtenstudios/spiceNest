"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@prisma/client";



export function SignatureCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem } = useCartStore();
  
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 3))) // Show only top 3 on homepage
      .catch((err) => console.error(err));
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="collection" ref={containerRef} className="py-32 bg-[#F2ECE0] relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl md:text-7xl text-foreground">
              The Signature <br /> Collection
            </h2>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 md:mt-0 uppercase tracking-widest text-sm border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
          >
            View Entire Range
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              style={{ y: i % 2 === 1 ? y : 0 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-white/50">
                <div className="absolute inset-0 p-8 flex items-center justify-center z-10 transition-transform duration-700 group-hover:scale-105">
                  <div className="w-3/4 h-3/4 rounded-full bg-[#e5c158] opacity-20 blur-3xl absolute" />
                  {/* Using placeholder images styled as jars */}
                  <div className="relative w-full h-[80%] rounded-full overflow-hidden shadow-2xl">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addItem({
                        id: product.id,
                        slug: product.slug,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                      });
                    }}
                    className="bg-white text-foreground rounded-full p-4 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:scale-110"
                  >
                    <Plus className="w-6 h-6" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-heading text-2xl mb-2 group-hover:text-terracotta transition-colors">{product.name}</h3>
                  <p className="text-sm text-foreground/60 max-w-[200px] line-clamp-2">{product.description}</p>
                </div>
                <span className="font-medium">₹{product.price.toFixed(2)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
