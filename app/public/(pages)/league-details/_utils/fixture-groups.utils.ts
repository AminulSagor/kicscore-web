import type { LeagueFixtureItem } from "@/types/football/fixtures/fixture.types";

export type FixtureViewMode = "date" | "round" | "team";

export interface LeagueFixtureGroup {
  id: string;
  label: string;
  matches: LeagueFixtureItem[];
}

const formatFixtureDateLabel = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "short",
  }).format(new Date(date));
};

export const getFixtureGroups = (
  fixtures: LeagueFixtureItem[],
  mode: FixtureViewMode,
): LeagueFixtureGroup[] => {
  if (mode === "round") {
    const groups = new Map<string, LeagueFixtureItem[]>();

    fixtures.forEach((fixture) => {
      const round = fixture.league.round ?? "Unknown Round";
      groups.set(round, [...(groups.get(round) ?? []), fixture]);
    });

    return Array.from(groups.entries()).map(([label, matches]) => ({
      id: label,
      label,
      matches,
    }));
  }

  if (mode === "team") {
    const groups = new Map<string, LeagueFixtureItem[]>();

    fixtures.forEach((fixture) => {
      const teamName = fixture.teams.home.name;
      groups.set(teamName, [...(groups.get(teamName) ?? []), fixture]);
    });

    return Array.from(groups.entries()).map(([label, matches]) => ({
      id: label,
      label,
      matches,
    }));
  }

  const groups = new Map<string, LeagueFixtureItem[]>();

  fixtures.forEach((fixture) => {
    const label = formatFixtureDateLabel(fixture.fixture.date);
    groups.set(label, [...(groups.get(label) ?? []), fixture]);
  });

  return Array.from(groups.entries()).map(([label, matches]) => ({
    id: label,
    label,
    matches,
  }));
};
