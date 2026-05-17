"use client";

import { Bell, User } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UserAvatar from "./user-avatar";
import { authStore } from "@/z_store/auth/auth.store";
import AuthPopover from "@/components/layout/navbar/auth-popover";
import NotificationPopover from "@/components/layout/navbar/notification-popover";
import Link from "next/link";

const ThemeToggle = dynamic(() => import("../../UI/theme/theme-toggle"), {
  ssr: false,
});

export default function NavbarActions() {
  const router = useRouter();
  const [isAuthPopoverOpen, setIsAuthPopoverOpen] = useState(false);
  const [isNotificationPopoverOpen, setIsNotificationPopoverOpen] =
    useState(false);
  const loggedIn = authStore((state) => state.loggedIn);

  console.log("loggedin check", loggedIn);

  const handleSignIn = () => {
    router.push("/public/auth/sign-in");
    setIsAuthPopoverOpen(false);
  };

  return (
    <div className="relative flex items-center">
      <button className="hidden px-6 text-sm font-medium text-[#10201B] transition hover:text-[#078B63] md:block dark:text-white dark:hover:text-[#72e3c6]">
        <Link href={"/public/news"}>News</Link>
      </button>

      <div className="mx-2 hidden h-6 w-px bg-[#DDE8E3] md:block dark:bg-white/15" />
      <div className="px-2 py-2 md:py-4">
        <ThemeToggle />
      </div>

      {loggedIn ? (
        <>
          <button
            className="flex h-10 w-10 items-center justify-center pr-2 text-[#10201B] transition hover:text-[#078B63] dark:text-white dark:hover:text-[#72e3c6]"
            onClick={() => setIsNotificationPopoverOpen((prev) => !prev)}
          >
            <Bell className="h-4.5 w-4.5" />
          </button>

          {isNotificationPopoverOpen && <NotificationPopover />}

          <UserAvatar action={true} />
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

          {isAuthPopoverOpen && <AuthPopover onSignIn={handleSignIn} />}
        </>
      )}
    </div>
  );
}
