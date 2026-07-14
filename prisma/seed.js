const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({});

async function main() {
  console.log("Seeding database...");

  const products = [
    {
      slug: "classic-mango",
      name: "Classic Mango",
      description: "Sun-dried raw mangoes in cold-pressed mustard oil. The taste of nostalgia.",
      price: 450.00,
      image: "https://images.unsplash.com/photo-1604329760661-e71c0c14486d?q=80&w=1000",
      category: "Signature"
    },
    {
      slug: "roasted-garlic",
      name: "Roasted Garlic",
      description: "Whole garlic cloves aged in spiced sesame oil. A pungent, earthy delight.",
      price: 520.00,
      image: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?q=80&w=1000",
      category: "Signature"
    },
    {
      slug: "spicy-gongura",
      name: "Spicy Gongura",
      description: "Sorrel leaves slow-cooked with Guntur chillies. Tangy, fiery, and authentic.",
      price: 480.00,
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000",
      category: "Signature"
    },
    {
      slug: "lemon-zest",
      name: "Lemon Zest",
      description: "Aged lemons bursting with zesty flavors and traditional spices.",
      price: 400.00,
      image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?q=80&w=1000",
      category: "Classic"
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log("Database seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
