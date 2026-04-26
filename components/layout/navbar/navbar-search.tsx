"use client";

import { Search } from "lucide-react";

export default function NavbarSearch() {
  return (
    <div className="hidden h-11 items-center rounded-md bg-[#EAF3EF] px-4 md:flex md:w-65 lg:w-80 dark:bg-white/8">
      <Search className="mr-3 h-4 w-4 text-[#6B7A75] dark:text-white" />

      <input
        type="text"
        placeholder="Search"
        className="w-full bg-transparent text-sm text-[#10201B] placeholder:text-[#6B7A75] focus:outline-none dark:text-white dark:placeholder:text-white/45"
      />
    </div>
  );
}
