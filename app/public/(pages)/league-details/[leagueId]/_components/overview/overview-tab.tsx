import { teamOfWeekMockData } from "@/mock/league-details/league-details.mock.data";
import { LeagueRankingPlayer } from "@/types/football/leagues/league.rankings";
import { LeagueStandingTeam } from "@/types/football/leagues/league.standings";

import StandingsTable from "../table/standings-table";
import RankingCard from "./ranking-card";
import TeamOfWeekCard from "./team-of-week-card";

type OverviewTabProps = {
  standings: LeagueStandingTeam[];
  topScorers: LeagueRankingPlayer[];
  topAssists: LeagueRankingPlayer[];
};

export default function OverviewTab({
  standings,
  topScorers,
  topAssists,
}: OverviewTabProps) {
  return (
    <div className="mt-6 sm:mt-8">
      <div className="grid items-start gap-5 lg:gap-6 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="min-w-0 space-y-5 lg:space-y-6">
          <StandingsTable teams={standings} />

          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            <RankingCard title="Top Scorers" players={topScorers} />
            <RankingCard title="Top Assists" players={topAssists} />
          </div>
        </div>

        <div className="min-w-0 xl:sticky xl:top-20">
          <TeamOfWeekCard team={teamOfWeekMockData} />
        </div>
      </div>
    </div>
  );
}
