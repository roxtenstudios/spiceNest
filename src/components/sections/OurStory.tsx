"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="story" ref={containerRef} className="py-32 md:py-48 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div style={{ opacity }} className="relative h-[60vh] lg:h-[80vh] w-full rounded-2xl overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-[-10%] w-[120%] h-[120%]">
              <Image
                src="https://images.unsplash.com/photo-1627885474320-b08e506cc26a?q=80&w=2070"
                alt="Vintage Indian Kitchen"
                fill
                className="object-cover sepia-[0.2]"
              />
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ opacity }}
            className="flex flex-col justify-center space-y-8"
          >
            <span className="text-terracotta uppercase tracking-widest text-sm font-semibold">The Heritage</span>
            
            <h2 className="font-heading text-5xl md:text-7xl leading-[1.1] text-foreground">
              A century of <br /> flavor, preserved <br /> in every jar.
            </h2>
            
            <p className="text-lg text-foreground/70 max-w-md font-light leading-relaxed">
              What started in a small sunlit courtyard in 1924 has grown into a legacy. 
              Our grandmother believed that time was the most important ingredient in any pickle.
            </p>
            
            <p className="text-lg text-foreground/70 max-w-md font-light leading-relaxed">
              Today, we still sun-dry our mangoes on bamboo mats, hand-pound our spices, 
              and wait patiently for the mustard oil to infuse its magic. No shortcuts. Just tradition.
            </p>

            <div className="pt-8">
              <Image 
                src="https://images.unsplash.com/photo-1577047913210-9173eb8b2611?q=80&w=200&h=80" 
                alt="Signature" 
                width={150} 
                height={60} 
                className="opacity-60 mix-blend-multiply"
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
