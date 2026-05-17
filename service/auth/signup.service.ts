import serviceClient from "@/service/base/service.client";
import { SignupPayload, SignupResponse } from "@/types/auth/signup.types";

export const signup = async (
  payload: SignupPayload,
): Promise<SignupResponse> => {
  const response = await serviceClient.post<SignupResponse>(
    "/auth/register",
    payload,
  );

  return response.data;
};
