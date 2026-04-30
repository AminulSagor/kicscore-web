import { IMAGE } from "@/constants/image.path";
import type { PreviousMatch, UpcomingMatch } from "./team-matches.mock.types";

export const previousMatches: PreviousMatch[] = [
  {
    id: "1",
    date: "4 March",
    competition: "Copa del Rey",
    homeTeam: "Arsenal",
    awayTeam: "Man City",
    homeLogo: IMAGE.fc_porto,
    awayLogo: IMAGE.portugal,
    score: "3 - 0",
  },
  {
    id: "2",
    date: "5 April",
    competition: "LaLiga",
    homeTeam: "Everton",
    awayTeam: "Arsenal",
    homeLogo: IMAGE.fc_porto,
    awayLogo: IMAGE.portugal,
    score: "1 - 2",
  },
];

export const upcomingMatches: UpcomingMatch[] = [
  {
    id: "1",
    date: "Tomorrow",
    competition: "Champions League",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    homeLogo: IMAGE.fc_porto,
    awayLogo: IMAGE.portugal,
    time: "01:00",
  },
];
