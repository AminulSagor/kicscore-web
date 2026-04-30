import { ChevronDown } from "lucide-react";
import type {
    PlayerPerformanceGroupMock,
    PlayerStatMock,
} from "@/mock/player-details/player-details.mock.types";

type PlayerStatsProps = {
    season: string;
    seasonStats: PlayerStatMock[];
    performanceGroups: PlayerPerformanceGroupMock[];
};

const PlayerStats = ({
    season,
    seasonStats,
    performanceGroups,
}: PlayerStatsProps) => {
    return (
        <section className="mt-8">
            <button className="flex w-full items-center justify-between rounded-2xl bg-white px-5 py-4 text-left shadow-sm ring-1 ring-[#D8E7DF] dark:bg-white/5 dark:ring-white/7">
                <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded-full border border-[#61736D] dark:border-white/35" />
                    <span className="text-sm font-semibold text-[#40524C] dark:text-white/75">
                        {season}
                    </span>
                </div>

                <ChevronDown className="h-4 w-4 text-[#61736D] dark:text-white/65" />
            </button>

            <div className="mt-5 rounded-[22px] bg-white p-4 shadow-sm ring-1 ring-[#D8E7DF] dark:bg-white/5 dark:ring-white/7">
                <div className="rounded-2xl bg-[#0B8F68] px-5 py-4 text-white">
                    <p className="text-2xl font-bold">2,083</p>
                    <p className="text-xs text-white/75">Minutes Played</p>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                    {seasonStats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl bg-[#EAF3EF] px-5 py-4 dark:bg-white/7"
                        >
                            <p className="text-2xl font-bold text-[#0B1F1A] dark:text-white">
                                {stat.value}
                            </p>
                            <p className="text-xs text-[#61736D] dark:text-white/45">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[22px] bg-white shadow-sm ring-1 ring-[#D8E7DF] dark:bg-white/5 dark:ring-white/7">
                <div className="bg-[#EAF3EF] px-5 py-4 dark:bg-white/6">
                    <h2 className="text-sm font-bold text-[#0B1F1A] dark:text-white">
                        Season performance
                    </h2>
                </div>

                <div>
                    {performanceGroups.map((group) => (
                        <div
                            key={group.id}
                            className="border-b border-[#D8E7DF] px-5 py-6 last:border-b-0 dark:border-white/8"
                        >
                            <h3 className="mb-5 text-xs font-bold uppercase text-[#0B1F1A] dark:text-white">
                                {group.title}
                            </h3>

                            <div className="space-y-5">
                                {group.stats.map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="flex items-center justify-between gap-4"
                                    >
                                        <span className="text-xs font-bold uppercase text-[#61736D] dark:text-white/45">
                                            {stat.label}
                                        </span>

                                        <span
                                            className={`min-w-7 rounded-md px-2 py-1 text-center text-xs font-bold text-[#07110F] ${stat.variant === "warning"
                                                    ? "bg-[#FF9800]"
                                                    : "bg-[#34D399]"
                                                }`}
                                        >
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PlayerStats;