import Card from "@/components/UI/cards/card";
import { TeamFixtureItem } from "@/types/football/fixtures/team.fixtures.types";

import NextMatchCard from "./next-match-card";

type Props = {
  fixtures: TeamFixtureItem[];
};

export default function NextMatchSection({ fixtures }: Props) {
  return (
    <div>
      <h2 className="mb-4 text-sm font-bold text-[#10201B] dark:text-white">
        Next match
      </h2>

      {fixtures.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {fixtures.map((fixture) => (
            <NextMatchCard key={fixture.fixture.id} fixture={fixture} />
          ))}
        </div>
      ) : (
        <Card
          variant="white"
          shadow="none"
          className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
        >
          <p className="text-center text-xs text-[#6B7A75] dark:text-white/50">
            No upcoming matches found.
          </p>
        </Card>
      )}
    </div>
  );
}
