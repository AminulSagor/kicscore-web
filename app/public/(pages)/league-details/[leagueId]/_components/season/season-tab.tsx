"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { LeagueSeason } from "@/types/football/leagues/league.details";
import SeasonCard from "./season-card";
import { getSeasonHistory } from "@/service/football/leagues/season.history.service";
import type { SeasonHistoryItem } from "@/types/football/leagues/season.history.types";

type Props = {
  seasons: LeagueSeason[];
  activeSeason: string;
};

export default function SeasonTab({ seasons, activeSeason }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ leagueId: string }>();

  const sortedSeasons = [...seasons].sort((a, b) => b.year - a.year);

  const [remoteSeasons, setRemoteSeasons] = useState<LeagueSeason[] | null>(null);
  const [remoteHistoryItems, setRemoteHistoryItems] = useState<SeasonHistoryItem[] | null>(null);
  const [loadingRemoteSeasons, setLoadingRemoteSeasons] = useState(false);
  const [remoteSeasonsError, setRemoteSeasonsError] = useState<string | null>(null);

  const handleSeasonClick = (year: number) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("season", String(year));
    currentParams.set("fixturePage", "1");
    currentParams.delete("fixtureDate");

    router.push(
      `/public/league-details/${params.leagueId}?${currentParams.toString()}`,
      { scroll: false }
    );
  };

  useEffect(() => {
    // Only fetch season history for World Cup (leagueId === "1")
    if (params.leagueId !== "1") return;

    let mounted = true;

    const fetchHistory = async () => {
      try {
        setLoadingRemoteSeasons(true);
        setRemoteSeasonsError(null);

        const data = await getSeasonHistory(params.leagueId);

        if (!mounted) return;

        // Map SeasonHistoryItem to LeagueSeason
  const mapped: LeagueSeason[] = (data.seasons || []).map((s: SeasonHistoryItem) => ({
          year: s.season,
          start: "",
          end: "",
          current: s.status === "PENDING",
          coverage: {
            fixtures: { events: false, lineups: false, statistics_fixtures: false, statistics_players: false },
            standings: s.status === "COMPLETED",
            players: false,
            top_scorers: false,
            top_assists: false,
            top_cards: false,
            injuries: false,
            predictions: false,
            odds: false,
          },
        }));

        setRemoteSeasons(mapped);
  setRemoteHistoryItems(data.seasons || []);
      } catch (err: any) {
        if (!mounted) return;
        setRemoteSeasonsError(err?.message ?? "Failed to load season history");
      } finally {
        if (mounted) setLoadingRemoteSeasons(false);
      }
    };

    fetchHistory();

    return () => {
      mounted = false;
    };
  }, [params.leagueId]);

  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="mb-6 text-xl font-bold text-[#10201B] dark:text-white sm:text-2xl">
        Completed Seasons
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(remoteSeasons ?? sortedSeasons).map((season) => {
          const historyItem = remoteHistoryItems?.find(h => h.season === season.year) ?? null;

          return (
            <SeasonCard 
              key={season.year} 
              season={season} 
              leagueId={params.leagueId}
              isActive={String(season.year) === activeSeason} 
              onClick={() => handleSeasonClick(season.year)}
              winnerFromHistory={historyItem?.winner ?? null}
              runnerUpFromHistory={historyItem?.runnerUp ?? null}
            />
          );
        })}
      </div>

      {loadingRemoteSeasons && (
        <p className="mt-4 text-sm text-muted">Loading seasons...</p>
      )}

      {remoteSeasonsError && (
        <p className="mt-4 text-sm text-red-500">{remoteSeasonsError}</p>
      )}
    </div>
  );
}
