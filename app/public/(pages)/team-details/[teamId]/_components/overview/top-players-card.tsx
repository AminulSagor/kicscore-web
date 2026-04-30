import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Card from "@/components/UI/cards/card";
import { topPlayers } from "@/mock/team-details/team-overview.mock.data";

export default function TopPlayersCard() {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
    >
      <div className="flex items-center justify-between bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">Top players</h3>
        <ChevronRight className="h-4 w-4" />
      </div>

      <div className="space-y-3 p-4">
        {topPlayers.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between rounded-2xl bg-[#F3F7F5] p-3 dark:bg-dark-green"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-mint-green">
                <Image
                  src={player.image}
                  alt={player.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>

              <div>
                <p className="text-sm font-bold">{player.name}</p>
                <p className="text-xs text-[#6B7A75] dark:text-white/40">
                  {player.role}
                </p>
              </div>
            </div>

            <p className="text-sm font-bold text-secondary dark:text-mint-green">
              {player.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
