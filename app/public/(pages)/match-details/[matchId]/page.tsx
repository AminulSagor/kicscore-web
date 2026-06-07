import HeadToHeadTab from "@/app/public/(pages)/match-details/[matchId]/_components/head-to-head/head-to-head-tab";
import LineupTab from "@/app/public/(pages)/match-details/[matchId]/_components/lineup/lineup-tab";
import StatsTab from "@/app/public/(pages)/match-details/[matchId]/_components/stats/stats-tab";
import { getMatchHeadToHead } from "@/service/football/matches/match.head-to-head.service";
import { getMatchDetails } from "@/service/football/matches/match.details.service";
import { getUpcomingFixtures } from "@/service/football/fixtures/upcoming.fixtures.service";

import FactsTab from "./_components/facts/facts-tab";
import MatchDetailsHeader from "./_components/match-details-header";
import MatchDetailsTabs from "./_components/match-details-tabs";

//======= Props Type =======//
type MatchDetailsPageProps = {
  params: Promise<{
    matchId: string;
  }>;
  searchParams?: Promise<{
    tab?: string;
  }>;
};

//======= Main Component =======//
export default async function MatchDetailsPage({
  params,
  searchParams,
}: MatchDetailsPageProps) {
  const routeParams = await params;
  const queryParams = searchParams ? await searchParams : {};

  const activeTab = queryParams.tab ?? "facts";
  let match: any = null;
  let follow: any = null;

  try {
    const result = await getMatchDetails(routeParams.matchId);
    match = result.match;
    follow = result.follow;
  } catch (err) {
    // Log network/backend errors and render a graceful fallback
    // eslint-disable-next-line no-console
    console.error("getMatchDetails failed:", err);

    return (
      <main>
        <section className="mx-auto w-full pb-16">
          <p className="mt-10 text-center text-sm font-medium text-[#6B7A75] dark:text-white/55">
            Unable to load match details right now. Please try again later.
          </p>
        </section>
      </main>
    );
  }

  if (!match) {
    return (
      <main>
        <section className="mx-auto w-full pb-16">
          <p className="mt-10 text-center text-sm font-medium text-[#6B7A75] dark:text-white/55">
            Match details not found.
          </p>
        </section>
      </main>
    );
  }

  let nextMatches: any[] = [];
  let headToHeadMatches: any[] = [];

  // Defensive fetches: avoid throwing the whole page render when backend is unreachable
  if (activeTab === "facts") {
    try {
      const res = await getUpcomingFixtures(2);
      nextMatches = res?.data?.response ?? [];
    } catch (err) {
      // Log on server and continue with empty fallback
      // eslint-disable-next-line no-console
      console.error("getUpcomingFixtures failed:", err);
      nextMatches = [];
    }
  }

  if (activeTab === "head-to-head") {
    try {
      headToHeadMatches = await getMatchHeadToHead({
        homeTeamId: match.teams.home.id,
        awayTeamId: match.teams.away.id,
        last: 5,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("getMatchHeadToHead failed:", err);
      headToHeadMatches = [];
    }
  }

  return (
    <main>
      <section className="mx-auto w-full pb-16">
        <MatchDetailsHeader match={match} follow={follow} />
        <MatchDetailsTabs />

        {activeTab === "facts" && (
          <FactsTab match={match} nextMatches={nextMatches} />
        )}

        {activeTab === "lineup" && <LineupTab match={match} />}
        {activeTab === "stats" && <StatsTab match={match} />}

        {activeTab === "head-to-head" && (
          <HeadToHeadTab match={match} matches={headToHeadMatches} />
        )}
      </section>
    </main>
  );
}
