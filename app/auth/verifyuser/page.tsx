"use client";

import { Suspense } from "react";
import VerifyEmailInner from "./VerifyEmailInner";

// If you're seeing prerender/export errors, keep this:
export const dynamic = "force-dynamic";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center font-[Poppins] py-12">
        <div className="rounded-2xl p-6 sm:p-8 w-[95%] max-w-lg bg-white shadow-xl">
          <div className="h-6 w-40 bg-slate-200 rounded mb-4" />
          <div className="h-4 w-64 bg-slate-200 rounded" />
        </div>
      </div>
    }>
      <VerifyEmailInner />
    </Suspense>
  );
}
