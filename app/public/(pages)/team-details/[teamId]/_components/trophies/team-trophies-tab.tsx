"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { mapTeamTrophies } from "@/app/public/(pages)/team-details/[teamId]/_utils/team-trophies.utils";
import { getTeamTrophiesPreviewClient } from "@/service/football/teams/team.trophies.client.service";
import type {
  TeamTrophiesMeta,
  TeamTrophy,
} from "@/types/football/teams/team.trophies.types";

import TrophyCard from "./trophy-card";

type Props = {
  teamId: string;
  fromSeason: string;
  toSeason: string;
  initialTrophies: TeamTrophy[];
  initialMeta: TeamTrophiesMeta;
};

const updateFinalCardWidth = (
  trophies: TeamTrophy[],
  isFinalPage: boolean,
): TeamTrophy[] => {
  return trophies.map((trophy, index) => ({
    ...trophy,
    fullWidth:
      isFinalPage &&
      trophies.length % 2 !== 0 &&
      index === trophies.length - 1,
  }));
};

export default function TeamTrophiesTab({
  teamId,
  fromSeason,
  toSeason,
  initialTrophies,
  initialMeta,
}: Props) {
  const [trophies, setTrophies] = useState<TeamTrophy[]>(() =>
    updateFinalCardWidth(
      initialTrophies,
      initialMeta.page >= initialMeta.totalPages,
    ),
  );
  const [currentPage, setCurrentPage] = useState(initialMeta.page);
  const [totalPages, setTotalPages] = useState(initialMeta.totalPages);
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = currentPage < totalPages;

  const handleLoadMore = async () => {
    if (!hasMore || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await getTeamTrophiesPreviewClient({
        teamId,
        fromSeason,
        toSeason,
        page: currentPage + 1,
        limit: initialMeta.limit,
      });

      const nextTrophies = mapTeamTrophies(response.data.items);
      const nextPage = response.data.meta.page;
      const nextTotalPages = response.data.meta.totalPages;
      const isFinalPage = nextPage >= nextTotalPages;

      setTrophies((currentTrophies) => {
        const existingIds = new Set(
          currentTrophies.map((trophy) => trophy.id),
        );

        const appendedTrophies = nextTrophies.filter(
          (trophy) => !existingIds.has(trophy.id),
        );

        return updateFinalCardWidth(
          [...currentTrophies, ...appendedTrophies],
          isFinalPage,
        );
      });

      setCurrentPage(nextPage);
      setTotalPages(nextTotalPages);
    } catch {
      toast.error("Failed to load more trophies.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-8 pb-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {trophies.map((trophy) => (
          <div
            key={trophy.id}
            className={trophy.fullWidth ? "lg:col-span-2" : ""}
          >
            <TrophyCard trophy={trophy} />
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <button
          type="button"
          onClick={handleLoadMore}
          disabled={!hasMore || isLoading}
          aria-disabled={!hasMore || isLoading}
          aria-busy={isLoading}
          className={`flex items-center justify-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm font-bold text-white transition-all active:scale-[0.97] ${hasMore && !isLoading
              ? "cursor-pointer"
              : "cursor-not-allowed opacity-60"
            }`}
        >
          Load More
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}