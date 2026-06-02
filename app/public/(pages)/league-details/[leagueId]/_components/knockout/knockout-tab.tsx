"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy } from "lucide-react";
import Image from "next/image";

import type {
  FixtureTeam,
  LeagueFixtureItem,
} from "@/types/football/fixtures/fixture.types";
import { getValidTeamLogo } from "@/utils/image/team-logo.utils";

type Props = {
  fixtures?: LeagueFixtureItem[];
};

const ROUND_TIERS = [
  { pattern: /round of 16/i, tier: 1, label: "Round of 16" },
  { pattern: /quarter.?final/i, tier: 2, label: "Quarter-finals" },
  { pattern: /semi.?final/i, tier: 3, label: "Semi-finals" },
  { pattern: /3rd.?place|third.?place|play.?off|bronze/i, tier: 4, label: "3rd Place" },
  { pattern: /\bfinal\b/i, tier: 5, label: "Final" },
  { pattern: /round of 32/i, tier: 0, label: "Round of 32" },
  { pattern: /round of 64/i, tier: -1, label: "Round of 64" },
  { pattern: /knockout/i, tier: 1, label: "Knockout" },
];

function detectTier(round: string) {
  for (const { pattern, tier, label } of ROUND_TIERS) {
    if (pattern.test(round)) return { tier, label };
  }
  return null;
}

interface KnockoutRound {
  tier: number;
  label: string;
  matches: LeagueFixtureItem[];
  isFinal: boolean;
  isThirdPlace: boolean;
}

function buildRounds(fixtures: LeagueFixtureItem[]): KnockoutRound[] {
  const map = new Map<number, KnockoutRound>();
  for (const fixture of fixtures) {
    const round = fixture.league.round ?? "";
    const detected = detectTier(round);
    if (!detected) continue;

    const { tier, label } = detected;
    if (!map.has(tier)) {
      map.set(tier, {
        tier,
        label,
        matches: [],
        isFinal: /\bfinal\b/i.test(round) && !/semi|quarter|3rd|third|bronze/i.test(round),
        isThirdPlace: /3rd.?place|third.?place|bronze/i.test(round),
      });
    }
    map.get(tier)!.matches.push(fixture);
  }
  return Array.from(map.values()).sort((a, b) => a.tier - b.tier);
}

function getWinner(match: LeagueFixtureItem): FixtureTeam | null {
  if (match.teams.home.winner) return match.teams.home;
  if (match.teams.away.winner) return match.teams.away;
  return null;
}

function TeamFlag({ logo, name }: { logo: string; name: string }) {
  const validLogo = getValidTeamLogo(logo);
  if (!validLogo) {
    return (
      <span className="flex size-3 sm:size-5 shrink-0 items-center justify-center rounded-full border border-[#DDE8E3] bg-[#EAF3EF] dark:border-white/20 dark:bg-white/10" />
    );
  }
  return (
    <Image
      src={validLogo}
      alt={name}
      width={20}
      height={20}
      className="size-3 sm:size-5 shrink-0 rounded-full object-contain bg-white"
    />
  );
}

