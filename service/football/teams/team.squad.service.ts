import serviceServer from "@/service/base/service.server";
import type { FootballPlayerEntry } from "@/types/football/players/player.types";
import type {
    TeamCoachesResponse,
    TeamPlayersResponse,
} from "@/types/football/teams/team.squad.types";

type GetTeamCoachesParams = {
    teamId: string;
    page: number;
    limit: number;
};

type GetTeamPlayersParams = {
    teamId: string;
    season: string;
    page: number;
    limit: number;
};

type GetAllTeamPlayersParams = {
    teamId: string;
    season: string;
};

const TEAM_PLAYERS_PAGE_LIMIT = 20;

//======= Get Team Coaches =======//
export async function getTeamCoaches({
    teamId,
    page,
    limit,
}: GetTeamCoachesParams): Promise<TeamCoachesResponse> {
    const response = await serviceServer.get<TeamCoachesResponse>(
        "/football/coaches",
        {
            params: {
                team: teamId,
                page,
                limit,
            },
        },
    );

    return response.data;
}

//======= Get Team Players =======//
export async function getTeamPlayers({
    teamId,
    season,
    page,
    limit,
}: GetTeamPlayersParams): Promise<TeamPlayersResponse> {
    const response = await serviceServer.get<TeamPlayersResponse>(
        "/football/players",
        {
            params: {
                team: teamId,
                season,
                page,
                limit,
            },
        },
    );

    return response.data;
}

//======= Get All Team Players =======//
export async function getAllTeamPlayers({
    teamId,
    season,
}: GetAllTeamPlayersParams): Promise<FootballPlayerEntry[]> {
    const firstPageResponse = await getTeamPlayers({
        teamId,
        season,
        page: 1,
        limit: TEAM_PLAYERS_PAGE_LIMIT,
    });

    const totalPages = firstPageResponse.data.backendPaging.totalPages;

    if (totalPages <= 1) {
        return firstPageResponse.data.response;
    }

    const remainingPageResponses = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, index) =>
            getTeamPlayers({
                teamId,
                season,
                page: index + 2,
                limit: TEAM_PLAYERS_PAGE_LIMIT,
            }),
        ),
    );

    return [
        ...firstPageResponse.data.response,
        ...remainingPageResponses.flatMap((response) => response.data.response),
    ];
}