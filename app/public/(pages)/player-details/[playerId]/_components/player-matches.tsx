import type { PlayerMatchGroupMock } from "@/mock/player-details/player-details.mock.types";
import { ChevronDown } from "lucide-react";

type PlayerMatchesProps = {
    matchGroups: PlayerMatchGroupMock[];
};

const PlayerMatches = ({ matchGroups }: PlayerMatchesProps) => {
    return (
        <section className="mt-8 space-y-5">
            {matchGroups.map((group) => (
                <div
                    key={group.id}
                    className="rounded-[22px] bg-white p-5 shadow-sm ring-1 ring-[#D8E7DF] dark:bg-white/5 dark:ring-white/7"
                >
                    <div className="flex items-center gap-3 border-b border-[#D8E7DF] pb-4 dark:border-white/10">
                        <span className="h-7 w-7 rounded-full border border-[#008A63] dark:border-[#79e2c5]" />

                        <div>
                            <h2 className="text-base font-bold text-[#0B1F1A] dark:text-white">
                                {group.team}
                            </h2>
                            <p className="text-xs text-[#61736D] dark:text-white/45">
                                {group.country}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3">
                        {group.matches.map((match) => (
                            <div
                                key={match.id}
                                className="flex items-center justify-between rounded-xl bg-[#F2F7F5] px-4 py-4 dark:bg-white/6"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="h-5 w-5 rounded-full border border-[#61736D] dark:border-white/35" />

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-[#008A63] dark:text-[#34D399]">
                                                {match.date}
                                            </span>
                                            <span className="rounded-full bg-[#0B8F68] px-2 py-0.5 text-[10px] font-semibold text-white">
                                                {match.league}
                                            </span>
                                        </div>

                                        <p className="mt-2 text-sm font-bold text-[#0B1F1A] dark:text-white">
                                            {match.opponent}
                                        </p>
                                        <p className="mt-1 text-xs text-[#61736D] dark:text-white/45">
                                            {match.score}
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-xl bg-[#0B8F68] px-3 py-2 text-center text-white">
                                    <p className="text-xs font-bold">{match.goal}</p>
                                    <p className="text-[10px] text-white/70">{match.minute}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <div className="flex justify-center pt-2">
                <button className="inline-flex items-center gap-2 rounded-full bg-[#0B8F68] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#0A7C58]">
                    Load More
                    <ChevronDown className="h-4 w-4" />
                </button>
            </div>
        </section>
    );
};

export default PlayerMatches;