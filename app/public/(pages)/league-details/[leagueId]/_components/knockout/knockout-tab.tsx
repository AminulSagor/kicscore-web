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
        const innerContainer = container.firstElementChild as HTMLElement;
        if (!innerContainer) continue;

        // Use a fixed virtual width based on max possible matches to prevent feedback loops
        const isMobile = window.innerWidth < 768;
        const virtualWidth = isMobile ? Math.max(leftRounds[0]?.matches.length * 150 + 40, 800) : 800;

        if (width < virtualWidth) {
          const newScale = width / virtualWidth;
          setScale(newScale);
          
          // Let the inner content dictate its height, then scale it
          const innerHeight = innerContainer.scrollHeight;
          setScaledHeight(innerHeight * newScale);
        } else {
          setScale(1);
          setScaledHeight(undefined);
        }
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [leftRounds]);

  if (rounds.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-[#DDE8E3] bg-[#EAF3EF] p-8 text-center text-sm font-semibold text-[#6B7A75] dark:border-white/10 dark:bg-[#111d1a] dark:text-white/45">
        Knockout bracket — no data available for this season
      </div>
    );
  }

  return (
    <div className="mt-6 w-full" ref={containerRef} style={{ height: scaledHeight ? `${scaledHeight}px` : "auto" }}>
      {/* Responsive Bracket Container */}
      <div 
        className="w-full origin-top-left rounded-2xl border border-[#DDE8E3] bg-[#F4F8F6] dark:border-white/10 dark:bg-[#111d1a] overflow-hidden"
        style={{ 
          transform: scale < 1 ? `scale(${scale})` : "none", 
          width: scale < 1 ? `${Math.max((leftRounds[0]?.matches.length || 0) * 150 + 40, 800)}px` : "100%",
        }}
      >
        <div className="flex flex-col md:flex-row min-w-fit min-h-[480px] w-full items-center md:items-stretch justify-center gap-4 px-4 py-10 lg:gap-6 lg:px-6">
          
          {/* Top Tree (Mobile) / Left Tree (Desktop) */}
          <div className="flex flex-col md:flex-row flex-1 min-w-0 items-center md:items-stretch justify-center md:justify-end gap-12 md:gap-4 lg:gap-8">
            {leftRounds.map((round, rIdx) => {
              const isLastRound = rIdx === leftRounds.length - 1;
              return (
                <div key={`left-r${rIdx}`} className="flex flex-col items-center md:w-[120px]">
                  <div className="mb-4 w-full truncate text-center text-[10px] font-bold uppercase tracking-widest text-[#6B7A75] dark:text-white/40">
                    {round.label}
                  </div>
                  <div className="flex flex-row md:flex-col flex-1 items-stretch justify-center w-full">
                    {round.matches.map((match, mIdx) => (
                      <div key={match.fixture.id} className="relative flex flex-1 w-[150px] md:w-full flex-col justify-center py-0 px-2 md:py-3 md:px-0">
                        {/* Horizontal / Vertical In */}
                        {rIdx > 0 && (
                          <div className="absolute bottom-full md:bottom-auto md:right-full left-1/2 md:left-auto md:top-1/2 h-6 md:h-auto md:w-4 border-l md:border-l-0 md:border-t border-[#DDE8E3] dark:border-white/15" />
                        )}

                        <MatchBox match={match} />

                        {/* Horizontal / Vertical Out */}
                        <div className="absolute top-full md:top-auto md:left-full left-1/2 md:left-auto md:top-1/2 h-6 md:h-auto md:w-4 border-l md:border-l-0 md:border-t border-[#DDE8E3] dark:border-white/15" />

                        {/* Connecting Line */}
                        {!isLastRound && (
                          <div
                            className={`absolute border-[#DDE8E3] dark:border-white/15 
                              top-[calc(100%+24px)] md:top-auto md:left-[calc(100%+16px)] 
                              h-px md:h-1/2 w-1/2 md:w-px 
                              ${mIdx % 2 === 0 
                                ? "left-1/2 md:left-auto md:top-1/2" 
                                : "right-1/2 md:right-auto md:bottom-1/2"
                              }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center / Finals */}
          <div className="relative flex flex-row md:flex-col w-full md:w-[120px] items-center justify-center gap-6 md:gap-0 mt-8 mb-8 md:mt-0 md:mb-0">
            {/* Champion Section */}
            {champion && (
              <div className="md:absolute md:top-0 z-20 flex flex-col items-center gap-3">
                <div className="flex size-14 items-center justify-center rounded-full border-2 border-[#F59E0B] bg-[#F59E0B]/15 shadow-lg">
                  <Trophy className="h-7 w-7 text-[#F59E0B]" strokeWidth={1.8} />
                </div>
                <TeamFlag logo={champion.logo} name={champion.name} />
                <div className="w-full text-center">
                  <span className="block w-full truncate text-xs font-bold text-[#F59E0B]">{champion.name}</span>
                  <span className="block w-full truncate text-[10px] font-bold uppercase tracking-widest text-[#F59E0B]">
                    Champion
                  </span>
                </div>
              </div>
            )}

            {/* Hidden spacer label for desktop */}
            <div className="hidden md:block mb-4 w-full select-none truncate text-center text-[10px] font-bold uppercase tracking-widest text-transparent">
              Spacer
            </div>

            {/* Final */}
            <div className="relative flex flex-col w-[150px] md:w-full md:flex-1 items-center justify-center">
              {finalMatch && (
                <div className="relative z-10 flex w-full flex-col items-center justify-center">
                  <div className="absolute bottom-[calc(100%+12px)] w-full truncate text-center text-[10px] font-bold uppercase tracking-widest text-[#F59E0B]">
                    Final
                  </div>
                  <div className="relative w-full">
                    {leftRounds.length > 0 && (
                      <div className="absolute bottom-full md:bottom-auto md:right-full left-1/2 md:left-auto md:top-1/2 h-6 md:h-auto md:w-4 border-l md:border-l-0 md:border-t border-[#DDE8E3] dark:border-white/15" />
                    )}
                    {rightRounds.length > 0 && (
                      <div className="absolute top-full md:top-auto md:left-full left-1/2 md:left-auto md:top-1/2 h-6 md:h-auto md:w-4 border-l md:border-l-0 md:border-t border-[#DDE8E3] dark:border-white/15" />
                    )}
                    <MatchBox match={finalMatch} isFinal />
                  </div>
                </div>
              )}
            </div>

            {/* Third Place */}
            {thirdPlaceRound && thirdPlaceRound.matches[0] && (
              <div className="md:absolute md:bottom-0 z-10 flex w-[150px] md:w-full flex-col items-center">
                <div className="mb-2 w-full truncate text-center text-[10px] font-bold uppercase tracking-widest text-[#6B7A75] dark:text-white/40">
                  3rd Place
                </div>
                <MatchBox match={thirdPlaceRound.matches[0]} isThirdPlace />
              </div>
            )}
          </div>

          {/* Bottom Tree (Mobile) / Right Tree (Desktop) */}
          <div className="flex flex-col-reverse md:flex-row-reverse flex-1 min-w-0 items-center md:items-stretch justify-center md:justify-end gap-12 md:gap-4 lg:gap-8 mt-4 md:mt-0">
            {rightRounds.map((round, rIdx) => {
              const isLastRound = rIdx === rightRounds.length - 1;
              return (
                <div key={`right-r${rIdx}`} className="flex flex-col items-center md:w-[120px]">
                  <div className="mb-4 w-full truncate text-center text-[10px] font-bold uppercase tracking-widest text-[#6B7A75] dark:text-white/40">
                    {round.label}
                  </div>
                  <div className="flex flex-row md:flex-col flex-1 items-stretch justify-center w-full">
                    {round.matches.map((match, mIdx) => (
                      <div key={match.fixture.id} className="relative flex flex-1 w-[150px] md:w-full flex-col justify-center py-0 px-2 md:py-3 md:px-0">
                        {/* Line In */}
                        {rIdx > 0 && (
                          <div className="absolute top-full md:top-auto md:left-full left-1/2 md:left-auto md:top-1/2 h-6 md:h-auto md:w-4 border-l md:border-l-0 md:border-t border-[#DDE8E3] dark:border-white/15" />
                        )}

                        <MatchBox match={match} />

                        {/* Line Out */}
                        <div className="absolute bottom-full md:bottom-auto md:right-full left-1/2 md:left-auto md:top-1/2 h-6 md:h-auto md:w-4 border-l md:border-l-0 md:border-t border-[#DDE8E3] dark:border-white/15" />

                        {/* Connecting Line */}
                        {!isLastRound && (
                          <div
                            className={`absolute border-[#DDE8E3] dark:border-white/15 
                              bottom-[calc(100%+24px)] md:bottom-auto md:right-[calc(100%+16px)] 
                              h-px md:h-1/2 w-1/2 md:w-px 
                              ${mIdx % 2 === 0 
                                ? "left-1/2 md:left-auto md:top-1/2" 
                                : "right-1/2 md:right-auto md:bottom-1/2"
                              }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

