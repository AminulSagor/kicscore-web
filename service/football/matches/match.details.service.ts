import serviceServer from "@/service/base/service.server";
import {
  MatchDetailsApiResponse,
  MatchDetailsResult,
} from "@/types/football/matches/match.details.types";

//======= API Call =======//
export async function getMatchDetails(
  matchId: string,
): Promise<MatchDetailsResult> {
  const fixtureId = matchId.trim();

  if (!fixtureId) {
    return {
      match: null,
      follow: null,
    };
  }

  const { data } = await serviceServer.get<MatchDetailsApiResponse>(
    `/football/fixtures/${fixtureId}`,
  );

  return {
    match: data.data.response[0] ?? null,
    follow: data.data.follow ?? null,
  };
}
