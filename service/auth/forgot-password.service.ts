import serviceClient from "@/service/base/service.client";
import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "@/types/auth/forgot-password.types";

export const forgotPassword = async (
  payload: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> => {
  const response = await serviceClient.post<ForgotPasswordResponse>(
    "/auth/forgot-password",
    payload,
  );

  return response.data;
};
