import serviceClient from "@/service/base/service.client";
import type {
    DeleteAdminUserResponse,
    UpdateAdminUserStatusPayload,
    UpdateAdminUserStatusResponse,
} from "@/types/admin/general-users/general.users.types";

export const updateGeneralUserStatus = async (
    userId: string,
    payload: UpdateAdminUserStatusPayload,
): Promise<UpdateAdminUserStatusResponse> => {
    const response = await serviceClient.patch<UpdateAdminUserStatusResponse>(
        `/admin/users/${userId}/status`,
        payload,
    );

    return response.data;
};

export const deleteGeneralUser = async (
    userId: string,
): Promise<DeleteAdminUserResponse> => {
    const response = await serviceClient.delete<DeleteAdminUserResponse>(
        `/admin/users/${userId}`,
    );

    return response.data;
};