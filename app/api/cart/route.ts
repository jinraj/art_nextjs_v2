import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth"; // 🔒 normal user auth
import { authenticateAdminRequest } from "@/lib/auth"; // 🔒 admin auth if needed

// --------------------
// GET /api/carts → get all carts for current user
// --------------------
export async function GET(request: NextRequest) {
  try {
    const session = await authenticateAdminRequest(request);
    if (session instanceof NextResponse) return session;

    const userId = session.user.id;

    const carts = await prisma.cart.findMany({
      where: { cartedById: userId },
      include: {
        // if you want to fetch related artwork details
        // artwork: true,
      },
    });

    return NextResponse.json(carts, { status: 200 });
  } catch (error) {
    console.error("Error fetching carts:", error);
    return NextResponse.json({ error: "Failed to fetch carts" }, { status: 500 });
  }
}

// --------------------
// POST /api/carts → add item to cart
// --------------------
export async function POST(request: NextRequest) {
  try {
    const session = await authenticateAdminRequest(request);
    if (session instanceof NextResponse) return session;

    const { artworkId, quantity } = await request.json();
    if (!artworkId) {
      return NextResponse.json({ error: "Artwork ID is required" }, { status: 400 });
    }

    const cart = await prisma.cart.create({
      data: {
        artworkId,
        cartedById: session.user.id,
        quantity: quantity ?? 1,
      },
    });

    return NextResponse.json(cart, { status: 201 });
  } catch (error) {
    console.error("Error creating cart:", error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

// --------------------
// PUT /api/carts → update cart quantity or status
// --------------------
export async function PUT(request: NextRequest) {
  try {
    const session = await authenticateAdminRequest(request);
    if (session instanceof NextResponse) return session;

    const { id, quantity, status } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Cart ID is required" }, { status: 400 });
    }

    const updatedCart = await prisma.cart.update({
      where: { id },
      data: {
        ...(quantity !== undefined && { quantity }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(updatedCart, { status: 200 });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

// --------------------
// DELETE /api/carts → remove item from cart
// --------------------
export async function DELETE(request: NextRequest) {
  try {
    const session = await authenticateAdminRequest(request);
    if (session instanceof NextResponse) return session;

    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Cart ID is required" }, { status: 400 });
    }

    await prisma.cart.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Cart item deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting cart:", error);
    return NextResponse.json({ error: "Failed to delete cart" }, { status: 500 });
  }
}
