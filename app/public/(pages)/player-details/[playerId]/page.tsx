import { notFound } from "next/navigation";
import { playerDetailsMockData } from "@/mock/player-details/player-details.mock.data";
import type { PlayerDetailsTabKey } from "@/mock/player-details/player-details.mock.types";

import PlayerCareer from "./_components/player-career";
import PlayerMatches from "./_components/player-matches";
import PlayerProfileHeader from "./_components/player-profile-header";
import PlayerProfileOverview from "./_components/player-profile-overview";
import PlayerProfileTabs from "./_components/player-profile-tabs";
import PlayerStats from "./_components/player-stats";
import PlayerTraitsCard from "./_components/player-traits-card";
import PlayerTrophies from "./_components/player-trophies";

type PlayerDetailsPageProps = {
  params: Promise<{ playerId: string }>;
  searchParams?: Promise<{ tab?: string }>;
};

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

  const player = playerDetailsMockData.find((item) => item.id === playerId);

  if (!player) notFound();

  return (
    <main className="">
      <section className="mx-auto pt-10 pb-28">
        <PlayerProfileHeader player={player} />

        <PlayerProfileTabs playerId={player.id} activeTab={activeTab} />

        {activeTab === "profile" && (
          <>
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_350px]">
              <PlayerProfileOverview player={player} />
              <PlayerTraitsCard traits={player.traits} />
            </div>

            <PlayerTrophies trophies={player.trophies} />
          </>
        )}

        {activeTab === "matches" && (
          <PlayerMatches matchGroups={player.matchGroups} />
        )}

        {activeTab === "stats" && (
          <PlayerStats
            season={player.season}
            seasonStats={player.seasonStats}
            performanceGroups={player.performanceGroups}
          />
        )}

        {activeTab === "career" && (
          <PlayerCareer careerGroups={player.careerGroups} />
        )}
      </section>
    </main>
  );
}
