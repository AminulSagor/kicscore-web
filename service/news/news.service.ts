import serviceClient from "@/service/base/service.client";
import { GetNewsParams, NewsApiResponse } from "@/types/news/news.types";

export const getNews = async ({ page = 1, limit = 3 }: GetNewsParams = {}) => {
  const response = await serviceClient.get<NewsApiResponse>("/news/sports", {
    params: {
      page,
      limit,
    },
  });

  return response.data.data;
};
