import type { TeamPreviousMatch } from "@/types/football/fixtures/team.fixtures.types";

import MatchesCard from "./matches-card";

type Props = {
  matches: TeamPreviousMatch[];
};

export default function PreviousMatchesCard({ matches }: Props) {
  return (
    <MatchesCard
      title="Previous matches"
      matches={matches}
      type="previous"
    />
  );
}