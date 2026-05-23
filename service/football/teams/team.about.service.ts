import serviceServer from "@/service/base/service.server";
import { TeamAboutResponse } from "@/types/football/teams/team.about.types";

//======= API Call =======//
export const getTeamAbout = (teamId: string) => {
  return serviceServer.get<TeamAboutResponse>(
    `/football/teams/${teamId}/about`,
  );
};
