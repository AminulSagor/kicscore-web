import type { PlayerDetailsMock } from "@/mock/player-details/player-details.mock.types";

type PlayerProfileOverviewProps = {
    player: PlayerDetailsMock;
};

const PlayerProfileOverview = ({ player }: PlayerProfileOverviewProps) => {
    return (
        <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#D8E7DF] dark:bg-white/5 dark:ring-white/7">
            <div className="grid grid-cols-2 gap-3">
                {player.stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className={`rounded-xl px-4 py-3 ${index === 0 || index === 1
                                ? "bg-[#0B8F68] text-white"
                                : "bg-[#EAF3EF] text-[#0B1F1A] dark:bg-white/7 dark:text-white"
                            }`}
                    >
                        <p className="text-sm font-bold">{stat.value}</p>
                        <p
                            className={`mt-1 text-[10px] ${index === 0 || index === 1
                                    ? "text-white/70"
                                    : "text-[#61736D] dark:text-white/50"
                                }`}
                        >
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-3 rounded-xl bg-[#0B8F68] px-4 py-3 text-white">
                <p className="text-sm font-bold">{player.position.value}</p>
                <p className="mt-1 text-[10px] text-white/70">
                    {player.position.label}
                </p>
            </div>

            <p className="mt-5 text-center text-[11px] text-[#61736D] dark:text-white/65">
                Squad Pro League 2025/2026
            </p>

            <div className="mt-4 grid grid-cols-3 gap-3">
                {player.seasonStats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl bg-[#EAF3EF] px-4 py-3 dark:bg-white/7"
                    >
                        <p className="text-sm font-bold text-[#0B1F1A] dark:text-white">
                            {stat.value}
                        </p>
                        <p className="mt-1 text-[10px] text-[#61736D] dark:text-white/45">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PlayerProfileOverview;