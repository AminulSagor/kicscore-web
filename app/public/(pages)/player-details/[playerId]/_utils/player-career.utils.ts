import type {
    PlayerCareerGroup,
    PlayerCareerRecord,
    PlayerCareerTotalsData,
    PlayerPerformanceGroup,
    PlayerStatsData,
} from "@/types/football/players/player.types";

const EMPTY_VALUE = "-";

const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
};

const getYear = (dateValue: string | null) => {
    if (!dateValue) {
        return null;
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    return String(date.getFullYear());
};

const formatCareerPeriod = (item: PlayerCareerRecord) => {
    const fromYear = getYear(item.from);
    const toYear = getYear(item.to);

    if (!fromYear && !toYear) {
        return EMPTY_VALUE;
    }

    if (item.isCurrent && fromYear) {
        return `${fromYear} - Present`;
    }

    if (fromYear && toYear && fromYear !== toYear) {
        return `${fromYear} - ${toYear}`;
    }

    return fromYear ?? toYear ?? EMPTY_VALUE;
};

const mapCareerItems = (items: PlayerCareerRecord[]) => {
    return items.map((item) => ({
        id: `${item.team.id}-${item.from ?? "unknown"}`,
        club: item.team.name,
        clubLogo: item.team.logo,
        period: formatCareerPeriod(item),
        stats: [
            {
                label: "Matches Played",
                value: formatNumber(item.matchesPlayed),
            },
            {
                label: "Goals",
                value: formatNumber(item.goals),
            },
        ],
    }));
};

const buildUnavailablePerformanceGroups = (): PlayerPerformanceGroup[] => {
    return [
        {
            id: "shooting",
            title: "Shooting",
            stats: [
                { label: "Goals", value: EMPTY_VALUE },
                { label: "Penalty Goals", value: EMPTY_VALUE },
                { label: "Shots", value: EMPTY_VALUE },
                { label: "Shots On Target", value: EMPTY_VALUE },
                { label: "Headed Shots", value: EMPTY_VALUE },
            ],
        },
        {
            id: "passing",
            title: "Passing",
            stats: [
                { label: "Passes", value: EMPTY_VALUE },
                { label: "Key Passes", value: EMPTY_VALUE },
            ],
        },
        {
            id: "possession",
            title: "Possession",
            stats: [
                { label: "Duels Won", value: EMPTY_VALUE },
                { label: "Successful Dribbles", value: EMPTY_VALUE },
            ],
        },
        {
            id: "defending",
            title: "Defending",
            stats: [
                { label: "Tackles", value: EMPTY_VALUE },
                { label: "Interceptions", value: EMPTY_VALUE },
            ],
        },
        {
            id: "discipline",
            title: "Discipline",
            stats: [
                {
                    label: "Yellow Cards",
                    value: EMPTY_VALUE,
                    variant: "warning",
                },
                { label: "Red Cards", value: EMPTY_VALUE },
            ],
        },
    ];
};

export const mapPlayerStatsData = (
    _careerTotals: PlayerCareerTotalsData,
    fromSeason: string,
    toSeason: string,
): PlayerStatsData => {
    return {
        season: `${fromSeason} - ${toSeason}`,
        minutesPlayed: EMPTY_VALUE,
        seasonStats: [
            {
                label: "Matches",
                value: EMPTY_VALUE,
            },
            {
                label: "Assists",
                value: EMPTY_VALUE,
            },
            {
                label: "Goals",
                value: EMPTY_VALUE,
            },
        ],
        performanceGroups: buildUnavailablePerformanceGroups(),
    };
};

export const mapPlayerCareerGroups = (
    careerTotals: PlayerCareerTotalsData,
): PlayerCareerGroup[] => {
    const seniorCareerItems = mapCareerItems(careerTotals.seniorCareer.items);
    const nationalTeamItems = mapCareerItems(careerTotals.nationalTeams);

    const groups: PlayerCareerGroup[] = [];

    if (seniorCareerItems.length > 0) {
        groups.push({
            id: "senior-career",
            title: "Senior Career",
            items: seniorCareerItems,
        });
    }

    if (nationalTeamItems.length > 0) {
        groups.push({
            id: "national-team",
            title: "National Team",
            items: nationalTeamItems,
        });
    }

    return groups;
};