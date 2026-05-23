import AboutMatchCard from "@/app/public/(pages)/match-details/[matchId]/_components/facts/about-match-card";
import NextMatchCard from "@/app/public/(pages)/match-details/[matchId]/_components/facts/next-match-card";
import TeamFormCard from "@/app/public/(pages)/match-details/[matchId]/_components/facts/team-form-card";
import FormationPitch from "@/app/public/(pages)/match-details/[matchId]/_components/lineup/formation-pitch";
import type { TeamFixtureItem } from "@/types/football/fixtures/team.fixtures.types";
import type { MatchDetailsItem } from "@/types/football/matches/match.details.types";

import MatchInfoCard from "../match-info-card";
import MatchEvents from "./match-events";
import PlayerOfTheMatch from "./player-of-the-match";
import TopStats from "./top-stats";

interface FactsTabProps {
  match: MatchDetailsItem;
  nextMatches: TeamFixtureItem[];
}

export default function FactsTab({ match, nextMatches }: FactsTabProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-5">
        {/* <PlayerOfTheMatch /> */}
        <TopStats match={match} />
        <MatchEvents match={match} />
        <FormationPitch match={match} />

        {/* <TeamFormCard /> */}
        <NextMatchCard fixtures={nextMatches} />
        <AboutMatchCard match={match} />
      </div>

      <aside className="min-w-0 self-start lg:sticky lg:top-20">
        <MatchInfoCard match={match} />
      </aside>
    </div>
  );
}
