import serviceServer from "@/service/base/service.server";
import type { TeamLeaguesResponse } from "@/types/football/teams/team.leagues.types";

type GetTeamLeaguesParams = {
    teamId: string;
    season: string;
    page: number;
    limit: number;
};

//======= Get Team Leagues =======//
export async function getTeamLeagues({
    teamId,
    season,
    page,
    limit,
}: GetTeamLeaguesParams): Promise<TeamLeaguesResponse> {
    const response = await serviceServer.get<TeamLeaguesResponse>(
        "/football/leagues",
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