"use client";

import { Lock, RotateCcw } from "lucide-react";
import { useState } from "react";

import Button from "@/components/UI/buttons/button";

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  /* ============ Handle Input Change ============ */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ============ Handle Change Password ============ */
  const handleChangePassword = () => {
    console.log("Password Data:", formData);
  };

  return (
    <main className="flex items-center justify-center px-4 py-10 text-foreground">
      <section className="w-full max-w-[420px]">
        <div>
          <h1 className="text-2xl font-bold leading-tight text-[#10201B] dark:text-white lg:text-3xl">
            Verified!
          </h1>
          <p className="text-base font-bold text-secondary">Set new password</p>
        </div>

        <div className="mt-14 rounded-xl bg-[#EAF3EF] p-4 dark:bg-[#111d1a]">
          <div>
            <label className="mb-2 block text-[12px] font-bold uppercase tracking-[0.18em] text-[#10201B]/45 dark:text-white/35">
              New Password
            </label>

            <div className="flex h-10 items-center gap-3 rounded-lg bg-white px-3 dark:bg-[#0b1512]">
              <Lock
                size={15}
                className="text-[#10201B]/35 dark:text-white/35"
              />

              <input
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="••••••••••••"
                className="h-full w-full bg-transparent text-sm text-[#10201B] outline-none placeholder:text-[#10201B]/30 dark:text-white dark:placeholder:text-white/25"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-[12px] font-bold uppercase tracking-[0.18em] text-[#10201B]/45 dark:text-white/35">
              Confirm Password
            </label>

            <div className="flex h-10 items-center gap-3 rounded-lg bg-white px-3 dark:bg-[#0b1512]">
              <RotateCcw
                size={15}
                className="text-[#10201B]/35 dark:text-white/35"
              />

              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••••••"
                className="h-full w-full bg-transparent text-sm text-[#10201B] outline-none placeholder:text-[#10201B]/30 dark:text-white dark:placeholder:text-white/25"
              />
            </div>
          </div>

          <button
            type="button"
            className="mt-5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#10201B]/35 transition hover:text-secondary dark:text-white/30 dark:hover:text-mint-green"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="button"
          rounded="full"
          onClick={handleChangePassword}
          className="mt-20 h-11 w-full text-xs font-bold uppercase tracking-[0.12em]"
        >
          Change Password
        </Button>
      </section>
    </main>
  );
}
