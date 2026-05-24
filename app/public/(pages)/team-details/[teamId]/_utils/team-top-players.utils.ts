import type {
    FootballPlayerEntry,
    FootballPlayerStatistic,
} from "@/types/football/players/player.types";
import type { TeamTopPlayer } from "@/types/football/teams/team.squad.types";

type RatedPlayer = {
    player: FootballPlayerEntry;
    rating: number;
    appearances: number;
};

const TOP_PLAYERS_LIMIT = 3;

const getNumericRating = (rating: string | null | undefined) => {
    if (!rating) {
        return null;
    }

    const value = Number(rating);

    return Number.isFinite(value) ? value : null;
};

const getHighestRatedStatistic = (
    player: FootballPlayerEntry,
): FootballPlayerStatistic | null => {
    return player.statistics.reduce<FootballPlayerStatistic | null>(
        (selectedStatistic, statistic) => {
            const rating = getNumericRating(statistic.games.rating);

            if (rating === null) {
                return selectedStatistic;
            }

            if (!selectedStatistic) {
                return statistic;
            }

            const selectedRating =
                getNumericRating(selectedStatistic.games.rating) ?? 0;

            if (rating > selectedRating) {
                return statistic;
            }

            if (rating < selectedRating) {
                return selectedStatistic;
            }

            const selectedAppearances =
                selectedStatistic.games.appearences ?? 0;
            const currentAppearances = statistic.games.appearences ?? 0;

            return currentAppearances > selectedAppearances
                ? statistic
                : selectedStatistic;
        },
        null,
    );
};

export const mapTeamTopPlayers = (
    players: FootballPlayerEntry[],
): TeamTopPlayer[] => {
    const ratedPlayers = players.flatMap<RatedPlayer>((player) => {
        const statistic = getHighestRatedStatistic(player);
        const rating = getNumericRating(statistic?.games.rating);

        if (!statistic || rating === null) {
            return [];
        }

        return [
            {
                player,
                rating,
                appearances: statistic.games.appearences ?? 0,
            },
        ];
    });

    return ratedPlayers
        .sort((firstPlayer, secondPlayer) => {
            if (secondPlayer.rating !== firstPlayer.rating) {
                return secondPlayer.rating - firstPlayer.rating;
            }

            if (secondPlayer.appearances !== firstPlayer.appearances) {
                return secondPlayer.appearances - firstPlayer.appearances;
            }

            return firstPlayer.player.player.name.localeCompare(
                secondPlayer.player.player.name,
            );
        })
        .slice(0, TOP_PLAYERS_LIMIT)
        .map(({ player, rating }) => ({
            id: String(player.player.id),
            name: player.player.name,
            image: player.player.photo,
            role: "Rating",
            value: rating.toFixed(2),
        }));
};