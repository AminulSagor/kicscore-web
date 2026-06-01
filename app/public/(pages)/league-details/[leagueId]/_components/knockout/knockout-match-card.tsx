import Image from "next/image";
import { Trophy } from "lucide-react";

import type { LeagueFixtureItem } from "@/types/football/fixtures/fixture.types";
import { getValidTeamLogo } from "@/utils/image/team-logo.utils";

interface KnockoutMatchCardProps {
  match: LeagueFixtureItem;
  isFinal?: boolean;
  isThirdPlace?: boolean;
}

function TeamFlag({ logo, name }: { logo: string; name: string }) {
  const validLogo = getValidTeamLogo(logo);

  if (!validLogo) {
    return (
      <span className="size-8 shrink-0 rounded-full border border-white/20 bg-white/10" />
    );
  }

  return (
    <Image
      src={validLogo}
      alt={name}
      width={32}
      height={32}
      className="size-8 shrink-0 rounded-full object-contain"
    />
  );
}

export default function KnockoutMatchCard({
  match,
  isFinal = false,
  isThirdPlace = false,
}: KnockoutMatchCardProps) {
  const homeGoals = match.goals.home;
  const awayGoals = match.goals.away;
  const homePen = match.score.penalty.home;
  const awayPen = match.score.penalty.away;
  const hasPenalty = homePen !== null && awayPen !== null;

  const homeWinner = match.teams.home.winner;
  const awayWinner = match.teams.away.winner;

  const scoreText =
    homeGoals !== null && awayGoals !== null
      ? hasPenalty
        ? `${homeGoals} - ${awayGoals} (${homePen} - ${awayPen})`
        : `${homeGoals} - ${awayGoals}`
      : "vs";

  return (
    <div
      className={`relative w-full rounded-2xl border p-4 transition-all ${
        isFinal
          ? "border-[#F59E0B] bg-[#1c2d28] shadow-[0_0_20px_rgba(245,158,11,0.15)]"
          : "border-white/10 bg-[#1a2b26] dark:bg-[#1a2b26]"
      } light-card`}
    >
      {/* Teams */}
      <div className="flex items-center justify-center gap-5">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-2 min-w-[56px]">
          <TeamFlag logo={match.teams.home.logo} name={match.teams.home.name} />
          <span
            className={`text-center text-xs font-bold uppercase tracking-wide leading-tight ${
              homeWinner
                ? "text-white"
                : homeGoals !== null
                ? "text-white/50"
                : "text-white/70"
            }`}
          >
            {match.teams.home.name.slice(0, 3).toUpperCase()}
          </span>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center gap-1">
          <span
            className={`text-sm font-bold tracking-wide ${
              isFinal ? "text-white" : "text-white/90"
            }`}
          >
            {scoreText}
          </span>

          {isFinal && (
            <span className="mt-1 rounded-sm bg-[#F59E0B] px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#10201B]">
              Final
            </span>
          )}

          {isThirdPlace && !isFinal && (
            <span className="mt-1 rounded-sm bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
              3rd Place
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-2 min-w-[56px]">
          <TeamFlag logo={match.teams.away.logo} name={match.teams.away.name} />
          <span
            className={`text-center text-xs font-bold uppercase tracking-wide leading-tight ${
              awayWinner
                ? "text-white"
                : awayGoals !== null
                ? "text-white/50"
                : "text-white/70"
            }`}
          >
            {match.teams.away.name.slice(0, 3).toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---- Champion badge shown beside the final ---- */
export function ChampionBadge({ team }: { team: { name: string; logo: string } | null }) {
  const logo = team ? getValidTeamLogo(team.logo) : null;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex size-14 items-center justify-center rounded-full bg-[#F59E0B]/15 text-[#F59E0B]">
        <Trophy size={28} strokeWidth={1.8} />
      </div>

      {logo && (
        <Image
          src={logo}
          alt={team!.name}
          width={32}
          height={32}
          className="size-8 rounded-full object-contain"
        />
      )}

      <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">
        Champion
      </span>
    </div>
  );
}
