import serviceServer from "@/service/base/service.server";
import {
  GetNewsParams,
  NewsApiResponse,
  SimilarNewsApiResponse,
} from "@/types/news/news.types";

export const getNewsServer = async ({
  page = 1,
  limit = 10,
}: GetNewsParams = {}) => {
  const response = await serviceServer.get<NewsApiResponse>("/news/sports", {
    params: {
      page,
      limit,
    },
  });

  return response.data.data;
};

export const getSimilarNewsServer = async (uuid: string) => {
  const response = await serviceServer.get<SimilarNewsApiResponse>(
    `/news/${uuid}/similar`,
  );

  return response.data.data;
};
