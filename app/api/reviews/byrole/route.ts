// app/api/reviews/auth/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { authenticateRequestBySession } from "@/app/auth/auth";
import { Role } from "@prisma/client";

export async function GET() {
  try {
    console.log("Fetching authenticated reviews...");
    const session = await authenticateRequestBySession();
    if (session instanceof NextResponse) return session;

    let reviews;

    if (session.user.role === Role.Admin) {
      reviews = await prisma.appReview.findMany({
        include: { user: { select: { id: true, name: true, role: true } } },
        orderBy: { createdAt: "desc" },
      });
    } else if (session.user.role === Role.Customer || session.user.role === Role.Artist) {
      reviews = await prisma.appReview.findMany({
        where: { userId: session.user.id },
        include: { user: { select: { id: true, name: true, role: true } } },
        orderBy: { createdAt: "desc" },
      });
    } else {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
