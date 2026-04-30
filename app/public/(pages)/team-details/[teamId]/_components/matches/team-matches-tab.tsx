import PreviousMatchesCard from "./previous-matches-card";
import UpcomingMatchesCard from "./upcoming-matches-card";

export default function TeamMatchesTab() {
  return (
    <div className="mt-8 space-y-6 pb-8">
      <PreviousMatchesCard />
      <UpcomingMatchesCard />
    </div>
  );
}
