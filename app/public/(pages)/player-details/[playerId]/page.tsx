import { notFound } from "next/navigation";

import {
  getFootballPlayer,
  getPlayerCareerTotals,
  getPlayerRecentMatches,
  getPlayerTraits,
  getPlayerTrophies,
} from "@/service/football/players/player.service";
import type {
  PlayerCareerGroup,
  PlayerDetailsTabKey,
  PlayerMatchGroup,
  PlayerStatsData,
  PlayerTrait,
  PlayerTrophy,
} from "@/types/football/players/player.types";

import PlayerCareer from "./_components/player-career";
import PlayerMatches from "./_components/player-matches";
import PlayerProfileHeader from "./_components/player-profile-header";
import PlayerProfileOverview from "./_components/player-profile-overview";
import PlayerProfileTabs from "./_components/player-profile-tabs";
import PlayerStats from "./_components/player-stats";
import PlayerTraitsCard from "./_components/player-traits-card";
import PlayerTrophies from "./_components/player-trophies";
import {
  mapPlayerCareerGroups,
  mapPlayerStatsData,
} from "./_utils/player-career.utils";
import {
  getPlayerCareerSeasonRange,
  getPlayerSeason,
  getPositiveNumber,
  mapPlayerDetails,
} from "./_utils/player-details.utils";
import { mapPlayerMatchGroups } from "./_utils/player-matches.utils";
import { mapPlayerTraits } from "./_utils/player-traits.utils";
import { mapPlayerTrophies } from "./_utils/player-trophies.utils";

type PlayerDetailsPageProps = {
  params: Promise<{
    playerId: string;
  }>;
  searchParams?: Promise<{
    tab?: string;
    season?: string;
    trophyPage?: string;
    trophyLimit?: string;
    matchPage?: string;
    matchLimit?: string;
    lastFixtures?: string;
    careerPage?: string;
    careerLimit?: string;
    fromSeason?: string;
    toSeason?: string;
  }>;
};

const DEFAULT_MATCH_LIMIT = 4;
const DEFAULT_LAST_FIXTURES = 6;

const isValidTab = (tab?: string): tab is PlayerDetailsTabKey => {
  return ["profile", "matches", "stats", "career"].includes(tab ?? "");
};

export default async function PlayerDetailsPage({
  params,
  searchParams,
}: PlayerDetailsPageProps) {
  const { playerId } = await params;
  const query = searchParams ? await searchParams : {};

  const activeTab: PlayerDetailsTabKey = isValidTab(query.tab)
    ? query.tab
    : "profile";

  const season = getPlayerSeason(query.season);

  const { fromSeason, toSeason } = getPlayerCareerSeasonRange(
    season,
    query.fromSeason,
    query.toSeason,
  );

  const playerResponse = await getFootballPlayer({
    playerId,
    season,
  });

  const playerEntry = playerResponse.data.response[0];

  if (!playerEntry) {
    notFound();
  }

  const player = mapPlayerDetails(
    playerEntry,
    playerResponse.data.follow,
    season,
  );

  let trophies: PlayerTrophy[] = [];
  let traits: PlayerTrait[] = [];
  let matchGroups: PlayerMatchGroup[] = [];
  let hasMoreMatches = false;
  let loadMoreMatchesHref: string | undefined;
  let statsData: PlayerStatsData | null = null;
  let careerGroups: PlayerCareerGroup[] = [];

  if (activeTab === "profile") {
    const [trophiesResponse, traitsResponse] = await Promise.all([
      getPlayerTrophies({
        playerId,
        page: getPositiveNumber(query.trophyPage, 1),
        limit: getPositiveNumber(query.trophyLimit, 2),
      }),
      player.leagueId
        ? getPlayerTraits({
          playerId,
          leagueId: player.leagueId,
          season,
        })
        : Promise.resolve(null),
    ]);

    trophies = mapPlayerTrophies(trophiesResponse.data.response);
    traits = traitsResponse
      ? mapPlayerTraits(traitsResponse.data.traits)
      : [];
  }

  if (activeTab === "matches" && player.teamId) {
    const lastFixtures = getPositiveNumber(
      query.lastFixtures,
      DEFAULT_LAST_FIXTURES,
    );

    const matchLimit = Math.min(
      getPositiveNumber(query.matchLimit, DEFAULT_MATCH_LIMIT),
      lastFixtures,
    );

    const matchesResponse = await getPlayerRecentMatches({
      playerId,
      season,
      teamId: player.teamId,
      lastFixtures,
      page: 1,
      limit: matchLimit,
    });

    matchGroups = mapPlayerMatchGroups(
      matchesResponse.data.items,
      player.teamId,
      matchesResponse.data.teamIds,
    );

    const nextMatchLimit = Math.min(
      matchLimit + DEFAULT_MATCH_LIMIT,
      lastFixtures,
    );

    const hasNextApiPage =
      matchesResponse.data.meta.page < matchesResponse.data.meta.totalPages;

    if (hasNextApiPage && nextMatchLimit > matchLimit) {
      hasMoreMatches = true;

      const loadMoreParams = new URLSearchParams({
        tab: "matches",
        season,
        fromSeason,
        toSeason,
        lastFixtures: String(lastFixtures),
        matchLimit: String(nextMatchLimit),
      });

      loadMoreMatchesHref = `/public/player-details/${player.id}?${loadMoreParams.toString()}`;
    }
  }

  if (activeTab === "stats" || activeTab === "career") {
    const careerTotalsResponse = await getPlayerCareerTotals({
      playerId,
      fromSeason,
      toSeason,
      page: getPositiveNumber(query.careerPage, 1),
      limit: getPositiveNumber(query.careerLimit, 20),
    });

    if (activeTab === "stats") {
      statsData = mapPlayerStatsData(
        careerTotalsResponse.data,
        fromSeason,
        toSeason,
      );
    }

    if (activeTab === "career") {
      careerGroups = mapPlayerCareerGroups(careerTotalsResponse.data);
    }
  }

  return (
    <main className="">
      <section className="mx-auto pt-10 pb-28">
        <PlayerProfileHeader player={player} />

        <PlayerProfileTabs
          playerId={player.id}
          activeTab={activeTab}
          season={season}
          fromSeason={fromSeason}
          toSeason={toSeason}
        />

        {activeTab === "profile" && (
          <>
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_350px]">
              <PlayerProfileOverview player={player} />
              <PlayerTraitsCard traits={traits} />
            </div>

            <PlayerTrophies trophies={trophies} />
          </>
        )}

        {activeTab === "matches" && (
          <PlayerMatches
            matchGroups={matchGroups}
            hasMore={hasMoreMatches}
            loadMoreHref={loadMoreMatchesHref}
          />
        )}

        {activeTab === "stats" && statsData && (
          <PlayerStats
            season={statsData.season}
            minutesPlayed={statsData.minutesPlayed}
            seasonStats={statsData.seasonStats}
            performanceGroups={statsData.performanceGroups}
          />
        )}

        {activeTab === "career" && (
          <PlayerCareer careerGroups={careerGroups} />
        )}
      </section>
    </main>
  );
}