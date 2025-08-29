'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Hash } from "lucide-react";
import InputField from "@/app/components/InputField";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// ✅ Validation Schema
const verifySchema = z.object({
  email: z.email("Invalid email"),
  code: z
    .string()
    .min(4, "Enter the 4-digit code")
    .max(4, "Enter the 4-digit code")
    .regex(/^\d{4}$/, "Code must be 4 digits"),
});

type VerifySchema = z.infer<typeof verifySchema>;

export default function VerifyEmailPage() {
  const search = useSearchParams();
  const router = useRouter();

  // pick email from query (?email=)
  const emailFromQuery = useMemo(() => search.get("email") ?? "", [search]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VerifySchema>({
    resolver: zodResolver(verifySchema),
    defaultValues: { email: emailFromQuery, code: "" },
  });

  // Keep form email synced if user lands later with a query
  useEffect(() => {
    if (emailFromQuery) setValue("email", emailFromQuery);
  }, [emailFromQuery, setValue]);

  // resend cooldown
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!cooldown) return;
    const t = setInterval(() => setCooldown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  // helpers
  const email = watch("email");
  const code = watch("code");

  // Pre-register fields (validation only)
  const emailReg = register("email");
  const codeReg = register("code");

  // Submit handler — verify the OTP code
  const onSubmit = async (data: VerifySchema) => {
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, code: data.code }),
      });

      const json = await res.json();
      if (!res.ok) {
        alert(json.error || "Invalid code. Please try again.");
        return;
      }

      // success — route to login or home
      router.push("/auth/login?verified=1");
    } catch (err) {
      console.error("Verify error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  // 🔁 Resend a new code
  const onResend = async () => {
    if (!email) {
      alert("Please provide an email.");
      return;
    }
    setResending(true);
    try {
      const res = await fetch("/api/verify-email/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) {
        alert(json.error || "Could not resend. Try again shortly.");
      } else {
        setCooldown(60); // 60s cooldown
        alert("A new code has been sent to your email.");
      }
    } catch (e) {
      console.error(e);
      alert("Could not resend. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-[Poppins] py-12">
      <div className="rounded-2xl p-6 sm:p-8 w-[95%] max-w-lg bg-white shadow-xl">
        <h1 className="text-2xl font-bold text-center text-custom-paynes-gray">
          Verify your email
        </h1>
        <p className="text-sm text-slate-600 text-center mt-2 break-all">
          We sent a 4-digit code to <b>{email || "your email"}</b>.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Email */}
          <InputField
            icon={<Mail className="text-custom-silver" size={18} />}
            placeholder="Email"
            type="email"
            {...emailReg}
            error={errors.email?.message}
          />

          {/* Code (numeric only, 4 digits) */}
          <InputField
            icon={<Hash className="text-custom-silver" size={18} />}
            placeholder="Enter 4-digit code"
            inputMode="numeric"
            maxLength={4}
            {...codeReg}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 4);
              setValue("code", val, { shouldValidate: true });
            }}
            onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
              e.preventDefault();
              const pasted = (e.clipboardData.getData("text") || "")
                .replace(/\D/g, "")
                .slice(0, 4);
              setValue("code", pasted, { shouldValidate: true });
            }}
            className="tracking-widest text-center text-xl"
            error={errors.code?.message}
          />

          {/* Verify */}
          <button
            type="submit"
            disabled={isSubmitting || code.length !== 4 || !email}
            className="w-full bg-custom-amber text-white py-3 rounded-xl font-semibold shadow-md transition hover:scale-105 active:scale-95 disabled:opacity-60"
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </form>

        {/* Resend */}
        <div className="mt-4">
          <button
            type="button"
            onClick={onResend}
            disabled={resending || cooldown > 0 || !email}
            className="w-full bg-white border border-gray-300 py-3 rounded-xl font-semibold shadow-sm transition hover:scale-105 active:scale-95 disabled:opacity-60"
          >
            {resending
              ? "Sending..."
              : cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Resend code"}
          </button>
          <p className="text-xs text-slate-500 text-center mt-2">
            Didn’t receive the email? Check your spam folder or try resending.
          </p>
        </div>
      </div>
    </div>
  );
}
