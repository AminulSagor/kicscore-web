import type { CoachTrophyMock } from "@/mock/coach-details/coach-details.mock.types";

type CoachTrophiesProps = {
    trophies: CoachTrophyMock[];
};

const CoachTrophies = ({ trophies }: CoachTrophiesProps) => {
    return (
        <section className="mt-8 overflow-hidden rounded-[22px] bg-white/5 ring-1 ring-white/7">
            <div className="bg-white/6 px-5 py-4">
                <h2 className="text-sm font-bold">Trophies</h2>
            </div>

            <div className="space-y-3 px-4 py-5">
                {trophies.map((trophy) => (
                    <div key={trophy.id} className="rounded-2xl bg-white/6 px-5 py-5">
                        <div className="grid grid-cols-[32px_1fr] gap-x-4">
                            <span className="h-8 w-8 rounded-full border border-[#79e2c5]" />

                            <div>
                                <p className="text-base font-bold">{trophy.title}</p>
                                <p className="mt-1 text-xs text-white/45">{trophy.country}</p>
                            </div>

                            <span className="mt-4 h-5 w-5 self-start rounded-full border border-white/35" />

                            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                                <span className="text-sm text-white/85">{trophy.season}</span>
                                <span className="text-sm font-bold">{trophy.result}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CoachTrophies;