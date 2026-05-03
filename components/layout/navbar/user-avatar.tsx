"use client";

import { useEffect, useRef, useState } from "react";
import { LogOut, Settings, Star } from "lucide-react";
import Image from "next/image";

import { IMAGE } from "@/constants/image.path";
import { authStore } from "@/z_store/auth/auth.store";
import Link from "next/link";

export default function UserAvatar({ action }: { action?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const setLoggedIn = authStore((state) => state.setLoggedIn);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => {
          if (action) {
            setIsOpen((prev) => !prev);
          }
        }}
        className="flex h-9 w-9 items-center justify-center cursor-pointer"
      >
        <Image
          src={IMAGE.profile_image}
          alt="Profile"
          width={36}
          height={36}
          className="h-9 w-9 rounded-full border-2 border-mint-green object-cover"
        />
      </button>

      {isOpen && (
        <div
          className="
            absolute right-0 top-13 z-50 w-82.5 rounded-[28px]
            border border-[#DDE8E3] bg-white p-7 shadow-xl
            dark:border-white/10 dark:bg-[#111d1a]
            max-sm:-right-3 max-sm:w-71.25 max-sm:p-5
          "
        >
          <div className="flex items-center gap-5">
            <Image
              src={IMAGE.profile_image}
              alt="User"
              width={60}
              height={60}
              className="h-17 w-17 rounded-full border-2 border-mint-green object-cover"
            />

            <h3 className="text-base font-bold text-[#10201B] dark:text-white">
              User Name
            </h3>
          </div>

          <div className="my-5 h-px w-full bg-[#DDE8E3] dark:bg-white/10" />

          <div className="space-y-1">
            <Link
              href={"/public/user/following"}
              className="flex w-full items-center gap-4 rounded-xl px-1 py-3 text-sm font-semibold text-[#10201B] transition hover:bg-[#EAF3EF] dark:text-white dark:hover:bg-[#25302B]"
            >
              <Star size={21} />
              Following
            </Link>

            <Link
              href={"/public/user/profile-settings"}
              className="flex w-full items-center gap-4 rounded-xl px-1 py-3 text-sm font-semibold text-[#10201B] transition hover:bg-[#EAF3EF] dark:text-white dark:hover:bg-[#25302B]"
            >
              <Settings size={21} />
              Settings
            </Link>

            <button
              type="button"
              className="flex w-full items-center gap-4 rounded-xl px-1 py-3 text-sm font-semibold text-red transition hover:bg-red/10 cursor-pointer"
              onClick={() => setLoggedIn()}
            >
              <LogOut size={21} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
