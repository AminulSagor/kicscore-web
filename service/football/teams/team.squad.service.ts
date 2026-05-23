import serviceServer from "@/service/base/service.server";
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