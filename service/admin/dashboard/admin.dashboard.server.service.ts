import serviceServer from "@/service/base/service.server";
import type {
    AdminDashboardOverviewResponse,
    AdminDashboardTopItemsResponse,
} from "@/types/admin/dashboard/admin.dashboard.types";

type GetAdminDashboardTopItemsParams = {
    page: number;
    limit: number;
};

export const getAdminDashboardOverview =
    async (): Promise<AdminDashboardOverviewResponse> => {
        const response = await serviceServer.get<AdminDashboardOverviewResponse>(
            "/admin/dashboard/overview",
        );

        return response.data;
    };

export const getAdminDashboardTopLeagues = async ({
    page,
    limit,
}: GetAdminDashboardTopItemsParams): Promise<AdminDashboardTopItemsResponse> => {
    const response = await serviceServer.get<AdminDashboardTopItemsResponse>(
        "/admin/dashboard/top-leagues",
        {
            params: {
                page,
                limit,
            },
        },
    );

    return response.data;
};

export const getAdminDashboardTopTeams = async ({
    page,
    limit,
}: GetAdminDashboardTopItemsParams): Promise<AdminDashboardTopItemsResponse> => {
    const response = await serviceServer.get<AdminDashboardTopItemsResponse>(
        "/admin/dashboard/top-teams",
        {
            params: {
                page,
                limit,
            },
        },
    );

    return response.data;
};