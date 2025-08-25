import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { authenticateRequestBySession } from "@/app/auth/auth";

export async function GET() {
  try {
    console.log("Fetching cart count...");
    const session = await authenticateRequestBySession();
    if (session instanceof NextResponse) return session;

    // Get count of cart items for the user
    const count = await prisma.cart.count({
      where: { cartedById: session.user.id },
    });

    console.log("Cart count for user:", count);

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return NextResponse.json({ error: "Failed to fetch cart count" }, { status: 500 });
  }
}
