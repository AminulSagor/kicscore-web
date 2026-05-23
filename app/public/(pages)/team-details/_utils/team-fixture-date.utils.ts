import { TeamFixtureLeague } from "@/types/football/fixtures/team.fixtures.types";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

const fixtureTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC",
});

const fixtureDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

//======= Format Time =======//
export function formatFixtureTime(date: string): string {
  return fixtureTimeFormatter.format(new Date(date));
}

//======= Format Date =======//
export function formatFixtureDateLabel(date: string): string {
  const fixtureDate = new Date(date);
  const currentDate = new Date();

  const fixtureDay = Date.UTC(
    fixtureDate.getUTCFullYear(),
    fixtureDate.getUTCMonth(),
    fixtureDate.getUTCDate(),
  );

  const currentDay = Date.UTC(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate(),
  );

  const dayDifference = Math.round(
    (fixtureDay - currentDay) / MILLISECONDS_PER_DAY,
  );

  if (dayDifference === 0) {
    return "Today";
  }

  if (dayDifference === 1) {
    return "Tomorrow";
  }

  return fixtureDateFormatter.format(fixtureDate);
}

//======= Build Competition =======//
export function getFixtureCompetitionLabel(league: TeamFixtureLeague): string {
  if (!league.round) {
    return league.name;
  }

  return `${league.name} · ${league.round}`;
}
