import { worldCupSeasonsMockData } from "@/mock/league-details/world-cup-seasons.mock";
import SeasonCard from "./season-card";

export default function SeasonTab() {
  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="mb-6 text-xl font-bold text-[#10201B] dark:text-white sm:text-2xl">
        Completed Seasons
      </h2>
      <div className="flex flex-col gap-5">
        {worldCupSeasonsMockData.map((season) => (
          <SeasonCard key={season.year} season={season} />
        ))}
      </div>
    </div>
  );
}
