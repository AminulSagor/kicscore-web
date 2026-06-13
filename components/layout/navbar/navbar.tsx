"use client";

import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import MobileSidebar from "../mobile-sidebar";
import NavbarSearch from "@/components/layout/navbar/navbar-search";
import NavbarSearchField from "@/components/layout/navbar/navbar-search-field";
import NavbarActions from "@/components/layout/navbar/navbar-actions";
import Image from "next/image";
import { IMAGE } from "@/constants/image.path";
import AppLogo from "@/components/logo/app-logo";
import NavbarGetAppButton from "@/components/UI/buttons/navbar-get-app-button";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto flex items-center justify-between gap-1.5 border-b border-[#D8E7DF] bg-white/90 py-2 text-[#0B1F1A] padding-x shadow-[0_8px_30px_rgba(16,32,27,0.04)] backdrop-blur-xl md:gap-3 dark:border-transparent dark:bg-[#0b1718]/95 dark:text-white dark:shadow-none">
        <div className="flex shrink-0 items-center gap-2 md:gap-7">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="text-[#0B1F1A] md:hidden dark:text-white"
          >
            <Menu className="h-4.5 w-4.5 md:h-5 md:w-5" />
          </button>

          <AppLogo className="hidden items-center md:inline-flex" width={130} />

          <div className="hidden md:block">
            <NavbarSearch />
          </div>
        </div>

        <div className="min-w-0 flex-1 md:hidden">
          <NavbarSearchField inputClassName="w-full" popoverWidth="mobile" />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <NavbarGetAppButton />
          <NavbarActions />
        </div>
      </div>

      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </header>
  );
}
