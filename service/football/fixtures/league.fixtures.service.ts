import serviceClient from "@/service/base/service.client";
import { LeagueFixturesApiResponse } from "@/types/football/fixtures/fixture.types";

interface GetLeagueFixturesParams {
  leagueId: string;
  season: string;
  page?: number;
  limit?: number;
}

export const getLeagueFixtures = async ({
  leagueId,
  season,
  page = 1,
  limit = 20,
}: GetLeagueFixturesParams) => {
  const response = await serviceClient.get<LeagueFixturesApiResponse>(
    "/football/fixtures",
    {
      params: {
        league: leagueId,
        season,
        page,
        limit,
      },
    },
  );

  return response.data.data;
};
