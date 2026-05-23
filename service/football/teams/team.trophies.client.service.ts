import serviceClient from "@/service/base/service.client";
import type { TeamTrophiesPreviewResponse } from "@/types/football/teams/team.trophies.types";

type GetTeamTrophiesPreviewParams = {
    teamId: string;
    fromSeason: string;
    toSeason: string;
    page: number;
    limit: number;
};

//======= Get Team Trophies Preview =======//
export async function getTeamTrophiesPreviewClient({
    teamId,
    fromSeason,
    toSeason,
    page,
    limit,
}: GetTeamTrophiesPreviewParams): Promise<TeamTrophiesPreviewResponse> {
    const response = await serviceClient.get<TeamTrophiesPreviewResponse>(
        `/football/teams/${teamId}/trophies-preview`,
        {
            params: {
                fromSeason,
                toSeason,
                page,
                limit,
            },
        },
    );

    return response.data;
}