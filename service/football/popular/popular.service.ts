import serviceServer from "@/service/base/service.server";
import type {
    PopularEntityType,
    PopularFootballResponse,
} from "@/types/football/popular/popular.types";

type GetPopularFootballEntitiesParams = {
    entityType: PopularEntityType;
    page: number;
    limit: number;
};

//======= Get Popular Football Entities =======//
export async function getPopularFootballEntities({
    entityType,
    page,
    limit,
}: GetPopularFootballEntitiesParams): Promise<PopularFootballResponse> {
    const response = await serviceServer.get<PopularFootballResponse>(
        "/football/popular",
        {
            params: {
                entityType,
                page,
                limit,
            },
        },
    );

    return response.data;
}