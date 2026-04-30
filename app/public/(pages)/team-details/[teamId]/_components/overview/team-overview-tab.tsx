import { nextMatches } from "@/mock/team-details/team-overview.mock.data";
import AboutCard from "./about-card";
import LastSixMatchesCard from "./last-six-matches-card";
import LeaguesCard from "./leagues-card";
import NextMatchCard from "./next-match-card";
import RankingsCard from "./rankings-card";
import StadiumCard from "./stadium-card";
import TopPlayersCard from "./top-players-card";
import LeagueTableCard from "./about-card";

export default function TeamOverviewTab() {
  return (
    <section className="mt-8 pb-8">
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-sm font-bold text-[#10201B] dark:text-white">
              Next match
            </h2>

            <div className="grid gap-4 lg:grid-cols-2">
              {nextMatches.map((match) => (
                <NextMatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>

          <LastSixMatchesCard />

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.95fr]">
            <LeaguesCard />
            <RankingsCard />
          </div>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <TopPlayersCard />
          <StadiumCard />
          <LeagueTableCard />
        </aside>
      </div>

      <div className="mt-6">
        <AboutCard />
      </div>
    </section>
  );
}