function MatchBox({
  match,
  isFinal = false,
  isThirdPlace = false,
}: {
  match: LeagueFixtureItem;
  isFinal?: boolean;
  isThirdPlace?: boolean;
}) {
  const hg = match.goals.home;
  const ag = match.goals.away;
  const hp = match.score.penalty.home;
  const ap = match.score.penalty.away;
  const hasPen = hp !== null && ap !== null;
  const hasScore = hg !== null && ag !== null;

  const dateStr = new Date(match.fixture.timestamp * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const scoreText = hasScore
    ? hasPen
      ? `${hg} - ${ag} (${hp} - ${ap})`
      : `${hg} - ${ag}`
    : dateStr;

  const hw = match.teams.home.winner;
  const aw = match.teams.away.winner;

  return (
    <div
      className={`relative z-10 flex w-full flex-col justify-center rounded-xl border p-1 sm:p-2.5 min-h-[50px] sm:min-h-[72px] transition-all ${
        isFinal
          ? "border-[#F59E0B] bg-[#1e2e28] shadow-[0_0_24px_rgba(245,158,11,0.18)] dark:bg-[#1e2e28]"
          : "border-[#DDE8E3] bg-white hover:bg-gray-50 dark:border-white/10 dark:bg-[#1a2b26] dark:hover:bg-[#223630]"
      }`}
    >
      <div className="flex w-full items-center justify-between gap-1 sm:gap-2">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:gap-1.5">
          <div className="flex min-w-0 items-center gap-1 sm:gap-2">
            <TeamFlag logo={match.teams.home.logo} name={match.teams.home.name} />
            <span
              className={`flex-1 min-w-0 truncate text-[9px] sm:text-xs font-semibold ${
                hw ? "text-[#10201B] font-bold dark:text-white" : "text-[#6B7A75] dark:text-white/70"
              }`}
              title={match.teams.home.name}
            >
              {match.teams.home.name.length > 12
                ? match.teams.home.name.slice(0, 12) + "..."
                : match.teams.home.name}
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-1 sm:gap-2">
            <TeamFlag logo={match.teams.away.logo} name={match.teams.away.name} />
            <span
              className={`flex-1 min-w-0 truncate text-[9px] sm:text-xs font-semibold ${
                aw ? "text-[#10201B] font-bold dark:text-white" : "text-[#6B7A75] dark:text-white/70"
              }`}
              title={match.teams.away.name}
            >
              {match.teams.away.name.length > 12
                ? match.teams.away.name.slice(0, 12) + "..."
                : match.teams.away.name}
            </span>
          </div>
        </div>

        {hasScore && (
          <div className="ml-0.5 sm:ml-1 flex shrink-0 flex-col items-end gap-0.5 sm:gap-1.5">
            <span
              className={`text-[9px] sm:text-xs font-bold ${
                hw ? "text-[#10201B] dark:text-white" : "text-[#6B7A75] dark:text-white/70"
              }`}
            >
              {hg}
            </span>
            <span
              className={`text-[9px] sm:text-xs font-bold ${
                aw ? "text-[#10201B] dark:text-white" : "text-[#6B7A75] dark:text-white/70"
              }`}
            >
              {ag}
            </span>
          </div>
        )}
      </div>

      <div className="mt-1 sm:mt-2 border-t border-[#DDE8E3] pt-1 sm:pt-1.5 text-center dark:border-white/10">
        <span className="text-[7px] sm:text-[10px] font-bold text-[#6B7A75] dark:text-white/50">
          {hasScore && hasPen ? `Pen: ${hp}-${ap}` : scoreText}
        </span>
      </div>

      {isFinal && (
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded bg-[#F59E0B] px-2 py-0.5 text-[9px] font-bold text-[#10201B]">
          FINAL
        </div>
      )}
      {isThirdPlace && (
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded bg-[#3B82F6] px-2 py-0.5 text-[9px] font-bold text-white">
          BRONZE-FINAL
        </div>
      )}
    </div>
  );
}

export default function KnockoutTab({ fixtures = [] }: Props) {
  const rounds = buildRounds(fixtures);
  const mainRounds = rounds.filter((r) => !r.isThirdPlace);
  const thirdPlaceRound = rounds.find((r) => r.isThirdPlace);
  const finalRound = mainRounds.find((r) => r.isFinal);

  // Exclude final from tree branches
  const treeRounds = mainRounds.filter((r) => !r.isFinal);

  // Split into left and right branches
  const leftRounds = treeRounds.map((r) => ({
    ...r,
    matches: r.matches.slice(0, Math.ceil(r.matches.length / 2)),
  }));

  const rightRounds = treeRounds.map((r) => ({
    ...r,
    matches: r.matches.slice(Math.ceil(r.matches.length / 2)),
  }));

  // Pick the final match by latest timestamp to ensure correct champion
  const finalMatch =
    finalRound && finalRound.matches && finalRound.matches.length
      ? finalRound.matches.reduce((a, b) =>
          (a.fixture.timestamp ?? 0) > (b.fixture.timestamp ?? 0) ? a : b,
        )
      : null;

  const champion = finalMatch ? getWinner(finalMatch) : null;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        // Assume our bracket needs around 800px to look good without squishing
        const targetWidth = 800;
        if (width < targetWidth) {
          const newScale = width / targetWidth;
          setScale(newScale);
          // Assuming the bracket's unscaled height is around 500px min.
          // We let the inner content dictate its height, then scale it.
          const innerHeight = container.firstElementChild?.scrollHeight || 500;
          setScaledHeight(innerHeight * newScale);
        } else {
          setScale(1);
          setScaledHeight(undefined);
        }
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  if (rounds.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-[#DDE8E3] bg-[#EAF3EF] p-8 text-center text-sm font-semibold text-[#6B7A75] dark:border-white/10 dark:bg-[#111d1a] dark:text-white/45">
        Knockout bracket — no data available for this season
      </div>
    );
  }

  return (
    <div className="mt-6 w-full" ref={containerRef} style={{ height: scaledHeight ? `${scaledHeight}px` : "auto" }}>
      {/* Knockout Bracket */}
      <div 
        className="w-full origin-top-left rounded-2xl border border-[#DDE8E3] bg-[#F4F8F6] dark:border-white/10 dark:bg-[#111d1a]"
        style={{ 
          transform: scale < 1 ? `scale(${scale})` : "none", 
          width: scale < 1 ? "800px" : "100%",
        }}
      >
        <div className="flex min-h-[480px] w-full items-stretch justify-center gap-2 px-2 py-6 sm:gap-4 sm:px-4 sm:py-10 md:gap-6 lg:px-6">
          {/* Left Tree */}
          <div className="flex flex-1 min-w-0 items-stretch justify-end gap-1 sm:gap-4 lg:gap-8">
            {leftRounds.map((round, rIdx) => {
              const isLastRound = rIdx === leftRounds.length - 1;
              return (
                <div key={`left-r${rIdx}`} className="flex w-[110px] flex-col items-center">
                  <div className="mb-3 w-full truncate text-center text-[10px] font-bold uppercase tracking-widest text-[#6B7A75] dark:text-white/40 sm:mb-4">
                    {round.label}
                  </div>
                  {round.matches.map((match, mIdx) => (
                    <div key={match.fixture.id} className="relative flex w-full flex-1 flex-col justify-center py-2 sm:py-3">
                      {/* Horizontal In */}
                      {rIdx > 0 && (
                        <div className="absolute right-full top-1/2 w-2 border-t border-[#DDE8E3] dark:border-white/15 sm:w-4" />
                      )}

                      <MatchBox match={match} />

                      {/* Horizontal Out */}
                      <div className="absolute left-full top-1/2 w-2 border-t border-[#DDE8E3] dark:border-white/15 sm:w-4" />

                      {/* Vertical Line */}
                      {!isLastRound && (
                        <div
                          className={`absolute left-[calc(100%+8px)] w-px bg-[#DDE8E3] dark:bg-white/15 sm:left-[calc(100%+16px)] ${
                            mIdx % 2 === 0 ? "top-1/2 h-1/2" : "bottom-1/2 h-1/2"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Center / Finals */}
          <div className="relative flex w-[110px] flex-col items-center">
            {/* Champion Section positioned at the very top of the column */}
            {champion && (
              <div className="absolute top-0 z-20 flex flex-col items-center gap-2 sm:gap-3">
                <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#F59E0B] bg-[#F59E0B]/15 shadow-lg sm:size-14">
                  <Trophy className="h-5 w-5 text-[#F59E0B] sm:h-7 sm:w-7" strokeWidth={1.8} />
                </div>
                <TeamFlag logo={champion.logo} name={champion.name} />
                <div className="w-full text-center">
                  <span className="block w-full truncate text-[10px] font-bold text-[#F59E0B] sm:text-xs">{champion.name}</span>
                  <span className="block w-full truncate text-[8px] font-bold uppercase tracking-widest text-[#F59E0B] sm:text-[10px]">
                    Champion
                  </span>
                </div>
              </div>
            )}

            {/* Hidden spacer label to match the top spacing of side trees */}
            <div className="mb-3 w-full select-none truncate text-center text-[9px] font-bold uppercase tracking-widest text-transparent sm:mb-4">
              Spacer
            </div>

            {/* This flex-1 container ensures the Final perfectly aligns horizontally with the side trees */}
            <div className="relative flex w-full flex-1 flex-col items-center justify-center">
              {finalMatch && (
                <div className="relative z-10 flex w-full flex-col items-center justify-center">
                  <div className="absolute bottom-[calc(100%+8px)] w-full truncate text-center text-[9px] font-bold uppercase tracking-widest text-[#F59E0B] sm:bottom-[calc(100%+12px)]">
                    Final
                  </div>
                  <div className="relative w-full">
                    {leftRounds.length > 0 && (
                      <div className="absolute right-full top-1/2 w-2 border-t border-[#DDE8E3] dark:border-white/15 sm:w-4" />
                    )}
                    {rightRounds.length > 0 && (
                      <div className="absolute left-full top-1/2 w-2 border-t border-[#DDE8E3] dark:border-white/15 sm:w-4" />
                    )}
                    <MatchBox match={finalMatch} isFinal />
                  </div>
                </div>
              )}
            </div>

            {/* Third Place positioned at the bottom */}
            {thirdPlaceRound && thirdPlaceRound.matches[0] && (
              <div className="absolute bottom-0 z-10 flex w-full flex-col items-center">
                <div className="mb-2 w-full truncate text-center text-[9px] font-bold uppercase tracking-widest text-[#6B7A75] dark:text-white/40">
                  3rd Place
                </div>
                <MatchBox match={thirdPlaceRound.matches[0]} isThirdPlace />
              </div>
            )}
          </div>

        {/* Right Tree */}
        <div className="flex flex-1 min-w-0 flex-row-reverse items-stretch justify-end gap-1 sm:gap-4 lg:gap-8">
          {rightRounds.map((round, rIdx) => {
            const isLastRound = rIdx === rightRounds.length - 1;
            return (
              <div key={`right-r${rIdx}`} className="flex w-[110px] flex-col items-center">
                <div className="mb-3 w-full truncate text-center text-[10px] font-bold uppercase tracking-widest text-[#6B7A75] dark:text-white/40 sm:mb-4">
                  {round.label}
                </div>
                {round.matches.map((match, mIdx) => (
                  <div key={match.fixture.id} className="relative flex w-full flex-1 flex-col justify-center py-2 sm:py-3">
                    {/* Horizontal In (from center to right physically) */}
                    {rIdx > 0 && (
                      <div className="absolute left-full top-1/2 w-2 border-t border-[#DDE8E3] dark:border-white/15 sm:w-4" />
                    )}

                    <MatchBox match={match} />

                    {/* Horizontal Out (to left physically) */}
                    <div className="absolute right-full top-1/2 w-2 border-t border-[#DDE8E3] dark:border-white/15 sm:w-4" />

                    {/* Vertical Line */}
                    {!isLastRound && (
                      <div
                        className={`absolute right-[calc(100%+8px)] w-px bg-[#DDE8E3] dark:bg-white/15 sm:right-[calc(100%+16px)] ${
                          mIdx % 2 === 0 ? "top-1/2 h-1/2" : "bottom-1/2 h-1/2"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
}
