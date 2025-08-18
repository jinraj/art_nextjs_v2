import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";
import { authenticateRequestBySession } from "@/app/auth/auth";
import { OrderStatus, Role } from "@prisma/client";

// GET all orders for Admin OR GET user’s orders if Artist or Customer
export async function GET() {
  try {
    console.log("Fetching orders...");
    const session = await authenticateRequestBySession();
    if (session instanceof NextResponse) return session;

    let orders;

    // Admin: fetch all orders
    if (session.user.role === Role.Admin) {
      console.log("Admin fetching all orders for Admin:", session.user.name );
      orders = await prisma.order.findMany({
        include: {
          user: true, // fetch user details
          items: {
            include: {
              artwork: true, // fetch artwork for each order item
            },
          },
        },
      });
    } 
    // Artist/Customer: fetch only their own orders
    else if (session.user.role === Role.Artist || session.user.role === Role.Customer) {
      console.log("Fetching orders for user:", session.user.id);
      orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        include: {
          items: {
            include: {
              artwork: true,
            },
          },
        },
      });
    } 
    // Fallback: no orders
    else {
      console.error("Forbidden: Fetching orders");
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}


// Create new order (checkout)
export async function POST(request: NextRequest) {
  try {
    const session = await authenticateRequestBySession();
    if (session instanceof NextResponse) return session;

    const body = await request.json();
    const { items, totalAmount } = body; // items = [{ artworkId, quantity, priceAtPurchase }]

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        totalAmount,
        items: {
          create: items.map((item: any) => ({
            artworkId: item.artworkId,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

// Update order (only Admin can mark Completed/Cancelled)
export async function PATCH(request: NextRequest) {
  try {
    const session = await authenticateRequestBySession();
    if (session instanceof NextResponse) return session;

    if (session.user.role !== Role.Admin) {
      return NextResponse.json({ error: "Only admin can update orders" }, { status: 403 });
    }

    const body = await request.json();
    const { orderId, status } = body; // status should be "Completed" | "Cancelled"

    if (!Object.values(OrderStatus).includes(status)) {
      return NextResponse.json({ error: "Invalid order status" }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

// Cancel order (user cancels their own, admin cancels any)
export async function DELETE(request: NextRequest) {
  try {
    const session = await authenticateRequestBySession();
    if (session instanceof NextResponse) return session;

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("id");

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // Fetch the order
    const order = await prisma.order.findUnique({ where: { id: orderId } });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Authorization: Admin can cancel any, user can only cancel their own
    if (session.user.role !== Role.Admin && order.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden: cannot cancel this order" }, { status: 403 });
    }

    const cancelledOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.Cancelled },
    });

    return NextResponse.json(cancelledOrder, { status: 200 });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return NextResponse.json({ error: "Failed to cancel order" }, { status: 500 });
  }
}