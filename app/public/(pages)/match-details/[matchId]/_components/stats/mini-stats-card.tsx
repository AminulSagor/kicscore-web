import Card from "@/components/UI/cards/card";
import type { MatchStatRow } from "@/mock/match-details/match-stats.mock.types";

type MiniStatsCardProps = {
  item: MatchStatRow;
};

//*============= Mini Stats Card =============*//
export default function MiniStatsCard({ item }: MiniStatsCardProps) {
  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <div className="grid grid-cols-[70px_1fr_70px] items-center gap-3">
        <span className="w-fit rounded-md bg-mint-green px-3 py-1 text-xs font-bold text-[#10201B]">
          {item.home}
        </span>

        <span className="text-center text-sm font-medium text-[#6B7A75] dark:text-white/55">
          {item.label}
        </span>

        <span className="text-right text-sm font-bold">{item.away}</span>
      </div>
    </Card>
  );
}