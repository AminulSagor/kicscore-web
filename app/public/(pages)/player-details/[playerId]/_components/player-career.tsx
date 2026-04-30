import type { PlayerCareerGroupMock } from "@/mock/player-details/player-details.mock.types";

type PlayerCareerProps = {
    careerGroups: PlayerCareerGroupMock[];
};

const PlayerCareer = ({ careerGroups }: PlayerCareerProps) => {
    return (
        <section className="mt-8 space-y-6">
            {careerGroups.map((group) => (
                <div
                    key={group.id}
                    className="overflow-hidden rounded-[22px] bg-white shadow-sm ring-1 ring-[#D8E7DF] dark:bg-white/5 dark:ring-white/7"
                >
                    <div className="bg-[#EAF3EF] px-5 py-4 dark:bg-white/6">
                        <h2 className="text-sm font-bold text-[#0B1F1A] dark:text-white">
                            {group.title}
                        </h2>
                    </div>

                    <div className="space-y-3 px-4 py-5">
                        {group.items.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-2xl bg-[#F2F7F5] px-4 py-4 dark:bg-white/6"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <span className="mt-1 h-5 w-5 shrink-0 rounded-full border border-[#61736D] dark:border-white/35" />

                                        {item.isPlaceholder ? (
                                            <div className="space-y-2">
                                                <div className="h-3 w-24 rounded-full bg-[#D8E7DF] dark:bg-white/80" />
                                                <div className="h-3 w-32 rounded-full bg-[#D8E7DF] dark:bg-white/80" />
                                                <div className="h-3 w-28 rounded-full bg-[#D8E7DF] dark:bg-white/80" />
                                                <div className="h-3 w-14 rounded-full bg-[#D8E7DF] dark:bg-white/80" />
                                            </div>
                                        ) : (
                                            <div>
                                                <h3 className="text-sm font-bold text-[#0B1F1A] dark:text-white">
                                                    {item.club}
                                                </h3>
                                                <p className="mt-1 text-[10px] font-semibold uppercase text-[#008A63] dark:text-[#34D399]">
                                                    {item.period}
                                                </p>

                                                <div className="mt-4 space-y-3">
                                                    {item.stats.map((stat) => (
                                                        <p
                                                            key={stat.label}
                                                            className="text-xs font-bold uppercase text-[#61736D] dark:text-white/45"
                                                        >
                                                            {stat.label}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-10 flex shrink-0 flex-col gap-2">
                                        {item.stats.map((stat) => (
                                            <span
                                                key={stat.label}
                                                className="min-w-8 rounded-md bg-[#34D399] px-2 py-1 text-center text-xs font-bold text-[#07110F]"
                                            >
                                                {stat.value}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default PlayerCareer;