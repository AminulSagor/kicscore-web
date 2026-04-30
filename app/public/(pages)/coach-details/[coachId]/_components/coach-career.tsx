import type { CoachCareerMock } from "@/mock/coach-details/coach-details.mock.types";

type CoachCareerProps = {
    career: CoachCareerMock[];
};

const CoachCareer = ({ career }: CoachCareerProps) => {
    return (
        <section className="mt-8 overflow-hidden rounded-[22px] bg-white/5 ring-1 ring-white/7">
            <div className="bg-white/6 px-5 py-4">
                <h2 className="text-sm font-bold">Coaching Career</h2>
            </div>

            <div className="space-y-4 px-4 py-5">
                {career.map((item) => {
                    const isEmpty = !item.club;

                    return (
                        <div
                            key={item.id}
                            className="flex min-h-[66px] items-center gap-4 rounded-2xl bg-white/6 px-5 py-4"
                        >
                            <span className="h-5 w-5 shrink-0 rounded-full border border-white/35" />

                            {isEmpty ? (
                                <div className="space-y-2">
                                    <div className="h-3 w-24 rounded-full bg-white/80" />
                                    <div className="h-3 w-32 rounded-full bg-white/80" />
                                </div>
                            ) : (
                                <div>
                                    <p className="text-base font-bold">{item.club}</p>
                                    <p className="mt-1 text-xs font-semibold text-[#34D399]">
                                        {item.period}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default CoachCareer;