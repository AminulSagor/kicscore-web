"use client";

import { Search, User } from "lucide-react";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("../UI/theme/theme-toggle"), {
  ssr: false,
});

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="mx-auto flex items-center justify-between bg-[#0b1718]/95 px-6 py-4">
        <div className="flex items-center gap-10">
          <h1 className="text-[18px] font-semibold tracking-tight text-[#72e3c6]">
            KICSCORE
          </h1>

          <div className="flex h-11 w-[260px] items-center rounded-md bg-white/8 px-4">
            <Search className="mr-3 h-4 w-4 text-white/45" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center">
          <button className="px-6 text-sm font-medium text-white transition hover:text-[#72e3c6]">
            News
          </button>

          <div className="mx-2 h-6 w-px bg-white/15" />

          <ThemeToggle />

          <button className="flex h-10 w-10 items-center justify-center text-white transition hover:text-[#72e3c6]">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
