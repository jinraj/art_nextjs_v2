import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";
import { authenticateRequestBySession } from "@/app/auth/auth";


export async function GET() {
  try {
    console.log("Fetching carts...");
    const session = await authenticateRequestBySession();
    if (session instanceof NextResponse) return session;

    const carts = await prisma.cart.findMany({
      where: { cartedById: session.user.id },
      include: {
        artwork: {
          select: { id: true, title: true, price: true, images: true }
        }
      },
    });
    console.log("Carts fetched for user:", carts.length, "items");

    if (!carts || carts.length === 0) {
      return NextResponse.json({ message: "No items in cart" }, { status: 404 });
    }
    return NextResponse.json(carts, { status: 200 });
  } catch (error) {
    console.error("Error fetching carts:", error);
    return NextResponse.json({ error: "Failed to fetch carts" }, { status: 500 });
  }
}
