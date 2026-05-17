import serviceClient from "@/service/base/service.client";
import { SigninPayload, SigninResponse } from "@/types/auth/signin.types";

export const signin = async (
  payload: SigninPayload,
): Promise<SigninResponse> => {
  const response = await serviceClient.post<SigninResponse>(
    "/auth/login",
    payload,
  );

  return response.data;
};
