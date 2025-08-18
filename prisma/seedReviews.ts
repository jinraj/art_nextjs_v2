import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteAllReviews() {
  try {
    console.log("Deleting all reviews...");
    const deleted = await prisma.appReview.deleteMany({});
    console.log(`Deleted ${deleted.count} reviews.`);
  } catch (error) {
    console.error("Error deleting reviews:", error);
    throw error;
  }
}

export async function seedReviews() {
  console.log("Seeding reviews...");

  try {
    // Find some existing users (Customers and Artists)
    const users = await prisma.user.findMany({
      where: {
        role: { in: [Role.Customer, Role.Artist] },
      },
      take: 5, // only seed reviews for 5 users
    });

    if (users.length === 0) {
      console.log("No Customer/Artist users found. Please seed users first.");
      return;
    }

    // Seed reviews (1 per user since @@unique([userId]))
    for (const user of users) {
      await prisma.appReview.upsert({
        where: { userId: user.id },
        update: {}, // Do nothing if review exists
        create: {
          userId: user.id,
          rating: Math.floor(Math.random() * 5) + 1, // rating 1–5
          comment: `Absolutely stunning artwork collections! Definitely buy again.`,
        },
      });
    }

    console.log("Reviews seeded successfully!");
  } catch (error) {
    console.error("Error seeding reviews:", error);
    throw error;
  } 
}
