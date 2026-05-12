import Image from "next/image";

import Card from "@/components/UI/cards/card";
import { liveMatchesMockData } from "@/mock/matches/match-top-section.mock";

const MatchTopSection = () => {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-foreground">Live Now</h2>

        <span className="rounded-full bg-secondary/10 px-3 py-1 font-medium text-secondary">
          {liveMatchesMockData.length} Live
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {liveMatchesMockData.map((match) => (
          <Card
            key={match.id}
            variant="white"
            rounded="2xl"
            padding="md"
            shadow="sm"
            className="border border-black/10 bg-white text-foreground transition hover:border-secondary/40 dark:border-white/10 dark:bg-dark-green"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-muted-foreground">{match.league}</span>

              <span className="flex items-center gap-2 font-medium text-red-500">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Live {match.minute}
              </span>
            </div>

            <div className="space-y-3">
              {match.teams.map((team) => (
                <div
                  key={team.name}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <Image
                      src={team.logo}
                      alt={team.name}
                      width={32}
                      height={32}
                      className="h-8 w-8 shrink-0 object-contain"
                    />

                    <span className="truncate font-medium">{team.name}</span>
                  </div>

                  <span className="font-semibold">{team.score}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3 dark:border-white/10">
              <span className="text-muted-foreground">{match.shortLabel}</span>
              <span className="font-medium text-secondary">Live</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MatchTopSection;
