"use client";

import Image from "next/image";
import Link from "next/link";

import Card from "@/components/UI/cards/card";
import { LeagueFixtureItem } from "@/types/football/fixtures/fixture.types";
import { getValidImage } from "@/utils/image/image.utils";

interface UpcomingMatchCardProps {
  match: LeagueFixtureItem;
}

export default function UpcomingMatchCard({ match }: UpcomingMatchCardProps) {
  const home = match.teams.home;
  const away = match.teams.away;

  return (
    <Link
      href={`/public/match-details/${match.fixture.id}`}
      className="min-w-full snap-start sm:min-w-[calc(50%-8px)] xl:min-w-[calc(33.333%-11px)]"
    >
      <Card
        variant="white"
        rounded="2xl"
        padding="md"
        shadow="sm"
        className="h-full border border-black/10 bg-white text-foreground transition hover:border-secondary/40 dark:border-white/10 dark:bg-dark-green"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="truncate text-sm font-medium text-muted-foreground">
            {match.league.name}
          </span>

          <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground">
            {new Date(match.fixture.date).toLocaleString()}
          </span>
        </div>

        <div className="space-y-3">
          {[home, away].map((team, index) => (
            <div key={team.id} className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <Image
                  src={getValidImage(team.logo)}
                  alt={team.name}
                  width={32}
                  height={32}
                  className="size-8 shrink-0 object-contain"
                />

                <span className="truncate font-medium">{team.name}</span>
              </div>

              <span className="text-sm text-muted-foreground">–</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3 dark:border-white/10">
          <span className="truncate text-sm text-muted-foreground">
            {home.name} vs {away.name}
          </span>
          <span className="font-medium text-muted-foreground">Upcoming</span>
        </div>
      </Card>
    </Link>
  );
}
