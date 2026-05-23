import type { TeamFixtureItem } from "@/types/football/fixtures/team.fixtures.types";

function getDateKey(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone,
  }).format(date);
}

export function formatNextMatchTime(date: string, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  }).format(new Date(date));
}

export function formatNextMatchDateLabel(
  date: string,
  timeZone: string,
): string {
  const fixtureDate = new Date(date);
  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(today.getDate() + 1);

  const fixtureDateKey = getDateKey(fixtureDate, timeZone);
  const todayDateKey = getDateKey(today, timeZone);
  const tomorrowDateKey = getDateKey(tomorrow, timeZone);

  if (fixtureDateKey === todayDateKey) {
    return "Today";
  }

  if (fixtureDateKey === tomorrowDateKey) {
    return "Tomorrow";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone,
  }).format(fixtureDate);
}

export function getNextMatchCompetitionLabel(fixture: TeamFixtureItem): string {
  return `${fixture.league.name} • ${fixture.league.round}`;
}
