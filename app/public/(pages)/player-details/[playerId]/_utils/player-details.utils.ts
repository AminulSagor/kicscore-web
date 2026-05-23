import type {
    FootballPlayerEntry,
    FootballPlayerFollow,
    FootballPlayerStatistic,
    PlayerDetails,
} from "@/types/football/players/player.types";

type PlayerCareerSeasonRange = {
    fromSeason: string;
    toSeason: string;
};

const getCurrentSeason = () => String(new Date().getFullYear());

const isValidSeason = (season?: string) => {
    return Boolean(season && /^\d{4}$/.test(season.trim()));
};

export const getPlayerSeason = (season?: string) => {
    if (!isValidSeason(season)) {
        return getCurrentSeason();
    }

    return season!.trim();
};

export const getPositiveNumber = (
    value: string | undefined,
    fallback: number,
) => {
    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue) || parsedValue < 1) {
        return fallback;
    }

    return parsedValue;
};

export const getPlayerCareerSeasonRange = (
    selectedSeason: string,
    fromSeason?: string,
    toSeason?: string,
): PlayerCareerSeasonRange => {
    const selectedYear = Number(selectedSeason);

    const validToSeason = isValidSeason(toSeason)
        ? Number(toSeason)
        : selectedYear;

    const validFromSeason = isValidSeason(fromSeason)
        ? Number(fromSeason)
        : validToSeason - 5;

    if (validFromSeason > validToSeason) {
        return {
            fromSeason: String(validToSeason - 5),
            toSeason: String(validToSeason),
        };
    }

    return {
        fromSeason: String(validFromSeason),
        toSeason: String(validToSeason),
    };
};

const getNumber = (value: number | null | undefined) => value ?? 0;

const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
};

const formatValue = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === "") {
        return "-";
    }

    return String(value);
};

const formatMeasurement = (
    value: string | null | undefined,
    unit: "cm" | "kg",
) => {
    if (!value) {
        return "-";
    }

    if (value.toLowerCase().includes(unit)) {
        return value;
    }

    return `${value} ${unit}`;
};

const formatBirthDate = (dateValue: string | null) => {
    if (!dateValue) {
        return "Date of Birth";
    }

    const date = new Date(`${dateValue}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return "Date of Birth";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
};

const sumStats = (
    statistics: FootballPlayerStatistic[],
    selector: (statistic: FootballPlayerStatistic) => number | null | undefined,
) => {
    return statistics.reduce((total, statistic) => {
        return total + getNumber(selector(statistic));
    }, 0);
};

const getPrimaryStatistic = (statistics: FootballPlayerStatistic[]) => {
    return statistics.reduce<FootballPlayerStatistic | null>(
        (selectedStatistic, statistic) => {
            if (!selectedStatistic) {
                return statistic;
            }

            const selectedMinutes = getNumber(selectedStatistic.games.minutes);
            const currentMinutes = getNumber(statistic.games.minutes);

            return currentMinutes > selectedMinutes ? statistic : selectedStatistic;
        },
        null,
    );
};

export const mapPlayerDetails = (
    playerEntry: FootballPlayerEntry,
    follow: FootballPlayerFollow,
    season: string,
): PlayerDetails => {
    const primaryStatistic = getPrimaryStatistic(playerEntry.statistics);
    const leagueId = primaryStatistic?.league.id;

    return {
        id: String(playerEntry.player.id),
        name: playerEntry.player.name,
        avatar: playerEntry.player.photo,
        club: primaryStatistic?.team.name ?? "-",
        teamId: primaryStatistic ? String(primaryStatistic.team.id) : null,
        leagueId: typeof leagueId === "number" ? String(leagueId) : null,
        season,
        competitionLabel: primaryStatistic
            ? `${primaryStatistic.league.name} ${primaryStatistic.league.season}`
            : season,
        isFollowed: follow.isFollowed,
        stats: [
            {
                label: "Country",
                value: formatValue(playerEntry.player.nationality),
            },
            {
                label: "Shirt No.",
                value: formatValue(primaryStatistic?.games.number),
            },
            {
                label: "Height",
                value: formatMeasurement(playerEntry.player.height, "cm"),
            },
            {
                label: formatBirthDate(playerEntry.player.birth.date),
                value: playerEntry.player.age
                    ? `${playerEntry.player.age} years`
                    : "-",
            },
        ],
        position: {
            label: "Field Position",
            value: formatValue(primaryStatistic?.games.position),
        },
        seasonStats: [
            {
                label: "Matches",
                value: formatNumber(
                    sumStats(
                        playerEntry.statistics,
                        (statistic) => statistic.games.appearences,
                    ),
                ),
            },
            {
                label: "Assists",
                value: formatNumber(
                    sumStats(
                        playerEntry.statistics,
                        (statistic) => statistic.goals.assists,
                    ),
                ),
            },
            {
                label: "Goals",
                value: formatNumber(
                    sumStats(playerEntry.statistics, (statistic) => statistic.goals.total),
                ),
            },
        ],
        traits: [],
    };
};