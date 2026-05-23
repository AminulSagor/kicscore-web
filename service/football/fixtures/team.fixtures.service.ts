import serviceServer from "@/service/base/service.server";
import { TeamFixturesResponse } from "@/types/football/fixtures/team.fixtures.types";

//======= API Call =======//
export async function getTeamUpcomingFixtures(
  teamId: string,
  limit = 2,
): Promise<TeamFixturesResponse> {
  const response = await serviceServer.get<TeamFixturesResponse>(
    `/football/teams/${teamId}/fixtures`,
    {
      params: {
        next: limit,
      },
    },
  );

  return response.data;
}

//======= Get Last Fixtures =======//
export async function getTeamLastFixtures(
  teamId: string,
  limit = 6,
): Promise<TeamFixturesResponse> {
  const response = await serviceServer.get<TeamFixturesResponse>(
    `/football/teams/${teamId}/fixtures`,
    {
      params: {
        last: limit,
      },
    },
  );

  return response.data;
}
