import serviceServer from "@/service/base/service.server";
import type { AdminGeneralUsersResponse } from "@/types/admin/general-users/general.users.types";

type GetGeneralUsersParams = {
    page: number;
    limit: number;
    search?: string;
};

export const getGeneralUsers = async ({
    page,
    limit,
    search,
}: GetGeneralUsersParams): Promise<AdminGeneralUsersResponse> => {
    const response = await serviceServer.get<AdminGeneralUsersResponse>(
        "/admin/users",
        {
            params: {
                page,
                limit,
                ...(search ? { search } : {}),
            },
        },
    );

    return response.data;
};