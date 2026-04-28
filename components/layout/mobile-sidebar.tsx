"use client";

import NavbarSearchField from "@/components/layout/navbar/navbar-search-field";
import UserAvatar from "@/components/layout/navbar/user-avatar";
import { X, User, Newspaper } from "lucide-react";
import Link from "next/link";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-82 bg-white px-5 py-4 text-[#10201B] transition-transform duration-300 md:hidden dark:bg-[#0b1718] dark:text-white ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-[#078B63] dark:text-[#72e3c6]">
            KICSCORE
          </h2>

          <button onClick={onClose} className="text-[#10201B] dark:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <NavbarSearchField
          className="mb-5"
          inputClassName="w-full"
          popoverWidth="mobile"
        />

        <nav>
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm text-[#10201B] hover:bg-[#EAF3EF] dark:text-white dark:hover:bg-white/8 cursor-pointer">
            <Newspaper className="h-4 w-4" />
            News
          </button>

          <Link
            onClick={onClose}
            href="/public/user/profile-settings"
            className="flex w-full items-center gap-3 rounded-md px-3 py-1 text-sm text-[#10201B] hover:bg-[#EAF3EF] dark:text-white dark:hover:bg-white/8 cursor-pointer"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </nav>

        <div className="mt-3 flex items-center gap-3 border-t border-[#DDE8E3] pt-5 dark:border-white/10">
          <UserAvatar />
          <div>
            <p className="text-sm font-medium text-[#10201B] dark:text-white">
              User Name
            </p>
            <p className="text-xs text-[#6B7A75] dark:text-white/50">
              user@gmail.com
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
