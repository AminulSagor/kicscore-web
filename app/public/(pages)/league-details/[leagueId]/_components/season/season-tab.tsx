"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { LeagueSeason } from "@/types/football/leagues/league.details";
import SeasonCard from "./season-card";

type Props = {
  seasons: LeagueSeason[];
  activeSeason: string;
};

export default function SeasonTab({ seasons, activeSeason }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ leagueId: string }>();

  const sortedSeasons = [...seasons].sort((a, b) => b.year - a.year);

  const handleSeasonClick = (year: number) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("season", String(year));
    currentParams.set("fixturePage", "1");
    currentParams.delete("fixtureDate");

    router.push(
      `/public/league-details/${params.leagueId}?${currentParams.toString()}`,
      { scroll: false }
    );
  };

  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="mb-6 text-xl font-bold text-[#10201B] dark:text-white sm:text-2xl">
        Completed Seasons
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedSeasons.map((season) => (
          <SeasonCard 
            key={season.year} 
            season={season} 
            leagueId={params.leagueId}
            isActive={String(season.year) === activeSeason} 
            onClick={() => handleSeasonClick(season.year)}
          />
        ))}
      </div>
    </div>
  );
}
