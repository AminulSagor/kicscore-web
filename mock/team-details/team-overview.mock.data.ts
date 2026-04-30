import { IMAGE } from "@/constants/image.path";
import type {
  TeamOverviewMatch,
  TeamTopPlayer,
  TeamLastMatchResult,
  TeamLeague,
  TeamRanking,
  TeamStadium,
  TeamLeagueTableRow,
} from "./team-overview.mock.types";

export const nextMatches: TeamOverviewMatch[] = [
  {
    id: "1",
    competition: "Champions League Final Stage",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    homeLogo: IMAGE.fc_porto,
    awayLogo: IMAGE.portugal,
    time: "01:00",
    dateLabel: "Tomorrow",
  },
  {
    id: "2",
    competition: "Champions League Final Stage",
    homeTeam: "Arsenal",
    awayTeam: "Atletico Madrid",
    homeLogo: IMAGE.fc_porto,
    awayLogo: IMAGE.portugal,
    time: "01:00",
    dateLabel: "Tomorrow",
  },
];

export const topPlayers: TeamTopPlayer[] = [
  {
    id: "1",
    name: "Viktor",
    role: "Top Scorer",
    value: 12,
    image: IMAGE.profile_image,
  },
  {
    id: "2",
    name: "Declan Rice",
    role: "Assists",
    value: 5,
    image: IMAGE.profile_image,
  },
  {
    id: "3",
    name: "Jurrien Timber",
    role: "Yellow Cards",
    value: 5,
    image: IMAGE.profile_image,
  },
];

export const lastSixMatches: TeamLastMatchResult[] = [
  {
    id: "1",
    homeLogo: IMAGE.fc_porto,
    awayLogo: IMAGE.portugal,
    score: "1-0",
    status: "win",
  },
  {
    id: "2",
    homeLogo: IMAGE.fc_porto,
    awayLogo: IMAGE.portugal,
    score: "1-0",
    status: "win",
  },
  {
    id: "3",
    homeLogo: IMAGE.fc_porto,
    awayLogo: IMAGE.portugal,
    score: "7-2",
    status: "win",
  },
  {
    id: "4",
    homeLogo: IMAGE.fc_porto,
    awayLogo: IMAGE.portugal,
    score: "1-2",
    status: "loss",
  },
  {
    id: "5",
    homeLogo: IMAGE.fc_porto,
    awayLogo: IMAGE.portugal,
    score: "3-2",
    status: "loss",
  },
  {
    id: "6",
    homeLogo: IMAGE.fc_porto,
    awayLogo: IMAGE.portugal,
    score: "3-2",
    status: "loss",
  },
];

export const leagues: TeamLeague[] = [
  {
    id: "1",
    name: "Premier League",
    season: "2025/2026",
    logo: IMAGE.fc_porto,
  },
  {
    id: "2",
    name: "Champions League",
    season: "2025/2026",
    logo: IMAGE.fc_porto,
  },
  { id: "3", name: "EFL Cup", season: "2025/2026", logo: IMAGE.fc_porto },
  { id: "4", name: "FA Cup", season: "2025/2026", logo: IMAGE.fc_porto },
];

export const rankings: TeamRanking[] = [
  { id: "1", name: "Premier League", position: 13, logo: IMAGE.fc_porto },
  { id: "2", name: "Community Shield", position: 17, logo: IMAGE.fc_porto },
];

export const stadium: TeamStadium = {
  name: "Emirates Stadium",
  location: "London, England",
  capacity: "99,787",
  surface: "Grass",
  opened: "2006",
};

export const leagueTable: TeamLeagueTableRow[] = [
  {
    id: "1",
    position: 1,
    team: "Arsenal",
    logo: IMAGE.fc_porto,
    played: 32,
    form: "62-24",
    goalDifference: 38,
    points: 70,
  },
  {
    id: "2",
    position: 2,
    team: "Man City",
    logo: IMAGE.fc_porto,
    played: 30,
    form: "60-28",
    goalDifference: 32,
    points: 61,
  },
  {
    id: "3",
    position: 3,
    team: "Man United",
    logo: IMAGE.fc_porto,
    played: 31,
    form: "56-43",
    goalDifference: 13,
    points: 55,
  },
];

export const aboutText = `Arsenal is a football club based in London...`;
