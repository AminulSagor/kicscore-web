"use client";

import { Check } from "lucide-react";

import Button from "@/components/UI/buttons/button";
import Link from "next/link";

export default function PasswordResetSuccessPage() {
  return (
    <main className="flex items-center justify-center px-4 py-10 text-foreground">
      <section className="w-full max-w-[358px]">
        <div>
          <h1 className="text-2xl font-bold leading-tight text-[#10201B] dark:text-white lg:text-3xl">
            Success!
          </h1>

          <p className="text-base font-bold uppercase text-secondary">
            New password set!
          </p>
        </div>

        <div className="mt-20 flex justify-center">
          <div
            className="
              flex h-20 w-20 items-center justify-center rounded-full
              bg-[#EAF3EF] shadow-[0_0_45px_rgba(10,124,88,0.35)]
              dark:bg-[#25302B]
            "
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white">
              <Check size={24} strokeWidth={4} />
            </div>
          </div>
        </div>

        <Button
          type="button"
          rounded="full"
          className="mt-28 h-11 w-full text-xs font-bold uppercase tracking-[0.12em]"
        >
          <Link href={"/dashbaords/user/profile-settings"}>
            Go To My Account
          </Link>
        </Button>
      </section>
    </main>
  );
}
