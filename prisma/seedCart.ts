import { PrismaClient, CartStatus } from '@prisma/client';

const prisma = new PrismaClient();

// --- Delete all carts ---
export async function deleteAllCarts() {
  await prisma.cart.deleteMany({});
  console.log("🗑️ Deleted all carts");
}

// --- Seed carts using existing users & artworks ---
export async function seedCarts() {
  console.log("🛒 Seeding carts...");

  // get first 3 users and first 5 artworks
  const users = await prisma.user.findMany({
    take: 3,
    orderBy: { createdAt: 'asc' }, // deterministic order
  });

  const artworks = await prisma.artwork.findMany({
    take: 5,
    orderBy: { createdAt: 'asc' },
  });

  if (users.length === 0 || artworks.length === 0) {
    console.warn("⚠️ No users or artworks available to seed carts.");
    return [];
  }

  const carts = [];

  // each user gets the 5 artworks in cart
  for (const user of users) {
    for (const artwork of artworks) {
      const cart = await prisma.cart.create({
        data: {
          cartedById: user.id,
          artworkId: artwork.id,
          quantity: 1, // fixed quantity
          status: CartStatus.Active,
        },
      });
      carts.push(cart);
    }
  }

  console.log(`✅ Seeded ${carts.length} carts`);
  return carts;
}
