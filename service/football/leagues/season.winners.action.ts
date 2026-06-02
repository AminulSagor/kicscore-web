"use server";

import { getLeagueStandings } from "./league.standing.service";

export type SeasonWinnerData = {
  winner: { name: string; logo: string } | null;
  runnerUp: { name: string; logo: string } | null;
};

export async function getSeasonWinners(
  leagueId: string,
  season: string,
): Promise<SeasonWinnerData> {
  try {
    const standings = await getLeagueStandings(leagueId, season);
    if (!standings || standings.length < 2) {
      return { winner: null, runnerUp: null };
    }
    
    // In case they are grouped, finding overall rank 1 and 2
    const sorted = [...standings].sort((a, b) => a.position - b.position);
    
    return {
      winner: {
        name: sorted[0].teamName,
        logo: sorted[0].teamLogo,
      },
      runnerUp: {
        name: sorted[1].teamName,
        logo: sorted[1].teamLogo,
      },
    };
  } catch (error) {
    console.error("Failed to fetch season winners:", error);
    return { winner: null, runnerUp: null };
  }
}
