"use client";

import Link from "next/link";
import ThemeToggle from "@/components/UI/theme/theme-toggle";
import { UserCircle } from "lucide-react";

export default function AdminNavbar() {
  return (
    <header className="flex h-full items-center justify-end border-b border-[#DDE8E3] bg-white px-4 text-[#10201B] md:px-6 dark:border-white/10 dark:bg-primary dark:text-white">
      <div className="flex items-center gap-4">
        <ThemeToggle />

        <Link
          href="/dashboards/admin/profile"
          className="
            text-black
            transition
            hover:text-secondary
            dark:text-white
            dark:hover:text-mint-green
          "
        >
          <UserCircle size={20} />
        </Link>
      </div>
    </header>
  );
}
