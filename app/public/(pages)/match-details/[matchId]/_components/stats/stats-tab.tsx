import {
  matchDefenceSection,
  matchMiniStats,
  matchShotsSection,
  matchTopStatsSection,
} from "@/mock/match-details/match-stats.mock.data";

import MatchStatsCard from "./match-stats-card";
import MiniStatsCard from "./mini-stats-card";

//*============= Stats Tab =============*//
export default function StatsTab() {
  return (
    <div className="mt-8 space-y-5">
      <MatchStatsCard section={matchTopStatsSection} />

      <MatchStatsCard section={matchShotsSection} />

      <div className="grid gap-5 md:grid-cols-3">
        {matchMiniStats.map((item) => (
          <MiniStatsCard key={item.id} item={item} />
        ))}
      </div>

      <MatchStatsCard section={matchDefenceSection} />
    </div>
  );
}
