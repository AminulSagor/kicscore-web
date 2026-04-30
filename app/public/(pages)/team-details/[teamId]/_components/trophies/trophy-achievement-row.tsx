import type { TeamTrophyAchievement } from "@/mock/team-details/team-trophies.mock.types";

type Props = {
  achievement: TeamTrophyAchievement;
};

export default function TrophyAchievementRow({ achievement }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-[#F3F7F5] px-4 py-4 dark:bg-dark-green sm:flex-row sm:items-center">
      <div className="w-14 shrink-0">
        <p className="text-base font-bold text-[#10201B] dark:text-white">
          {achievement.count}
        </p>
        <p className="mt-1 text-xs text-[#6B7A75] dark:text-white/45">
          {achievement.title}
        </p>
      </div>

      <p className="text-xs leading-6 text-[#6B7A75] dark:text-white/45">
        {achievement.years.join(", ")}
      </p>
    </div>
  );
}