import Image from "next/image";

import type {
  FixtureTeam,
  LeagueFixtureItem,
} from "@/types/football/fixtures/fixture.types";
import { getValidTeamLogo } from "@/utils/image/team-logo.utils";

type FixtureMatchRowProps = {
  match: LeagueFixtureItem;
};

//======= Render Team Logo =======//
function TeamLogo({ team }: { team: FixtureTeam }) {
  const logo = getValidTeamLogo(team.logo);

  if (!logo) {
    return (
      <span className="size-5 shrink-0 rounded-full border border-[#8A98A3]" />
    );
  }

  return (
    <Image
      src={logo}
      alt={team.name}
      width={20}
      height={20}
      className="size-5 shrink-0 object-contain"
    />
  );
}

export default function FixtureMatchRow({ match }: FixtureMatchRowProps) {
  const homeScore = match.goals.home ?? "-";
  const awayScore = match.goals.away ?? "-";

  return (
    <div className="grid grid-cols-[48px_minmax(0,1fr)_90px_minmax(0,1fr)] items-center border-b border-[#DDE8E3] px-3 py-4 last:border-b-0 dark:border-white/10 sm:grid-cols-[80px_minmax(0,1fr)_120px_minmax(0,1fr)]">
      <p className="text-xs font-bold text-[#6B7A75] dark:text-white/35">
        {match.fixture.status.short}
      </p>

      <div className="flex items-center gap-3">
        <TeamLogo team={match.teams.home} />
        <p className="truncate text-sm font-semibold text-[#10201B] dark:text-white">
          {match.teams.home.name}
        </p>
      </div>

      <div className="text-center">
        <p className="text-xl font-bold text-[#10201B] dark:text-white">
          {homeScore} - {awayScore}
        </p>
        <p className="text-xs text-[#6B7A75] dark:text-white/40">
          ({match.score.halftime.home ?? "-"} -{" "}
          {match.score.halftime.away ?? "-"})
        </p>
      </div>

      <div className="flex items-center justify-end gap-3">
        <p className="truncate text-sm font-semibold text-[#10201B] dark:text-white">
          {match.teams.away.name}
        </p>
        <TeamLogo team={match.teams.away} />
      </div>
    </div>
  );
}
