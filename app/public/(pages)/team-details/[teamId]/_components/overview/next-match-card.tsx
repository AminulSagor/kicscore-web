import Image from "next/image";
import Card from "@/components/UI/cards/card";
import { TeamOverviewMatch } from "@/mock/team-details/team-overview.mock.types";

type Props = {
  match: TeamOverviewMatch;
};

export default function NextMatchCard({ match }: Props) {
  return (
    <Card
      variant="white"
      shadow="none"
      className="border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
    >
      <p className="text-center text-xs font-semibold text-[#6B7A75] dark:text-white/50">
        {match.competition}
      </p>

      <div className="mt-5 grid grid-cols-3 items-center">
        <TeamItem name={match.homeTeam} logo={match.homeLogo} />

        <div className="text-center">
          <p className="text-xl font-bold">{match.time}</p>
          <p className="mt-1 text-xs text-[#6B7A75] dark:text-white/50">
            {match.dateLabel}
          </p>
        </div>

        <TeamItem name={match.awayTeam} logo={match.awayLogo} />
      </div>
    </Card>
  );
}

function TeamItem({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-12 w-12 overflow-hidden rounded-full border border-secondary bg-[#F3F7F5] dark:bg-dark-green">
        <Image
          src={logo}
          alt={name}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>
      <p className="text-xs font-semibold">{name}</p>
    </div>
  );
}
