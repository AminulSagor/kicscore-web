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
import { getOrCreateInstallationId } from "@/utils/device/installation-id.utils";

export const followEntity = async (
  payload: FollowPayload,
): Promise<FollowResponse> => {
  const installationId = getOrCreateInstallationId();

  const response = await serviceClient.post<FollowResponse>("/follows", {
    ...payload,
    installationId,
  });

  return response.data;
};

export const getFollows = async (): Promise<FollowsResponse> => {
  const installationId = getOrCreateInstallationId();

  const response = await serviceClient.get<FollowsResponse>("/follows", {
    params: {
      installationId,
    },
  });

  return response.data;
};

export const getFollowStatus = async ({
  entityType,
  entityId,
}: FollowStatusPayload): Promise<FollowStatusResponse> => {
  const installationId = getOrCreateInstallationId();

  const response = await serviceClient.get<FollowStatusResponse>(
    "/follows/status",
    {
      params: {
        entityType,
        entityId,
        installationId,
      },
    },
  );

  return response.data;
};

export const unfollowEntity = async ({
  entityType,
  entityId,
}: UnfollowPayload): Promise<UnfollowResponse> => {
  const installationId = getOrCreateInstallationId();

  const response = await serviceClient.delete<UnfollowResponse>(
    `/follows/${entityType}/${entityId}`,
    {
      params: {
        installationId,
      },
    },
  );

  return response.data;
};

export const mergeAnonymousFollows = async (
  payload: MergeAnonymousFollowsPayload,
): Promise<MergeAnonymousFollowsResponse> => {
  const installationId = getOrCreateInstallationId();

  const response = await serviceClient.post<MergeAnonymousFollowsResponse>(
    "/follows/merge-anonymous",
    {
      ...payload,
      installationId,
    },
  );

  return response.data;
};
