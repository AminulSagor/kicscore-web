import Image from "next/image";
import Card from "@/components/UI/cards/card";
import { leagueTable } from "@/mock/team-details/team-overview.mock.data";

export default function LeagueTableCard() {
  return (
    <Card
      variant="white"
      padding="none"
      shadow="none"
      className="overflow-hidden border border-[#DDE8E3] bg-white text-[#10201B] dark:border-white/10 dark:bg-primary dark:text-white"
    >
      <div className="bg-[#EAF3EF] px-4 py-3 dark:bg-dark-green">
        <h3 className="text-sm font-bold">Premier League</h3>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-[34px_1fr_34px_54px_34px_34px] px-3 text-xs font-bold uppercase text-[#6B7A75] dark:text-white/35">
          <span>#</span>
          <span>Team</span>
          <span>PL</span>
          <span>+/-</span>
          <span>GD</span>
          <span>PTS</span>
        </div>

        <div className="mt-3 space-y-2">
          {leagueTable.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[34px_1fr_34px_54px_34px_34px] items-center rounded-2xl bg-[#F3F7F5] px-3 py-3 text-sm font-bold dark:bg-dark-green"
            >
              <span>{row.position}</span>

              <div className="flex items-center gap-2">
                <div className="relative h-5 w-5 overflow-hidden rounded-sm">
                  <Image
                    src={row.logo}
                    alt={row.team}
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                </div>
                <span>{row.team}</span>
              </div>

              <span>{row.played}</span>
              <span>{row.form}</span>
              <span>{row.goalDifference}</span>
              <span>{row.points}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
