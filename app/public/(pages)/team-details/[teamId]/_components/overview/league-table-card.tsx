import Image from "next/image";

import Card from "@/components/UI/cards/card";
import type { LeagueStandingTeam } from "@/types/football/leagues/league.standings";
import { getValidImage } from "@/utils/image/image.utils";

type Props = {
  title: string;
  standings: LeagueStandingTeam[];
};

const TABLE_PREVIEW_LIMIT = 3;
const tableGridClassName =
  "grid grid-cols-[20px_minmax(0,1fr)_24px_44px_26px_30px] items-center gap-x-2";

export default function LeagueTableCard({ title, standings }: Props) {
  const tableRows = standings.slice(0, TABLE_PREVIEW_LIMIT);

  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
    >
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">{title}</h3>
      </div>

      <div className="p-4">
        <div
          className={`${tableGridClassName} px-2 text-xs font-bold uppercase text-[#6B7A75] dark:text-white/35`}
        >
          <span>#</span>
          <span>Team</span>
          <span className="text-center">PL</span>
          <span className="text-center">+/-</span>
          <span className="text-center">GD</span>
          <span className="text-center">PTS</span>
        </div>

        <div className="mt-3 space-y-2">
          {tableRows.map((row) => (
            <div
              key={row.teamId}
              className={`${tableGridClassName} rounded-2xl bg-[#F3F7F5] px-2 py-3 text-xs font-bold dark:bg-dark-green`}
            >
              <span>{row.position}</span>

              <div className="flex min-w-0 items-center gap-2">
                <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-sm">
                  <Image
                    src={getValidImage(row.teamLogo)}
                    alt={row.teamName}
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </div>

                <span className="min-w-0 leading-4">{row.teamName}</span>
              </div>

              <span className="text-center">{row.played}</span>

              <span className="text-center">
                {row.goalsFor}-{row.goalsAgainst}
              </span>

              <span className="text-center">{row.goalDifference}</span>

              <span className="text-center">{row.points}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}