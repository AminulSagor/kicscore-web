import Card from "@/components/UI/cards/card";
import type { TeamSquadMember } from "@/mock/team-details/team-squad.mock.types";
import SquadPlayerRow from "./squad-player-row";
import Link from "next/link";

type Props = {
  title: string;
  players: TeamSquadMember[];
  showNumber?: boolean;
  link?: string;
};

export default function SquadSectionCard({
  title,
  players,
  link,
  showNumber = true,
}: Props) {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
    >
      <Link href={link || "#"}>
        <div className="bg-[#EAF3EF] px-4 py-4 dark:bg-dark-green">
          <h3 className="text-sm font-bold text-[#10201B] dark:text-white">
            {title}
          </h3>
        </div>

        <div className="space-y-3 p-4">
          {players.map((player) => (
            <SquadPlayerRow
              key={player.id}
              player={player}
              showNumber={showNumber}
            />
          ))}
        </div>
      </Link>
    </Card>
  );
}
