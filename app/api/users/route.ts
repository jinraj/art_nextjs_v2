import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";
import { authenticateAdminRequest, authenticateRequest } from "@/app/auth/auth";
import bcrypt from "bcryptjs";

// ✅ GET: Fetch all users (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await authenticateAdminRequest(request);
    if (session instanceof NextResponse) return session;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        city: true,
        state: true,
        country: true,
        isApproved: true,
        approvedAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// ✅ POST: Register a new user (self-registration)
export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role, city, state, country } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password before saving (important!)
    const hashedPassword = await bcrypt.hash(password, 10);
    // const hashedPassword = password; // Replace with hashing

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "Artist",
        city,
        state,
        country,
        isApproved: role === "Admin" ? false : true, // ✅ auto-approve artists, not admins
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// ✅ PUT: Update user profile (self or admin)
export async function PUT(request: NextRequest) {
  try {
    const session = await authenticateAdminRequest(request); // normal auth
    if (session instanceof NextResponse) return session;

    const { id, ...updates } = await request.json();
    if (!id) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: updates.name,
        city: updates.city,
        state: updates.state,
        country: updates.country,
        ...(updates.isApproved !== undefined && { isApproved: updates.isApproved }),
        ...(updates.approvedAt && { approvedAt: new Date(updates.approvedAt) }),
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// ✅ DELETE: Remove user (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await authenticateAdminRequest(request);
    if (session instanceof NextResponse) return session;

    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    const deletedUser = await prisma.user.delete({ where: { id } });

    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
