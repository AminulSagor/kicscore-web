import Image from "next/image";

import Card from "@/components/UI/cards/card";
import { IMAGE } from "@/constants/image.path";
import { h2hOverview } from "@/mock/match-details/match-head-to-head.mock.data";

//*============= Head To Head Overview Card =============*//
export default function HeadToHeadOverviewCard() {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-[#13211D] dark:text-white"
    >
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">H2H Overview</h3>
      </div>

      <div className="grid grid-cols-3 items-end gap-5 px-5 py-8 text-center sm:px-10">
        <TeamResult
          image={IMAGE.fc_porto}
          value={h2hOverview.homeWins}
          label="Wins"
          isPrimary
        />

        <div>
          <span className="inline-flex rounded-lg bg-[#DDE8E3] px-5 py-3 text-xl font-bold text-[#10201B] dark:bg-white/15 dark:text-white">
            {h2hOverview.draws}
          </span>
          <p className="mt-3 text-sm font-medium text-[#6B7A75] dark:text-white/50">
            Draws
          </p>
        </div>

        <TeamResult
          image={IMAGE.portugal}
          value={h2hOverview.awayWins}
          label="Wins"
        />
      </div>
    </Card>
  );
}

//*============= Team Result =============*//
function TeamResult({
  image,
  value,
  label,
  isPrimary = false,
}: {
  image: string;
  value: number;
  label: string;
  isPrimary?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative size-14 overflow-hidden rounded-full border border-mint-green bg-[#F4F8F6] dark:bg-[#232628] sm:size-16">
        <Image src={image} alt={label} fill className="object-cover" />
      </div>

      <span
        className={`mt-3 inline-flex rounded-lg px-5 py-3 text-xl font-bold ${
          isPrimary
            ? "bg-mint-green text-[#10201B]"
            : "bg-white text-[#10201B] dark:bg-white dark:text-[#10201B]"
        }`}
      >
        {value}
      </span>

      <p className="mt-3 text-sm font-medium text-[#6B7A75] dark:text-white/50">
        {label}
      </p>
    </div>
  );
}
