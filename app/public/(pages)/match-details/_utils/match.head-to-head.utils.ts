import { MatchDetailsItem } from "@/types/football/matches/match.details.types";
import { MatchHeadToHeadItem } from "@/types/football/matches/match.head-to-head.types";

export interface HeadToHeadOverviewView {
  homeWins: number;
  awayWins: number;
  draws: number;
}

export interface HeadToHeadTeamView {
  name: string;
  isWinner: boolean;
}

export interface HeadToHeadMatchRowView {
  id: number;
  date: string;
  competition: string;
  score: string;
  homeTeam: HeadToHeadTeamView;
  awayTeam: HeadToHeadTeamView;
}

//======= Build Overview =======//
export function buildHeadToHeadOverview(
  match: MatchDetailsItem,
  matches: MatchHeadToHeadItem[],
): HeadToHeadOverviewView {
  return matches.reduce<HeadToHeadOverviewView>(
    (overview, item) => {
      const isDraw = item.goals.home === item.goals.away;

      if (isDraw) {
        return {
          ...overview,
          draws: overview.draws + 1,
        };
      }

      const winnerId = getWinnerTeamId(item);

      if (winnerId === match.teams.home.id) {
        return {
          ...overview,
          homeWins: overview.homeWins + 1,
        };
      }

      if (winnerId === match.teams.away.id) {
        return {
          ...overview,
          awayWins: overview.awayWins + 1,
        };
      }

      return overview;
    },
    {
      homeWins: 0,
      awayWins: 0,
      draws: 0,
    },
  );
}

//======= Build Match Rows =======//
export function buildHeadToHeadMatchRows(
  matches: MatchHeadToHeadItem[],
): HeadToHeadMatchRowView[] {
  return matches.map((match) => ({
    id: match.fixture.id,
    date: formatH2HDate(match.fixture.date, match.fixture.timezone),
    competition: match.league.name,
    score: `${match.goals.home ?? "-"} - ${match.goals.away ?? "-"}`,
    homeTeam: {
      name: match.teams.home.name,
      isWinner: match.teams.home.winner === true,
    },
    awayTeam: {
      name: match.teams.away.name,
      isWinner: match.teams.away.winner === true,
    },
  }));
}

//======= Prepare Winner =======//
function getWinnerTeamId(match: MatchHeadToHeadItem) {
  if (match.teams.home.winner) {
    return match.teams.home.id;
  }

  if (match.teams.away.winner) {
    return match.teams.away.id;
  }

  return null;
}

//======= Format Date =======//
function formatH2HDate(date: string, timezone: string) {
  const matchDate = new Date(date);

  if (Number.isNaN(matchDate.getTime())) {
    return "Date unavailable";
  }

  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: timezone || "UTC",
    }).format(matchDate);
  } catch {
    return "Date unavailable";
  }
}
