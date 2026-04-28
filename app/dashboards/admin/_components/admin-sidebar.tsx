"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNavigation } from "@/constants/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col border-r border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white">
      <div className="flex h-18 items-center px-4">
        <h1 className="hidden text-base font-bold text-secondary dark:text-mint-green md:block">
          KICSCORE ADMIN
        </h1>
        <h1 className="text-base font-bold text-secondary dark:text-mint-green md:hidden">
          KA
        </h1>
      </div>

      <nav className="mt-7 flex-1 space-y-2 px-2">
        {adminNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm transition lg:text-base ${
                isActive
                  ? "bg-[#EAF3EF] text-secondary dark:bg-white/5 dark:text-mint-green"
                  : "text-[#6B7A75] hover:bg-[#EAF3EF] hover:text-secondary dark:text-white/55 dark:hover:bg-white/5 dark:hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span className="hidden md:block">{item.label}</span>

              {isActive && (
                <span className="absolute right-0 top-1/2 h-8 w-0.5 -translate-y-1/2 rounded-full bg-secondary dark:bg-mint-green" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 pb-6">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm text-[#6B7A75] transition hover:bg-[#EAF3EF] hover:text-secondary dark:text-white/55 dark:hover:bg-white/5 dark:hover:text-white"
        >
          <LogOut size={20} />
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </aside>
  );
}
