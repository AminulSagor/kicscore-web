import { IMAGE } from "@/constants/image.path";

export const liveMatchesMockData = [
  {
    id: "live-1",
    league: "Champions League",
    minute: "74'",
    shortLabel: "PSG vs INT",
    teams: [
      {
        name: "PSG",
        logo: IMAGE.Paris_Saint_Germain_Logo,
        score: 0,
      },
      {
        name: "Inter Milan",
        logo: IMAGE.Inter_Milan_Logo,
        score: 2,
      },
    ],
  },
  {
    id: "live-2",
    league: "Premier League",
    minute: "63'",
    shortLabel: "LIV vs PSG",
    teams: [
      {
        name: "Liverpool",
        logo: IMAGE.Liverpool_Logo,
        score: 1,
      },
      {
        name: "PSG",
        logo: IMAGE.Paris_Saint_Germain_Logo,
        score: 0,
      },
    ],
  },
  {
    id: "live-3",
    league: "Europa League",
    minute: "58'",
    shortLabel: "INT vs LIV",
    teams: [
      {
        name: "Inter Milan",
        logo: IMAGE.Inter_Milan_Logo,
        score: 1,
      },
      {
        name: "Liverpool",
        logo: IMAGE.Liverpool_Logo,
        score: 1,
      },
    ],
  },
];

export const leagueMatchesMockData = [
  {
    id: "champions-league",
    name: "Champions League",
    stage: "Knockout stage",
    logo: IMAGE.Paris_Saint_Germain_Logo,
    matchCount: 2,
  },
  {
    id: "europa-league",
    name: "Europa League",
    stage: "Semi-finals",
    logo: IMAGE.Inter_Milan_Logo,
    matchCount: 2,
  },
  {
    id: "premier-league",
    name: "Premier League",
    stage: "Matchday 38",
    logo: IMAGE.Liverpool_Logo,
    matchCount: 2,
  },
];
