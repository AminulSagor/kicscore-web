import serviceServer from "@/service/base/service.server";
import type { TeamTrophiesPreviewResponse } from "@/types/football/teams/team.trophies.types";

type GetTeamTrophiesPreviewParams = {
    teamId: string;
    fromSeason: string;
    toSeason: string;
    page: number;
    limit: number;
};

//======= Get Team Trophies Preview =======//
export async function getTeamTrophiesPreview({
    teamId,
    fromSeason,
    toSeason,
    page,
    limit,
}: GetTeamTrophiesPreviewParams): Promise<TeamTrophiesPreviewResponse> {
    const response = await serviceServer.get<TeamTrophiesPreviewResponse>(
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