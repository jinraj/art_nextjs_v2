import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";
import { verifyOtp } from "../../../lib/emailOtp";

const MAX_ATTEMPTS = 3;

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();
    console.log("Received verification request for:", email);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log("User not found for email:", email);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find latest active code
    const v = await prisma.verificationCode.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    console.log("Fetched verification code:", v?.id);

    if (!v) {
      console.log("No verification code found for user:", user.id);
      return NextResponse.json({ error: "No verification code. Please resend." }, { status: 400 });
    }
    if (v.attempts >= MAX_ATTEMPTS) {
      console.log("Max attempts reached for code:", v.id);
      return NextResponse.json({ error: "Too many attempts." }, { status: 429 });
    }
    if (v.expiresAt < new Date()) {
      console.log("Verification code expired for user:", user.id);
      return NextResponse.json({ error: "Code expired. Please resend." }, { status: 400 });
    }

    const ok = await verifyOtp(code, v.codeHash);
    console.log("OTP verification result:", ok);

    if (!ok) {
      await prisma.verificationCode.update({
        where: { id: v.id },
        data: { attempts: { increment: 1 } },
      });
      console.log("Invalid code entered, incremented attempts.");
      return NextResponse.json({ error: "Invalid code." }, { status: 400 });
    }

    // success
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { verifiedAt: new Date() },
      }),
      prisma.verificationCode.deleteMany({ where: { userId: user.id } }), // invalidate all
    ]);
    console.log("User verified and verification codes invalidated.");

    // issue session/jwt here or let login happen after
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error in email verification route:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}