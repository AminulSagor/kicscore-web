type TeamTrophySeasonRange = {
    fromSeason: string;
    toSeason: string;
};

const isValidSeason = (season?: string) => {
    return Boolean(season && /^\d{4}$/.test(season));
};

export const getTeamSeason = (season?: string) => {
    if (isValidSeason(season)) {
        return season!;
    }

    const today = new Date();
    const currentYear = today.getUTCFullYear();
    const currentMonth = today.getUTCMonth();

    return String(currentMonth >= 6 ? currentYear : currentYear - 1);
};

export const getPositiveInteger = (
    value: string | undefined,
    fallback: number,
) => {
    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue) || parsedValue < 1) {
        return fallback;
    }

    return parsedValue;
};

export const getTeamTrophySeasonRange = (
    season: string,
    fromSeason?: string,
    toSeason?: string,
): TeamTrophySeasonRange => {
    return {
        fromSeason: isValidSeason(fromSeason) ? fromSeason! : "2000",
        toSeason: isValidSeason(toSeason) ? toSeason! : season,
    };
};