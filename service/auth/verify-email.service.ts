import serviceClient from "@/service/base/service.client";
import {
  VerifyEmailPayload,
  VerifyEmailResponse,
} from "@/types/auth/verify-email.types";

export const verifyEmail = async (
  payload: VerifyEmailPayload,
): Promise<VerifyEmailResponse> => {
  const response = await serviceClient.post<VerifyEmailResponse>(
    "/auth/verify-email",
    payload,
  );

  return response.data;
};
