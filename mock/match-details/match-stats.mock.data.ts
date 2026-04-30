import type { MatchStatRow, MatchStatsSection } from "./match-stats.mock.types";

export const matchTopStatsSection: MatchStatsSection = {
  title: "Top stats",
  showPossession: true,
  possession: {
    home: 58,
    away: 42,
  },
  rows: [
    { id: "1", label: "Total shots", home: 18, away: 5 },
    { id: "2", label: "Shots on target", home: 2, away: 1 },
    { id: "3", label: "Big chances", home: 2, away: 1 },
    { id: "4", label: "Fouls committed", home: 2, away: 1 },
    { id: "5", label: "Corners", home: 2, away: 1 },
  ],
};

export const matchShotsSection: MatchStatsSection = {
  title: "Shots",
  rows: [
    { id: "1", label: "Total shots", home: 18, away: 5 },
    { id: "2", label: "Shots off target", home: 2, away: 1 },
    { id: "3", label: "Shots on target", home: 2, away: 1 },
    { id: "4", label: "Blocked shots", home: 2, away: 1 },
    { id: "5", label: "Hit woodwork", home: 2, away: 1 },
    { id: "6", label: "Shots inside box", home: 2, away: 1 },
    { id: "7", label: "Shots outside box", home: 2, away: 1 },
  ],
};

export const matchMiniStats: MatchStatRow[] = [
  { id: "1", label: "Passes", home: 2, away: 1 },
  { id: "2", label: "Throws", home: 2, away: 1 },
  { id: "3", label: "Offside", home: 2, away: 1 },
];

export const matchDefenceSection: MatchStatsSection = {
  title: "Defence",
  rows: [
    { id: "1", label: "Tackles", home: 1, away: 3 },
    { id: "2", label: "Interceptions", home: 1, away: 0 },
    { id: "3", label: "Blocks", home: 1, away: 0 },
  ],
};
