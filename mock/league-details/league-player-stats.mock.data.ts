import type {
  PlayerStatCategory,
  PlayerStatItem,
} from "./league-player-stats.mock.types";

const defaultPlayers: PlayerStatItem[] = [
  {
    id: "erling-haaland",
    rank: 1,
    name: "Erling Haaland",
    teamName: "Manchester City",
    value: 7,
  },
  {
    id: "igor-thiago",
    rank: 2,
    name: "Igor Thiago",
    teamName: "Brentford",
    value: 4,
  },
  {
    id: "antoine-semenyo",
    rank: 3,
    name: "Antoine Semenyo",
    teamName: "Bournemouth",
    value: 3,
  },
];

export const playerStatsMockData: PlayerStatCategory[] = [
  {
    id: "top-scorers",
    title: "Top Scorers",
    layout: "full",
    players: defaultPlayers,
  },
  {
    id: "top-assists",
    title: "Top Assists",
    layout: "half",
    players: defaultPlayers,
  },
  {
    id: "minutes-played",
    title: "Minutes Played",
    layout: "half",
    players: defaultPlayers,
  },
  {
    id: "big-chances-created",
    title: "Big Chances Created",
    layout: "half",
    players: defaultPlayers,
  },
  {
    id: "big-chances-missed",
    title: "Big Chances Missed",
    layout: "half",
    players: defaultPlayers,
  },

  {
    id: "defense-contribution",
    title: "Defense contribution",
    layout: "third",
    players: defaultPlayers,
  },
  { id: "tackles", title: "Tackles", layout: "third", players: defaultPlayers },
  {
    id: "interceptions",
    title: "Interceptions",
    layout: "third",
    players: defaultPlayers,
  },
  {
    id: "clearance",
    title: "Clearance",
    layout: "third",
    players: defaultPlayers,
  },
  { id: "blocks", title: "Blocks", layout: "third", players: defaultPlayers },
  {
    id: "recoveries",
    title: "Recoveries",
    layout: "third",
    players: defaultPlayers,
  },

  {
    id: "penalties-conceded",
    title: "Penalties conceded",
    layout: "third",
    players: defaultPlayers,
  },
  {
    id: "goals-prevented",
    title: "Goals prevented",
    layout: "third",
    players: defaultPlayers,
  },
  {
    id: "clean-sheets",
    title: "Clean sheets",
    layout: "third",
    players: defaultPlayers,
  },

  {
    id: "save-percentage",
    title: "Save percentage",
    layout: "quarter",
    players: defaultPlayers,
  },
  {
    id: "fouls-committed",
    title: "Fouls committed",
    layout: "quarter",
    players: defaultPlayers,
  },
  {
    id: "yellow-cards",
    title: "Yellow cards",
    layout: "quarter",
    players: defaultPlayers,
  },
  {
    id: "red-cards",
    title: "Red cards",
    layout: "quarter",
    players: defaultPlayers,
  },
];
