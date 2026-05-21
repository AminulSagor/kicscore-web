export function formatMatchDate(date: string, timezone: string) {
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
