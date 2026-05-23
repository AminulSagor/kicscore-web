import Image from "next/image";

import Card from "@/components/UI/cards/card";
import { TeamFixtureItem } from "@/types/football/fixtures/team.fixtures.types";

import {
  getFixtureScore,
  getResultBadgeClassName,
  getTeamFixtureResult,
} from "@/app/public/(pages)/team-details/_utils/team-last-fixtures.utils";
import { getValidImage } from "@/utils/image/image.utils";

type Props = {
  fixtures: TeamFixtureItem[];
  teamId: string;
};

export default function LastSixMatchesCard({ fixtures, teamId }: Props) {
  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
    >
      <h3 className="text-sm font-bold">Last 6 matches</h3>

      {fixtures.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {fixtures.map((fixture) => {
            const result = getTeamFixtureResult(fixture, teamId);

            return (
              <div
                key={fixture.fixture.id}
                className="grid grid-cols-[1fr_auto_1fr] items-center"
              >
                <TeamLogo
                  logo={fixture.teams.home.logo}
                  name={fixture.teams.home.name}
                />

                <span
                  className={`rounded px-3 py-1 text-xs font-bold text-white ${getResultBadgeClassName(
                    result,
                  )}`}
                >
                  {getFixtureScore(fixture)}
                </span>

                <div className="flex justify-end">
                  <TeamLogo
                    logo={fixture.teams.away.logo}
                    name={fixture.teams.away.name}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-6 text-center text-xs text-[#6B7A75] dark:text-white/50">
          No recent matches found.
        </p>
      )}
    </Card>
  );
}

function TeamLogo({ logo, name }: { logo: string; name: string }) {
  return (
    <div className="relative h-6 w-6 overflow-hidden rounded-full border border-[#94A3B8] bg-[#F3F7F5] dark:bg-dark-green">
      <Image
        src={getValidImage(logo)}
        alt={`${name} logo`}
        fill
        sizes="24px"
        className="object-cover"
      />
    </div>
  );
}
