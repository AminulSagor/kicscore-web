import type { TeamUpcomingMatch } from "@/types/football/fixtures/team.fixtures.types";

import MatchesCard from "./matches-card";

type Props = {
  matches: TeamUpcomingMatch[];
};

export default function UpcomingMatchesCard({ matches }: Props) {
  return (
    <MatchesCard
      title="Upcoming matches"
      matches={matches}
      type="upcoming"
    />
  );
}