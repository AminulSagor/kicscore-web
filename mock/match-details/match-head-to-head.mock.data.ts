import type { H2HMatch, H2HOverview } from "./match-head-to-head.mock.types";

export const h2hOverview: H2HOverview = {
  homeTeam: "Atletico Madrid",
  awayTeam: "Barcelona",
  homeWins: 28,
  draws: 12,
  awayWins: 7,
};

export const h2hMatches: H2HMatch[] = [
  {
    id: "1",
    date: "Tomorrow",
    competition: "Champions League",
    homeTeam: "Atletico Madrid",
    awayTeam: "Barcelona",
    score: "01:00",
  },
  {
    id: "2",
    date: "5 April",
    competition: "LaLiga",
    homeTeam: "Atletico Madrid",
    awayTeam: "Barcelona",
    score: "1 - 2",
    winner: "away",
  },
  {
    id: "3",
    date: "4 March",
    competition: "Copa del Rey",
    homeTeam: "Barcelona",
    awayTeam: "Atletico Madrid",
    score: "3 - 0",
    winner: "home",
  },
  {
    id: "4",
    date: "13 February",
    competition: "Copa del Rey",
    homeTeam: "Atletico Madrid",
    awayTeam: "Barcelona",
    score: "4 - 0",
    winner: "home",
  },
  {
    id: "5",
    date: "3 December 2025",
    competition: "LaLiga",
    homeTeam: "Barcelona",
    awayTeam: "Atletico Madrid",
    score: "3 - 1",
    winner: "home",
  },
  {
    id: "6",
    date: "3 April 2025",
    competition: "Copa del Rey",
    homeTeam: "Atletico Madrid",
    awayTeam: "Barcelona",
    score: "0 - 1",
    winner: "away",
  },
];
