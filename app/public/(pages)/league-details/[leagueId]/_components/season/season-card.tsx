import Image from "next/image";
import { WorldCupSeasonMock } from "@/mock/league-details/world-cup-seasons.mock";

export default function SeasonCard({ season }: { season: WorldCupSeasonMock }) {
  return (
    <div className="flex flex-col rounded-[20px] bg-card p-5 dark:bg-card-dark sm:p-6 mb-6 last:mb-0 border border-[#DDE8E3] dark:border-white/10">
      <h3 className="mb-4 text-base font-bold text-[#10201B] dark:text-white sm:text-lg">
        {season.year}
      </h3>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4 rounded-xl bg-[#F6F8F7] dark:bg-white/5 p-4">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={season.winner.logo}
              alt={season.winner.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[#10201B] dark:text-white">
              {season.winner.name}
            </span>
            <span className="text-sm font-medium text-[#6B7A75] dark:text-white/45">
              Winner
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl bg-[#F6F8F7] dark:bg-white/5 p-4">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={season.runnerUp.logo}
              alt={season.runnerUp.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[#10201B] dark:text-white">
              {season.runnerUp.name}
            </span>
            <span className="text-sm font-medium text-[#6B7A75] dark:text-white/45">
              Runner-Up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
