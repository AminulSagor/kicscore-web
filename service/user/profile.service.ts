import serviceClient from "@/service/base/service.client";
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  DeleteAccountPayload,
  DeleteAccountResponse,
  UpdateProfilePayload,
  UpdateProfilePhotoPayload,
  UpdateProfilePhotoResponse,
  UpdateProfileResponse,
  UpdateUserSettingsPayload,
  UpdateUserSettingsResponse,
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

export const updateProfile = async (
  payload: UpdateProfilePayload,
): Promise<UpdateProfileResponse> => {
  const response = await serviceClient.patch<UpdateProfileResponse>(
    "/users/me/profile",
    payload,
  );

  return response.data;
};

export const deleteAccount = async (
  payload: DeleteAccountPayload,
): Promise<DeleteAccountResponse> => {
  const response = await serviceClient.post<DeleteAccountResponse>(
    "/users/me/delete-account",
    payload,
  );

  return response.data;
};

export const changePassword = async (
  payload: ChangePasswordPayload,
): Promise<ChangePasswordResponse> => {
  const response = await serviceClient.patch<ChangePasswordResponse>(
    "/users/me/password",
    payload,
  );

  return response.data;
};

export const updateUserSettings = async (
  payload: UpdateUserSettingsPayload,
): Promise<UpdateUserSettingsResponse> => {
  const response = await serviceClient.patch<UpdateUserSettingsResponse>(
    "/users/me/settings",
    payload,
  );

  return response.data;
};