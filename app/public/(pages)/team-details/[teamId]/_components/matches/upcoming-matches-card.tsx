import { upcomingMatches } from "@/mock/team-details/team-matches.mock.data";
import MatchesCard from "./matches-card";

export default function UpcomingMatchesCard() {
  return (
    <MatchesCard
      title="Upcoming matches"
      matches={upcomingMatches}
      type="upcoming"
    />
  );
}
