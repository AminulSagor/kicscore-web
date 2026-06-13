import Accordion from "@/components/UI/accordion/accordion";
import { GroupedLeagueMatches } from "@/types/football/matches/match.types";

import MatchRow from "./match-row";

interface MatchCardProps {
  group: GroupedLeagueMatches;
}

export default function MatchCard({ group }: MatchCardProps) {
  return (
    <Accordion
      title={`${group.league.name} ${group.league.round ?? ""}`}
      defaultOpen
      className="min-w-0 overflow-hidden rounded-3xl"
    >
      <div className="-mx-4 -my-4 min-w-0 overflow-hidden">
        {group.fixtures.map((match) => (
          <MatchRow key={match.fixture.id} match={match} />
        ))}
      </div>
    </Accordion>
  );
}
