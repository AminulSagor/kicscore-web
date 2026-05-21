import serviceServer from "@/service/base/service.server";
import {
  MatchHeadToHeadApiResponse,
  MatchHeadToHeadItem,
  MatchHeadToHeadParams,
} from "@/types/football/matches/match.head-to-head.types";

//======= API Call =======//
export async function getMatchHeadToHead({
  homeTeamId,
  awayTeamId,
  last = 5,
}: MatchHeadToHeadParams): Promise<MatchHeadToHeadItem[]> {
  const h2h = `${homeTeamId}-${awayTeamId}`;

  const { data } = await serviceServer.get<MatchHeadToHeadApiResponse>(
    "/football/fixtures/head-to-head",
    {
      params: {
        h2h,
        last,
      },
    },
  );

  return data.data.response ?? [];
}
