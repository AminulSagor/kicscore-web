import Link from "next/link";

import Card from "@/components/UI/cards/card";
import type {
  CoachBackendPaging,
  CoachTrophy,
} from "@/types/football/coaches/coach.types";

type CoachTrophiesProps = {
  coachId: string;
  trophies: CoachTrophy[];
  pagination: CoachBackendPaging;
};

const CoachTrophies = ({
  coachId,
  trophies,
  pagination,
}: CoachTrophiesProps) => {
  const hasPreviousPage = pagination.page > 1;
  const hasNextPage = pagination.page < pagination.totalPages;

  const getPageHref = (page: number) => {
    const params = new URLSearchParams({
      trophyPage: String(page),
      trophyLimit: String(pagination.limit),
    });

    return `/public/coach-details/${coachId}?${params.toString()}`;
  };

  return (
    <Card
      padding="none"
      rounded="2xl"
      shadow="none"
      className="mt-8 overflow-hidden bg-white text-black ring-1 ring-[#DDE8E3] dark:bg-[#101C18] dark:text-white dark:ring-white/7"
    >
      <div className="flex items-center justify-between gap-4 bg-[#EAF3EF] px-5 py-4 dark:bg-[#1F2B27]">
        <h2 className="text-sm font-bold text-black dark:text-white">
          Trophies
        </h2>

        <p className="text-xs text-[#6B7A75] dark:text-white/45">
          {pagination.totalItems} total
        </p>
      </div>

      <div className="space-y-3 px-4 py-5">
        {trophies.map((trophy) => (
          <Card
            key={trophy.id}
            padding="none"
            rounded="2xl"
            shadow="none"
            className="bg-[#EAF3EF] px-5 py-5 text-[#10201B] dark:bg-[#1F2B27] dark:text-white"
          >
            <div className="grid grid-cols-[32px_1fr] gap-x-4">
              <span className="h-8 w-8 rounded-full border border-[#0B8F68] dark:border-[#79e2c5]" />

              <div>
                <p className="text-base font-bold">{trophy.title}</p>
                <p className="mt-1 text-xs text-[#6B7A75] dark:text-white/45">
                  {trophy.country}
                </p>
              </div>

              <span className="mt-4 h-5 w-5 self-start rounded-full border border-[#6B7A75] dark:border-white/35" />

              <div className="mt-4 flex items-center justify-between border-t border-[#DDE8E3] pt-4 dark:border-white/10">
                <span className="text-sm text-[#6B7A75] dark:text-white/85">
                  {trophy.season}
                </span>
                <span className="text-sm font-bold">{trophy.result}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-[#DDE8E3] px-4 py-4 dark:border-white/10">
          {hasPreviousPage ? (
            <Link
              href={getPageHref(pagination.page - 1)}
              className="rounded-full bg-[#EAF3EF] px-4 py-2 text-xs font-bold text-[#10201B] transition hover:bg-[#DDE8E3] dark:bg-[#1F2B27] dark:text-white"
            >
              Previous
            </Link>
          ) : (
            <span className="rounded-full bg-[#EAF3EF] px-4 py-2 text-xs font-bold text-[#6B7A75] opacity-60 dark:bg-[#1F2B27] dark:text-white/45">
              Previous
            </span>
          )}

          <span className="text-xs font-semibold text-[#6B7A75] dark:text-white/55">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          {hasNextPage ? (
            <Link
              href={getPageHref(pagination.page + 1)}
              className="rounded-full bg-[#0B8F68] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#0A7C58]"
            >
              Next
            </Link>
          ) : (
            <span className="rounded-full bg-[#0B8F68] px-4 py-2 text-xs font-bold text-white opacity-50">
              Next
            </span>
          )}
        </div>
      )}
    </Card>
  );
};

export default CoachTrophies;