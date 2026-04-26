"use client";

import { Bell, User } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UserAvatar from "./user-avatar";
import Button from "@/components/UI/buttons/button";

const ThemeToggle = dynamic(() => import("../../UI/theme/theme-toggle"), {
  ssr: false,
});

interface NavbarActionsProps {
  isLoggedIn: boolean;
}

export default function NavbarActions({ isLoggedIn }: NavbarActionsProps) {
  const router = useRouter();
  const [isAuthPopoverOpen, setIsAuthPopoverOpen] = useState(false);

  const handleSignIn = () => {
    router.push("/public/sign-in");
    setIsAuthPopoverOpen(false);
  };

  return (
    <div className="relative flex items-center">
      <button className="hidden px-6 text-sm font-medium text-[#10201B] transition hover:text-[#078B63] md:block dark:text-white dark:hover:text-[#72e3c6]">
        News
      </button>

      <div className="mx-2 hidden h-6 w-px bg-[#DDE8E3] md:block dark:bg-white/15" />

      <ThemeToggle />

      {isLoggedIn ? (
        <>
          <button className="flex h-10 w-10 items-center justify-center pr-2 text-[#10201B] transition hover:text-[#078B63] dark:text-white dark:hover:text-[#72e3c6]">
            <Bell className="h-4.5 w-4.5" />
          </button>

          <UserAvatar />
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setIsAuthPopoverOpen((prev) => !prev)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center text-[#10201B] transition hover:text-[#078B63] dark:text-white dark:hover:text-[#72e3c6]"
          >
            <User className="h-4.5 w-4.5" />
          </button>

          {isAuthPopoverOpen && (
            <div className="absolute right-0 top-12 z-50 w-[284px] rounded-2xl border border-[#DDE8E3] bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-[#111f1d]">
              <h3 className="mb-2 text-base font-semibold text-[#10201B] dark:text-white">
                Experience More
              </h3>

              <p className="mb-5 text-sm leading-5 text-[#6B7A75] dark:text-white/60">
                Sign in to sync your favorites across devices and get
                personalized match updates.
              </p>

              <Button onClick={handleSignIn} className="w-full">
                Sign In
              </Button>

              <button
                type="button"
                className="mt-4 w-full text-center text-xs text-[#078B63] dark:text-[#72e3c6]"
              >
                New to Kicscore? Join Kicscore
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
