"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Button from "@/components/UI/buttons/button";
import Link from "next/link";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex items-center justify-center px-4 py-10 text-foreground">
      <section
        className="
          relative w-full max-w-121.5 rounded-[28px] border border-[#DDE8E3]
          bg-white px-6 py-10 shadow-sm
          dark:border-white/10 dark:bg-[#111d1a]
          sm:px-7 md:px-8
        "
      >
        <div className="mb-8 text-center">
          <h1 className="text-lg font-bold text-[#10201B] dark:text-white lg:text-2xl">
            Join Kicscore
          </h1>
          <p className="mt-2 text-sm text-secondary dark:text-mint-green/80">
            Create an account to get started
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#10201B] dark:text-white/80">
              Full Name
            </label>

            <div className="flex h-12 items-center gap-3 rounded-xl bg-[#EAF3EF] px-4 text-[#10201B] dark:bg-[#25302B] dark:text-white">
              <User size={18} className="text-secondary" />
              <input
                type="text"
                placeholder="John Doe"
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#10201B]/35 dark:placeholder:text-white/30"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#10201B] dark:text-white/80">
              Email Address
            </label>

            <div className="flex h-12 items-center gap-3 rounded-xl bg-[#EAF3EF] px-4 text-[#10201B] dark:bg-[#25302B] dark:text-white">
              <Mail size={18} className="text-secondary" />
              <input
                type="email"
                placeholder="name@example.com"
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#10201B]/35 dark:placeholder:text-white/30"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#10201B] dark:text-white/80">
              Password
            </label>

            <div className="flex h-12 items-center gap-3 rounded-xl bg-[#EAF3EF] px-4 text-[#10201B] dark:bg-[#25302B] dark:text-white">
              <Lock size={18} className="text-secondary" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#10201B]/35 dark:placeholder:text-white/30"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-secondary transition hover:opacity-80"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-3 pt-3 text-xs text-[#10201B]/65 dark:text-white/60">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 accent-secondary"
            />
            <span>
              I agree to the{" "}
              <button type="button" className="underline">
                Terms of Service
              </button>{" "}
              and{" "}
              <button type="button" className="underline">
                Privacy Policy
              </button>
            </span>
          </label>

          <Button
            type="submit"
            rounded="full"
            size="md"
            className="mt-8 h-12 w-full text-xs font-bold uppercase tracking-[0.08em]"
          >
            Create Account
          </Button>
        </form>

        <p className="mt-7 text-center text-sm text-[#10201B]/60 dark:text-white/55">
          Already have an account?{" "}
          <button
            type="button"
            className="font-bold text-secondary transition hover:opacity-80 dark:text-mint-green"
          >
            <Link href={"/public/auth/sign-in"}>Sign In</Link>
          </button>
        </p>
      </section>
    </main>
  );
}
