import serviceClient from "@/service/base/service.client";
import {
  ResendOtpPayload,
  ResendOtpResponse,
} from "@/types/auth/resend-otp.types";

export const resendOtp = async (
  payload: ResendOtpPayload,
): Promise<ResendOtpResponse> => {
  const response = await serviceClient.post<ResendOtpResponse>(
    "/auth/resend-otp",
    payload,
  );

  return response.data;
};
