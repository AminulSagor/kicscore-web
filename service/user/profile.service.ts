import serviceClient from "@/service/base/service.client";
import {
  UpdateProfilePhotoPayload,
  UpdateProfilePhotoResponse,
} from "@/types/user/profile.types";

export const updateProfilePhoto = async (
  payload: UpdateProfilePhotoPayload,
): Promise<UpdateProfilePhotoResponse> => {
  const response = await serviceClient.patch<UpdateProfilePhotoResponse>(
    "/users/me/profile-photo",
    payload,
  );

  return response.data;
};
