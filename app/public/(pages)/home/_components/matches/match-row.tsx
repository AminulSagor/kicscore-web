import Image from "next/image";

import { MatchFixtureItem } from "@/types/football/matches/match.types";
import { getValidImage } from "@/utils/image/image.utils";

interface MatchRowProps {
  match: MatchFixtureItem;
}

const LIVE_STATUS = ["1H", "2H", "HT", "ET", "P", "BT", "LIVE"];

export default function MatchRow({ match }: MatchRowProps) {
  const status = match.fixture.status.short;
  const isLive = LIVE_STATUS.includes(status);

  const homeScore = match.goals.home ?? "-";
  const awayScore = match.goals.away ?? "-";

  return (
    <div
      className="
        grid grid-cols-[70px_1fr_90px_1fr] items-center gap-3
        border-t border-[#DDE8E3] px-5 py-4
        dark:border-white/10
      "
    >
      <div
        className={`flex items-center gap-2 text-xs font-bold ${
          isLive ? "text-[#78DDB3]" : "text-[#6B7A75] dark:text-white/35"
        }`}
      >
        {isLive && (
          <span className="h-2 w-2 rounded-full bg-[#78DDB3] shadow-[0_0_10px_#78DDB3]" />
        )}
        {status}
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <Image
          src={getValidImage(match.teams.home.logo)}
          alt={match.teams.home.name}
          width={20}
          height={20}
          className="size-5 shrink-0 object-contain"
        />
        <span className="truncate text-sm font-semibold text-[#10201B] dark:text-white">
          {match.teams.home.name}
        </span>
      </div>

      <div className="text-center">
        <p
          className={`text-2xl font-bold leading-6 ${
            isLive ? "text-[#78DDB3]" : "text-[#10201B] dark:text-white"
          }`}
        >
          {homeScore} - {awayScore}
        </p>
        <p className="mt-1 text-xs text-[#6B7A75] dark:text-white/35">
          {match.fixture.status.long}
        </p>
      </div>

      <div className="flex min-w-0 items-center justify-end gap-3">
        <span className="truncate text-sm font-semibold text-[#10201B] dark:text-white">
          {match.teams.away.name}
        </span>
        <Image
          src={getValidImage(match.teams.away.logo)}
          alt={match.teams.away.name}
          width={20}
          height={20}
          className="size-5 shrink-0 object-contain"
        />
      </div>
    </div>
  );
}
