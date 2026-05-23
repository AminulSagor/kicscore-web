import serviceServer from "@/service/base/service.server";
import { TeamDetailsResponse } from "@/types/football/teams/team.details.types";

//======= API Call =======//
export async function getTeamDetails(
  teamId: string,
): Promise<TeamDetailsResponse> {
  const response = await serviceServer.get<TeamDetailsResponse>(
    "/football/teams",
    {
      params: {
        id: teamId,
      },
    },
  );

  return response.data;
}
