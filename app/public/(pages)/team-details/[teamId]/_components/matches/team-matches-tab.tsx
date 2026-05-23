import type {
  TeamPreviousMatch,
  TeamUpcomingMatch,
} from "@/types/football/fixtures/team.fixtures.types";

import PreviousMatchesCard from "./previous-matches-card";
import UpcomingMatchesCard from "./upcoming-matches-card";

type Props = {
  previousMatches: TeamPreviousMatch[];
  upcomingMatches: TeamUpcomingMatch[];
};

export default function TeamMatchesTab({
  previousMatches,
  upcomingMatches,
}: Props) {
  return (
    <div className="mt-8 space-y-6 pb-8">
      <PreviousMatchesCard matches={previousMatches} />
      <UpcomingMatchesCard matches={upcomingMatches} />
    </div>
  );
}