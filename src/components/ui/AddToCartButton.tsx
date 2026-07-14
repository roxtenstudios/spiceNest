"use client";

import { useCartStore } from "@/store/cartStore";
import { Product } from "@prisma/client";
import { ShoppingBag } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCartStore();

  return (
    <button
      onClick={() =>
        addItem({
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
        })
      }
      className="w-full flex items-center justify-center gap-3 bg-foreground text-background py-5 rounded-full hover:bg-terracotta transition-colors group"
    >
      <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
      <span className="uppercase tracking-widest text-sm font-semibold">Add to Cart</span>
    </button>
  );
}
