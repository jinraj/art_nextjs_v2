const { PrismaClient } = require("@prisma/client");
const { deleteAllUsers, seedUsers } = require('./seedUsers');
const { deleteAllArtworks, seedArtworks } = require('./seedArtworks');
const { deleteAllCarts, seedCarts } = require('./seedCart');
const { deleteAllOrders, seedOrders } = require('./seedOrders');
const { deleteAllReviews, seedReviews } = require('./seedReviews');

const prisma = new PrismaClient();

export async function main() {
  console.log("🚀 Starting seed script...");

  // --- Delete in order ---
  console.log("🧹 Cleaning database...");
  await deleteAllReviews();
  await deleteAllCarts();
  await deleteAllOrders();
  await deleteAllArtworks();
  await deleteAllUsers();

  // --- Seed in reverse order ---
  console.log("🌱 Seeding data...");
  await seedUsers();
  await seedArtworks();
  await seedOrders();
  await seedCarts();
  await seedReviews();

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
