"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, Phone, MapPin, Calendar } from "lucide-react";
import InputField from "@/app/components/InputField";

// ✅ Validation Schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    console.log("User data:", data);
    // 🔗 You can call your API here to save user
    // await fetch("/api/register", { method: "POST", body: JSON.stringify(data) });
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-[Poppins] py-12">
      <div className="rounded-2xl p-8 w-[95%] max-w-lg">
        <h1 className="text-2xl font-bold text-center text-custom-paynes-gray">
          Create Account
        </h1>
        <p className="text-sm text-slate-600 text-center mt-2">
          Join us and start exploring amazing artworks
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Name */}
          <InputField
            icon={<User className="text-custom-silver" />}
            placeholder="Full Name"
            {...register("name")}
            error={errors.name?.message}
          />

          {/* Email */}
          <InputField
            icon={<Mail className="text-custom-silver" />}
            placeholder="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

          {/* Password */}
          <InputField
            icon={<Lock className="text-custom-silver" />}
            placeholder="Password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />

          {/* City */}
          <InputField
            icon={<MapPin className="text-custom-silver" />}
            placeholder="City"
            {...register("city")}
            error={errors.city?.message}
          />

          {/* State */}
          <InputField
            icon={<MapPin className="text-custom-silver" />}
            placeholder="State"
            {...register("state")}
            error={errors.state?.message}
          />

          {/* Country */}
          <InputField
            icon={<MapPin className="text-custom-silver" />}
            placeholder="Country"
            {...register("country")}
            error={errors.country?.message}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-custom-amber text-white py-3 rounded-xl font-semibold shadow-md transition hover:scale-105 active:scale-95"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-custom-amber font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

