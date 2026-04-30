import type {
  TeamStatCategory,
  TeamStatItem,
} from "./league-team-stats.mock.types";

const defaultTeams: TeamStatItem[] = [
  { id: "manchester-city", rank: 1, name: "Manchester City", value: 2.0 },
  { id: "arsenal", rank: 2, name: "Arsenal", value: 1.9 },
  { id: "manchester-united", rank: 3, name: "Manchester United", value: 1.8 },
];

export const teamStatsMockData: TeamStatCategory[] = [
  {
    id: "goals-per-match",
    title: "Goals per match",
    layout: "full",
    teams: defaultTeams,
  },
  {
    id: "goals-conceded-per-match",
    title: "Goals conceded per match",
    layout: "third",
    teams: defaultTeams,
  },
  {
    id: "average-possession",
    title: "Avg. possession",
    layout: "third",
    teams: defaultTeams,
  },
  {
    id: "clean-sheets",
    title: "Clean sheets",
    layout: "third",
    teams: defaultTeams,
  },
  {
    id: "attendance",
    title: "Attendance",
    layout: "third",
    teams: [
      { id: "manchester-city", rank: 1, name: "Manchester City", value: 2112 },
      { id: "arsenal", rank: 2, name: "Arsenal", value: 2100 },
      {
        id: "manchester-united",
        rank: 3,
        name: "Manchester United",
        value: 1800,
      },
    ],
  },
  {
    id: "shots-on-target-per-match",
    title: "Shots on target per match",
    layout: "third",
    teams: defaultTeams,
  },
  {
    id: "big-chances",
    title: "Big chances",
    layout: "third",
    teams: defaultTeams,
  },
  {
    id: "big-chances-missed",
    title: "Big Chances Missed",
    layout: "half",
    teams: defaultTeams,
  },
  {
    id: "accurate-passes-per-match",
    title: "Accurate passes per match",
    layout: "half",
    teams: defaultTeams,
  },
  {
    id: "penalties-awarded",
    title: "Penalties awarded",
    layout: "third",
    teams: defaultTeams,
  },
  { id: "corners", title: "Corners", layout: "third", teams: defaultTeams },
  {
    id: "interceptions-per-match",
    title: "Interceptions per match",
    layout: "third",
    teams: defaultTeams,
  },
  {
    id: "tackles-per-match",
    title: "Tackles per match",
    layout: "third",
    teams: defaultTeams,
  },
  {
    id: "clearance-per-match",
    title: "Clearance per match",
    layout: "third",
    teams: defaultTeams,
  },
  {
    id: "penalties-conceded",
    title: "Penalties conceded",
    layout: "third",
    teams: defaultTeams,
  },
  {
    id: "save-per-match",
    title: "Save per match",
    layout: "quarter",
    teams: defaultTeams,
  },
  {
    id: "fouls-committed-per-match",
    title: "Fouls committed per match",
    layout: "quarter",
    teams: defaultTeams,
  },
  {
    id: "yellow-cards",
    title: "Yellow cards",
    layout: "quarter",
    teams: defaultTeams,
  },
  {
    id: "red-cards",
    title: "Red cards",
    layout: "quarter",
    teams: defaultTeams,
  },
];
