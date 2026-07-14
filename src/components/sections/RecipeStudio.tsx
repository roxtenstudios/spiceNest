"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle } from "lucide-react";
import Image from "next/image";

const recipes = [
  {
    id: "rice",
    name: "Steamed Rice",
    desc: "The ultimate comfort food. Hot steamed rice, a dollop of ghee, and our classic Mango Pickle.",
    img: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=1000",
  },
  {
    id: "paratha",
    name: "Stuffed Paratha",
    desc: "Flaky, buttery parathas paired with the fiery punch of our Guntur Red Chilli pickle.",
    img: "https://images.unsplash.com/photo-1626779879774-6330058e52db?q=80&w=1000",
  },
  {
    id: "dosa",
    name: "Crispy Dosa",
    desc: "A South Indian classic elevated by the tangy, earthy notes of our Spicy Gongura.",
    img: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=1000",
  },
  {
    id: "curd",
    name: "Curd Rice",
    desc: "Cooling curd rice and our piquant Garlic pickle form an unforgettable harmony of flavors.",
    img: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?q=80&w=1000",
  },
];

export function RecipeStudio() {
  const [activeRecipe, setActiveRecipe] = useState(recipes[0]);

  return (
    <section className="py-32 bg-[#F8F4EB]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center mb-24">
          <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-4">Recipe Studio</h2>
          <p className="text-foreground/60 uppercase tracking-widest text-sm">Perfect Pairings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Sidebar */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {recipes.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => setActiveRecipe(recipe)}
                className={`text-left text-3xl md:text-5xl font-heading transition-all duration-300 ${
                  activeRecipe.id === recipe.id 
                    ? "text-terracotta translate-x-4" 
                    : "text-foreground/30 hover:text-foreground/60"
                }`}
              >
                {recipe.name}
              </button>
            ))}
          </div>

          {/* Interactive Player Area */}
          <div className="md:col-span-8 relative h-[60vh] rounded-3xl overflow-hidden bg-foreground/5 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRecipe.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeRecipe.img}
                  alt={activeRecipe.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Content inside player */}
                <div className="absolute inset-0 p-12 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <button className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white/30 transition-colors">
                      <PlayCircle className="w-5 h-5" />
                      <span className="uppercase tracking-widest text-xs font-semibold">Watch Video</span>
                    </button>
                  </div>
                  
                  <div className="max-w-md">
                    <h3 className="font-heading text-4xl text-white mb-4">{activeRecipe.name}</h3>
                    <p className="text-white/80 font-light text-lg">
                      {activeRecipe.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
