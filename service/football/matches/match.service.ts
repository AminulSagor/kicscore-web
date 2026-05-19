import serviceClient from "@/service/base/service.client";
import {
  ByTimeMatchesApiResponse,
  GetMatchesParams,
  GroupedMatchesApiResponse,
} from "@/types/football/matches/match.types";

export const getGroupedMatchesByLeague = async ({
  date,
  timezone = "Asia/Dhaka",
  page = 1,
  limit = 20,
  statusGroup = "ALL",
}: GetMatchesParams) => {
  const response = await serviceClient.get<GroupedMatchesApiResponse>(
    "/football/league",
    {
      params: {
        date,
        timezone,
        page,
        limit,
        statusGroup,
      },
    },
  );

  return response.data.data;
};

export const getMatchesByTime = async ({
  date,
  timezone = "Asia/Dhaka",
  page = 1,
  limit = 20,
  statusGroup = "ALL",
}: GetMatchesParams) => {
  const response = await serviceClient.get<ByTimeMatchesApiResponse>(
    "/football/fixtures/by-time",
    {
      params: {
        date,
        timezone,
        page,
        limit,
        statusGroup,
      },
    },
  );

  return response.data.data;
};
