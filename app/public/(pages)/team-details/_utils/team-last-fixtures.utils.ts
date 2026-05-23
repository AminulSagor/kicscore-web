import { TeamFixtureItem } from "@/types/football/fixtures/team.fixtures.types";

export type TeamMatchResult = "win" | "loss" | "draw" | "live" | "pending";

const completedStatuses = ["FT", "AET", "PEN"];

//======= Get Score =======//
export function getFixtureScore(fixture: TeamFixtureItem): string {
  const homeScore = fixture.goals.home;
  const awayScore = fixture.goals.away;

  if (homeScore === null || awayScore === null) {
    return "-";
  }

  return `${homeScore}-${awayScore}`;
}

//======= Get Result =======//
export function getTeamFixtureResult(
  fixture: TeamFixtureItem,
  teamId: string,
): TeamMatchResult {
  const status = fixture.fixture.status.short;

  if (status === "NS" || status === "TBD") {
    return "pending";
  }

  if (!completedStatuses.includes(status)) {
    return "live";
  }

  const homeScore = fixture.goals.home;
  const awayScore = fixture.goals.away;

  if (homeScore === null || awayScore === null || homeScore === awayScore) {
    return "draw";
  }

  const isHomeTeam = String(fixture.teams.home.id) === teamId;
  const currentTeamScore = isHomeTeam ? homeScore : awayScore;
  const opponentScore = isHomeTeam ? awayScore : homeScore;

  return currentTeamScore > opponentScore ? "win" : "loss";
}

//======= Get Badge Style =======//
export function getResultBadgeClassName(result: TeamMatchResult): string {
  switch (result) {
    case "win":
      return "bg-mint-green";
    case "loss":
      return "bg-red";
    case "live":
      return "bg-orange";
    case "draw":
    case "pending":
    default:
      return "bg-[#94A3B8]";
  }
}
