import StandingsTable from "@/app/public/(pages)/league-details/[leagueId]/_components/table/standings-table";
import type { LeagueStandingTeam } from "@/types/football/leagues/league.standings";

type Props = {
  teams: LeagueStandingTeam[];
};

const TableTab = ({ teams }: Props) => {
  return (
    <div className="mt-6 sm:mt-8">
      <StandingsTable teams={teams} />
    </div>
  );
};

export default TableTab;