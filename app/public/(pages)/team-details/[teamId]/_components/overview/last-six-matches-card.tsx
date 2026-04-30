import Image from "next/image";
import Card from "@/components/UI/cards/card";
import { lastSixMatches } from "@/mock/team-details/team-overview.mock.data";

export default function LastSixMatchesCard() {
  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
    >
      <h3 className="text-sm font-bold">Last 6 matches</h3>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {lastSixMatches.map((match) => (
          <div
            key={match.id}
            className="grid grid-cols-[1fr_auto_1fr] items-center"
          >
            <TeamLogo logo={match.homeLogo} />

            <span
              className={`rounded px-3 py-1 text-xs font-bold text-white ${
                match.status === "win" ? "bg-mint-green" : "bg-red"
              }`}
            >
              {match.score}
            </span>

            <div className="flex justify-end">
              <TeamLogo logo={match.awayLogo} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TeamLogo({ logo }: { logo: string }) {
  return (
    <div className="relative h-6 w-6 overflow-hidden rounded-full border border-[#94A3B8] bg-[#F3F7F5] dark:bg-dark-green">
      <Image
        src={logo}
        alt="Team logo"
        fill
        sizes="24px"
        className="object-cover"
      />
    </div>
  );
}
