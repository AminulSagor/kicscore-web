import Image from "next/image";
import { CalendarDays, Trophy } from "lucide-react";

import BackArrowButton from "@/components/UI/buttons/back-arrow-button";
import Button from "@/components/UI/buttons/button";
import {
  MatchDetailsFollow,
  MatchDetailsItem,
} from "@/types/football/matches/match.details.types";
import { getValidImage } from "@/utils/image/image.utils";
import { formatMatchDate } from "@/app/public/(pages)/match-details/_utils/format.match.date.utils";

interface MatchDetailsHeaderProps {
  match: MatchDetailsItem;
  follow: MatchDetailsFollow | null;
}

const LIVE_STATUS = ["1H", "2H", "HT", "ET", "P", "BT", "LIVE"];

export default function MatchDetailsHeader({
  match,
  follow,
}: MatchDetailsHeaderProps) {
  const status = match.fixture.status.short;
  const isLive = LIVE_STATUS.includes(status);

  const homeScore = match.goals.home ?? "-";
  const awayScore = match.goals.away ?? "-";

  const matchDate = formatMatchDate(match.fixture.date, match.fixture.timezone);

  const statusText =
    match.fixture.status.short === "FT"
      ? "Full time"
      : match.fixture.status.long;

  const homeTeamNameClassName = match.teams.home.winner
    ? "mt-3 text-sm font-semibold text-secondary"
    : "mt-3 text-sm font-semibold text-[#10201B] dark:text-white";

  const awayTeamNameClassName = match.teams.away.winner
    ? "mt-3 text-sm font-semibold text-secondary"
    : "mt-3 text-sm font-semibold text-[#10201B] dark:text-white";

  return (
    <header>
      <div className="flex items-center justify-between">
        <BackArrowButton />

        <Button type="button" size="base" rounded="full" className="px-7">
          {follow?.isFollowed ? "Following" : "Follow"}
        </Button>
      </div>

      <div className="relative mt-8">
        <div className="mx-auto flex max-w-[520px] items-center justify-between gap-5 text-center">
          <div className="flex flex-1 flex-col items-center">
            <div className="relative size-16 overflow-hidden rounded-full border border-secondary bg-[#F4F8F6] dark:bg-[#232628]">
              <Image
                src={getValidImage(match.teams.home.logo)}
                alt={`${match.teams.home.name} logo`}
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </div>

            <h2 className={homeTeamNameClassName}>{match.teams.home.name}</h2>
          </div>

          <div className="flex min-w-[120px] flex-col items-center">
            <span
              title={match.league.round}
              className="max-w-[140px] truncate rounded bg-[#0E8F6A] px-2 py-1 text-xs font-bold text-white"
            >
              {match.league.round}
            </span>

            <div className="mt-2 flex items-center gap-3">
              {isLive && <span className="h-3 w-1 rounded-full bg-red-500" />}

              <h1 className="text-4xl font-bold tracking-tight text-[#10201B] dark:text-white">
                {homeScore} - {awayScore}
              </h1>
            </div>

            <p className="mt-1 text-xs font-medium text-[#6B7A75] dark:text-white/55">
              {statusText}
            </p>
          </div>

          <div className="flex flex-1 flex-col items-center">
            <div className="relative size-16 overflow-hidden rounded-full border border-secondary bg-[#F4F8F6] dark:bg-[#232628]">
              <Image
                src={getValidImage(match.teams.away.logo)}
                alt={`${match.teams.away.name} logo`}
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </div>

            <h2 className={awayTeamNameClassName}>{match.teams.away.name}</h2>
          </div>
        </div>

        <div className="mt-7 border-y border-[#DDE8E3] py-3 dark:border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-[#6B7A75] dark:text-white/45">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              {matchDate}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Trophy className="size-3.5" />
              {match.league.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
