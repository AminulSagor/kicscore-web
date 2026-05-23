import type {
    FootballPlayerStatistic,
    PlayerCareerGroup,
    PlayerCareerTotalsData,
    PlayerPerformanceGroup,
    PlayerStatsData,
} from "@/types/football/players/player.types";

type SeasonStatisticItem = {
    season: number;
    nationality: string | null;
    statistic: FootballPlayerStatistic;
};

type CareerAggregateItem = {
    id: string;
    title: string;
    club: string;
    fromSeason: number;
    toSeason: number;
    matches: number;
    goals: number;
};

const getNumber = (value: number | null | undefined) => value ?? 0;

const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
};

const normalizeName = (value: string | null) => {
    return value?.trim().toLowerCase() ?? "";
};

const getStatistics = (
    careerTotals: PlayerCareerTotalsData,
): SeasonStatisticItem[] => {
    return careerTotals.items.flatMap((item) => {
        const playerEntry = item.player.response[0];

        if (!playerEntry) {
            return [];
        }

        return playerEntry.statistics.map((statistic) => ({
            season: item.season,
            nationality: playerEntry.player.nationality,
            statistic,
        }));
    });
};

const sumStatistics = (
    statistics: SeasonStatisticItem[],
    selector: (statistic: FootballPlayerStatistic) => number | null | undefined,
) => {
    return statistics.reduce((total, item) => {
        return total + getNumber(selector(item.statistic));
    }, 0);
};

const buildPerformanceGroups = (
    statistics: SeasonStatisticItem[],
): PlayerPerformanceGroup[] => {
    return [
        {
            id: "shooting",
            title: "Shooting",
            stats: [
                {
                    label: "Goals",
                    value: formatNumber(
                        sumStatistics(statistics, (statistic) => statistic.goals.total),
                    ),
                },
                {
                    label: "Penalty Goals",
                    value: formatNumber(
                        sumStatistics(statistics, (statistic) => statistic.penalty.scored),
                    ),
                },
                {
                    label: "Shots",
                    value: formatNumber(
                        sumStatistics(statistics, (statistic) => statistic.shots.total),
                    ),
                },
                {
                    label: "Shots On Target",
                    value: formatNumber(
                        sumStatistics(statistics, (statistic) => statistic.shots.on),
                    ),
                },
                {
                    label: "Headed Shots",
                    value: "-",
                },
            ],
        },
        {
            id: "passing",
            title: "Passing",
            stats: [
                {
                    label: "Passes",
                    value: formatNumber(
                        sumStatistics(statistics, (statistic) => statistic.passes.total),
                    ),
                },
                {
                    label: "Key Passes",
                    value: formatNumber(
                        sumStatistics(statistics, (statistic) => statistic.passes.key),
                    ),
                },
            ],
        },
        {
            id: "possession",
            title: "Possession",
            stats: [
                {
                    label: "Duels Won",
                    value: formatNumber(
                        sumStatistics(statistics, (statistic) => statistic.duels.won),
                    ),
                },
                {
                    label: "Successful Dribbles",
                    value: formatNumber(
                        sumStatistics(statistics, (statistic) => statistic.dribbles.success),
                    ),
                },
            ],
        },
        {
            id: "defending",
            title: "Defending",
            stats: [
                {
                    label: "Tackles",
                    value: formatNumber(
                        sumStatistics(statistics, (statistic) => statistic.tackles.total),
                    ),
                },
                {
                    label: "Interceptions",
                    value: formatNumber(
                        sumStatistics(
                            statistics,
                            (statistic) => statistic.tackles.interceptions,
                        ),
                    ),
                },
            ],
        },
        {
            id: "discipline",
            title: "Discipline",
            stats: [
                {
                    label: "Yellow Cards",
                    value: formatNumber(
                        sumStatistics(statistics, (statistic) => statistic.cards.yellow),
                    ),
                    variant: "warning",
                },
                {
                    label: "Red Cards",
                    value: formatNumber(
                        sumStatistics(statistics, (statistic) => statistic.cards.red),
                    ),
                },
            ],
        },
    ];
};

export const mapPlayerStatsData = (
    careerTotals: PlayerCareerTotalsData,
    fromSeason: string,
    toSeason: string,
): PlayerStatsData => {
    const statistics = getStatistics(careerTotals);

    return {
        season: `${fromSeason} - ${toSeason}`,
        minutesPlayed: formatNumber(
            sumStatistics(statistics, (statistic) => statistic.games.minutes),
        ),
        seasonStats: [
            {
                label: "Matches",
                value: formatNumber(
                    sumStatistics(statistics, (statistic) => statistic.games.appearences),
                ),
            },
            {
                label: "Assists",
                value: formatNumber(
                    sumStatistics(statistics, (statistic) => statistic.goals.assists),
                ),
            },
            {
                label: "Goals",
                value: formatNumber(
                    sumStatistics(statistics, (statistic) => statistic.goals.total),
                ),
            },
        ],
        performanceGroups: buildPerformanceGroups(statistics),
    };
};

const getCareerGroupTitle = (item: SeasonStatisticItem) => {
    const teamName = normalizeName(item.statistic.team.name);
    const nationality = normalizeName(item.nationality);

    return teamName && nationality && teamName === nationality
        ? "National Team"
        : "Senior Career";
};

export const mapPlayerCareerGroups = (
    careerTotals: PlayerCareerTotalsData,
): PlayerCareerGroup[] => {
    const statistics = getStatistics(careerTotals);
    const aggregatedItems = new Map<string, CareerAggregateItem>();

    statistics.forEach((item) => {
        const matches = getNumber(item.statistic.games.appearences);
        const goals = getNumber(item.statistic.goals.total);

        if (matches === 0 && goals === 0) {
            return;
        }

        const title = getCareerGroupTitle(item);
        const key = `${title}-${item.statistic.team.id}`;

        const existingItem = aggregatedItems.get(key);

        if (existingItem) {
            existingItem.fromSeason = Math.min(existingItem.fromSeason, item.season);
            existingItem.toSeason = Math.max(existingItem.toSeason, item.season);
            existingItem.matches += matches;
            existingItem.goals += goals;
            return;
        }

        aggregatedItems.set(key, {
            id: key,
            title,
            club: item.statistic.team.name,
            fromSeason: item.season,
            toSeason: item.season,
            matches,
            goals,
        });
    });

    const groupedItems = new Map<string, PlayerCareerGroup>();

    Array.from(aggregatedItems.values())
        .sort((firstItem, secondItem) => secondItem.toSeason - firstItem.toSeason)
        .forEach((item) => {
            const careerItem = {
                id: item.id,
                club: item.club,
                period:
                    item.fromSeason === item.toSeason
                        ? String(item.fromSeason)
                        : `${item.fromSeason} - ${item.toSeason}`,
                stats: [
                    {
                        label: "Matches Played",
                        value: formatNumber(item.matches),
                    },
                    {
                        label: "Goals",
                        value: formatNumber(item.goals),
                    },
                ],
            };

            const existingGroup = groupedItems.get(item.title);

            if (existingGroup) {
                existingGroup.items.push(careerItem);
                return;
            }

            groupedItems.set(item.title, {
                id: item.title.toLowerCase().replaceAll(" ", "-"),
                title: item.title,
                items: [careerItem],
            });
        });

    return Array.from(groupedItems.values());
};