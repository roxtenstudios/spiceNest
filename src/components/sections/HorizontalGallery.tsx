"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const items = [
  { id: 1, title: "Pure Ingredients", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070" },
  { id: 2, title: "Sun Dried", img: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?q=80&w=2070" },
  { id: 3, title: "Hand Pounded", img: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=2070" },
  { id: 4, title: "Aged to Perfection", img: "https://images.unsplash.com/photo-1627885474320-b08e506cc26a?q=80&w=2070" },
];

export function HorizontalGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#2C2117]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <div className="absolute top-12 left-6 md:left-12 z-10 text-[#F8F4EB]">
          <h2 className="font-heading text-4xl md:text-5xl">The Craft</h2>
          <p className="uppercase tracking-widest text-xs opacity-60 mt-2">Our Process</p>
        </div>

        <motion.div style={{ x }} className="flex gap-16 px-6 md:px-32">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="relative w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] flex-shrink-0 rounded-3xl overflow-hidden group"
            >
              <Image 
                src={item.img} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-700 group-hover:bg-black/10" />
              <div className="absolute bottom-8 left-8">
                <h3 className="font-heading text-4xl md:text-6xl text-white drop-shadow-lg">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
