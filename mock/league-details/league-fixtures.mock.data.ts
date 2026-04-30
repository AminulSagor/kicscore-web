import type { FixtureGroup } from "./league-fixtures.mock.types";

const matches = Array.from({ length: 4 }, (_, index) => ({
  id: `fixture-${index + 1}`,
  status: "FT" as const,
  homeTeam: "Arsenal",
  awayTeam: "Sporting CP",
  homeScore: 4,
  awayScore: 3,
  aggregateScore: "(5 - 4)",
  dateLabel: "2026-04-19",
}));

export const fixtureDateGroupsMockData: FixtureGroup[] = [
  { id: "yesterday", label: "YESTERDAY - 19 APR", matches },
  { id: "tomorrow", label: "TOMORROW", matches: matches.slice(0, 1) },
  { id: "sat-18", label: "SATURDAY 18 APRIL", matches: matches.slice(0, 2) },
  { id: "sun-19", label: "SUNDAY 19 APRIL", matches: matches.slice(0, 1) },
];

export const fixtureRoundGroupsMockData: FixtureGroup[] = [
  { id: "sat-11", label: "SATURDAY 11 APR", matches },
  { id: "yesterday", label: "YESTERDAY", matches: matches.slice(0, 1) },
  { id: "tomorrow", label: "TOMORROW", matches: matches.slice(0, 2) },
];

export const fixtureTeamGroupsMockData: FixtureGroup[] = [
  {
    id: "arsenal-range",
    label: "7 FEB - 11 APR",
    matches: Array.from({ length: 8 }, (_, index) => ({
      ...matches[0],
      id: `team-fixture-${index + 1}`,
    })),
  },
];
