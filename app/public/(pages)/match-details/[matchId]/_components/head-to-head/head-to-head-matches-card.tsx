import { ChevronDown } from "lucide-react";

import Button from "@/components/UI/buttons/button";
import Card from "@/components/UI/cards/card";
import { MatchHeadToHeadItem } from "@/types/football/matches/match.head-to-head.types";

import {
  buildHeadToHeadMatchRows,
  HeadToHeadMatchRowView,
} from "@/app/public/(pages)/match-details/_utils/match.head-to-head.utils";

interface HeadToHeadMatchesCardProps {
  matches: MatchHeadToHeadItem[];
}

//======= Head To Head Matches Card =======//
export default function HeadToHeadMatchesCard({
  matches,
}: HeadToHeadMatchesCardProps) {
  const matchRows = buildHeadToHeadMatchRows(matches);

  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">H2H Matches Overview</h3>
      </div>

      <div className="mx-auto max-w-[900px] px-5 py-7">
        {matchRows.length ? (
          matchRows.map((match) => <H2HMatchRow key={match.id} match={match} />)
        ) : (
          <p className="text-center text-sm font-medium text-[#6B7A75] dark:text-white/55">
            Head-to-head matches are not available yet.
          </p>
        )}

        {matchRows.length > 0 && (
          <div className="mt-7 flex justify-center">
            <Button rounded="lg" size="base" className="px-6">
              Load More <ChevronDown className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

//======= H2H Match Row =======//
function H2HMatchRow({ match }: { match: HeadToHeadMatchRowView }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-[#DDE8E3] py-5 last:border-b-0 dark:border-white/10">
      <div>
        <p className="mb-2 text-xs font-medium text-[#6B7A75] dark:text-white/45">
          {match.date}
        </p>

        <TeamName
          name={match.homeTeam.name}
          isWinner={match.homeTeam.isWinner}
          align="left"
        />
      </div>

      <span className="rounded px-3 py-1 text-sm font-bold text-[#10201B] dark:text-white">
        {match.score}
      </span>

      <div className="text-right">
        <p className="mb-2 text-xs font-medium text-[#6B7A75] dark:text-white/45">
          {match.competition} <span className="ml-1">○</span>
        </p>

        <TeamName
          name={match.awayTeam.name}
          isWinner={match.awayTeam.isWinner}
          align="right"
        />
      </div>
    </div>
  );
}

//======= Team Name =======//
function TeamName({
  name,
  isWinner,
  align,
}: {
  name: string;
  isWinner?: boolean;
  align: "left" | "right";
}) {
  return (
    <div
      className={`flex items-center gap-2 ${
        align === "right" ? "justify-end" : ""
      }`}
    >
      {align === "right" && (
        <span className="size-5 rounded-full border border-[#64748B]" />
      )}

      <span
        className={`text-sm ${
          isWinner
            ? "font-bold text-[#10201B] dark:text-white"
            : "font-medium text-[#6B7A75] dark:text-white/55"
        }`}
      >
        {name}
      </span>

      {align === "left" && (
        <span className="size-5 rounded-full border border-[#64748B]" />
      )}
    </div>
  );
}
