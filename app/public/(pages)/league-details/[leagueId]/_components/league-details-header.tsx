"use client";

import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import CustomSelect from "@/components/UI/select/custom-select";
import { LeagueDetailsItem } from "@/types/football/leagues/league.details";

import LeagueFollowButton from "./league-follow-button";

type LeagueDetailsHeaderProps = {
  league: LeagueDetailsItem;
  selectedSeason?: string;
};

export default function LeagueDetailsHeader({
  league,
  selectedSeason,
}: LeagueDetailsHeaderProps) {
  const router = useRouter();
  const params = useParams<{ leagueId: string }>();
  const searchParams = useSearchParams();

  const leagueId = params.leagueId;

  const currentSeason =
    league.seasons.find((season) => season.current) ?? league.seasons.at(-1);

  const activeSeason = selectedSeason ?? String(currentSeason?.year ?? "");

  //season change handler
  const handleSeasonChange = (season: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    currentParams.set("season", season);
    currentParams.set("fixturePage", "1");
    currentParams.delete("fixtureDate");

    router.push(
      `/public/league-details/${leagueId}?${currentParams.toString()}`,
    );
  };

  //format season label like this: 2023/24
  function formatSeasonLabel(year: number) {
    return `${year}/${year + 1}`;
  }

  return (
    <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-center gap-5">
        <div className="relative size-20 overflow-hidden rounded-lg bg-[#18224A] sm:size-24">
          <Image
            src={league.league.logo}
            alt={league.league.name}
            fill
            className="object-contain p-3"
            priority
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#10201B] dark:text-white sm:text-3xl">
            {league.league.name}
          </h1>
          <p className="mt-1 text-sm font-medium text-[#6B7A75] dark:text-white/70">
            {league.country.name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:pt-7">
        <CustomSelect
          value={activeSeason}
          onChange={handleSeasonChange}
          options={league.seasons.map((season) => ({
            label: formatSeasonLabel(season.year),
            value: String(season.year),
          }))}
          className="shrink-0"
          buttonClassName="h-8 rounded-full"
          menuClassName="right-0 left-auto min-w-[110px]"
        />

        <LeagueFollowButton
          leagueId={leagueId}
          entityName={league.league.name}
          entityLogo={league.league.logo}
        />
      </div>
    </section>
  );
}
