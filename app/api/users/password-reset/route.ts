
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { verifyOtp } from "../../../../lib/emailOtp"; // compare plain vs hash
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

const MAX_ATTEMPTS = 5;

export async function POST(req: Request) {
  try {
    const { email, code, newPassword } = await req.json();

    if (!email || !code || !newPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const vCode = await prisma.verificationCode.findUnique({
      where: { userId: user.id },
    });

    if (!vCode) {
      return NextResponse.json({ error: "No verification code found" }, { status: 400 });
    }

    // Too many attempts
    if (vCode.attempts >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: "Too many failed attempts. Request a new code." },
        { status: 429 }
      );
    }

    // Expired?
    if (new Date() > vCode.expiresAt) {
      return NextResponse.json({ error: "Verification code expired" }, { status: 400 });
    }

    // Check hash
    const valid = await verifyOtp(code, vCode.codeHash);
    if (!valid) {
      await prisma.verificationCode.update({
        where: { userId: user.id },
        data: { attempts: { increment: 1 } },
      });
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    // ✅ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const base64Hash = Buffer.from(hashedPassword).toString("base64");
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { password: base64Hash },
      }),
      prisma.verificationCode.delete({ where: { userId: user.id } }), // invalidate code
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Password reset error:", err);
    return NextResponse.json({ error: "Server error resetting password" }, { status: 500 });
  }
}

