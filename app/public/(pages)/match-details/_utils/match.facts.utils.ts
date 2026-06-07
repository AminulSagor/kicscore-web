import {
  MatchDetailsItem,
  MatchEventItem,
  MatchStatisticItem,
} from "@/types/football/matches/match.details.types";

export type MatchFactSide = "home" | "away";

export type MatchFactEventType =
  | "period"
  | "goal"
  | "substitution"
  | "yellow-card"
  | "red-card"
  | "var"
  | "event";

export interface MatchFactEventView {
  id: string;
  type: MatchFactEventType;
  side?: MatchFactSide;
  minute?: string;
  title?: string;
  subtitle?: string;
  secondaryTitle?: string;
  score?: string;
}

export interface MatchTopStatRowView {
  label: string;
  home: string | number;
  away: string | number;
}

export interface MatchTopStatsView {
  hasStats: boolean;
  possession: {
    home: number | null;
    away: number | null;
  };
  rows: MatchTopStatRowView[];
}

//======= Format Date =======//
export function formatMatchDetailDate(date: string, timezone: string) {
  const matchDate = new Date(date);

  if (Number.isNaN(matchDate.getTime())) {
    return "Date unavailable";
  }

  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timezone || "UTC",
    }).formatToParts(matchDate);

    const weekday = parts.find((part) => part.type === "weekday")?.value;
    const day = parts.find((part) => part.type === "day")?.value;
    const month = parts.find((part) => part.type === "month")?.value;
    const hour = parts.find((part) => part.type === "hour")?.value;
    const minute = parts.find((part) => part.type === "minute")?.value;

    return `${weekday} ${day} ${month}, ${hour}:${minute}`;
  } catch {
    return "Date unavailable";
  }
}

//======= Build Events =======//
export function buildMatchFactEvents(
  match: MatchDetailsItem,
): MatchFactEventView[] {
  const events = Array.isArray(match.events) ? match.events : [];

  if (!events.length) {
    return [];
  }

  const normalizedEvents = [...events]
    .sort((firstEvent, secondEvent) => {
      const firstMinute = firstEvent.time.elapsed ?? 0;
      const secondMinute = secondEvent.time.elapsed ?? 0;

      return firstMinute - secondMinute;
    })
    .map((event, index) => buildMatchFactEvent(match, event, index));

  const firstHalfEvents = normalizedEvents.filter((event) => {
    const minute = Number(event.minute?.replace("+", ".").replace("'", ""));

    return Number.isNaN(minute) || minute <= 45;
  });

  const secondHalfEvents = normalizedEvents.filter((event) => {
    const minute = Number(event.minute?.replace("+", ".").replace("'", ""));

    return !Number.isNaN(minute) && minute > 45;
  });

  const result: MatchFactEventView[] = [];

  if (firstHalfEvents.length) {
    result.push({
      id: "first-half",
      type: "period",
      title: "First half",
    });

    result.push(...firstHalfEvents);
  }

  if (secondHalfEvents.length) {
    result.push({
      id: "second-half",
      type: "period",
      title: "Second half",
    });

    result.push(...secondHalfEvents);
  }

  if (match.fixture.status.short === "HT") {
    result.push({
      id: "half-time",
      type: "period",
      title: "Half time",
    });
  }

  if (match.fixture.status.short === "FT") {
    result.push({
      id: "full-time",
      type: "period",
      title: "Full time",
    });
  }

  return result;
}

//======= Build Event =======//
function buildMatchFactEvent(
  match: MatchDetailsItem,
  event: MatchEventItem,
  index: number,
): MatchFactEventView {
  const eventType = getMatchFactEventType(event);
  const side = event.team.id === match.teams.home.id ? "home" : "away";
  const minute = formatEventMinute(event);
  const title = getEventTitle(event);
  const subtitle = getEventSubtitle(event, eventType);
  const secondaryTitle = getEventSecondaryTitle(event);

  return {
    id: `${event.type}-${event.time.elapsed ?? "na"}-${index}`,
    type: eventType,
    side,
    minute,
    title,
    subtitle,
    secondaryTitle,
  };
}

