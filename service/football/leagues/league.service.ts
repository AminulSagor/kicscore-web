import serviceClient from "@/service/base/service.client";
import { FootballLeaguesApiResponse } from "@/types/football/leagues/league.types";

export const getCurrentLeagues = async () => {
  const response = await serviceClient.get<FootballLeaguesApiResponse>(
    "/football/leagues",
    {
      params: {
        current: true,
      },
    },
  );

  return response.data.data.response;
};
