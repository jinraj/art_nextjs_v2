import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";
import { authenticateCustomerRequest, authenticateAdminRequest } from "@/app/auth/auth";

// 🔹 GET all orders (Admin) OR user’s orders if normal user
export async function GET(request: NextRequest) {
  try {
    const session = await authenticateCustomerRequest(request);
    if (session instanceof NextResponse) return session;

    let orders;
    if (session.role === "Customer") {
      orders = await prisma.order.findMany();
    } else {
      orders = await prisma.order.findMany({
        where: { orderedById: session.userId },
      });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// 🔹 POST: Create new order (User checkout)
export async function POST(request: NextRequest) {
  try {
    const session = await authenticateCustomerRequest(request);
    if (session instanceof NextResponse) return session;

    const { artworkIds, quantities, totalAmount } = await request.json();

    if (!artworkIds?.length || !quantities?.length || artworkIds.length !== quantities.length) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        orderedById: session.userId,
        artworkIds,
        quantities,
        totalAmount,
        status: "Pending",
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

// 🔹 PUT: Update an order (only Admin can mark as Completed/Cancelled)
export async function PUT(request: NextRequest) {
  try {
    const session = await authenticateAdminRequest(request);
    if (session instanceof NextResponse) return session;

    const { id, status } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
      },
    });

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

// 🔹 DELETE: Cancel an order (User can cancel their own, Admin can cancel any)
export async function DELETE(request: NextRequest) {
  try {
    const session = await authenticateCustomerRequest(request);
    if (session instanceof NextResponse) return session;

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // Check ownership if not Admin
    const order = await prisma.order.findUnique({ where: { id } });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (session.role !== "Admin" && order.orderedById !== session.userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    await prisma.order.update({
      where: { id },
      data: { status: "Cancelled" }, // soft delete
    });

    return NextResponse.json({ message: "Order cancelled successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return NextResponse.json({ error: "Failed to cancel order" }, { status: 500 });
  }
}
