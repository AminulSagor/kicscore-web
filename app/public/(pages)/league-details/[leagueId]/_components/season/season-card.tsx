"use client";

import { useEffect, useState } from "react";
import { LeagueSeason } from "@/types/football/leagues/league.details";
import { CalendarCheck, Calendar } from "lucide-react";
import Image from "next/image";
import { getSeasonWinners, SeasonWinnerData } from "@/service/football/leagues/season.winners.action";

type Props = {
  season: LeagueSeason;
  leagueId: string;
  isActive: boolean;
  onClick: () => void;
  winnerFromHistory?: { id?: string | null; name?: string | null; logo?: string | null } | null;
  runnerUpFromHistory?: { id?: string | null; name?: string | null; logo?: string | null } | null;
};

export default function SeasonCard({ season, leagueId, isActive, onClick, winnerFromHistory, runnerUpFromHistory }: Props) {
  const [winnerData, setWinnerData] = useState<SeasonWinnerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchWinners = async () => {
      setLoading(true);
      const data = await getSeasonWinners(leagueId, String(season.year));
      if (mounted) {
        setWinnerData(data);
        setLoading(false);
      }
    };

    // If history provides winner/runnerUp, use that and skip fetching
    if (winnerFromHistory || runnerUpFromHistory) {
      const mapped: SeasonWinnerData = {
        winner: winnerFromHistory && winnerFromHistory.name ? { name: winnerFromHistory.name, logo: winnerFromHistory.logo ?? "" } : null,
        runnerUp: runnerUpFromHistory && runnerUpFromHistory.name ? { name: runnerUpFromHistory.name, logo: runnerUpFromHistory.logo ?? "" } : null,
      };

      if (mounted) {
        setWinnerData(mapped);
        setLoading(false);
      }
    } else if (season.coverage.standings) {
      // fallback to original behavior
      fetchWinners();
    } else {
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [leagueId, season, winnerFromHistory, runnerUpFromHistory]);

  return (
    <button
      onClick={onClick}
      className={`relative flex w-full flex-col rounded-2xl border p-5 text-left transition-all hover:-translate-y-1 hover:shadow-lg ${
        isActive
          ? "border-[#10201B] bg-[#EAF3EF] dark:border-white/20 dark:bg-white/10"
          : "border-[#DDE8E3] bg-card dark:border-white/10 dark:bg-card-dark"
      }`}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <h3 className="text-xl font-bold text-[#10201B] dark:text-white">
          {season.year}
        </h3>
        {season.current && (
          <span className="rounded-full bg-secondary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-secondary">
            Current
          </span>
        )}
      </div>
      
      {loading ? (
        <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-4 shadow-sm dark:bg-white/5 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-full dark:bg-white/10" />
          <div className="h-px w-full bg-[#DDE8E3] dark:bg-white/10" />
          <div className="h-6 bg-gray-200 rounded w-full dark:bg-white/10" />
        </div>
      ) : winnerData && winnerData.winner ? (
        <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-4 shadow-sm dark:bg-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B7A75] dark:text-white/60">
              Champion
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#10201B] dark:text-white">
                {winnerData.winner.name}
              </span>
              <Image
                src={winnerData.winner.logo}
                alt={winnerData.winner.name}
                width={20}
                height={20}
                className="rounded-full bg-white object-contain"
              />
            </div>
          </div>
          <div className="h-px w-full bg-[#DDE8E3] dark:bg-white/10" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#6B7A75] dark:text-white/60">
              Runner-up
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#10201B] dark:text-white">
                {winnerData.runnerUp?.name ?? "-"}
              </span>
              {winnerData.runnerUp && (
                <Image
                  src={winnerData.runnerUp.logo}
                  alt={winnerData.runnerUp.name}
                  width={20}
                  height={20}
                  className="rounded-full bg-white object-contain"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm font-medium text-[#6B7A75] dark:text-white/70">
            <Calendar className="h-4 w-4 text-secondary" />
            <span>Start: {season.start}</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium text-[#6B7A75] dark:text-white/70">
            <CalendarCheck className="h-4 w-4 text-secondary" />
            <span>End: {season.end}</span>
          </div>
        </div>
      )}
    </button>
  );
}
