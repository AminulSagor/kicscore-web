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

// ─── helpers ────────────────────────────────────────────────────────────────

/** Ordered keywords that map a round string to a canonical tier */
const ROUND_TIERS: { pattern: RegExp; tier: number; label: string }[] = [
  { pattern: /round of 16/i, tier: 1, label: "Round of 16" },
  { pattern: /quarter.?final/i, tier: 2, label: "Quarter-finals" },
  { pattern: /semi.?final/i, tier: 3, label: "Semi-finals" },
  { pattern: /\bfinal\b/i, tier: 5, label: "Final" },
  { pattern: /3rd.?place|third.?place|play.?off/i, tier: 4, label: "3rd Place" },
  { pattern: /round of 32/i, tier: 0, label: "Round of 32" },
  { pattern: /round of 64/i, tier: -1, label: "Round of 64" },
  { pattern: /knockout/i, tier: 1, label: "Knockout" },
];

function detectTier(round: string): { tier: number; label: string } | null {
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
        isFinal: /\bfinal\b/i.test(round) && !/semi|quarter|3rd|third/i.test(round),
        isThirdPlace: /3rd.?place|third.?place/i.test(round),
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

// ─── sub-components ─────────────────────────────────────────────────────────

function TeamFlag({ logo, name }: { logo: string; name: string }) {
  const validLogo = getValidTeamLogo(logo);
  if (!validLogo) {
    return (
      <span className="size-8 shrink-0 rounded-full border border-white/20 bg-white/10 dark:border-white/20 dark:bg-white/10 border-[#DDE8E3] bg-[#EAF3EF]" />
    );
  }
  return (
    <Image
      src={validLogo}
      alt={name}
      width={32}
      height={32}
      className="size-8 shrink-0 rounded-full object-contain"
    />
  );
}

function MatchCard({
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

  const scoreText = hasScore
    ? hasPen
      ? `${hg} - ${ag} (${hp} - ${ap})`
      : `${hg} - ${ag}`
    : "vs";

  const hw = match.teams.home.winner;
  const aw = match.teams.away.winner;

  return (
    <div
      className={`relative w-[168px] shrink-0 rounded-2xl border p-3 transition-all
        ${
          isFinal
            ? "border-[#F59E0B] bg-[#1e2e28] shadow-[0_0_24px_rgba(245,158,11,0.18)] dark:bg-[#1e2e28]"
            : "border-[#DDE8E3] bg-[#EAF3EF] dark:border-white/10 dark:bg-[#1a2b26]"
        }`}
    >
      {/* Teams row */}
      <div className="flex items-start justify-center gap-4">
        {/* Home */}
        <div className="flex flex-col items-center gap-1.5 min-w-[52px]">
          <TeamFlag logo={match.teams.home.logo} name={match.teams.home.name} />
          <span
            className={`text-center text-[11px] font-bold uppercase tracking-wide leading-tight ${
              hw === true
                ? "text-[#10201B] dark:text-white"
                : hasScore
                ? "text-[#6B7A75] dark:text-white/45"
                : "text-[#6B7A75] dark:text-white/60"
            }`}
          >
            {match.teams.home.name.slice(0, 3).toUpperCase()}
          </span>
        </div>

        {/* Away */}
        <div className="flex flex-col items-center gap-1.5 min-w-[52px]">
          <TeamFlag logo={match.teams.away.logo} name={match.teams.away.name} />
          <span
            className={`text-center text-[11px] font-bold uppercase tracking-wide leading-tight ${
              aw === true
                ? "text-[#10201B] dark:text-white"
                : hasScore
                ? "text-[#6B7A75] dark:text-white/45"
                : "text-[#6B7A75] dark:text-white/60"
            }`}
          >
            {match.teams.away.name.slice(0, 3).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Score */}
      <div className="mt-2.5 flex flex-col items-center gap-1">
        <span
          className={`text-sm font-bold tracking-wide ${
            isFinal ? "text-[#10201B] dark:text-white" : "text-[#10201B] dark:text-white/90"
          }`}
        >
          {scoreText}
        </span>

        {isFinal && (
          <span className="rounded-sm bg-[#F59E0B] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#10201B]">
            FINAL
          </span>
        )}

        {isThirdPlace && !isFinal && (
          <span className="rounded-sm bg-[#6B7A75]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#6B7A75] dark:text-white/50">
            3rd Place
          </span>
        )}
      </div>
    </div>
  );
}

/** Vertical connector line between rounds */
function Connector({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <div className="flex flex-col items-center py-1">
      <div className="h-6 w-px bg-[#DDE8E3] dark:bg-white/15" />
    </div>
  );
}

/** Placeholder skeleton card */
function PlaceholderCard() {
  return (
    <div className="w-[168px] shrink-0 rounded-2xl border border-[#DDE8E3] bg-[#EAF3EF] p-3 dark:border-white/10 dark:bg-[#1a2b26]">
      <div className="flex items-start justify-center gap-4">
        {[0, 1].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 min-w-[52px]">
            <span className="size-8 rounded-full bg-[#DDE8E3] dark:bg-white/10 animate-pulse" />
            <span className="h-2.5 w-8 rounded bg-[#DDE8E3] dark:bg-white/10 animate-pulse" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-col items-center gap-1.5">
        <span className="h-3 w-12 rounded bg-[#DDE8E3] dark:bg-white/10 animate-pulse" />
      </div>
    </div>
  );
}

/** Champion badge shown next to the final */
function ChampionBadge({ team }: { team: FixtureTeam | null }) {
  const logo = team ? getValidTeamLogo(team.logo) : null;

  return (
    <div className="flex flex-col items-center gap-2.5 pl-4">
      <div className="flex size-14 items-center justify-center rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10">
        <Trophy size={26} strokeWidth={1.8} className="text-[#F59E0B]" />
      </div>

      {logo && (
        <Image
          src={logo}
          alt={team!.name}
          width={32}
          height={32}
          className="size-8 rounded-full object-contain"
        />
      )}

      <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B7A75] dark:text-white/55">
        Champion
      </span>
    </div>
  );
}

// ─── main export ─────────────────────────────────────────────────────────────

export default function KnockoutTab({ fixtures = [] }: Props) {
  const rounds = buildRounds(fixtures);

  // ── Separate "final" and "3rd place" from main bracket rounds ──
  const mainRounds = rounds.filter((r) => !r.isThirdPlace);
  const thirdPlaceRound = rounds.find((r) => r.isThirdPlace);
  const finalRound = mainRounds.find((r) => r.isFinal);

  // Champion = winner of the final match (if played)
  const finalMatch = finalRound?.matches[0] ?? null;
  const champion = finalMatch ? getWinner(finalMatch) : null;

  // ── Empty state ──
  if (rounds.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-[#DDE8E3] bg-[#EAF3EF] p-8 dark:border-white/10 dark:bg-[#111d1a]">
        {/* Placeholder header */}
        <p className="mb-6 text-center text-sm font-semibold text-[#6B7A75] dark:text-white/45">
          Knockout bracket — no data available for this season
        </p>

        {/* Placeholder bracket */}
        <div className="flex flex-col items-center gap-0">
          {[
            { label: "Quarter-finals", count: 4 },
            { label: "Semi-finals", count: 2 },
            { label: "Final", count: 1, isFinal: true },
          ].map((tier, idx) => (
            <div key={idx} className="flex w-full flex-col items-center">
              {/* Round label */}
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#6B7A75] dark:text-white/35">
                {tier.label}
              </p>

              {/* Cards row */}
              <div
                className={`flex items-center gap-4 ${
                  tier.isFinal ? "justify-center" : "justify-center flex-wrap"
                }`}
              >
                {Array.from({ length: tier.count }).map((_, i) => (
                  <PlaceholderCard key={i} />
                ))}
              </div>

              {/* Connector */}
              {idx < 2 && <Connector count={1} />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-[#DDE8E3] bg-[#EAF3EF] p-5 dark:border-white/10 dark:bg-[#111d1a] sm:p-6">
      <div className="flex flex-col items-center">
        {mainRounds.map((round, idx) => {
          const isLast = idx === mainRounds.length - 1;

          return (
            <div key={round.tier} className="flex w-full flex-col items-center">
              {/* Round label */}
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#6B7A75] dark:text-white/40">
                {round.label}
              </p>

              {/* Match cards + optional champion badge for final */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {round.matches.map((match) => (
                  <MatchCard
                    key={match.fixture.id}
                    match={match}
                    isFinal={round.isFinal}
                    isThirdPlace={round.isThirdPlace}
                  />
                ))}

                {/* Champion badge only next to the final */}
                {round.isFinal && <ChampionBadge team={champion} />}
              </div>

              {/* Connector between rounds */}
              {!isLast && (
                <div className="my-1 h-8 w-px bg-[#DDE8E3] dark:bg-white/15" />
              )}
            </div>
          );
        })}

        {/* 3rd Place play-off (shown after final, below the main bracket) */}
        {thirdPlaceRound && (
          <>
            <div className="my-5 h-px w-full bg-[#DDE8E3] dark:bg-white/10" />
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#6B7A75] dark:text-white/40">
              {thirdPlaceRound.label}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {thirdPlaceRound.matches.map((match) => (
                <MatchCard
                  key={match.fixture.id}
                  match={match}
                  isThirdPlace
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
