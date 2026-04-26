"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import MobileSidebar from "../mobile-sidebar";
import NavbarSearch from "@/components/layout/navbar/navbar-search";
import NavbarActions from "@/components/layout/navbar/navbar-actions";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto flex items-center justify-between border-b border-[#D8E7DF] bg-white/90 py-2 text-[#0B1F1A] padding-x shadow-[0_8px_30px_rgba(16,32,27,0.04)] backdrop-blur-xl dark:border-transparent dark:bg-[#0b1718]/95 dark:text-white dark:shadow-none">
        <div className="flex items-center gap-7">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="text-[#0B1F1A] md:hidden dark:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>

          <h1 className="text-[14px] font-semibold tracking-tight text-[#008A63] md:text-[18px] dark:text-[#72e3c6]">
            <Link href="/public/home">KICSCORE</Link>
          </h1>

          <NavbarSearch />
        </div>

        <NavbarActions isLoggedIn={isLoggedIn} />
      </div>

      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </header>
  );
}
