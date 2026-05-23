import Image from "next/image";

import {
  formatNextMatchDateLabel,
  formatNextMatchTime,
  getNextMatchCompetitionLabel,
} from "@/app/public/(pages)/match-details/_utils/next-match.utils";
import Card from "@/components/UI/cards/card";
import { IMAGE } from "@/constants/image.path";
import type {
  TeamFixtureItem,
  TeamFixtureParticipant,
} from "@/types/football/fixtures/team.fixtures.types";

interface NextMatchCardProps {
  fixtures: TeamFixtureItem[];
}

export default function NextMatchCard({ fixtures }: NextMatchCardProps) {
  return (
    <div>
      <h3 className="mb-5 text-base font-bold text-[#10201B] dark:text-white">
        Next match
      </h3>

      {fixtures.length === 0 ? (
        <Card
          variant="white"
          shadow="none"
          className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
        >
          <p className="text-center text-sm font-medium text-[#6B7A75] dark:text-white/55">
            No upcoming matches found.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {fixtures.map((fixture) => (
            <MatchCard key={fixture.fixture.id} fixture={fixture} />
          ))}
        </div>
      )}
    </div>
  );
}

function MatchCard({ fixture }: { fixture: TeamFixtureItem }) {
  const time = formatNextMatchTime(
    fixture.fixture.date,
    fixture.fixture.timezone,
  );

  const dateLabel = formatNextMatchDateLabel(
    fixture.fixture.date,
    fixture.fixture.timezone,
  );

  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <p className="text-center text-xs font-bold text-[#6B7A75] dark:text-white/55">
        {getNextMatchCompetitionLabel(fixture)}
      </p>

      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Team team={fixture.teams.home} />

        <div className="text-center">
          <h4 className="text-2xl font-bold">{time}</h4>

          <p className="mt-1 text-sm font-semibold text-[#6B7A75] dark:text-white/55">
            {dateLabel}
          </p>
        </div>

        <Team team={fixture.teams.away} />
      </div>
    </Card>
  );
}

function Team({ team }: { team: TeamFixtureParticipant }) {
  return (
    <div className="flex min-w-0 flex-col items-center">
      <div className="relative size-14 overflow-hidden rounded-full border border-mint-green bg-[#F4F8F6] dark:bg-[#232628]">
        <Image
          src={team.logo || IMAGE.fc_porto}
          alt={team.name}
          fill
          className="object-contain p-1"
        />
      </div>

      <p className="mt-3 line-clamp-2 text-center text-xs font-bold">
        {team.name}
      </p>
    </div>
  );
}
