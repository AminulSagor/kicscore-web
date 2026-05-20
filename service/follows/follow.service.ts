import serviceClient from "@/service/base/service.client";
import {
    FollowPayload,
    FollowResponse,
    FollowsResponse,
    FollowStatusPayload,
    FollowStatusResponse,
    MergeAnonymousFollowsPayload,
    MergeAnonymousFollowsResponse,
    UnfollowPayload,
    UnfollowResponse,
} from "@/types/follows/follow.types";

export const followEntity = async (
    payload: FollowPayload,
): Promise<FollowResponse> => {
    const response = await serviceClient.post<FollowResponse>(
        "/follows",
        payload,
    );

    return response.data;
};

export const getFollows = async (
    installationId?: string,
): Promise<FollowsResponse> => {
    const response = await serviceClient.get<FollowsResponse>("/follows", {
        params: installationId
            ? {
                installationId,
            }
            : undefined,
    });

    return response.data;
};

export const getFollowStatus = async ({
    entityType,
    entityId,
    installationId,
}: FollowStatusPayload): Promise<FollowStatusResponse> => {
    const response = await serviceClient.get<FollowStatusResponse>(
        "/follows/status",
        {
            params: {
                entityType,
                entityId,
                ...(installationId ? { installationId } : {}),
            },
        },
    );

    return response.data;
};

export const unfollowEntity = async ({
    entityType,
    entityId,
    installationId,
}: UnfollowPayload): Promise<UnfollowResponse> => {
    const response = await serviceClient.delete<UnfollowResponse>(
        `/follows/${entityType}/${entityId}`,
        {
            params: installationId
                ? {
                    installationId,
                }
                : undefined,
        },
    );

    return response.data;
};

export const mergeAnonymousFollows = async (
    payload: MergeAnonymousFollowsPayload,
): Promise<MergeAnonymousFollowsResponse> => {
    const response = await serviceClient.post<MergeAnonymousFollowsResponse>(
        "/follows/merge-anonymous",
        payload,
    );

    return response.data;
};