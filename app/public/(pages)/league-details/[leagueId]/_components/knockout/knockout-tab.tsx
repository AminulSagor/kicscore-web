"use client";

import { CSSProperties, useMemo } from "react";
import Image from "next/image";
import type { LeagueFixtureItem } from "@/types/football/fixtures/fixture.types";
import { getValidTeamLogo } from "@/utils/image/team-logo.utils";

type Props = { fixtures?: LeagueFixtureItem[] };
type Match = {
  id: string; left: string; right: string; date: string;
  leftLogo?: string | null; rightLogo?: string | null;
  tag?: "FINAL" | "BRONZE-FINAL"; winner?: "left" | "right";
  raw?: LeagueFixtureItem | null;
};
type Side = "left" | "right";

// ─── Constants ────────────────────────────────────────────────────────────────
const DW = 160;  // desktop card width
const CH = 68;   // card height (shared)
const MW = 92;  // mobile card width
const D_STEP = 200; // desktop: distance between column left-edges (card + gap)
const M_STEP = 118; // mobile: distance between row top-edges (card + gap)
const M_CARD_GAP = 6; // mobile: gap between cards side-by-side in a row

const CENTER_W = 240; // desktop center panel width
const CENTER_H = 190; // mobile center panel height

// ─── Round detection ──────────────────────────────────────────────────────────
const TIERS = [
  { p: /round of 64/i, t: -1 },
  { p: /round of 32/i, t: 0 },
  { p: /round of 16/i, t: 1 },
  { p: /quarter.?final/i, t: 2 },
  { p: /semi.?final/i, t: 3 },
  { p: /3rd.?place|third.?place|play.?off|bronze/i, t: 4 },
  { p: /\bfinal\b/i, t: 5 },
  { p: /knockout/i, t: 1 },
];

function detectTier(round = "") {
  for (const { p, t } of TIERS) if (p.test(round)) return t;
  return null;
}

function buildRounds(fixtures: LeagueFixtureItem[]) {
  const map = new Map<number, {
    tier: number; matches: LeagueFixtureItem[];
    isFinal: boolean; isThirdPlace: boolean;
  }>();
  for (const f of fixtures) {
    const round = f.league?.round ?? "";
    const t = detectTier(round);
    if (t === null) continue;
    if (!map.has(t)) map.set(t, {
      tier: t, matches: [],
      isFinal: /\bfinal\b/i.test(round) && !/semi|quarter|3rd|third|bronze/i.test(round),
      isThirdPlace: /3rd|third|bronze/i.test(round),
    });
    map.get(t)!.matches.push(f);
  }
  return [...map.values()].sort((a, b) => a.tier - b.tier);
}

