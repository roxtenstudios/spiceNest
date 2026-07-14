import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { AddToCartButton } from "@/components/ui/AddToCartButton";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          
          {/* Image Gallery */}
          <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-foreground/5 p-12">
            <div className="absolute inset-0 p-12 flex items-center justify-center z-10">
              <div className="w-full h-full rounded-full bg-white/20 blur-3xl absolute" />
              <div className="relative w-full h-[90%] rounded-full overflow-hidden shadow-2xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <span className="text-terracotta uppercase tracking-widest text-sm font-semibold mb-4">
              {product.category} Collection
            </span>
            <h1 className="font-heading text-5xl md:text-7xl mb-6">{product.name}</h1>
            <p className="text-2xl font-light mb-8">₹{product.price.toFixed(2)}</p>
            
            <p className="text-foreground/70 text-lg leading-relaxed mb-12 max-w-md font-light">
              {product.description}
            </p>

            <div className="border-t border-b border-foreground/10 py-6 mb-12 grid grid-cols-3 gap-6 text-center">
              <div>
                <span className="block font-heading text-2xl mb-1">100%</span>
                <span className="text-xs uppercase tracking-widest text-foreground/50">Natural</span>
              </div>
              <div className="border-l border-r border-foreground/10">
                <span className="block font-heading text-2xl mb-1">0%</span>
                <span className="text-xs uppercase tracking-widest text-foreground/50">Preservatives</span>
              </div>
              <div>
                <span className="block font-heading text-2xl mb-1">365</span>
                <span className="text-xs uppercase tracking-widest text-foreground/50">Days Shelf Life</span>
              </div>
            </div>

            <AddToCartButton product={product} />

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
