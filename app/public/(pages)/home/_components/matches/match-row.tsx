import Image from "next/image";
import Link from "next/link";

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
    <Link
      href={`/public/match-details/${match.fixture.id}`}
      aria-label={`View match details for ${match.teams.home.name} vs ${match.teams.away.name}`}
      className="
        grid min-w-0 grid-cols-[44px_minmax(0,1fr)_68px_minmax(0,1fr)]
        items-center gap-2 border-t border-[#DDE8E3] px-3 py-3
        transition-colors hover:bg-[#F4FBF8]
        sm:grid-cols-[52px_minmax(0,1fr)_76px_minmax(0,1fr)] sm:px-4
        dark:border-white/10 dark:hover:bg-white/[0.03]
      "
    >
      <div
        className={`flex min-w-0 items-center gap-1.5 text-[11px] font-bold ${
          isLive ? "text-[#78DDB3]" : "text-[#6B7A75] dark:text-white/35"
        }`}
      >
        {isLive && (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#78DDB3] shadow-[0_0_10px_#78DDB3]" />
        )}
        <span className="truncate">{status}</span>
      </div>

      <div className="flex min-w-0 items-center gap-2">
        <Image
          src={getValidImage(match.teams.home.logo)}
          alt={match.teams.home.name}
          width={18}
          height={18}
          className="size-4.5 shrink-0 object-contain"
        />

        <span className="min-w-0 truncate text-xs font-semibold text-[#10201B] sm:text-sm dark:text-white">
          {match.teams.home.name}
        </span>
      </div>

      <div className="min-w-0 text-center">
        <p
          className={`text-lg leading-5 font-bold sm:text-xl ${
            isLive ? "text-[#78DDB3]" : "text-[#10201B] dark:text-white"
          }`}
        >
          {homeScore} - {awayScore}
        </p>

        <p className="mt-0.5 truncate text-[10px] text-[#6B7A75] dark:text-white/35">
          {match.fixture.status.long}
        </p>
      </div>

      <div className="flex min-w-0 items-center justify-end gap-2">
        <span className="min-w-0 truncate text-right text-xs font-semibold text-[#10201B] sm:text-sm dark:text-white">
          {match.teams.away.name}
        </span>

        <Image
          src={getValidImage(match.teams.away.logo)}
          alt={match.teams.away.name}
          width={18}
          height={18}
          className="size-4.5 shrink-0 object-contain"
        />
      </div>
    </Link>
  );
}
