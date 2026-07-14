"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const ingredients = [
  {
    name: "Cold Pressed Mustard Oil",
    desc: "Sourced from the golden fields of Punjab, our oil is pressed without heat to retain its pungent, soul-warming aroma.",
    image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?q=80&w=2070",
  },
  {
    name: "Guntur Red Chillies",
    desc: "Sun-dried on open terraces, these chillies provide the perfect balance of fiery heat and rich crimson color.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070",
  }
];

export function IngredientExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="ingredients" ref={containerRef} className="bg-foreground text-background">
      <div className="container mx-auto px-6 max-w-7xl py-32">
        
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-heading text-5xl md:text-7xl mb-6 text-[#F2ECE0]"
          >
            The Alchemy of Nature
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-white/60 uppercase tracking-widest text-sm"
          >
            Every ingredient is a protagonist
          </motion.p>
        </div>

        <div className="space-y-48">
          {ingredients.map((item, index) => (
            <IngredientBlock key={index} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

function IngredientBlock({ item, index }: { item: any; index: number }) {
  const blockRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const isEven = index % 2 === 0;

  return (
    <div ref={blockRef} className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-16 items-center`}>
      <motion.div 
        style={{ scale, opacity }}
        className="w-full md:w-1/2 aspect-[4/5] relative rounded-3xl overflow-hidden"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
      </motion.div>
      
      <motion.div 
        style={{ y, opacity }}
        className="w-full md:w-1/2 flex flex-col justify-center"
      >
        <span className="text-terracotta font-medium tracking-widest uppercase text-sm mb-4">
          0{index + 1}
        </span>
        <h3 className="font-heading text-4xl md:text-6xl text-[#F2ECE0] mb-8 leading-tight">
          {item.name}
        </h3>
        <p className="text-lg text-white/70 font-light leading-relaxed max-w-md">
          {item.desc}
        </p>
      </motion.div>
    </div>
  );
}
