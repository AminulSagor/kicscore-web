import Image from "next/image";

import Card from "@/components/UI/cards/card";
import type { TeamLeagueItem } from "@/types/football/teams/team.leagues.types";
import { getValidImage } from "@/utils/image/image.utils";

type Props = {
  leagues: TeamLeagueItem[];
};

const getSeasonLabel = (league: TeamLeagueItem) => {
  const season = league.seasons[0];

  if (!season) {
    return "-";
  }

  return `${season.year}/${season.year + 1}`;
};

export default function LeaguesCard({ leagues }: Props) {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
    >
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">Leagues</h3>
      </div>

      <div className="space-y-3 p-4">
        {leagues.map((league) => (
          <div
            key={league.league.id}
            className="flex items-center gap-4 rounded-2xl bg-[#F3F7F5] p-4 dark:bg-dark-green"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-mint-green">
              <Image
                src={getValidImage(league.league.logo)}
                alt={league.league.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-bold">{league.league.name}</p>
              <p className="text-xs text-[#6B7A75] dark:text-white/40">
                {getSeasonLabel(league)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}