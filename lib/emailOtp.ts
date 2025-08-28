// lib/otp.ts
import crypto from "crypto";
import bcrypt from "bcryptjs";

export async function generateOtp(length = 4) {
  const n = crypto.randomInt(0, 10 ** length);
  return n.toString().padStart(length, "0");
}

export async function hashOtp(otp: string) {
  return bcrypt.hash(otp, 10);
}

export async function verifyOtp(otp: string, hash: string) {
  return bcrypt.compare(otp, hash);
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000);
}
