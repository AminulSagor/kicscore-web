import TeamDetailsHeader from "./_components/team-details-header";
import TeamDetailsTabs from "./_components/team-details-tabs";
import TeamOverviewTab from "./_components/overview/team-overview-tab";

import TableTab from "@/app/public/(pages)/team-details/[teamId]/_components/table/table.tab";
import TeamMatchesTab from "@/app/public/(pages)/team-details/[teamId]/_components/matches/team-matches-tab";
import TeamSquadTab from "@/app/public/(pages)/team-details/[teamId]/_components/squad/team-squad-tab";
import TeamTrophiesTab from "@/app/public/(pages)/team-details/[teamId]/_components/trophies/team-trophies-tab";

type Props = {
  searchParams?: Promise<{
    tab?: string;
  }>;
};

export default async function TeamDetailsPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};
  const activeTab = params.tab ?? "overview";

  return (
    <main>
      <TeamDetailsHeader teamName="Arsenal" country="England" />

      <TeamDetailsTabs />

      {activeTab === "overview" && <TeamOverviewTab />}
      {activeTab === "table" && <TableTab />}
      {activeTab === "matches" && <TeamMatchesTab />}
      {activeTab === "squad" && <TeamSquadTab />}
      {activeTab === "trophies" && <TeamTrophiesTab />}
    </main>
  );
}
