import Image from "next/image";

import Card from "@/components/UI/cards/card";
import { TeamFixtureItem } from "@/types/football/fixtures/team.fixtures.types";
import {
  getFixtureCompetitionLabel,
  formatFixtureDateLabel,
  formatFixtureTime,
} from "@/app/public/(pages)/team-details/_utils/team-fixture-date.utils";
import { getValidImage } from "@/utils/image/image.utils";

type Props = {
  fixture: TeamFixtureItem;
};

export default function NextMatchCard({ fixture }: Props) {
  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
    >
      <p className="truncate px-2 text-center text-xs font-semibold text-[#6B7A75] dark:text-white/50">
        {getFixtureCompetitionLabel(fixture.league)}
      </p>

      <div className="mt-5 grid grid-cols-3 items-center">
        <TeamItem
          name={fixture.teams.home.name}
          logo={fixture.teams.home.logo}
        />

        <div className="text-center">
          <p className="text-xl font-bold">
            {formatFixtureTime(fixture.fixture.date)}
          </p>

          <p className="mt-1 text-xs text-[#6B7A75] dark:text-white/50">
            {formatFixtureDateLabel(fixture.fixture.date)}
          </p>
        </div>

        <TeamItem
          name={fixture.teams.away.name}
          logo={fixture.teams.away.logo}
        />
      </div>
    </Card>
  );
}

function TeamItem({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-12 w-12 overflow-hidden rounded-full border border-secondary bg-[#F3F7F5] dark:bg-dark-green">
        <Image
          src={getValidImage(logo)}
          alt={`${name} logo`}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>

      <p className="text-center text-xs font-semibold">{name}</p>
    </div>
  );
}
