import { buildMatchTopStats } from "@/app/public/(pages)/match-details/_utils/match.facts.utils";
import Card from "@/components/UI/cards/card";
import { MatchDetailsItem } from "@/types/football/matches/match.details.types";

interface TopStatsProps {
  match: MatchDetailsItem;
}

export default function TopStats({ match }: TopStatsProps) {
  const matchTopStats = buildMatchTopStats(match);
  const showPossession =
    matchTopStats.possession.home !== null &&
    matchTopStats.possession.away !== null;

  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">Top stats</h3>
      </div>

      {!matchTopStats.hasStats ? (
        <div className="p-7">
          <p className="text-center text-sm font-medium text-[#6B7A75] dark:text-white/55">
            Top stats are not available yet.
          </p>
        </div>
      ) : (
        <div className="space-y-7 p-5 sm:p-7">
          {showPossession && (
            <div>
              <p className="mb-4 text-center text-sm font-bold">
                Ball possession
              </p>

              <div className="flex h-8 overflow-hidden rounded-md bg-[#F8FAF9] dark:bg-white">
                <div
                  className="flex items-center bg-mint-green px-3 text-xs font-bold text-[#10201B]"
                  style={{ width: `${matchTopStats.possession.home}%` }}
                >
                  {matchTopStats.possession.home}%
                </div>

                <div
                  className="flex items-center justify-center text-xs font-bold text-[#10201B]"
                  style={{ width: `${matchTopStats.possession.away}%` }}
                >
                  {matchTopStats.possession.away}%
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 text-sm">
            {matchTopStats.rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[70px_1fr_70px] items-center gap-3"
              >
                <span className="w-fit rounded-md bg-mint-green px-3 py-1 text-xs font-bold text-[#10201B]">
                  {row.home}
                </span>

                <span className="text-center font-medium text-[#6B7A75] dark:text-white/55">
                  {row.label}
                </span>

                <span className="text-right font-bold text-[#10201B] dark:text-white">
                  {row.away}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
