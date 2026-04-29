import type { TeamOfWeek } from "@/mock/league-details/league-details.mock.types";

type TeamOfWeekCardProps = {
  team: TeamOfWeek;
};

const playerPositions = [
  "left-[14%] top-[7%]",
  "right-[14%] top-[7%]",
  "left-1/2 top-[27%] -translate-x-1/2",
  "left-[10%] top-[42%]",
  "right-[10%] top-[42%]",
  "left-1/2 top-[48%] -translate-x-1/2",
  "left-[10%] top-[67%]",
  "left-[31%] top-[67%]",
  "right-[31%] top-[67%]",
  "right-[10%] top-[67%]",
  "left-1/2 bottom-[6%] -translate-x-1/2",
];

export default function TeamOfWeekCard({ team }: TeamOfWeekCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#DDE8E3] bg-white dark:border-white/10 dark:bg-[#111d1a]">
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-[#25302B]">
        <h3 className="text-sm font-bold text-[#10201B] dark:text-white">
          Team of the Week
        </h3>
      </div>

      <div className="p-5 text-center">
        <h4 className="text-sm font-bold text-[#10201B] dark:text-white">
          {team.teamName}
        </h4>

        <div className="mx-auto mt-4 w-fit rounded-full bg-[#EAF3EF] px-5 py-2 text-sm font-bold text-[#10201B] dark:bg-[#25302B] dark:text-white">
          {team.round}
        </div>

        <div className="relative mx-auto mt-8 h-[330px] max-w-[280px] rounded-2xl border border-[#DDE8E3] bg-[#EAF3EF] dark:border-white/10 dark:bg-[#25302B]">
          <div className="absolute left-0 top-1/2 h-px w-full bg-[#DDE8E3] dark:bg-white/10" />
          <div className="absolute bottom-0 left-1/2 h-16 w-28 -translate-x-1/2 border border-b-0 border-[#DDE8E3] dark:border-white/10" />
          <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DDE8E3] dark:border-white/10" />

          {team.players.map((player, index) => (
            <div
              key={player.id}
              className={`absolute ${playerPositions[index]} text-center`}
            >
              <div className="mx-auto size-10 rounded-full border border-secondary bg-[#10201B]/5 dark:bg-[#111d1a]" />
              <p className="mt-1 text-[10px] font-medium text-[#10201B] dark:text-white">
                {player.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
