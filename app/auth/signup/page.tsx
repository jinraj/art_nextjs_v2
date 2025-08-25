"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, MapPin } from "lucide-react";
import InputField from "@/app/components/InputField";
import { useState, useMemo, useEffect } from "react";
import { Role } from "@prisma/client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // ✅ shadcn/ui popover

// ✅ Validation Schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["Customer", "Artist", "Admin"], {
    required_error: "Please select a role",
  }),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
});

type RegisterSchema = z.infer<typeof registerSchema>;

const ROLE_INFO: Record<Role, { title: string; desc: string }> = {
  Customer: {
    title: "Customer",
    desc: "Browse & buy artworks. Follow artists and manage your orders in one place.",
  },
  Artist: {
    title: "Artist",
    desc: "Upload and showcase your creations, manage inventory, and grow your audience.",
  },
  Admin: {
    title: "Admin",
    desc: "Oversee users, artworks, and orders. Keep the platform healthy and secure.",
  },
};

export default function Signup() {
  // ✅ Default role = Customer
  const [selectedRole, setSelectedRole] = useState<Role>(Role.Customer);
  const [openPopover, setOpenPopover] = useState<Role | null>(Role.Customer);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    setValue("role", Role.Customer); // pre-fill default role
  }, [setValue]);

  const onSubmit = async (data: RegisterSchema) => {
    console.log("User data:", data);
  };

  const roles = useMemo(
    () => [
      { id: Role.Customer, label: "Customer", icon: "🛒" },
      { id: Role.Artist, label: "Artist", icon: "🎨" },
      { id: Role.Admin, label: "Admin", icon: "⚡" },
    ],
    []
  );

  return (
    <div className="min-h-screen flex items-center justify-center font-[Poppins] py-12">
      <div className="rounded-2xl p-6 sm:p-8 w-[95%] max-w-lg bg-white shadow-xl">
        <h1 className="text-2xl font-bold text-center text-custom-paynes-gray">
          Create Account
        </h1>
        <p className="text-sm text-slate-600 text-center mt-2">
          Join us and start exploring amazing artworks
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Inputs */}
          <InputField icon={<User className="text-custom-silver" size={18} />} placeholder="Full Name" {...register("name")} error={errors.name?.message} />
          <InputField icon={<Mail className="text-custom-silver" size={18} />} placeholder="Email" type="email" {...register("email")} error={errors.email?.message} />
          <InputField icon={<Lock className="text-custom-silver" size={18} />} placeholder="Password" type="password" {...register("password")} error={errors.password?.message} />
          <InputField icon={<MapPin className="text-custom-silver" size={18} />} placeholder="City" {...register("city")} error={errors.city?.message} />
          <InputField icon={<MapPin className="text-custom-silver" size={18} />} placeholder="State" {...register("state")} error={errors.state?.message} />
          <InputField icon={<MapPin className="text-custom-silver" size={18} />} placeholder="Country" {...register("country")} error={errors.country?.message} />

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Select Role</label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
                <Popover
                  key={role.id}
                  open={openPopover === role.id}
                  onOpenChange={(open) => setOpenPopover(open ? role.id : null)}
                >
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRole(role.id);
                        setValue("role", role.id as RegisterSchema["role"]);
                      }}
                      className={[
                        "relative w-full rounded-md text-center transition select-none py-2",
                        selectedRole === role.id
                          ? "border-2 border-custom-amber bg-custom-amber/10"
                          : "border-2 border-transparent hover:border-slate-300",
                      ].join(" ")}
                    >
                      <div className="text-xl mb-0.5">{role.icon}</div>
                      <p className="text-xs sm:text-sm font-medium">{role.label}</p>
                    </button>
                  </PopoverTrigger>

                  <PopoverContent className="w-64 text-sm leading-relaxed">
                    <h3 className="font-semibold text-custom-paynes-gray">{ROLE_INFO[role.id].title}</h3>
                    <p className="mt-1 text-slate-600">{ROLE_INFO[role.id].desc}</p>

                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setOpenPopover(null)}
                        className="text-xs bg-custom-amber text-white px-3 py-1 rounded-lg shadow hover:scale-105 transition"
                      >
                        Got it
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </div>

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
          <a href="/auth/login" className="text-custom-amber font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
