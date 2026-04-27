import { matchesMockData } from "@/mock/matches/matches.mock.data";
import MatchCard from "./match-card";
import MatchToolbar from "./match-toolbar";

export default function MatchSection() {
  return (
    <section className="mt-8">
      <MatchToolbar />

      <div className="grid gap-5 xl:grid-cols-2 items-start">
        {matchesMockData.map((group) => (
          <MatchCard key={group.id} group={group} />
        ))}
      </div>
    </section>
  );
}
