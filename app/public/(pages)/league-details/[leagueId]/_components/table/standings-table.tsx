"use client";
import DataTable from "@/components/UI/tables/data-table";
import { DataTableColumn } from "@/components/UI/tables/table.types";
import type { StandingTeam } from "@/mock/league-details/league-details.mock.types";

type StandingsTableProps = {
  teams: StandingTeam[];
};

const standingsColumns: DataTableColumn<StandingTeam>[] = [
  {
    key: "position",
    header: "#",
    render: (team) => <span className="font-semibold">{team.position}</span>,
  },
  {
    key: "team",
    header: "Team",
    render: (team) => (
      <div className="flex items-center gap-3">
        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#EAF3EF] text-xs font-bold text-[#10201B] dark:bg-white/10 dark:text-white">
          {team.shortName}
        </div>

        <span className="font-semibold">{team.teamName}</span>
      </div>
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
    render: (team) => (
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
    ),
  },
];

export default function StandingsTable({ teams }: StandingsTableProps) {
  return (
    <DataTable
      title="Table"
      data={teams}
      columns={standingsColumns}
      getRowKey={(team) => `${team.position}-${team.teamName}`}
      emptyMessage="No standings found"
    />
  );
}
