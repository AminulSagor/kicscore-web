import Card from "@/components/UI/cards/card";
import type { CoachTrophyMock } from "@/mock/coach-details/coach-details.mock.types";

type CoachTrophiesProps = {
  trophies: CoachTrophyMock[];
};

const CoachTrophies = ({ trophies }: CoachTrophiesProps) => {
  return (
    <Card
      padding="none"
      rounded="2xl"
      shadow="none"
      className="mt-8 overflow-hidden bg-white text-black ring-1 ring-[#DDE8E3] dark:bg-[#101C18] dark:text-white dark:ring-white/7"
    >
      <div className="bg-[#EAF3EF] px-5 py-4 dark:bg-[#1F2B27]">
        <h2 className="text-sm font-bold text-black dark:text-white">Trophies</h2>
      </div>

      <div className="space-y-3 px-4 py-5">
        {trophies.map((trophy) => (
          <Card
            key={trophy.id}
            padding="none"
            rounded="2xl"
            shadow="none"
            className="bg-[#EAF3EF] px-5 py-5 text-[#10201B] dark:bg-[#1F2B27] dark:text-white"
          >
            <div className="grid grid-cols-[32px_1fr] gap-x-4">
              <span className="h-8 w-8 rounded-full border border-[#0B8F68] dark:border-[#79e2c5]" />

              <div>
                <p className="text-base font-bold">{trophy.title}</p>
                <p className="mt-1 text-xs text-[#6B7A75] dark:text-white/45">
                  {trophy.country}
                </p>
              </div>

              <span className="mt-4 h-5 w-5 self-start rounded-full border border-[#6B7A75] dark:border-white/35" />

              <div className="mt-4 flex items-center justify-between border-t border-[#DDE8E3] pt-4 dark:border-white/10">
                <span className="text-sm text-[#6B7A75] dark:text-white/85">
                  {trophy.season}
                </span>
                <span className="text-sm font-bold">{trophy.result}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default CoachTrophies;
