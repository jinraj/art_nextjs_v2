import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { authenticateAdminRequest, authenticateRequest } from "@/app/auth/auth";

export async function PATCH(request: NextRequest) {
  try {
    const session = await authenticateAdminRequest(request); // 🔒 admin check
    if (session instanceof NextResponse) return session;

    const { id, isApproved } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
    if (typeof isApproved !== "boolean") {
      return NextResponse.json({ error: "isApproved must be true or false" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        isApproved,
        approvedAt: isApproved ? new Date() : null, // if rejecting, clear timestamp
      },
    });

    return NextResponse.json(
      { message: "User approval updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error approving user:", error);
    return NextResponse.json({ error: "Failed to approve user" }, { status: 500 });
  }
}
