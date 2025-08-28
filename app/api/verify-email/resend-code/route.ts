// app/api/resend-code/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import { generateOtp, hashOtp, addMinutes } from "../../../../lib/emailOtp";
import { sendVerificationEmail } from "@/lib/mailer";

// Ensure Node.js runtime (Nodemailer won't work on Edge)
export const runtime = "nodejs";

const RESEND_COOLDOWN_SECONDS = 60;  // user must wait this long between resends
const RESEND_DAILY_LIMIT = 10;       // max resends per 24h window
const OTP_TTL_MINUTES = 10;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (typeof email !== "string" || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (user.verifiedAt) {
      return NextResponse.json({ error: "Email already verified" }, { status: 400 });
    }

    const now = new Date();

    // Cooldown: check the last code timestamp
    const last = await prisma.verificationCode.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    });

    if (last) {
      const elapsedSec = Math.floor((now.getTime() - last.createdAt.getTime()) / 1000);
      if (elapsedSec < RESEND_COOLDOWN_SECONDS) {
        return NextResponse.json(
          { error: `Please wait ${RESEND_COOLDOWN_SECONDS - elapsedSec}s before resending.` },
          { status: 429 }
        );
      }
    }

    // Daily limit window
    const since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sentLast24h = await prisma.verificationCode.count({
      where: { userId: user.id, createdAt: { gte: since } },
    });
    if (sentLast24h >= RESEND_DAILY_LIMIT) {
      return NextResponse.json(
        { error: "Daily resend limit reached. Try again tomorrow." },
        { status: 429 }
      );
    }

    // Generate new OTP and store hashed version
    const code = await generateOtp(4);
    console.log(`Generated OTP for ${email}: ${code} (valid for ${OTP_TTL_MINUTES} mins)`);
    const codeHash = await hashOtp(code);
    console.log(`Hashed OTP: ${codeHash}`);

    // Option A: keep history; Option B: allow only one active.
    // If you want only the latest to be valid, uncomment the deleteMany:
    // await prisma.verificationCode.deleteMany({ where: { userId: user.id } });

    await prisma.verificationCode.create({
      data: {
        userId: user.id,
        codeHash,
        expiresAt: addMinutes(now, OTP_TTL_MINUTES),
        attempts: sentLast24h,
      },
    });

    // Send email with the PLAIN code
    await sendVerificationEmail(email, code);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // Common Nodemailer error: Missing creds / wrong runtime
    console.error("Resend code failed:", err);
    return NextResponse.json(
      { error: "Unable to resend verification code" },
      { status: 500 }
    );
  }
}
