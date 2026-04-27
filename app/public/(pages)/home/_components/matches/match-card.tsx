import Accordion from "@/components/UI/accordion/accordion";
import { MatchGroupMock } from "@/mock/matches/matches.mock.types";
import MatchRow from "./match-row";

interface MatchCardProps {
  group: MatchGroupMock;
}

export default function MatchCard({ group }: MatchCardProps) {
  return (
    <Accordion
      title={`${group.leagueIcon} ${group.leagueName}`}
      defaultOpen
      className="rounded-3xl"
    >
      <div className="-mx-4 -my-4">
        {group.matches.map((match) => (
          <MatchRow key={match.id} match={match} />
        ))}
      </div>
    </Accordion>
  );
}
