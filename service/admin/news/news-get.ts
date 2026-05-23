import serviceClient from "@/service/base/service.client";
import { GetAdminNewsResponse } from "@/types/admin/news/admin-news-get";

export const getAdminNews = async (
  page: number,
  limit: number,
): Promise<GetAdminNewsResponse> => {
  const response = await serviceClient.get<GetAdminNewsResponse>(
    "/admin/news/custom",
    {
      params: {
        page,
        limit,
      },
    },
  );

  return response.data;
};
