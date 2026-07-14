"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Hero } from "@/components/sections/Hero";
import { OurStory } from "@/components/sections/OurStory";
import { SignatureCollection } from "@/components/sections/SignatureCollection";
import { IngredientExperience } from "@/components/sections/IngredientExperience";
import { HorizontalGallery } from "@/components/sections/HorizontalGallery";
import { RecipeStudio } from "@/components/sections/RecipeStudio";
import { BusinessSolutions } from "@/components/sections/BusinessSolutions";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen selection:bg-terracotta/20 selection:text-terracotta">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
        <OurStory />
        <SignatureCollection />
        <IngredientExperience />
        <HorizontalGallery />
        <RecipeStudio />
        <BusinessSolutions />
        <Footer />
      </motion.div>
    </main>
  );
}
