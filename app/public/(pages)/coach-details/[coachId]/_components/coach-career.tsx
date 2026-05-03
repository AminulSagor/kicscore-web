import Card from "@/components/UI/cards/card";
import type { CoachCareerMock } from "@/mock/coach-details/coach-details.mock.types";

type CoachCareerProps = {
  career: CoachCareerMock[];
};

const CoachCareer = ({ career }: CoachCareerProps) => {
  return (
    <Card
      padding="none"
      rounded="2xl"
      shadow="none"
      className="mt-8 overflow-hidden bg-white text-[#10201B] ring-1 ring-[#DDE8E3] dark:bg-[#101C18] dark:text-white dark:ring-white/7"
    >
      <div className="bg-[#EAF3EF] px-5 py-4 dark:bg-[#1F2B27]">
        <h2 className="text-sm font-bold text-black dark:text-white">
          Coaching Career
        </h2>
      </div>

      <div className="space-y-4 px-4 py-5">
        {career.map((item) => {
          const isEmpty = !item.club;

          return (
            <Card
              key={item.id}
              padding="none"
              rounded="2xl"
              shadow="none"
              className="flex min-h-[66px] items-center gap-4 bg-[#EAF3EF] px-5 py-4 text-[#10201B] dark:bg-[#1F2B27] dark:text-white"
            >
              <span className="h-5 w-5 shrink-0 rounded-full border border-[#6B7A75] dark:border-white/35" />

              {isEmpty ? (
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded-full bg-[#6B7A75]/40 dark:bg-white/80" />
                  <div className="h-3 w-32 rounded-full bg-[#6B7A75]/40 dark:bg-white/80" />
                </div>
              ) : (
                <div>
                  <p className="text-base font-bold">{item.club}</p>
                  <p className="mt-1 text-xs font-semibold text-[#34D399]">
                    {item.period}
                  </p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default CoachCareer;
