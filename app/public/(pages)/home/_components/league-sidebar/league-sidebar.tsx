import { Search, Trophy } from "lucide-react";
import Accordion from "@/components/UI/accordion/accordion";
import {
  countryLeaguesMockData,
  topLeaguesMockData,
} from "@/mock/league-sidebar/league-sidebar.mock.data";
import Link from "next/link";

export default function LeagueSidebar() {
  return (
    <aside className="w-full lg:w-[240px] xl:w-[280px]">
      <Accordion title="Top Leagues" defaultOpen>
        <div className="space-y-3">
          {topLeaguesMockData.map((league) => (
            <button
              key={league.id}
              type="button"
              className="
                flex w-full items-center gap-3 rounded-lg px-2 py-2
                text-left text-sm font-semibold text-[#10201B]
                transition hover:bg-[#EAF3EF]
                dark:text-white dark:hover:bg-white/5
              "
            >
              <span className="text-base">{league.icon}</span>
              <span>
                <Link href={`/public/league-details/${league.id}`}>
                  {league.name}
                </Link>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-bold text-[#10201B] dark:text-white">
            All leagues
          </h3>

          <div
            className="
              mt-3 flex h-9 items-center gap-2 rounded-lg
              bg-[#EAF3EF] px-3 text-[#6B7A75]
              dark:bg-white/5 dark:text-white/45
            "
          >
            <Search size={16} />
            <span className="text-sm">Filter</span>
          </div>

          <div className="mt-4 max-h-[430px] space-y-1 overflow-y-auto pr-1">
            {countryLeaguesMockData.map((country) => (
              <button
                key={country.id}
                type="button"
                className="
                  flex w-full items-center justify-between rounded-lg px-2 py-2.5
                  text-left transition hover:bg-[#EAF3EF]
                  dark:hover:bg-white/5
                "
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm">{country.flag}</span>
                  <span className="text-sm font-medium text-[#10201B] dark:text-white">
                    {country.name}
                  </span>
                </div>

                <Trophy
                  size={14}
                  className="text-[#6B7A75] opacity-60 dark:text-white/35"
                />
              </button>
            ))}
          </div>
        </div>
      </Accordion>
    </aside>
  );
}
