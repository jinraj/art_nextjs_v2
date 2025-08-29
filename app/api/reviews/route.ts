import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";
import { authenticateRequestBySession } from "@/app/auth/auth";
import { Role } from "@prisma/client";

/**
 * PUBLIC GET – Anyone can view all reviews
 */
export async function GET() {
  try {
    console.log("Fetching public reviews...");
    const reviews = await prisma.appReview.findMany({
      include: { user: { select: { id: true, name: true, role: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching public reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}


/**
 * POST – Customers & Artists can create one review only
 */
export async function POST(request: NextRequest) {
  try {
    const session = await authenticateRequestBySession();
    if (session instanceof NextResponse) return session;

    const isCustomerOrArtist = (role: Role) =>
      role === Role.Customer || role === Role.Artist;

    if (!isCustomerOrArtist(session.user.role as Role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { rating, comment } = await request.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating (1-5)" }, { status: 400 });
    }

    // Ensure only one review per user
    const existing = await prisma.appReview.findUnique({
      where: { userId: session.user.id },
    });

    if (existing) {
      return NextResponse.json({ error: "User already has a review" }, { status: 400 });
    }

    const review = await prisma.appReview.create({
      data: {
        userId: session.user.id,
        rating,
        comment,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}

/**
 * PUT – Customers & Artists can update their own review
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await authenticateRequestBySession();
    if (session instanceof NextResponse) return session;

    const isCustomerOrArtist = (role: Role) =>
      role === Role.Customer || role === Role.Artist;

    if (!isCustomerOrArtist(session.user.role as Role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { rating, comment } = await request.json();

    const existing = await prisma.appReview.findUnique({
      where: { userId: session.user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    const updated = await prisma.appReview.update({
      where: { userId: session.user.id },
      data: { rating, comment },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

/**
 * DELETE – User can delete their own, Admin can delete any
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await authenticateRequestBySession();
    if (session instanceof NextResponse) return session;

    const { reviewId } = await request.json();

    const review = await prisma.appReview.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Only owner or Admin can delete
    if (session.user.role !== Role.Admin && review.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.appReview.delete({ where: { id: reviewId } });

    return NextResponse.json({ message: "Review deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
