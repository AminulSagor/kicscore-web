import Image from "next/image";

import Card from "@/components/UI/cards/card";
import type { LineupPerson } from "@/mock/match-details/match-lineup.mock.types";

type LineupPlayerGroupCardProps = {
  title: string;
  players: LineupPerson[];
  columns?: "two" | "four";
};

//*============= Lineup Player Group Card =============*//
export default function LineupPlayerGroupCard({
  title,
  players,
  columns = "four",
}: LineupPlayerGroupCardProps) {
  const gridClass =
    columns === "two"
      ? "grid-cols-2 max-w-[620px] mx-auto"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">{title}</h3>
      </div>

      <div className={`grid ${gridClass} gap-x-10 gap-y-10 px-6 py-8 sm:px-10`}>
        {players.map((player) => (
          <PlayerItem key={player.id} player={player} />
        ))}
      </div>
    </Card>
  );
}

//*============= Player Item =============*//
function PlayerItem({ player }: { player: LineupPerson }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative size-14 overflow-hidden rounded-full border border-mint-green bg-[#F4F8F6] dark:bg-[#232628]">
        {player.image && (
          <Image
            src={player.image}
            alt={player.name}
            fill
            className="object-cover"
          />
        )}
      </div>

      <p className="mt-2 text-xs font-medium text-[#10201B] dark:text-white">
        {player.name}
      </p>
    </div>
  );
}
