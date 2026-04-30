import Image from "next/image";
import Card from "@/components/UI/cards/card";
import { leagues } from "@/mock/team-details/team-overview.mock.data";

export default function LeaguesCard() {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
    >
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">Leagues</h3>
      </div>

      <div className="space-y-3 p-4">
        {leagues.map((league) => (
          <div
            key={league.id}
            className="flex items-center gap-4 rounded-2xl bg-[#F3F7F5] p-4 dark:bg-dark-green"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-mint-green">
              <Image
                src={league.logo}
                alt={league.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-bold">{league.name}</p>
              <p className="text-xs text-[#6B7A75] dark:text-white/40">
                {league.season}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
