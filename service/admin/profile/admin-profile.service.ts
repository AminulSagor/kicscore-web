import serviceClient from "@/service/base/service.client";
import {
    AdminProfileResponse,
    ChangeAdminPasswordPayload,
    ChangeAdminPasswordResponse,
    UpdateAdminProfilePayload,
    UpdateAdminProfileResponse,
} from "@/types/admin/profile/admin-profile.types";

export const getAdminProfile = async (): Promise<AdminProfileResponse> => {
    const response =
        await serviceClient.get<AdminProfileResponse>("/admin/profile/me");

    return response.data;
};

export const updateAdminProfile = async (
    payload: UpdateAdminProfilePayload,
): Promise<UpdateAdminProfileResponse> => {
    const response = await serviceClient.patch<UpdateAdminProfileResponse>(
        "/admin/profile/me",
        payload,
    );

    return response.data;
};

export const changeAdminPassword = async (
    payload: ChangeAdminPasswordPayload,
): Promise<ChangeAdminPasswordResponse> => {
    const response = await serviceClient.patch<ChangeAdminPasswordResponse>(
        "/admin/profile/me/password",
        payload,
    );

    return response.data;
};