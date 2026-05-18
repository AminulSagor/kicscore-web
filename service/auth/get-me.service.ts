import serviceClient from "@/service/base/service.client";
import { GetMeResponse } from "@/types/auth/get-me.types";

export const getMe = async (): Promise<GetMeResponse> => {
  const response = await serviceClient.get<GetMeResponse>("/users/me");

  return response.data;
};
