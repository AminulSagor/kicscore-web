import type { FixtureMatch } from "@/mock/league-details/league-fixtures.mock.types";

type FixtureMatchRowProps = {
  match: FixtureMatch;
};

export default function FixtureMatchRow({ match }: FixtureMatchRowProps) {
  return (
    <div className="grid grid-cols-[48px_minmax(0,1fr)_90px_minmax(0,1fr)] items-center border-b border-[#DDE8E3] px-3 py-4 last:border-b-0 dark:border-white/10 sm:grid-cols-[80px_minmax(0,1fr)_120px_minmax(0,1fr)]">
      <p className="text-xs font-bold text-[#6B7A75] dark:text-white/35">
        {match.status}
      </p>

      <div className="flex items-center gap-3">
        <span className="size-5 rounded-full border border-[#8A98A3]" />
        <p className="truncate text-sm font-semibold text-[#10201B] dark:text-white">
          {match.homeTeam}
        </p>
      </div>

      <div className="text-center">
        <p className="text-xl font-bold text-[#10201B] dark:text-white">
          {match.homeScore} - {match.awayScore}
        </p>
        {match.aggregateScore && (
          <p className="text-xs text-[#6B7A75] dark:text-white/40">
            {match.aggregateScore}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3">
        <p className="truncate text-sm font-semibold text-[#10201B] dark:text-white">
          {match.awayTeam}
        </p>
        <span className="size-5 rounded-full border border-[#8A98A3]" />
      </div>
    </div>
  );
}
