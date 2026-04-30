import Image from "next/image";
import Card from "@/components/UI/cards/card";
import { rankings } from "@/mock/team-details/team-overview.mock.data";

export default function RankingsCard() {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
    >
      <div className="flex items-center justify-between bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">Rankings</h3>
        <button className="rounded-full border border-[#DDE8E3] px-3 py-1 text-xs font-semibold dark:border-white/10">
          2025/2026
        </button>
      </div>

      <div className="space-y-3 p-4">
        {rankings.map((ranking) => (
          <div
            key={ranking.id}
            className="flex items-center justify-between rounded-2xl bg-[#F3F7F5] p-4 dark:bg-dark-green"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-mint-green">
                <Image
                  src={ranking.logo}
                  alt={ranking.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>

              <p className="text-sm font-bold">{ranking.name}</p>
            </div>

            <p className="text-sm font-bold text-secondary dark:text-mint-green">
              {ranking.position}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
