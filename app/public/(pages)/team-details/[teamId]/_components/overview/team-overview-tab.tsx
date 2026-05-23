import { TeamFixtureItem } from "@/types/football/fixtures/team.fixtures.types";
import { TeamDetailsItem } from "@/types/football/teams/team.details.types";

import LastSixMatchesCard from "./last-six-matches-card";
import LeagueTableCard from "./league-table-card";
import LeaguesCard from "./leagues-card";
import NextMatchSection from "./next-match-section";
import RankingsCard from "./rankings-card";
import StadiumCard from "./stadium-card";
import TopPlayersCard from "./top-players-card";
import AboutCard from "@/app/public/(pages)/team-details/[teamId]/_components/overview/about-card";
import { TeamAboutData } from "@/types/football/teams/team.about.types";

type Props = {
  teamDetails: TeamDetailsItem;
  upcomingFixtures: TeamFixtureItem[];
  lastFixtures: TeamFixtureItem[];
  aboutData: TeamAboutData | null;
};

export default function TeamOverviewTab({
  teamDetails,
  upcomingFixtures,
  lastFixtures,
  aboutData,
}: Props) {
  return (
    <section className="mt-8 pb-8">
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <NextMatchSection fixtures={upcomingFixtures} />

          <LastSixMatchesCard
            fixtures={lastFixtures}
            teamId={String(teamDetails.team.id)}
          />

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.95fr]">
            <LeaguesCard />
            <RankingsCard />
          </div>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <TopPlayersCard />

          <StadiumCard venue={teamDetails.venue} />

          <LeagueTableCard />
        </aside>
      </div>

      {aboutData && (
        <div className="mt-6">
          <AboutCard about={aboutData.about} />
        </div>
      )}
    </section>
  );
}
