import type {
  MatchEvent,
  MatchTopStats,
  PlayerOfTheMatch,
} from "./match-facts.mock.types";

export const playerOfTheMatch: PlayerOfTheMatch = {
  name: "Juan Musso",
  team: "Atletico Madrid",
  rating: 7,
};

export const matchTopStats: MatchTopStats = {
  possession: {
    home: 58,
    away: 42,
  },
  totalShots: {
    home: 18,
    away: 5,
  },
  bigChances: {
    home: 2,
    away: 1,
  },
};

export const matchEvents: MatchEvent[] = [
  {
    id: "1",
    minute: "31'",
    side: "away",
    type: "substitution",
    title: "Marc Pubill",
    secondaryTitle: "Dávid Hancko",
  },
  {
    id: "2",
    minute: "31'",
    side: "away",
    type: "yellow-card",
    title: "Koke",
  },
  {
    id: "3",
    minute: "42'",
    side: "home",
    type: "var",
    title: "Yellow card cancelled",
    subtitle: "Pau Cubarsí",
  },
  {
    id: "4",
    minute: "44'",
    side: "home",
    type: "red-card",
    title: "Pau Cubarsí",
  },
  {
    id: "5",
    minute: "45'",
    side: "away",
    type: "goal",
    title: "Julián Álvarez",
    score: "0 - 1",
    subtitle: "Direct free kick",
  },
  {
    id: "6",
    side: "center",
    type: "period",
    title: "HT 0 - 1",
  },
  {
    id: "7",
    minute: "46'",
    side: "home",
    type: "substitution",
    title: "Fermín López",
    secondaryTitle: "Robert Lewandowski",
  },
  {
    id: "8",
    minute: "70'",
    side: "away",
    type: "goal",
    title: "Alexander Sørloth",
    score: "0 - 2",
    subtitle: "assist by Matteo Ruggeri",
  },
  {
    id: "9",
    side: "center",
    type: "period",
    title: "FT 0 - 2",
  },
];
