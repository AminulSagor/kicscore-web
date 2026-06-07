import {
  MatchDetailsItem,
  MatchStatisticItem,
} from "@/types/football/matches/match.details.types";

export interface MatchStatRowView {
  id: string;
  label: string;
  home: string | number;
  away: string | number;
}

export interface MatchStatsSectionView {
  id: string;
  title: string;
  showPossession?: boolean;
  possession?: {
    home: number | null;
    away: number | null;
  };
  rows: MatchStatRowView[];
}

//======= Build Stats =======//
export function buildMatchStatsSections(match: MatchDetailsItem) {
  const homeStats = getTeamStatistics(match, "home");
  const awayStats = getTeamStatistics(match, "away");

  const topSection: MatchStatsSectionView = {
    id: "top-stats",
    title: "Top stats",
    showPossession: true,
    possession: {
      home: getNumberStatValue(homeStats, ["Ball Possession"]),
      away: getNumberStatValue(awayStats, ["Ball Possession"]),
    },
    rows: [
      buildStatRow(homeStats, awayStats, "Total shots", ["Total Shots"]),
      buildStatRow(homeStats, awayStats, "Big chances", ["Big Chances"]),
    ],
  };

  const shotsSection: MatchStatsSectionView = {
    id: "shots",
    title: "Shots",
    rows: [
      buildStatRow(homeStats, awayStats, "Shots on goal", ["Shots on Goal"]),
      buildStatRow(homeStats, awayStats, "Shots off goal", ["Shots off Goal"]),
      buildStatRow(homeStats, awayStats, "Blocked shots", ["Blocked Shots"]),
      buildStatRow(homeStats, awayStats, "Shots inside box", [
        "Shots insidebox",
      ]),
      buildStatRow(homeStats, awayStats, "Shots outside box", [
        "Shots outsidebox",
      ]),
    ],
  };

  const miniStats: MatchStatRowView[] = [
    buildStatRow(homeStats, awayStats, "Corner kicks", ["Corner Kicks"]),
    buildStatRow(homeStats, awayStats, "Offsides", ["Offsides"]),
    buildStatRow(homeStats, awayStats, "Fouls", ["Fouls"]),
  ];

  const defenceSection: MatchStatsSectionView = {
    id: "defence",
    title: "Defence & passing",
    rows: [
      buildStatRow(homeStats, awayStats, "Goalkeeper saves", [
        "Goalkeeper Saves",
      ]),
      buildStatRow(homeStats, awayStats, "Yellow cards", ["Yellow Cards"]),
      buildStatRow(homeStats, awayStats, "Red cards", ["Red Cards"]),
      buildStatRow(homeStats, awayStats, "Total passes", ["Total passes"]),
      buildStatRow(homeStats, awayStats, "Passes accurate", [
        "Passes accurate",
      ]),
      buildStatRow(homeStats, awayStats, "Pass accuracy", ["Passes %"]),
    ],
  };

  return {
    hasStats: (Array.isArray(match.statistics) ? match.statistics : []).length > 0,
    topSection,
    shotsSection,
    miniStats,
    defenceSection,
  };
}

//======= Prepare Stats =======//
function getTeamStatistics(match: MatchDetailsItem, side: "home" | "away") {
  const statistics = Array.isArray(match.statistics) ? match.statistics : [];
  const teamId = match.teams[side].id;

  return (
    statistics.find((item) => item.team.id === teamId)?.statistics ?? []
  );
}

function buildStatRow(
  homeStats: MatchStatisticItem[],
  awayStats: MatchStatisticItem[],
  label: string,
  statTypes: string[],
): MatchStatRowView {
  return {
    id: label.toLowerCase().replaceAll(" ", "-"),
    label,
    home: getDisplayStatValue(homeStats, statTypes),
    away: getDisplayStatValue(awayStats, statTypes),
  };
}

function getDisplayStatValue(
  statistics: MatchStatisticItem[],
  statTypes: string[],
) {
  const value = findStatisticValue(statistics, statTypes);

  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return value;
}

function getNumberStatValue(
  statistics: MatchStatisticItem[],
  statTypes: string[],
) {
  const value = findStatisticValue(statistics, statTypes);

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const numberValue = Number.parseFloat(value.replace("%", ""));

    return Number.isNaN(numberValue) ? null : numberValue;
  }

  return null;
}

function findStatisticValue(
  statistics: MatchStatisticItem[],
  statTypes: string[],
) {
  const statistic = statistics.find((item) =>
    statTypes.some(
      (statType) => item.type.toLowerCase() === statType.toLowerCase(),
    ),
  );

  return statistic?.value ?? null;
}
