"use client";

import NavbarSearchField from "@/components/layout/navbar/navbar-search-field";
import UserAvatar from "@/components/layout/navbar/user-avatar";
import { authStore } from "@/z_store/auth/auth.store";
import { LogIn, LogOut, Newspaper, Star, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const router = useRouter();

  const user = authStore((state) => state.user);
  const loggedIn = authStore((state) => state.loggedIn);
  const logout = authStore((state) => state.logout);

  //======= Handle logout =======//
  const handleLogout = () => {
    logout();
    onClose();
    router.replace("/");
  };

  //======= Handle sign in navigation =======//
  const handleSignIn = () => {
    onClose();
    router.push("/public/auth/sign-in");
  };

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
          <Link
            onClick={onClose}
            href="/public/news"
            className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm text-[#10201B] hover:bg-[#EAF3EF] dark:text-white dark:hover:bg-white/8"
          >
            <Newspaper className="h-4 w-4" />
            News
          </Link>

          {loggedIn && (
            <>
              <Link
                onClick={onClose}
                href="/public/user/following"
                className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm text-[#10201B] hover:bg-[#EAF3EF] dark:text-white dark:hover:bg-white/8"
              >
                <Star className="h-4 w-4" />
                Following
              </Link>

              <Link
                onClick={onClose}
                href="/public/user/profile-settings"
                className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm text-[#10201B] hover:bg-[#EAF3EF] dark:text-white dark:hover:bg-white/8"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
            </>
          )}
        </nav>

        <div className="mt-3 border-t border-[#DDE8E3] pt-5 dark:border-white/10">
          {loggedIn ? (
            <div>
              <div className="flex items-center gap-3">
                <UserAvatar />

                <div>
                  <p className="text-sm font-medium text-[#10201B] dark:text-white">
                    {user?.fullName || "User"}
                  </p>
                  <p className="text-xs text-[#6B7A75] dark:text-white/50">
                    {user?.email || "user@gmail.com"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-red transition hover:bg-red/10"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDE8E3] bg-[#EAF3EF] dark:border-white/10 dark:bg-[#25302B]">
                  <User className="h-4 w-4 text-secondary dark:text-mint-green" />
                </div>

                <div>
                  <p className="text-sm font-medium text-[#10201B] dark:text-white">
                    Guest User
                  </p>
                  <p className="text-xs text-[#6B7A75] dark:text-white/50">
                    Sign in to personalize KICScore
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSignIn}
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-secondary px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:opacity-90 dark:bg-mint-green dark:text-[#10201B]"
              >
                Sign In
                <LogIn className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