//======= Prepare Event Data =======//
function getMatchFactEventType(event: MatchEventItem): MatchFactEventType {
  const type = event.type.toLowerCase();
  const detail = event.detail.toLowerCase();

  if (type === "goal") return "goal";
  if (type === "subst") return "substitution";
  if (type === "var") return "var";

  if (type === "card" && detail.includes("yellow")) {
    return "yellow-card";
  }

  if (type === "card" && detail.includes("red")) {
    return "red-card";
  }

  return "event";
}

function formatEventMinute(event: MatchEventItem) {
  if (!event.time.elapsed) return undefined;

  if (event.time.extra) {
    return `${event.time.elapsed}+${event.time.extra}'`;
  }

  return `${event.time.elapsed}'`;
}

function getEventTitle(event: MatchEventItem) {
  if (event.type.toLowerCase() === "subst") {
    return event.assist.name ?? "Substitution";
  }

  return event.player.name ?? event.detail;
}

function getEventSubtitle(
  event: MatchEventItem,
  eventType: MatchFactEventType,
) {
  if (eventType === "substitution") {
    return event.player.name ? `Replaced ${event.player.name}` : event.detail;
  }

  if (eventType === "goal" && event.assist.name) {
    return `Assist: ${event.assist.name}`;
  }

  return event.detail;
}

function getEventSecondaryTitle(event: MatchEventItem) {
  const detail = event.detail.toLowerCase();

  if (detail.includes("own goal")) {
    return "Own goal";
  }

  return undefined;
}

//======= Build Top Stats =======//
export function buildMatchTopStats(match: MatchDetailsItem): MatchTopStatsView {
  const statistics = Array.isArray(match.statistics) ? match.statistics : [];
  const homeStats = getTeamStatisticsFromList(statistics, match, "home");
  const awayStats = getTeamStatisticsFromList(statistics, match, "away");

  const totalShots = buildStatRow(homeStats, awayStats, "Total shots", [
    "Total Shots",
  ]);

  const bigChances = buildStatRow(homeStats, awayStats, "Big chances", [
    "Big Chances",
    "Big chances",
  ]);

  const shotsOnGoal = buildStatRow(homeStats, awayStats, "Shots on goal", [
    "Shots on Goal",
  ]);

  const secondRow =
    bigChances.home !== "-" || bigChances.away !== "-"
      ? bigChances
      : shotsOnGoal;

  const possession = {
    home: getNumberStatValue(homeStats, ["Ball Possession"]),
    away: getNumberStatValue(awayStats, ["Ball Possession"]),
  };

  return {
    hasStats: statistics.length > 0,
    possession,
    rows: [totalShots, secondRow],
  };
}

function getTeamStatistics(match: MatchDetailsItem, side: MatchFactSide) {
  const statistics = Array.isArray(match.statistics) ? match.statistics : [];
  const teamId = match.teams[side].id;

  return (
    statistics.find((item) => item.team.id === teamId)?.statistics ?? []
  );
}

function getTeamStatisticsFromList(
  statistics: MatchDetailsItem["statistics"],
  match: MatchDetailsItem,
  side: MatchFactSide,
) {
  const teamId = match.teams[side].id;

  return (
    statistics.find((item) => item.team.id === teamId)?.statistics ?? []
  );
}

function buildStatRow(
  homeStats: MatchStatisticItem[],
  awayStats: MatchStatisticItem[],
  label: string,
  statTypes: string[],
): MatchTopStatRowView {
  return {
    label,
    home: getDisplayStatValue(homeStats, statTypes),
    away: getDisplayStatValue(awayStats, statTypes),
  };
}

function getDisplayStatValue(
  statistics: MatchStatisticItem[],
  statTypes: string[],
) {
  const value = findStatisticValue(statistics, statTypes);

  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return value;
}

function getNumberStatValue(
  statistics: MatchStatisticItem[],
  statTypes: string[],
) {
  const value = findStatisticValue(statistics, statTypes);

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const numberValue = Number.parseFloat(value.replace("%", ""));

    return Number.isNaN(numberValue) ? null : numberValue;
  }

  return null;
}

function findStatisticValue(
  statistics: MatchStatisticItem[],
  statTypes: string[],
) {
  const statistic = statistics.find((item) =>
    statTypes.some(
      (statType) => item.type.toLowerCase() === statType.toLowerCase(),
    ),
  );

  return statistic?.value ?? null;
}
