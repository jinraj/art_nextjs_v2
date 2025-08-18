import { mockOrders } from '@/app/data/seedMockData';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function main() {
  console.log("Starting order seed script...");

  try {
    // Step 1: Delete all existing data
    console.log("Deleting all OrderItems...");
    const deletedItems = await prisma.orderItem.deleteMany({});
    console.log(`Deleted ${deletedItems.count} OrderItems.`);

    console.log("Deleting all Orders...");
    const deletedOrders = await prisma.order.deleteMany({});
    console.log(`Deleted ${deletedOrders.count} Orders.`);

    // Step 2: Insert new mock orders
    for (const order of mockOrders) {
      console.log(`Creating order for user ${order.userId}...`);

      await prisma.order.create({
        data: {
          userId: order.userId,
          totalAmount: order.totalAmount,
          status: order.status,
          orderedAt: order.orderedAt,
          items: {
            create: order.items.map((item) => ({
              artworkId: item.artworkId,
              quantity: item.quantity,
              priceAtPurchase: item.priceAtPurchase,
            })),
          },
        },
      });
    }

    console.log("Orders seeding finished successfully.");
  } catch (error) {
    console.error("Error while seeding orders:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
