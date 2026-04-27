import { MatchMock } from "@/mock/matches/matches.mock.types";

interface MatchRowProps {
  match: MatchMock;
}

export default function MatchRow({ match }: MatchRowProps) {
  const isLive = match.status === "LIVE";

  return (
    <div
      className="
        grid grid-cols-[70px_1fr_90px_1fr] items-center gap-3
        border-t border-[#DDE8E3] px-5 py-4
        dark:border-white/10
      "
    >
      <div
        className={`flex items-center gap-2 text-xs font-bold ${
          isLive ? "text-[#78DDB3]" : "text-[#6B7A75] dark:text-white/35"
        }`}
      >
        {isLive && (
          <span className="h-2 w-2 rounded-full bg-[#78DDB3] shadow-[0_0_10px_#78DDB3]" />
        )}
        {match.status}
      </div>

      <div className="flex items-center gap-3">
        <span className="h-5 w-5 rounded-full border border-[#8B9A95] dark:border-white/35" />
        <span className="text-sm font-semibold text-[#10201B] dark:text-white">
          {match.homeTeam}
        </span>
      </div>

      <div className="text-center">
        <p
          className={`text-2xl font-bold leading-6 ${
            isLive ? "text-[#78DDB3]" : "text-[#10201B] dark:text-white"
          }`}
        >
          {match.score}
        </p>
        <p className="mt-1 text-xs text-[#6B7A75] dark:text-white/35">
          {match.aggregate}
        </p>
      </div>

      <div className="flex items-center justify-end gap-3">
        <span className="text-sm font-semibold text-[#10201B] dark:text-white">
          {match.awayTeam}
        </span>
        <span className="h-5 w-5 rounded-full border border-[#8B9A95] dark:border-white/35" />
      </div>
    </div>
  );
}
