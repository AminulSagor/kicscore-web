import { Search } from "lucide-react";

export default function GeneralUsersSearch() {
  return (
    <div className="mt-8 flex h-10 items-center rounded-md bg-[#EAF3EF] border border-slate-200 dark:border-none px-3 dark:bg-[#111d1a]">
      <Search size={17} className="mr-3 text-[#6B7A75] dark:text-white/50" />

      <input
        type="text"
        placeholder="Search general users..."
        className="w-full bg-transparent text-sm text-[#10201B] outline-none placeholder:text-[#6B7A75] dark:text-white dark:placeholder:text-white/45"
      />
    </div>
  );
}
