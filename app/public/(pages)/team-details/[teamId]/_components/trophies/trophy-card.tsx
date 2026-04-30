import Image from "next/image";

import Card from "@/components/UI/cards/card";
import type { TeamTrophy } from "@/mock/team-details/team-trophies.mock.types";

import TrophyAchievementRow from "./trophy-achievement-row";

type Props = {
  trophy: TeamTrophy;
};

export default function TrophyCard({ trophy }: Props) {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
    >
      <div className="flex items-center gap-3 bg-[#EAF3EF] px-4 py-4 dark:bg-dark-green">
        <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[#94A3B8] bg-white dark:bg-primary">
          <Image
            src={trophy.logo}
            alt={trophy.title}
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>

        <h3 className="text-sm font-bold text-[#10201B] dark:text-white">
          {trophy.title}
        </h3>
      </div>

      <div className="space-y-3 p-4">
        {trophy.achievements.map((achievement) => (
          <TrophyAchievementRow
            key={achievement.id}
            achievement={achievement}
          />
        ))}
      </div>
    </Card>
  );
}
