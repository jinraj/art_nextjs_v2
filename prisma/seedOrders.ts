import { OrderStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function deleteAllOrders() {
  try {
    // Step 1: Delete all existing data
    console.log("Deleting all OrderItems...");
    const deletedItems = await prisma.orderItem.deleteMany({});
    console.log(`Deleted ${deletedItems.count} OrderItems.`);

    console.log("Deleting all Orders...");
    const deletedOrders = await prisma.order.deleteMany({});
    console.log(`Deleted ${deletedOrders.count} Orders.`);

  } catch (error) {
    console.error("Error while seeding orders:", error);
    throw error;
  }
}

export async function seedOrders() {
  try {
    console.log("🛒 Starting orders seeding...");

    // 1. Fetch customers
    const customers = await prisma.user.findMany({
      where: { role: "Customer" },
      select: { id: true },
    });

    if (customers.length === 0) {
      console.warn("⚠️ No customers found. Cannot seed orders.");
      return;
    }
    console.log(`Found ${customers.length} customers.`);

    // 2. Fetch artworks
    const artworks = await prisma.artwork.findMany({
      select: { id: true, price: true },
      take: 10, // fetch some for variety
    });

    if (artworks.length === 0) {
      console.warn("⚠️ No artworks found. Cannot seed orders.");
      return;
    }
    console.log(`Found ${artworks.length} artworks.`);

    // 3. Prepare 5 orders
    const ordersData = [];
    for (let i = 0; i < 5; i++) {
      const customer = customers[i % customers.length];
      // pick 1–2 artworks for this order
      const selectedArtworks = artworks.slice(i, i + 2);

      const totalAmount = selectedArtworks.reduce(
        (sum, art) => sum + art.price,
        0
      );

      ordersData.push({
        userId: customer.id,
        totalAmount,
        status: OrderStatus.Pending,
        items: {
          create: selectedArtworks.map((art) => ({
            artworkId: art.id,
            quantity: 1,
            priceAtPurchase: art.price,
          })),
        },
      });
    }

    // 4. Insert into DB
    for (const order of ordersData) {
      await prisma.order.create({ data: order });
    }

    console.log(`✅ Inserted ${ordersData.length} orders with order items.`);
  } catch (error) {
    console.error("❌ Error while seeding orders:", error);
    throw error;
  }
}


