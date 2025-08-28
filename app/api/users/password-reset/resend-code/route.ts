// app/api/resend-code/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { generateOtp, hashOtp, addMinutes } from "@/lib/emailOtp";
import { sendVerificationEmail } from "@/lib/mailer";

const RESEND_COOLDOWN_SECONDS = 60;  // enforce cooldown only
const OTP_TTL_MINUTES = 10;          // keep this stable for cooldown math

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (typeof email !== "string" || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const now = new Date();

    // Fetch current code row (single row per user due to unique userId)
    const current = await prisma.verificationCode.findUnique({
      where: { userId: user.id },
      select: { expiresAt: true, createdAt: true, attempts: true },
    });

    // Cooldown: infer lastSentAt from previous expiresAt - TTL
    if (current?.expiresAt) {
      const lastSentAt = new Date(
        current.expiresAt.getTime() - OTP_TTL_MINUTES * 60_000
      );
      const elapsedSec = Math.floor((now.getTime() - lastSentAt.getTime()) / 1000);
      if (elapsedSec < RESEND_COOLDOWN_SECONDS) {
        return NextResponse.json(
          { error: `Please wait ${RESEND_COOLDOWN_SECONDS - elapsedSec}s before resending.` },
          { status: 429 }
        );
      }
    }

    // Generate a new OTP (sticking with 4 digits per your schema comment)
    const code = await generateOtp(4);
    const codeHash = await hashOtp(code);

    // One active code per user: upsert to avoid unique constraint errors
    await prisma.verificationCode.upsert({
      where: { userId: user.id },
      update: {
        codeHash,
        expiresAt: addMinutes(now, OTP_TTL_MINUTES),
        attempts: 0, // reset wrong-entry attempts on resend
        // createdAt remains original; that’s fine for our cooldown math
      },
      create: {
        userId: user.id,
        codeHash,
        expiresAt: addMinutes(now, OTP_TTL_MINUTES),
        attempts: 0,
      },
    });

    // Email the PLAIN code
    await sendVerificationEmail(email, code);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend code failed:", err);
    return NextResponse.json(
      { error: "Unable to resend verification code" },
      { status: 500 }
    );
  }
}

