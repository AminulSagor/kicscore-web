import { notFound } from "next/navigation";

import TeamDetailsHeader from "./_components/team-details-header";
import TeamDetailsTabs from "./_components/team-details-tabs";
import TeamOverviewTab from "./_components/overview/team-overview-tab";

import TeamMatchesTab from "@/app/public/(pages)/team-details/[teamId]/_components/matches/team-matches-tab";
import TeamSquadTab from "@/app/public/(pages)/team-details/[teamId]/_components/squad/team-squad-tab";
import TableTab from "@/app/public/(pages)/team-details/[teamId]/_components/table/table.tab";
import TeamTrophiesTab from "@/app/public/(pages)/team-details/[teamId]/_components/trophies/team-trophies-tab";
import {
  getTeamLastFixtures,
  getTeamUpcomingFixtures,
} from "@/service/football/fixtures/team.fixtures.service";
import { getTeamDetails } from "@/service/football/teams/team.details.service";
import { getTeamAbout } from "@/service/football/teams/team.about.service";

type Props = {
  params: Promise<{
    teamId: string;
  }>;
  searchParams?: Promise<{
    tab?: string;
  }>;
};

export default async function TeamDetailsPage({ params, searchParams }: Props) {
  const routeParams = await params;
  const queryParams = searchParams ? await searchParams : {};
  const activeTab = queryParams.tab ?? "overview";
  const isOverviewTab = activeTab === "overview";

  const teamDetailsPromise = getTeamDetails(routeParams.teamId);

  const upcomingFixturesPromise = isOverviewTab
    ? getTeamUpcomingFixtures(routeParams.teamId, 2)
    : Promise.resolve(null);

  const lastFixturesPromise = isOverviewTab
    ? getTeamLastFixtures(routeParams.teamId, 6)
    : Promise.resolve(null);

  const aboutPromise = isOverviewTab
    ? getTeamAbout(routeParams.teamId)
    : Promise.resolve(null);

  const [
    teamDetailsResponse,
    upcomingFixturesResponse,
    lastFixturesResponse,
    aboutResponse,
  ] = await Promise.all([
    teamDetailsPromise,
    upcomingFixturesPromise,
    lastFixturesPromise,
    aboutPromise,
  ]);

  const teamDetails = teamDetailsResponse.data.response[0];

  if (!teamDetails) {
    notFound();
  }

  const upcomingFixtures = upcomingFixturesResponse?.data.response ?? [];
  const lastFixtures = lastFixturesResponse?.data.response ?? [];
  const aboutData = aboutResponse?.data.data ?? null;
  return (
    <main>
      <TeamDetailsHeader
        teamId={String(teamDetails.team.id)}
        teamName={teamDetails.team.name}
        country={teamDetails.team.country}
        logo={teamDetails.team.logo}
        initialIsFollowing={teamDetailsResponse.data.follow.isFollowed}
      />

      <TeamDetailsTabs />

      {activeTab === "overview" && (
        <TeamOverviewTab
          teamDetails={teamDetails}
          upcomingFixtures={upcomingFixtures}
          lastFixtures={lastFixtures}
          aboutData={aboutData}
        />
      )}

      {activeTab === "table" && <TableTab />}
      {activeTab === "matches" && <TeamMatchesTab />}
      {activeTab === "squad" && <TeamSquadTab />}
      {activeTab === "trophies" && <TeamTrophiesTab />}
    </main>
  );
}
