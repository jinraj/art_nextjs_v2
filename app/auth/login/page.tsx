"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../components/InputField"; // ✅ Reuse InputField
import { useRouter } from "next/navigation";

// ✅ Zod schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;
type ForgotFormInputs = z.infer<typeof forgotSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  // ✅ Hook form for login
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  // ✅ Hook form for forgot password
  const {
    register: forgotRegister,
    handleSubmit: handleForgotSubmit,
    formState: { errors: forgotErrors },
  } = useForm<ForgotFormInputs>({
    resolver: zodResolver(forgotSchema),
  });

  // ✅ Login handler
  const onLogin = async (data: LoginFormInputs) => {
    setLoading(true);
    const result = await signIn("domain-login", {
      redirect: false,
      email: data.email,
      password: data.password
    })
    setLoading(false);
    if (result?.ok) {
      router.push("/account/home");
    } else {
      console.error(result?.error);
    }

  };

  // ✅ Forgot handler
  const onForgot = async (data: ForgotFormInputs) => {
    setLoading(true);

    // 🔹 Here you should call your API to send reset email
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert(`Password reset link sent to ${data.email}`);
    setLoading(false);
    setForgotMode(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-[Poppins]">
      <div className="rounded-2xl p-8 w-[90%] max-w-md">
        <h1 className="text-2xl font-bold text-center text-custom-paynes-gray">
          {forgotMode ? "Reset Password" : "Welcome"}
        </h1>
        <p className="text-sm text-slate-600 text-center mt-2">
          {forgotMode
            ? "Enter your email to reset your password"
            : "Login to continue exploring artworks"}
        </p>

        {/* ✅ LOGIN FORM */}
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
              className="w-full bg-custom-amber text-white py-3 rounded-xl font-semibold shadow-md transition hover:scale-105 active:scale-95"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {/* ✅ FORGOT FORM */}
        {forgotMode && (
          <form
            onSubmit={handleForgotSubmit(onForgot)}
            className="mt-8 space-y-5"
          >
            <InputField
              type="email"
              placeholder="Email"
              icon={<Mail className="text-custom-silver" />}
              {...forgotRegister("email")}
              error={forgotErrors.email?.message}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-custom-amber text-white py-3 rounded-xl font-semibold shadow-md transition hover:scale-105 active:scale-95"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        {/* ✅ Footer Links */}
        <div className="mt-6 flex justify-between text-xs text-slate-500">
          <a
            href="/auth/signup"
            className="hover:text-custom-amber transition"
          >
            Create an account
          </a>
          {!forgotMode ? (
            <button
              type="button"
              onClick={() => setForgotMode(true)}
              className="hover:text-custom-amber transition"
            >
              Forgot password?
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setForgotMode(false)}
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
