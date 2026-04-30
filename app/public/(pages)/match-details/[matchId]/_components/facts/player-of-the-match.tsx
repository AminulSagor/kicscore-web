import { ChevronRight } from "lucide-react";

import Card from "@/components/UI/cards/card";
import { playerOfTheMatch } from "@/mock/match-details/match-facts.mock.data";

export default function PlayerOfTheMatch() {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <div className="flex items-center justify-between bg-[#EAF3EF] px-4 py-3 dark:bg-white/5">
        <h3 className="text-sm font-bold">Player of the Match</h3>
        <ChevronRight className="size-4 text-[#6B7A75] dark:text-white/65" />
      </div>

      <div className="p-4 sm:p-8">
        <div className="flex items-center justify-between rounded-2xl bg-[#F4F8F6] p-5 sm:p-8 dark:bg-white/5">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full border border-secondary bg-[#EAF3EF] dark:bg-[#232628]" />

            <div>
              <h4 className="text-base font-bold sm:text-lg">
                {playerOfTheMatch.name}
              </h4>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7A75] dark:text-white/45">
                {playerOfTheMatch.team}
              </p>
            </div>
          </div>

          <span className="text-lg font-bold text-secondary">
            {playerOfTheMatch.rating}
          </span>
        </div>
      </div>
    </Card>
  );
}
