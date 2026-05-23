import type {
    FootballTrophyItem,
    PlayerTrophy,
} from "@/types/football/players/player.types";

export const mapPlayerTrophies = (
    trophies: FootballTrophyItem[],
): PlayerTrophy[] => {
    return trophies.map((trophy, index) => ({
        id: `${trophy.league}-${trophy.season}-${index}`,
        title: trophy.league,
        country: trophy.country,
        season: trophy.season,
        result: trophy.place,
    }));
};