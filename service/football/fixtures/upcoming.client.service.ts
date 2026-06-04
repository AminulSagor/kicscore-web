import serviceClient from "@/service/base/service.client";
import { LeagueFixturesApiResponse } from "@/types/football/fixtures/fixture.types";

export const getUpcomingFixturesClient = async (limit = 6) => {
  const response = await serviceClient.get<LeagueFixturesApiResponse>(
    "/football/fixtures",
    {
      params: {
        next: limit,
      },
    },
  );

  return response.data.data;
};
