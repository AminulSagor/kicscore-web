import type {
    TeamTrophy,
    TeamTrophyApiItem,
} from "@/types/football/teams/team.trophies.types";

export const mapTeamTrophies = (items: TeamTrophyApiItem[]): TeamTrophy[] => {
    return items.map((item, index) => ({
        id: String(item.league.id),
        title: item.league.name,
        logo: item.league.logo,
        achievements: [
            {
                id: `${item.league.id}-winner`,
                count: item.winner.count,
                title: "Winner",
                years: item.winner.seasons,
            },
            {
                id: `${item.league.id}-runner-up`,
                count: item.runnerUp.count,
                title: "Runner-up",
                years: item.runnerUp.seasons,
            },
        ],
        fullWidth: items.length % 2 !== 0 && index === items.length - 1,
    }));
};