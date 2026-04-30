import type { PlayerTrophyMock } from "@/mock/player-details/player-details.mock.types";

type PlayerTrophiesProps = {
    trophies: PlayerTrophyMock[];
};

const PlayerTrophies = ({ trophies }: PlayerTrophiesProps) => {
    return (
        <section className="mt-5 overflow-hidden rounded-[22px] bg-white shadow-sm ring-1 ring-[#D8E7DF] dark:bg-white/5 dark:ring-white/7">
            <div className="bg-[#EAF3EF] px-5 py-4 dark:bg-white/6">
                <h2 className="text-sm font-bold text-[#0B1F1A] dark:text-white">
                    Trophies
                </h2>
            </div>

            <div className="space-y-3 px-4 py-5">
                {trophies.map((trophy) => (
                    <div
                        key={trophy.id}
                        className="rounded-2xl bg-[#F2F7F5] px-5 py-5 dark:bg-white/6"
                    >
                        <div className="grid grid-cols-[64px_1fr] gap-x-4">
                            <span className="h-8 w-8 rounded-full border border-[#008A63] dark:border-[#79e2c5]" />

                            <div>
                                <p className="text-sm font-bold text-[#0B1F1A] dark:text-white">
                                    {trophy.title}
                                </p>
                                <p className="mt-1 text-[10px] text-[#61736D] dark:text-white/45">
                                    {trophy.country}
                                </p>
                            </div>

                            <div className="flex items-center">
                                <span className="h-5 w-5 rounded-full border border-[#61736D] dark:border-white/35" />
                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-[#D8E7DF] pt-4 dark:border-white/10">
                                <span className="text-xs text-[#40524C] dark:text-white/85">
                                    {trophy.season}
                                </span>
                                <span className="text-xs font-bold text-[#0B1F1A] dark:text-white">
                                    {trophy.result}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PlayerTrophies;