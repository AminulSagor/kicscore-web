"use client";

import Image from "next/image";
import Link from "next/link";

import DataTable from "@/components/UI/tables/data-table";
import { DataTableColumn } from "@/components/UI/tables/table.types";
import { LeagueStandingTeam } from "@/types/football/leagues/league.standings";

type StandingsTableProps = {
  teams: LeagueStandingTeam[];
};

const standingsColumns: DataTableColumn<LeagueStandingTeam>[] = [
  {
    key: "position",
    header: "#",
    render: (team) => <span className="font-semibold">{team.position}</span>,
  },
  {
    key: "team",
    header: "Team",
    render: (team) => (
      <Link
        href={`/public/team-details/${team.teamId}`}
        className="flex w-fit items-center gap-3 rounded-lg transition hover:opacity-80"
      >
        <div className="relative size-8 shrink-0 overflow-hidden rounded-full border border-secondary bg-[#EAF3EF]">
          {team.teamLogo ? (
            <Image
              src={team.teamLogo}
              alt={team?.teamName ?? "team"}
              fill
              sizes="32px"
              className="object-contain p-1"
              unoptimized
            />
          ) : (
            <span className="grid size-full place-items-center text-xs font-bold text-[#10201B] dark:text-white">
              {team.shortName}
            </span>
          )}
        </div>

        <span className="font-semibold">{team.teamName}</span>
      </Link>
    ),
  },
  {
    key: "played",
    header: "PL",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (team) => team.played,
  },
  {
    key: "won",
    header: "W",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (team) => team.won,
  },
  {
    key: "drawn",
    header: "D",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (team) => team.drawn,
  },
  {
    key: "lost",
    header: "L",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (team) => team.lost,
  },
  {
    key: "goals",
    header: "+/-",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (team) => `${team.goalsFor}:${team.goalsAgainst}`,
  },
  {
    key: "goalDifference",
    header: "GD",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (team) =>
      team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference,
  },
  {
    key: "points",
    header: "PTS",
    headerClassName: "text-center",
    cellClassName: "text-center font-bold",
    render: (team) => team.points,
  },
  {
    key: "form",
    header: "Form",
    render: (team) => {
      if (!team.form.length) {
        return (
          <span className="text-xs font-semibold text-[#6B7A75] dark:text-white/45">
            -
          </span>
        );
      }

      return (
        <div className="flex items-center gap-1.5">
          {team.form.map((result, index) => (
            <span
              key={`${team.teamName}-${result}-${index}`}
              className={`grid size-6 place-items-center rounded-full text-[10px] font-bold text-white ${
                result === "W"
                  ? "bg-emerald-500"
                  : result === "D"
                    ? "bg-amber-500"
                    : "bg-red-500"
              }`}
            >
              {result}
            </span>
          ))}
        </div>
      );
    },
  },
];

export default function StandingsTable({ teams }: StandingsTableProps) {
  const groups = Array.from(new Set(teams.map((t) => t.group || "")));

  if (groups.length <= 1) {
    return (
      <DataTable
        title={groups[0] || "Table"}
        data={teams}
        columns={standingsColumns}
        getRowKey={(team) => `${team.position}-${team.teamName}`}
        emptyMessage="No standings found"
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <DataTable
          key={group}
          title={group || "Table"}
          data={teams.filter((t) => t.group === group)}
          columns={standingsColumns}
          getRowKey={(team) => `${team.position}-${team.teamName}`}
          emptyMessage="No standings found"
        />
      ))}
    </div>
  );
}
