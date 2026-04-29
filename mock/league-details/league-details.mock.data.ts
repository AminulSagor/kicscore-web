import { IMAGE } from "@/constants/image.path";
import type {
  LeagueHeaderInfo,
  RankingPlayer,
  StandingTeam,
  TeamOfWeek,
} from "./league-details.mock.types";

export const leagueHeaderMockData: LeagueHeaderInfo = {
  id: "premier-league",
  name: "Premier League",
  country: "England",
  logo: IMAGE.celebration1,
  season: "2025/2026",
  isFollowed: false,
};

export const standingsMockData: StandingTeam[] = [
  {
    position: 1,
    teamName: "Arsenal",
    shortName: "A",
    played: 28,
    won: 22,
    drawn: 4,
    lost: 2,
    goalsFor: 70,
    goalsAgainst: 24,
    goalDifference: 46,
    points: 70,
    form: ["W", "W", "D", "W", "W"],
  },
  ...Array.from({ length: 14 }, (_, index) => ({
    position: index + 2,
    teamName: "Man City",
    shortName: "M",
    played: 28,
    won: 20,
    drawn: 4,
    lost: 4,
    goalsFor: 65,
    goalsAgainst: 28,
    goalDifference: 37,
    points: 64,
    form: ["W", "L", "W", "D", "W"] as const,
  })),
];

export const topScorersMockData: RankingPlayer[] = [
  {
    id: "erling-haaland",
    rank: 1,
    name: "Erling Haaland",
    teamName: "Manchester City",
    image: IMAGE.celebration1,
    value: 7,
  },
  {
    id: "igor-thiago",
    rank: 2,
    name: "Igor Thiago",
    teamName: "Brentford",
    image: IMAGE.celebration2,
    value: 4,
  },
  {
    id: "antoine-semenyo",
    rank: 3,
    name: "Antoine Semenyo",
    teamName: "Bournemouth",
    image: IMAGE.celebration3,
    value: 3,
  },
];

export const topAssistsMockData: RankingPlayer[] = [
  {
    id: "bruno-fernandes",
    rank: 1,
    name: "Bruno Fernandes",
    teamName: "Manchester United",
    image: IMAGE.celebration1,
    value: 5,
  },
  {
    id: "rayan-cherki",
    rank: 2,
    name: "Rayan Cherki",
    teamName: "Fulham",
    image: IMAGE.celebration2,
    value: 3,
  },
  {
    id: "jarrod-bowen",
    rank: 3,
    name: "Jarrod Bowen",
    teamName: "West Ham United",
    image: IMAGE.celebration3,
    value: 3,
  },
];

export const teamOfWeekMockData: TeamOfWeek = {
  teamName: "Team name",
  round: "Round 31",
  players: Array.from({ length: 11 }, (_, index) => ({
    id: `player-${index + 1}`,
    name: "Player",
    image: IMAGE.profile_image,
    positionClassName: "",
  })),
};