function toMatch(f: LeagueFixtureItem): Match {
  return {
    id: String(f.fixture.id),
    left: f.teams.home.name || "Home",
    right: f.teams.away.name || "Away",
    leftLogo: getValidTeamLogo(f.teams.home.logo || "") ?? null,
    rightLogo: getValidTeamLogo(f.teams.away.logo || "") ?? null,
    date: f.fixture?.timestamp
      ? new Date(f.fixture.timestamp * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : "TBD",
    winner: f.teams.home.winner ? "left" : f.teams.away.winner ? "right" : undefined,
    raw: f,
  };
}

// ─── Even-spacing helper ──────────────────────────────────────────────────────
// Distributes `count` items evenly inside `span`, returns pixel centres.
function evenCentres(count: number, span: number): number[] {
  if (!count) return [];
  const slot = span / count;
  return Array.from({ length: count }, (_, i) => slot * i + slot / 2);
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function KnockoutTab({ fixtures = [] }: Props) {
  const rounds = buildRounds(fixtures);
  if (!rounds.length) {
    return (
      <div className="mt-6 rounded-2xl border border-gray-200/40 bg-gray-50 p-8 text-center text-sm font-semibold text-gray-600">
        Knockout bracket — no data available for this season
      </div>
    );
  }

  const mainRounds = rounds.filter((r) => !r.isThirdPlace);
  const thirdPlaceRnd = rounds.find((r) => r.isThirdPlace);
  const finalRound = mainRounds.find((r) => r.isFinal);
  const treeRounds = mainRounds.filter((r) => !r.isFinal);

  const finalFixture = finalRound?.matches.length
    ? finalRound.matches.reduce((a, b) => ((a.fixture.timestamp ?? 0) > (b.fixture.timestamp ?? 0) ? a : b))
    : null;

  const treeData = useMemo(() => {
    const simple = () => ({
      L: treeRounds.map((r) => r.matches.slice(0, Math.ceil(r.matches.length / 2)).map(toMatch)),
      R: treeRounds.map((r) => r.matches.slice(Math.ceil(r.matches.length / 2)).map(toMatch)),
      F: finalFixture ? toMatch(finalFixture) : null,
      B: thirdPlaceRnd?.matches.length ? toMatch(thirdPlaceRnd.matches[0]) : null,
    });

    if (!finalFixture || !treeRounds.length) return simple();

    const findPred = (id: number | null, arr: LeagueFixtureItem[]) =>
      id ? (arr.find((m) => m.teams.home.id === id || m.teams.away.id === id) ?? null) : null;

    const buildNode = (m: LeagueFixtureItem, ri: number): any => {
      if (ri < 0) return { m, l: null, r: null };
      const prev = treeRounds[ri];
      const lp = findPred(m.teams.home.id, prev.matches);
      const rp = findPred(m.teams.away.id, prev.matches);
      return { m, l: lp ? buildNode(lp, ri - 1) : null, r: rp ? buildNode(rp, ri - 1) : null };
    };

    const root = buildNode(finalFixture, treeRounds.length - 1);
    const L: Match[][] = Array.from({ length: treeRounds.length }, () => []);
    const R: Match[][] = Array.from({ length: treeRounds.length }, () => []);

    const fill = (node: any, side: "L" | "R", depth: number) => {
      if (!node) return;
      const col = treeRounds.length - 1 - depth;
      if (col >= 0) (side === "L" ? L : R)[col].push(toMatch(node.m));
      fill(node.l, side, depth + 1);
      fill(node.r, side, depth + 1);
    };
    fill(root.l, "L", 0);
    fill(root.r, "R", 0);

    for (let i = 0; i < treeRounds.length; i++) {
      const tot = treeRounds[i].matches.length;
      const expL = Math.ceil(tot / 2);
      if (L[i].length !== expL || R[i].length !== tot - expL) return simple();
    }
    return {
      L, R,
      F: toMatch(finalFixture),
      B: thirdPlaceRnd?.matches.length ? toMatch(thirdPlaceRnd.matches[0]) : null,
    };
  }, [finalFixture, treeRounds, thirdPlaceRnd]);

  const { L: leftRounds, R: rightRounds, F: finalMatch, B: bronzeMatch } = treeData;

  const champion = finalMatch?.raw
    ? (finalMatch.raw.teams.home.winner ? finalMatch.raw.teams.home.name
      : finalMatch.raw.teams.away.winner ? finalMatch.raw.teams.away.name : null)
    : null;

  const finalM = finalMatch ? { ...finalMatch, tag: "FINAL" as const } : null;
  const bronzeM = bronzeMatch ? { ...bronzeMatch, tag: "BRONZE-FINAL" as const } : null;

  const numCols = Math.max(leftRounds.length, 1);
  const maxCount = Math.max(...leftRounds.map((r) => r.length), ...rightRounds.map((r) => r.length), 1);

  // Desktop
  const D_SIDE_W = (numCols - 1) * D_STEP + DW;
  const D_SIDE_H = Math.max(maxCount * (CH + 16) + CH, 320); // extra padding
  const D_BOARD_W = D_SIDE_W * 2 + CENTER_W;

  // Mobile
  const M_ROW_W = maxCount * MW + (maxCount - 1) * M_CARD_GAP;
  const M_SIDE_H = (numCols - 1) * M_STEP + CH;

  return (
    <section>
      {/* ── DESKTOP (≥768px) ── */}
      <div className="koBracketDesktop">
        <div className="koScroll">
          <div className="koBoardDesk" style={{ width: D_BOARD_W, height: D_SIDE_H }}>
            <DeskSide side="left" rounds={leftRounds} numCols={numCols} sw={D_SIDE_W} sh={D_SIDE_H} />
            <DeskCenter finalM={finalM} bronzeM={bronzeM} champion={champion} w={CENTER_W} h={D_SIDE_H} />
            <DeskSide side="right" rounds={rightRounds} numCols={numCols} sw={D_SIDE_W} sh={D_SIDE_H} />
          </div>
        </div>
      </div>

      {/* ── MOBILE (<768px) ── */}
      <div className="koBracketMobile">
        <div className="koMobScroll">
          <div className="koMobInner" style={{ width: M_ROW_W }}>
            <MobSide side="left" rounds={leftRounds} numCols={numCols} rowW={M_ROW_W} sh={M_SIDE_H} />
            <MobCenter finalM={finalM} bronzeM={bronzeM} champion={champion} w={M_ROW_W} />
            <MobSide side="right" rounds={rightRounds} numCols={numCols} rowW={M_ROW_W} sh={M_SIDE_H} />
          </div>
        </div>
      </div>

      <style>{`
        /* ── base: mobile-first ── */
        .koBracketDesktop { display: none; }
        .koBracketMobile  { display: block; }

        @media (min-width: 768px) {
          .koBracketDesktop { display: block; }
          .koBracketMobile  { display: none; }
        }

        /* ── desktop scroll wrapper ── */
        .koScroll { overflow-x: auto; overflow-y: hidden; }
       .koBoardDesk {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  position: relative;
  margin: 0 auto;
}

        /* ── mobile scroll wrapper ── */
        /* ── mobile scroll wrapper ── */
.koMobScroll {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 20px 12px 12px;
  width: 100%;
}

.koMobInner  {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  min-width: max-content;
}

        /* ── shared canvas ── */
        .koCanvas {
          position: relative;
          flex-shrink: 0;
          overflow: visible;
        }
        .koSvg {
          position: absolute;
          top: 0; left: 0;
          overflow: visible;
          pointer-events: none;
          z-index: 1;
        }
        .koLine {
          fill: none;
          stroke: rgba(148,163,184,0.35);
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* ── Match card ── */
        .koCard {
          position: absolute;
          height: ${CH}px;
          border-radius: 10px;
          background: #18181b;
          border: 1px solid #27272a;
          color: #fff;
          box-shadow: 0 4px 14px rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          padding: 7px 10px;
          box-sizing: border-box;
          z-index: 2;
          transition: border-color .18s, box-shadow .18s, transform .18s;
        }
        .koCard:hover {
          border-color: #52525b;
          box-shadow: 0 8px 26px rgba(0,0,0,0.65);
          transform: translateY(-1px);
          z-index: 10;
        }
        .koInner {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          min-width: 0;
        }
        .koTeams {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }
        .koRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 5px;
          min-width: 0;
        }
        .koInfo {
          display: flex;
          align-items: center;
          gap: 5px;
          min-width: 0;
          flex: 1;
          overflow: hidden;
        }
        .koName {
          font-size: 10.5px;
          font-weight: 500;
          color: #d4d4d8;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .koWinner .koName { font-weight: 700; color: #fff; }
        .koScore { font-size: 11px; font-weight: 700; color: #f4f4f5; flex-shrink: 0; }
        .koWinner .koScore { color: #10b981; }
        .koPen   { font-size: 8px; color: #71717a; margin-left: 1px; }
        .koCrest {
          width: 14px; height: 14px; border-radius: 50%;
          background: #3f3f46; flex-shrink: 0;
        }
        .koDate {
          font-size: 9px; font-weight: 600; color: #71717a;
          background: #27272a; padding: 2px 5px; border-radius: 4px;
          white-space: nowrap; flex-shrink: 0;
        }
        .koTag {
          position: absolute; left: 50%; bottom: -9px;
          transform: translateX(-50%);
          padding: 1px 6px; border-radius: 3px;
          font-size: 7px; font-weight: 900;
          letter-spacing: .06em; text-transform: uppercase;
          color: #111; white-space: nowrap; z-index: 5;
        }
        .koTagF { background: #facc15; }
        .koTagB { background: #38bdf8; }

        /* ── center panels ── */
        @media (max-width: 767px) {
  .koCard {
    padding: 6px 7px;
  }

  .koName {
    font-size: 8.5px;
  }

  .koScore {
    font-size: 9.5px;
  }

  .koPen {
    font-size: 7px;
  }

  .koCrest {
    width: 11px;
    height: 11px;
  }

  .koInfo {
    gap: 3px;
  }
}

/* ── center panels ── */
.koCenter {
  position: relative;
  flex-shrink: 0;
  overflow: visible;
}
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DESKTOP SIDE
// sw = total pixel width of side panel
// sh = height of side panel (same for all columns)
// ═══════════════════════════════════════════════════════════════════════════════
function DeskSide({ side, rounds, numCols, sw, sh }: {
  side: Side; rounds: Match[][]; numCols: number; sw: number; sh: number;
}) {
  // col X (left edge of card)
  //   left  side: col 0 at x=0,  col N-1 at x=(N-1)*D_STEP
  //   right side: col 0 at x=sw-DW, col N-1 at x=sw-DW-(N-1)*D_STEP = sw-DW-...
  const colLeft = (col: number) =>
    side === "left" ? col * D_STEP : sw - DW - col * D_STEP;

  // Build card positions: Y centres are evenly spaced in sh
  type CI = { m: Match; x: number; y: number };
  const cards: CI[] = [];
  const colYCentres: number[][] = []; // [col][idx] = Y pixel centre

  rounds.forEach((round, col) => {
    const centres = evenCentres(round.length, sh);
    colYCentres.push(centres);
    round.forEach((m, i) => {
      cards.push({ m, x: colLeft(col), y: centres[i] - CH / 2 });
    });
  });

  // Lines: H-V-H elbow for each pair of adjacent columns
  // Source exits RIGHT edge (left side) or LEFT edge (right side)
  // Target enters LEFT edge (left side) or RIGHT edge (right side)
  const paths: string[] = [];
  for (let col = 0; col < rounds.length - 1; col++) {
    const srcY = colYCentres[col];       // Y centres of source column
    const tgtY = colYCentres[col + 1];   // Y centres of target column
    const srcLeft = colLeft(col);
    const tgtLeft = colLeft(col + 1);

    // X where line exits source card
    const x1 = side === "left" ? srcLeft + DW : srcLeft;
    // X where line enters target card
    const x2 = side === "left" ? tgtLeft : tgtLeft + DW;
    const mx = (x1 + x2) / 2;

    // Each target card gets lines from two source cards
    tgtY.forEach((ty, ti) => {
      [ti * 2, ti * 2 + 1].forEach((si) => {
        if (si >= srcY.length) return;
        paths.push(`M ${x1} ${srcY[si]} H ${mx} V ${ty} H ${x2}`);
      });
    });
  }

  return (
    <div className="koCanvas" style={{ width: sw, height: sh } as CSSProperties}>
      <svg className="koSvg" viewBox={`0 0 ${sw} ${sh}`} width={sw} height={sh} aria-hidden>
        {paths.map((d, i) => <path key={i} className="koLine" d={d} />)}
      </svg>
      {cards.map(({ m, x, y }) => (
        <Card key={m.id} match={m} style={{ left: x, top: y, width: DW }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DESKTOP CENTER
// ═══════════════════════════════════════════════════════════════════════════════
function DeskCenter({ finalM, bronzeM, champion, w, h }: {
  finalM: Match | null; bronzeM: Match | null; champion: string | null; w: number; h: number;
}) {
  const cx = (w - DW) / 2;
  const midY = h / 2;

  // Keep your desired placement
  const finalY = midY - CH - 14;
  const bronzeY = midY + 14;

  const finMidY = finalY + CH / 2;

  // side semifinal connector comes from vertical middle
  const sideMidY = midY;

  const leftBendX = cx / 2;
  const rightBendX = w - cx / 2;

  const bronzeMidY = bronzeY + CH / 2;

  return (
    <div className="koCenter" style={{ width: w, height: h } as CSSProperties}>
      <svg className="koSvg" viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden>
        {/* left side → Final */}
        <path
          className="koLine"
          d={`M 0 ${sideMidY} H ${leftBendX} V ${finMidY} H ${cx}`}
        />

        {/* right side → Final */}
        <path
          className="koLine"
          d={`M ${w} ${sideMidY} H ${rightBendX} V ${finMidY} H ${cx + DW}`}
        />

        {bronzeM && (
          <>
            {/* left side → Bronze Final */}
            <path
              className="koLine"
              d={`M 0 ${sideMidY} H ${leftBendX} V ${bronzeMidY} H ${cx}`}
            />

            {/* right side → Bronze Final */}
            <path
              className="koLine"
              d={`M ${w} ${sideMidY} H ${rightBendX} V ${bronzeMidY} H ${cx + DW}`}
            />
          </>
        )}
      </svg>

      <div style={{
        position: "absolute",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        zIndex: 3
      }}>
        <div style={{ fontSize: 30 }}>🏆</div>
        <div style={{
          fontWeight: 900,
          fontSize: 9,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#71717a"
        }}>
          Champion
        </div>

        {champion && (
          <div style={{
            marginTop: 3,
            fontWeight: 800,
            fontSize: 13,
            background: "linear-gradient(to right,#facc15,#f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            {champion}
          </div>
        )}
      </div>

      {finalM && <Card match={finalM} style={{ left: cx, top: finalY, width: DW }} />}
      {bronzeM && <Card match={bronzeM} style={{ left: cx, top: bronzeY, width: DW }} />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MOBILE SIDE
//
// Bracket is rotated 90°. Rounds become horizontal rows.
//   LEFT side : col 0 (most matches) at TOP,    col N-1 (SF) at BOTTOM → flows DOWN toward center
//   RIGHT side: col 0 (most matches) at BOTTOM, col N-1 (SF) at TOP    → flows UP toward center
//
// rowW  = pixel width of each row (same for all, = M_ROW_W)
// sh    = total pixel height of the side section
// ═══════════════════════════════════════════════════════════════════════════════
function MobSide({ side, rounds, numCols, rowW, sh }: {
  side: Side; rounds: Match[][]; numCols: number; rowW: number; sh: number;
}) {
  // Row Y (top edge of the row's cards):
  //   left:  col 0 → y=0 (top),  col N-1 → y=(N-1)*M_STEP (bottom)
  //   right: col 0 → y=(N-1)*M_STEP (bottom),  col N-1 → y=0 (top)
  const rowTop = (col: number) =>
    side === "left" ? col * M_STEP : (numCols - 1 - col) * M_STEP;

  // X centres of cards within a row, spread across rowW
  const rowXCentres = (count: number): number[] => {
    const totalW = count * MW + (count - 1) * M_CARD_GAP;
    const startX = (rowW - totalW) / 2;
    return Array.from({ length: count }, (_, i) => startX + i * (MW + M_CARD_GAP) + MW / 2);
  };

  type CI = { m: Match; x: number; y: number };
  const cards: CI[] = [];
  const rowXC: number[][] = []; // [col][idx] = X pixel centre

  rounds.forEach((round, col) => {
    const xc = rowXCentres(round.length);
    rowXC.push(xc);
    round.forEach((m, i) => {
      cards.push({ m, x: xc[i] - MW / 2, y: rowTop(col) });
    });
  });

  // Lines: V-H-V elbow connecting adjacent rows
  //   left:  source exits BOTTOM of card (rowTop + CH), target enters TOP  (tgtRowTop)
  //   right: source exits TOP    of card (rowTop),       target enters BOTTOM (tgtRowTop + CH)
  const paths: string[] = [];
  for (let col = 0; col < rounds.length - 1; col++) {
    const srcXC = rowXC[col];
    const tgtXC = rowXC[col + 1];
    const srcRowT = rowTop(col);
    const tgtRowT = rowTop(col + 1);

    const y1 = side === "left" ? srcRowT + CH : srcRowT;       // exit edge of source card
    const y2 = side === "left" ? tgtRowT : tgtRowT + CH;  // entry edge of target card
    const my = (y1 + y2) / 2;

    tgtXC.forEach((tx, ti) => {
      [ti * 2, ti * 2 + 1].forEach((si) => {
        if (si >= srcXC.length) return;
        paths.push(`M ${srcXC[si]} ${y1} V ${my} H ${tx} V ${y2}`);
      });
    });
  }

  return (
    <div className="koCanvas" style={{ width: rowW, height: sh } as CSSProperties}>
      <svg className="koSvg" viewBox={`0 0 ${rowW} ${sh}`} width={rowW} height={sh} aria-hidden>
        {paths.map((d, i) => <path key={i} className="koLine" d={d} />)}
      </svg>
      {cards.map(({ m, x, y }) => (
        <Card key={m.id} match={m} style={{ left: x, top: y, width: MW }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MOBILE CENTER
//
// Sits between left side (above) and right side (below).
// Left SF  (col N-1) is at BOTTOM of left section  → stubs enter from TOP  of center
// Right SF (col N-1) is at TOP    of right section → stubs exit  from BOTTOM of center
//
// Single Final card centred horizontally, Bronze card to the right.
// Stub from top → Final card top edge
// Stub from bottom → Final card bottom edge  (right side connects here)
// ═══════════════════════════════════════════════════════════════════════════════
function MobCenter({ finalM, bronzeM, champion, w }: {
  finalM: Match | null; bronzeM: Match | null; champion: string | null;
  w: number;
}) {
  const h = CENTER_H;

  const totalCards = bronzeM ? 2 : 1;
  const totalCardW = totalCards * MW + (totalCards - 1) * M_CARD_GAP;
  const startX = (w - totalCardW) / 2;

  const finalX = startX;
  const bronzeX = startX + MW + M_CARD_GAP;
  const cardY = (h - CH) / 2;

  const finalCenterX = finalX + MW / 2;
  const bronzeCenterX = bronzeX + MW / 2;

  // this is the real center line coming from top/bottom bracket
  const mainX = w / 2;

  const topJoinY = cardY - 22;
  const bottomJoinY = cardY + CH + 22;

  return (
    <div className="koCenter" style={{ width: w, height: h } as CSSProperties}>
      <svg className="koSvg" viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden>
        {bronzeM ? (
          <>
            {/* Top bracket line splits to Final + Bronze-Final */}
            <path
              className="koLine"
              d={`M ${mainX} 0 V ${topJoinY} H ${finalCenterX} V ${cardY}`}
            />
            <path
              className="koLine"
              d={`M ${mainX} ${topJoinY} H ${bronzeCenterX} V ${cardY}`}
            />

            {/* Final + Bronze-Final join back to bottom bracket */}
            <path
              className="koLine"
              d={`M ${finalCenterX} ${cardY + CH} V ${bottomJoinY} H ${mainX} V ${h}`}
            />
            <path
              className="koLine"
              d={`M ${bronzeCenterX} ${cardY + CH} V ${bottomJoinY} H ${mainX}`}
            />
          </>
        ) : (
          <>
            <path
              className="koLine"
              d={`M ${mainX} 0 V ${cardY}`}
            />
            <path
              className="koLine"
              d={`M ${mainX} ${h} V ${cardY + CH}`}
            />
          </>
        )}
      </svg>

      <div style={{
        position: "absolute",
        top: "50%",
        right: bronzeM ? startX + totalCardW + 8 : 8,
        transform: "translateY(-50%)",
        textAlign: "center",
        zIndex: 3
      }}>
        <div style={{ fontSize: 20 }}>🏆</div>
        <div style={{
          fontWeight: 900,
          fontSize: 8,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#71717a"
        }}>
          Champ
        </div>

        {champion && (
          <div style={{
            marginTop: 2,
            fontWeight: 800,
            fontSize: 10,
            background: "linear-gradient(to right,#facc15,#f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            {champion}
          </div>
        )}
      </div>

      {finalM && <Card match={finalM} style={{ left: finalX, top: cardY, width: MW }} />}
      {bronzeM && <Card match={bronzeM} style={{ left: bronzeX, top: cardY, width: MW }} />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MATCH CARD
// ═══════════════════════════════════════════════════════════════════════════════
function Card({ match, style }: { match: Match; style?: CSSProperties }) {
  const raw = match.raw ?? null;
  const hg = raw?.goals?.home ?? null;
  const ag = raw?.goals?.away ?? null;
  const hp = raw?.score?.penalty?.home ?? null;
  const ap = raw?.score?.penalty?.away ?? null;
  const hasS = hg !== null && ag !== null;

  return (
    <article className="koCard" style={style}>
      <div className="koInner">
        <div className="koTeams">
          <TR name={match.left} logo={match.leftLogo} win={match.winner === "left"} sc={hg} pen={hp} hasS={hasS} />
          <TR name={match.right} logo={match.rightLogo} win={match.winner === "right"} sc={ag} pen={ap} hasS={hasS} />
        </div>
        {!hasS && <div className="koDate">{match.date}</div>}
      </div>
      {match.tag && (
        <span className={match.tag === "FINAL" ? "koTag koTagF" : "koTag koTagB"}>{match.tag}</span>
      )}
    </article>
  );
}

function TR({ name, logo, win, sc, pen, hasS }: {
  name: string; logo?: string | null; win: boolean;
  sc: number | null; pen: number | null; hasS: boolean;
}) {
  return (
    <div className={`koRow${win ? " koWinner" : ""}`} style={{ opacity: win || !hasS ? 1 : 0.55 }}>
      <div className="koInfo">
        {logo
          ? <Image src={logo} alt={name} width={14} height={14} style={{ borderRadius: 999, objectFit: "contain", flexShrink: 0 }} />
          : <span className="koCrest" />}
        <span className="koName">{name}</span>
      </div>
      {hasS && (
        <span className="koScore">
          {sc}{pen !== null && <span className="koPen">({pen})</span>}
        </span>
      )}
    </div>
  );
}
