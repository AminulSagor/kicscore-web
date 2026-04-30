import MatchInfoCard from "@/app/public/(pages)/match-details/[matchId]/_components/match-info-card";
import {
  matchBench,
  matchCoaches,
  matchSubstitutes,
} from "@/mock/match-details/match-lineup.mock.data";

import FormationPitch from "./formation-pitch";
import LineupPlayerGroupCard from "./lineup-player-group-card";

export default function LineupTab() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="min-w-0 space-y-5">
        <FormationPitch />

        <LineupPlayerGroupCard
          title="Coach"
          players={matchCoaches}
          columns="two"
        />

        <LineupPlayerGroupCard title="Substitutes" players={matchSubstitutes} />

        <LineupPlayerGroupCard title="Bench" players={matchBench} />
      </div>

      <aside className="min-w-0 self-start lg:sticky lg:top-20">
        <MatchInfoCard />
      </aside>
    </div>
  );
}
