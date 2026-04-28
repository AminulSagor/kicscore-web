"use client";

import ThemeToggle from "@/components/UI/theme/theme-toggle";
import { Bell, CircleHelp, UserCircle } from "lucide-react";

export default function AdminNavbar() {
  return (
    <header className="flex h-full items-center justify-end border-b border-[#DDE8E3] bg-white px-4 text-[#10201B] md:px-6 dark:border-white/10 dark:bg-primary dark:text-white">
      <div className="flex items-center gap-4">
        <ThemeToggle />

        {[Bell, CircleHelp, UserCircle].map((Icon, index) => (
          <button
            key={index}
            type="button"
            className="
              text-black
              transition
              hover:text-secondary
              dark:text-white
              dark:hover:text-mint-green
            "
          >
            <Icon size={20} />
          </button>
        ))}
      </div>
    </header>
  );
}
