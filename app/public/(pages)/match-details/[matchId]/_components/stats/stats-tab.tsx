import { MatchDetailsItem } from "@/types/football/matches/match.details.types";

import MatchStatsCard from "./match-stats-card";
import MiniStatsCard from "./mini-stats-card";
import { buildMatchStatsSections } from "@/app/public/(pages)/match-details/_utils/match.stats.utils";

interface StatsTabProps {
  match: MatchDetailsItem;
}

//======= Stats Tab =======//
export default function StatsTab({ match }: StatsTabProps) {
  const stats = buildMatchStatsSections(match);

  if (!stats.hasStats) {
    return (
      <div className="mt-8 rounded-2xl border border-[#DDE8E3] bg-white px-5 py-10 text-center dark:border-white/10 dark:bg-[#13211D]">
        <p className="text-sm font-medium text-[#6B7A75] dark:text-white/55">
          Match statistics are not available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-5">
      <MatchStatsCard section={stats.topSection} />

      <MatchStatsCard section={stats.shotsSection} />

      <div className="grid gap-5 md:grid-cols-3">
        {stats.miniStats.map((item) => (
          <MiniStatsCard key={item.id} item={item} />
        ))}
      </div>

      <MatchStatsCard section={stats.defenceSection} />
    </div>
  );
}
