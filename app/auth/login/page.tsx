'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Lock, Mail, Hash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../components/InputField";
import { useRouter } from "next/navigation";

// ✅ Zod schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const sendCodeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  code: z
    .string()
    .min(4, "Enter the code")
    .max(6, "Code should be 4–6 digits")
    .regex(/^\d+$/, "Code must be digits only"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;
type SendCodeInputs = z.infer<typeof sendCodeSchema>;
type ResetInputs = z.infer<typeof resetSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [codeSent, setCodeSent] = useState(false); // step 2 toggle

  // ---- Login form ----
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) });

  // ---- Forgot step 1: send code ----
  const {
    register: sendCodeRegister,
    handleSubmit: handleSendCodeSubmit,
    getValues: getSendCodeValues,
    formState: { errors: sendCodeErrors },
  } = useForm<SendCodeInputs>({ resolver: zodResolver(sendCodeSchema) });

  // ---- Forgot step 2: reset with code ----
  const {
    register: resetRegister,
    handleSubmit: handleResetSubmit,
    setValue: setResetValue,
    watch: watchReset,
    formState: { errors: resetErrors },
  } = useForm<ResetInputs>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: "" },
  });

  // keep reset email in sync with step-1 email
  const syncResetEmail = () => {
    const e = getSendCodeValues("email") || "";
    setResetValue("email", e);
  };

  const onLogin = async (data: LoginFormInputs) => {
    setLoading(true);
    try {
      const result = await signIn("domain-login", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.ok) {
        const res = await fetch("/api/auth/session");
        const session = await res.json();
        const role = session?.user?.role;
        if (role === "artist" || role === "admin") router.push("/account/home");
        else router.push("/paintings");
      } else {
        if (result?.error === "Email Unverified") {
          // optional: auto-trigger email verification resend
          await fetch("/api/verify-email/resend-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: data.email }),
          }).catch(() => {});
          router.push(`/auth/verifyuser?email=${encodeURIComponent(data.email)}`);
          return;
        }
        alert(result?.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong during login.");
    } finally {
      setLoading(false);
    }
  };

  // ---- Forgot: send verification code ----
  const onSendCode = async (data: SendCodeInputs) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/password-reset/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(json.error || "Could not send code. Try again.");
        return;
      }
      // move to step 2
      setCodeSent(true);
      syncResetEmail();
      alert("A verification code has been sent to your email.");
    } catch (e) {
      console.error(e);
      alert("Could not send code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---- Forgot: reset password with code ----
  const onReset = async (data: ResetInputs) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          code: data.code,
          newPassword: data.newPassword,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(json.error || "Invalid code or request. Please try again.");
        return;
      }
      alert("Password reset successful. Please log in.");
      setForgotMode(false);
      setCodeSent(false);
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // sanitize OTP input live
  const codeVal = watchReset("code");
  if (typeof codeVal === "string" && /\D/.test(codeVal)) {
    setResetValue("code", codeVal.replace(/\D/g, "").slice(0, 6));
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-[Poppins]">
      <div className="rounded-2xl p-8 w-[90%] max-w-md">
        <h1 className="text-2xl font-bold text-center text-custom-paynes-gray">
          {forgotMode ? "Reset Password" : "Welcome"}
        </h1>
        <p className="text-sm text-slate-600 text-center mt-2">
          {forgotMode
            ? codeSent
              ? "Enter the verification code and your new password"
              : "Enter your email to receive a verification code"
            : "Login to continue exploring artworks"}
        </p>

        {/* LOGIN FORM */}
        {!forgotMode && (
          <form onSubmit={handleLoginSubmit(onLogin)} className="mt-8 space-y-5">
            <InputField
              type="email"
              placeholder="Email"
              icon={<Mail className="text-custom-silver" />}
              {...loginRegister("email")}
              error={loginErrors.email?.message}
            />

            <InputField
              type="password"
              placeholder="Password"
              icon={<Lock className="text-custom-silver" />}
              {...loginRegister("password")}
              error={loginErrors.password?.message}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-custom-amber text-white py-3 rounded-xl font-semibold shadow-md transition hover:scale-105 active:scale-95 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {/* FORGOT PASSWORD — STEP 1: Send Code */}
        {forgotMode && !codeSent && (
          <form onSubmit={handleSendCodeSubmit(onSendCode)} className="mt-8 space-y-5">
            <InputField
              type="email"
              placeholder="Email"
              icon={<Mail className="text-custom-silver" />}
              {...sendCodeRegister("email")}
              error={sendCodeErrors.email?.message}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-custom-amber text-white py-3 rounded-xl font-semibold shadow-md transition hover:scale-105 active:scale-95 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
        )}

        {/* FORGOT PASSWORD — STEP 2: Enter Code + New Password */}
        {forgotMode && codeSent && (
          <form onSubmit={handleResetSubmit(onReset)} className="mt-8 space-y-5">
            {/* keep email visible (read-only) for clarity */}
            <InputField
              type="email"
              placeholder="Email"
              icon={<Mail className="text-custom-silver" />}
              {...resetRegister("email")}
              error={resetErrors.email?.message}
              readOnly
            />

            <InputField
              type="text"
              placeholder="Verification Code"
              icon={<Hash className="text-custom-silver" />}
              inputMode="numeric"
              maxLength={6}
              {...resetRegister("code")}
              error={resetErrors.code?.message}
            />

            <InputField
              type="password"
              placeholder="New Password"
              icon={<Lock className="text-custom-silver" />}
              {...resetRegister("newPassword")}
              error={resetErrors.newPassword?.message}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-custom-amber text-white py-3 rounded-xl font-semibold shadow-md transition hover:scale-105 active:scale-95 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* Footer Links */}
        <div className="mt-6 flex justify-between text-xs text-slate-500">
          <a href="/auth/signup" className="hover:text-custom-amber transition">
            Create an account
          </a>

          {!forgotMode ? (
            <button
              type="button"
              onClick={() => {
                setForgotMode(true);
                setCodeSent(false);
              }}
              className="hover:text-custom-amber transition"
            >
              Forgot password?
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setForgotMode(false);
                setCodeSent(false);
              }}
              className="hover:text-custom-amber transition"
            >
              Back to login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
