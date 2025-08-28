import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";
import { authenticateRequestByRole, authenticateRequestBySession } from "@/app/auth/auth";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { addMinutes, generateOtp, hashOtp } from "@/lib/emailOtp";
import { sendVerificationEmail } from "@/lib/mailer";

// GET: Fetch all users (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await authenticateRequestByRole([Role.Admin]);
    if (session instanceof NextResponse) return session;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        verifiedAt: true,
        address: true,
        landmark: true,
        role: true,
        city: true,
        state: true,
        country: true,
        isApproved: true,
        approvedAt: true,
        createdAt: true,
        updatedAt: true
      },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST: Register a new user (self-registration)
export async function POST(request: NextRequest) {
  try {
    console.log("Received user registration request");
    const { name, email, password, address, landmark, role, city, state, country } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const base64Password = Buffer.from(hashedPassword).toString('base64'); // encode to Base64
    console.log("Password hashed and encoded");
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        verifiedAt: null,
        password: base64Password,
        role: role || "Customer",
        address,
        landmark,
        city,
        state,
        country,
        isApproved: role === "Customer" ? true : false, // Artists need approval
        approvedAt: role === "Customer" ? new Date() : null,
      },
    });
    console.log("Created new user in DB");

    // Generate, hash, and store OTP
    const code = await generateOtp(4);
    console.log("Generated OTP");
    const codeHash = await hashOtp(code);
    console.log("Hashed OTP");
    await prisma.verificationCode.create({
      data: {
        userId: newUser.id,
        codeHash,
        expiresAt: addMinutes(new Date(), 10),
      },
    });
    console.log("Saved OTP to DB");

    // Send verification email
    await sendVerificationEmail(email, code);
    console.log("Sent verification email");
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

