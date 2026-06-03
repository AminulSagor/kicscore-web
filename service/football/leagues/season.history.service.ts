import serviceClient from "@/service/base/service.client";
import type { SeasonHistoryResponse } from "@/types/football/leagues/season.history.types";

export const getSeasonHistory = async (leagueId: string) => {
  const response = await serviceClient.get<{ data: SeasonHistoryResponse }>(
    `/football/leagues/${leagueId}/seasons/history`
  );

  return response.data.data;
};
