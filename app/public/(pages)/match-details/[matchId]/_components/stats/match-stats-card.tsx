import Card from "@/components/UI/cards/card";
import type { MatchStatsSection } from "@/mock/match-details/match-stats.mock.types";

type MatchStatsCardProps = {
  section: MatchStatsSection;
};

//*============= Match Stats Card =============*//
export default function MatchStatsCard({ section }: MatchStatsCardProps) {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">{section.title}</h3>
      </div>

      <div className="space-y-6 p-5 sm:p-7">
        {section.showPossession && section.possession && (
          <div>
            <p className="mb-4 text-center text-sm font-bold">
              Ball possession
            </p>

            <div className="flex h-8 overflow-hidden rounded-md bg-[#F8FAF9] dark:bg-white">
              <div
                className="flex items-center bg-mint-green px-3 text-xs font-bold text-[#10201B]"
                style={{ width: `${section.possession.home}%` }}
              >
                {section.possession.home}%
              </div>

              <div
                className="flex items-center justify-center text-xs font-bold text-[#10201B]"
                style={{ width: `${section.possession.away}%` }}
              >
                {section.possession.away}%
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4 text-sm">
          {section.rows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[70px_1fr_70px] items-center gap-3"
            >
              <span className="w-fit rounded-md bg-mint-green px-3 py-1 text-xs font-bold text-[#10201B]">
                {row.home}
              </span>

              <span className="text-center font-medium text-[#6B7A75] dark:text-white/55">
                {row.label}
              </span>

              <span className="text-right font-bold text-[#10201B] dark:text-white">
                {row.away}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
