import type { CoachDetailsMock } from "@/mock/coach-details/coach-details.mock.types";

type CoachProfileOverviewProps = {
    coach: CoachDetailsMock;
};

const CoachProfileOverview = ({ coach }: CoachProfileOverviewProps) => {
    return (
        <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-[22px] bg-white/5 p-8 ring-1 ring-white/7">
                <div className="grid grid-cols-2 gap-4">
                    {coach.stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            className={`rounded-2xl px-6 py-6 ${index === 0 ? "bg-[#0B8F68]" : "bg-white/7"
                                }`}
                        >
                            <p className="text-lg font-bold">{stat.value}</p>
                            <p className="mt-2 text-xs text-white/45">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-[22px] bg-white/5 p-8 ring-1 ring-white/7">
                <div className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 rounded-full border border-white/40" />
                    <h2 className="text-base font-bold">{coach.club.name}</h2>
                </div>

                <div className="mt-8 grid grid-cols-[150px_1fr] items-center gap-6">
                    <div className="rounded-2xl bg-white/7 px-6 py-6">
                        <p className="text-xl font-bold">{coach.club.matches}</p>
                        <p className="mt-2 text-xs text-white/45">Matches</p>
                    </div>

                    <div className="space-y-4">
                        {coach.club.ratings.map((rating) => (
                            <div key={rating.label} className="grid grid-cols-[48px_45px_1fr] items-center gap-3">
                                <span className="text-xs text-white/60">{rating.label}</span>
                                <span className="text-xs text-white/70">{rating.amount}</span>

                                <div className="h-2 rounded-full bg-white/8">
                                    <div
                                        className={`h-full rounded-full ${rating.label === "Losses" ? "bg-[#FF6B6B]" : "bg-[#34D399]"
                                            }`}
                                        style={{ width: `${rating.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoachProfileOverview;