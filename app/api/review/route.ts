import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateUserRequest, authenticateAdminRequest } from "@/lib/auth";

// GET all reviews
export async function GET() {
  try {
    const reviews = await prisma.appReview.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST - Create new review (only user can do this, 1 per user)
export async function POST(request: NextRequest) {
  try {
    const session = await authenticateUserRequest(request);
    if (session instanceof NextResponse) return session;

    const { rating, comment } = await request.json();
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const review = await prisma.appReview.create({
      data: {
        userId: session.user.id,
        rating,
        comment,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "User has already submitted a review" }, { status: 400 });
    }
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}

// PUT - Update review (only review owner)
export async function PUT(request: NextRequest) {
  try {
    const session = await authenticateUserRequest(request);
    if (session instanceof NextResponse) return session;

    const { id, rating, comment } = await request.json();
    if (!id) return NextResponse.json({ error: "Review ID is required" }, { status: 400 });

    // Ensure review belongs to user
    const existingReview = await prisma.appReview.findUnique({ where: { id } });
    if (!existingReview || existingReview.userId !== session.user.id) {
      return NextResponse.json({ error: "Not authorized to update this review" }, { status: 403 });
    }

    const updatedReview = await prisma.appReview.update({
      where: { id },
      data: {
        ...(rating && { rating }),
        ...(comment !== undefined && { comment }),
      },
    });

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

// DELETE - Only review owner or admin
export async function DELETE(request: NextRequest) {
  try {
    const session = await authenticateUserRequest(request);
    if (session instanceof NextResponse) return session;

    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Review ID is required" }, { status: 400 });

    const existingReview = await prisma.appReview.findUnique({ where: { id } });
    if (!existingReview) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Only owner or admin can delete
    const isAdmin = await authenticateAdminRequest(request);
    if (
      existingReview.userId !== session.user.id &&
      isAdmin instanceof NextResponse // not an admin
    ) {
      return NextResponse.json({ error: "Not authorized to delete this review" }, { status: 403 });
    }

    await prisma.appReview.delete({ where: { id } });

    return NextResponse.json({ message: "Review deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
