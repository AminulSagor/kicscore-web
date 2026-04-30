import Image from "next/image";

import Card from "@/components/UI/cards/card";
import { matchLineups } from "@/mock/match-details/match-lineup.mock.data";
import type { FormationPlayer } from "@/mock/match-details/match-lineup.mock.types";

//*============= Formation Pitch =============*//
export default function FormationPitch() {
  const homeTeam = matchLineups[0];
  const awayTeam = matchLineups[1];

  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <TeamHeader teamName={homeTeam.teamName} formation={homeTeam.formation} />

      <div className="relative min-h-[920px] overflow-hidden bg-[#F4F8F6] dark:bg-[#13211D] sm:min-h-[980px]">
        <PitchLines />

        {[...homeTeam.players, ...awayTeam.players].map((player) => (
          <PlayerMarker key={player.id} player={player} />
        ))}
      </div>

      <TeamFooter teamName={awayTeam.teamName} formation={awayTeam.formation} />
    </Card>
  );
}

//*============= Team Header =============*//
function TeamHeader({
  teamName,
  formation,
}: {
  teamName: string;
  formation: string;
}) {
  return (
    <div className="flex items-center justify-between bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
      <div className="flex items-center gap-3">
        <span className="size-7 rounded-full border border-mint-green bg-[#F4F8F6] dark:bg-[#232628]" />
        <h3 className="text-sm font-bold">{teamName}</h3>
      </div>

      <span className="rounded-full bg-mint-green px-3 py-1 text-xs font-bold text-[#10201B]">
        {formation}
      </span>
    </div>
  );
}

//*============= Team Footer =============*//
function TeamFooter({
  teamName,
  formation,
}: {
  teamName: string;
  formation: string;
}) {
  return (
    <div className="flex items-center justify-between bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
      <div className="flex items-center gap-3">
        <span className="size-7 rounded-full border border-mint-green bg-[#F4F8F6] dark:bg-[#232628]" />
        <h3 className="text-sm font-bold">{teamName}</h3>
      </div>

      <span className="rounded-full bg-mint-green px-3 py-1 text-xs font-bold text-[#10201B]">
        {formation}
      </span>
    </div>
  );
}

//*============= Pitch Lines =============*//
function PitchLines() {
  return (
    <>
      <div className="absolute left-0 top-1/2 h-px w-full bg-[#DDE8E3] dark:bg-white/10" />
      <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DDE8E3] dark:border-white/10" />
    </>
  );
}

//*============= Player Marker =============*//
function PlayerMarker({ player }: { player: FormationPlayer }) {
  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      style={{
        left: player.position.left,
        top: player.position.top,
      }}
    >
      <div className="relative size-12 overflow-hidden rounded-full border border-mint-green bg-[#F4F8F6] dark:bg-[#232628] sm:size-14">
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
