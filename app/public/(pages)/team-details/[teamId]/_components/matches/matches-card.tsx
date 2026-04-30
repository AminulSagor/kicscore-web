import Image from "next/image";
import { ChevronDown } from "lucide-react";

import Button from "@/components/UI/buttons/button";
import Card from "@/components/UI/cards/card";
import {
  PreviousMatch,
  UpcomingMatch,
} from "@/mock/team-details/team-matches.mock.types";

type MatchItem = PreviousMatch | UpcomingMatch;

type Props = {
  title: string;
  matches: MatchItem[];
  type: "previous" | "upcoming";
};

export default function MatchesCard({ title, matches, type }: Props) {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
    >
      <div className="bg-[#EAF3EF] px-4 py-3 text-[#10201B] dark:bg-dark-green dark:text-white">
        <h3 className="text-sm font-bold">{title}</h3>
      </div>

      <div className="divide-y divide-[#E5ECE8] dark:divide-white/10">
        {matches.map((match) => (
          <div
            key={match.id}
            className="grid gap-4 px-4 py-5 md:grid-cols-[1fr_auto_1fr] md:items-center"
          >
            <div className="flex items-center gap-4">
              <span className="w-[80px] text-xs text-[#6B7A75] dark:text-white/50">
                {match.date}
              </span>

              <Team name={match.homeTeam} logo={match.homeLogo} />
            </div>

            <div className="text-center">
              {type === "previous" ? (
                <span className="text-sm font-bold text-[#10201B] dark:text-white">
                  {"score" in match ? match.score : ""}
                </span>
              ) : (
                <span className="rounded-md bg-[#EAF3EF] px-2 py-1 text-xs font-semibold text-[#6B7A75] dark:bg-dark-green dark:text-white/60">
                  {"time" in match ? match.time : ""}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 md:justify-end">
              <span className="text-xs text-[#6B7A75] dark:text-white/50">
                {match.competition}
              </span>

              <Team name={match.awayTeam} logo={match.awayLogo} reverse />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center py-5">
        <Button size="base" className="gap-2">
          Load More
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

function Team({
  name,
  logo,
  reverse,
}: {
  name: string;
  logo: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 ${reverse ? "flex-row-reverse" : ""}`}
    >
      <div className="relative h-6 w-6 overflow-hidden rounded-full border border-[#94A3B8] bg-[#F3F7F5] dark:bg-dark-green">
        <Image
          src={logo}
          alt={name}
          fill
          sizes="24px"
          className="object-cover"
        />
      </div>

      <span className="text-sm font-semibold text-[#10201B] dark:text-white">
        {name}
      </span>
    </div>
  );
}
