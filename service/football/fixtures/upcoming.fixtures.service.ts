import serviceServer from "@/service/base/service.server";
import type { TeamFixturesResponse } from "@/types/football/fixtures/team.fixtures.types";

//======= API Call =======//
export async function getUpcomingFixtures(
  limit = 2,
): Promise<TeamFixturesResponse> {
  const response = await serviceServer.get<TeamFixturesResponse>(
    "/football/fixtures",
    {
      params: {
        next: limit,
      },
    },
  );

  return response.data;
}
