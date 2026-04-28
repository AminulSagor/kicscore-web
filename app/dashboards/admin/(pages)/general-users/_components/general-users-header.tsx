import { Users } from "lucide-react";

import Card from "@/components/UI/cards/card";

export default function GeneralUsersHeader() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold lg:text-3xl">General Users</h1>
        <p className="mt-2 text-sm text-[#6B7A75] dark:text-white/45">
          Manage platform access, review status, and moderate activity.
        </p>
      </div>

      <Card
        variant="white"
        shadow="none"
        className="mt-8 max-w-[230px] border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#111d1a] dark:text-white"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6B7A75] dark:text-white/45">
              Total Users
            </p>

            <div className="mt-4 flex items-end gap-2">
              <h2 className="text-3xl font-bold">14,205</h2>
              <span className="mb-1 rounded-md bg-secondary px-2 py-1 text-xs font-bold text-white">
                ↗ 12%
              </span>
            </div>
          </div>

          <Users size={20} className="text-secondary dark:text-mint-green" />
        </div>
      </Card>
    </>
  );
}
