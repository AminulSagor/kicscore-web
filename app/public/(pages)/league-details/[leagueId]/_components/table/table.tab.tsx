import StandingsTable from "@/app/public/(pages)/league-details/[leagueId]/_components/table/standings-table";
import { standingsMockData } from "@/mock/league-details/league-details.mock.data";
import React from "react";

const TableTab = () => {
  return (
    <div className="mt-6 sm:mt-8">
      <StandingsTable teams={standingsMockData} />
    </div>
  );
};

export default TableTab;
