import serviceClient from "@/service/base/service.client";
import serviceServer from "@/service/base/service.server";
import { LeagueDetailsParams, LeagueDetailsResponse } from "@/types/football/leagues/league.details";


//======= Get League Details =======//
export const getLeagueDetails = async ({ id }: LeagueDetailsParams) => {
  const response = await serviceServer.get<LeagueDetailsResponse>(
    `/football/leagues?id=${id}`,
  );

  return response.data.data.response[0] ?? null;
};