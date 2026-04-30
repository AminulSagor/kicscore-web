"use client";

import { teamDetailsTabs } from "@/mock/team-details/team-details.mock.data";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function TeamDetailsTabs() {
  const params = useParams<{ teamId: string }>();
  const searchParams = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "overview";

  return (
    <div className="mt-10 border-b border-[#DDE8E3] dark:border-white/10">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {teamDetailsTabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <Link
              key={tab.value}
              href={`/public/team-details/${params.teamId}?tab=${tab.value}`}
              className={`relative pb-3 text-sm font-semibold transition sm:text-base ${
                isActive
                  ? "text-[#10201B] dark:text-white"
                  : "text-[#6B7A75] hover:text-[#10201B] dark:text-white/45 dark:hover:text-white"
              }`}
            >
              {tab.label}

              {isActive && (
                <span className="absolute bottom-[-1px] left-0 h-[2px] w-full rounded-full bg-secondary" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
