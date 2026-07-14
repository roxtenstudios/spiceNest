import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <main className="min-h-screen pt-32 pb-16 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="font-heading text-6xl md:text-8xl mb-4">The Collection</h1>
        <p className="text-foreground/60 text-lg max-w-xl mb-16">
          Explore our range of handcrafted, sun-dried pickles. Made exactly the way our ancestors made them.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="group block">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-white/50">
                <div className="absolute inset-0 p-8 flex items-center justify-center z-10 transition-transform duration-700 group-hover:scale-105">
                  <div className="w-3/4 h-3/4 rounded-full bg-foreground/5 opacity-20 blur-3xl absolute" />
                  <div className="relative w-full h-[80%] rounded-full overflow-hidden shadow-2xl">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-heading text-2xl mb-2 group-hover:text-terracotta transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-foreground/60 line-clamp-2 max-w-[250px]">
                    {product.description}
                  </p>
                </div>
                <span className="font-medium text-lg">₹{product.price.toFixed(2)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
