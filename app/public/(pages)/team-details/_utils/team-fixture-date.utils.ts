import { TeamFixtureLeague } from "@/types/football/fixtures/team.fixtures.types";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

// timezone-aware formatters: callers provide timezone (IANA) or undefined
function formatTimeWithTimezone(date: string, timezone?: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timezone || undefined,
    }).format(new Date(date));
  } catch {
    return new Date(date).toLocaleTimeString();
  }
}

function formatDateLabelWithTimezone(date: string, timezone?: string) {
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

  try {
    return new Intl.DateTimeFormat(undefined, {
      day: "numeric",
      month: "short",
      timeZone: timezone || undefined,
    }).format(fixtureDate);
  } catch {
    return fixtureDate.toLocaleDateString();
  }
}

//======= Format Time =======//
export function formatFixtureTime(date: string, timezone?: string): string {
  return formatTimeWithTimezone(date, timezone);
}

//======= Format Date =======//
export function formatFixtureDateLabel(date: string, timezone?: string): string {
  return formatDateLabelWithTimezone(date, timezone);
}

//======= Build Competition =======//
export function getFixtureCompetitionLabel(league: TeamFixtureLeague): string {
  if (!league.round) {
    return league.name;
  }

  return `${league.name} · ${league.round}`;
}
