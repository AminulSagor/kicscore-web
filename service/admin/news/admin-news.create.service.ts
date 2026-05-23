import serviceClient from "@/service/base/service.client";
import {
  CreateAdminNewsPayload,
  CreateAdminNewsResponse,
} from "@/types/admin/news/admin-news.types";

export const createAdminNews = async (
  payload: CreateAdminNewsPayload,
): Promise<CreateAdminNewsResponse> => {
  const response = await serviceClient.post<CreateAdminNewsResponse>(
    "/admin/news",
    payload,
  );

  return response.data;
};
