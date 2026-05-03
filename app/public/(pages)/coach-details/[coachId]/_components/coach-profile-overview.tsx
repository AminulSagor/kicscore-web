import Card from "@/components/UI/cards/card";
import type { CoachDetailsMock } from "@/mock/coach-details/coach-details.mock.types";

type CoachProfileOverviewProps = {
  coach: CoachDetailsMock;
};

const CoachProfileOverview = ({ coach }: CoachProfileOverviewProps) => {
  return (
    <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card
        padding="lg"
        rounded="2xl"
        shadow="none"
        className="bg-white text-[#10201B] ring-1 ring-[#DDE8E3] dark:bg-[#101C18] dark:text-white dark:ring-white/7"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {coach.stats.map((stat, index) => (
            <Card
              key={stat.label}
              padding="none"
              rounded="xl"
              shadow="none"
              className={`px-4 py-4 ${
                index === 0
                  ? "bg-secondary text-white"
                  : "bg-[#EAF3EF] text-[#10201B] dark:bg-[#1F2B27] dark:text-white"
              }`}
            >
              <p className="text-base font-bold">{stat.value}</p>
              <p
                className={`mt-1 text-xs ${
                  index === 0
                    ? "text-white/75"
                    : "text-[#6B7A75] dark:text-white/45"
                }`}
              >
                {stat.label}
              </p>
            </Card>
          ))}
        </div>
      </Card>

      <Card
        padding="lg"
        rounded="2xl"
        shadow="none"
        className="bg-white text-[#10201B] ring-1 ring-[#DDE8E3] dark:bg-[#101C18] dark:text-white dark:ring-white/7"
      >
        <div className="flex items-center justify-center gap-2">
          <span className="h-5 w-5 rounded-full border border-[#6B7A75] dark:border-white/40" />
          <h2 className="text-base font-bold text-black dark:text-white">{coach.club.name}</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_1fr]">
          <Card
            padding="none"
            rounded="xl"
            shadow="none"
            className="bg-[#EAF3EF] px-4 py-4 text-[#10201B] dark:bg-[#1F2B27] dark:text-white"
          >
            <p className="text-lg font-bold">{coach.club.matches}</p>
            <p className="mt-1 text-xs text-[#6B7A75] dark:text-white/45">
              Matches
            </p>
          </Card>

          <div className="space-y-2">
            {coach.club.ratings.map((rating) => (
              <div
                key={rating.label}
                className="grid grid-cols-[42px_35px_1fr] items-center gap-2 rounded-full bg-[#EAF3EF] px-3 py-1.5 dark:bg-[#1F2B27]"
              >
                <span className="text-xs text-[#6B7A75] dark:text-white/70">
                  {rating.label}
                </span>

                <span className="text-xs text-[#6B7A75] dark:text-white/70">
                  {rating.amount}
                </span>

                <div className="h-2 rounded-full bg-[#DDE8E3] dark:bg-[#101C18]">
                  <div
                    className={`h-full rounded-full ${
                      rating.label === "Losses"
                        ? "bg-[#FF6B6B]"
                        : "bg-[#34D399]"
                    }`}
                    style={{ width: `${rating.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
};

export default CoachProfileOverview;
