import StandingsTable from "@/app/public/(pages)/league-details/[leagueId]/_components/table/standings-table";
import { LeagueStandingTeam } from "@/types/football/leagues/league.standings";

type OverviewTabProps = {
  standings: LeagueStandingTeam[];
};

const TableTab = ({ standings }: OverviewTabProps) => {
  return (
    <div className="mt-6 sm:mt-8">
      <StandingsTable teams={standings} />
    </div>
  );
};

export default TableTab;
