import serviceClient from "@/service/base/service.client";
import {
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "@/types/auth/reset-password.types";

export const resetPassword = async (
  payload: ResetPasswordPayload,
): Promise<ResetPasswordResponse> => {
  const response = await serviceClient.post<ResetPasswordResponse>(
    "/auth/reset-password",
    payload,
  );

  return response.data;
};
