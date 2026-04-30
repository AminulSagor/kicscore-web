import { previousMatches } from "@/mock/team-details/team-matches.mock.data";
import MatchesCard from "./matches-card";

export default function PreviousMatchesCard() {
  return (
    <MatchesCard
      title="Previous matches"
      matches={previousMatches}
      type="previous"
    />
  );
}
