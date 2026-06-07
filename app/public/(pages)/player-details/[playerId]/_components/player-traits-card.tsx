import type { PlayerTrait } from "@/types/football/players/player.types";

import { getPlayerTraitPolygonPoints } from "../_utils/player-traits.utils";

type PlayerTraitsCardProps = {
  traits: PlayerTrait[];
};

// SVG viewBox is 300×300. The six outer vertices of the hexagon:
const CHART_VERTICES = [
  { x: 35, y: 90 },   // 0: top-left       — defensiveContribution
  { x: 150, y: 25 },  // 1: top-center      — goals
  { x: 265, y: 90 },  // 2: top-right       — shotAttempts
  { x: 265, y: 210 }, // 3: bottom-right    — touches
  { x: 150, y: 275 }, // 4: bottom-center   — chancesCreated
  { x: 35, y: 210 },  // 5: bottom-left     — aerialWon
];

// Nudge offset: pull the label away from the vertex toward the outside of the chart
const LABEL_OFFSETS: { dx: number; dy: number; anchor: "start" | "middle" | "end" }[] = [
  { dx: -10, dy: -8,  anchor: "end" },    // 0: top-left
  { dx:   0, dy: -12, anchor: "middle" }, // 1: top-center
  { dx:  10, dy: -8,  anchor: "start" },  // 2: top-right
  { dx:  10, dy:  16, anchor: "start" },  // 3: bottom-right
  { dx:   0, dy:  20, anchor: "middle" }, // 4: bottom-center
  { dx: -10, dy:  16, anchor: "end" },    // 5: bottom-left
];

const PlayerTraitsCard = ({ traits }: PlayerTraitsCardProps) => {
  const polygonPoints = getPlayerTraitPolygonPoints(traits);

  return (
    <section className="overflow-hidden rounded-[22px] bg-white shadow-sm ring-1 ring-[#D8E7DF] dark:bg-white/5 dark:ring-white/7">
      <div className="bg-[#EAF3EF] px-5 py-4 dark:bg-white/6">
        <h2 className="text-sm font-bold text-[#0B1F1A] dark:text-white">
          Player traits
        </h2>
      </div>

      <div className="w-full px-2 py-4">
        <svg
          viewBox="0 0 300 300"
          className="w-full"
          aria-label="Player traits radar chart"
        >
          {/* Background grid polygons */}
          <polygon
            points="150,25 265,90 265,210 150,275 35,210 35,90"
            fill="none"
            stroke="rgba(11,31,26,0.18)"
          />
          <polygon
            points="150,65 230,110 230,190 150,235 70,190 70,110"
            fill="none"
            stroke="rgba(11,31,26,0.18)"
          />
          <polygon
            points="150,105 195,130 195,170 150,195 105,170 105,130"
            fill="none"
            stroke="rgba(11,31,26,0.18)"
          />

          {/* Grid axis lines */}
          <line x1="150" y1="25" x2="150" y2="275" stroke="rgba(11,31,26,0.18)" />
          <line x1="35" y1="90" x2="265" y2="210" stroke="rgba(11,31,26,0.18)" />
          <line x1="265" y1="90" x2="35" y2="210" stroke="rgba(11,31,26,0.18)" />

          {/* Filled trait polygon */}
          <polygon
            points={polygonPoints}
            fill="rgba(0,196,140,0.28)"
            stroke="#008A63"
            strokeWidth="2"
          />

          {/* Trait labels — rendered inside SVG so they scale with the chart */}
          {traits.map((trait, index) => {
            const vertex = CHART_VERTICES[index];
            const offset = LABEL_OFFSETS[index];

            if (!vertex || !offset) return null;

            const lx = vertex.x + offset.dx;
            const ly = vertex.y + offset.dy;

            return (
              <g key={trait.key}>
                <text
                  x={lx}
                  y={ly}
                  textAnchor={offset.anchor}
                  fontSize="10"
                  fontWeight="700"
                  fill="#61736D"
                  className="dark:fill-white/55 uppercase"
                >
                  {trait.label}
                </text>
                <text
                  x={lx}
                  y={ly + 13}
                  textAnchor={offset.anchor}
                  fontSize="10"
                  fontWeight="700"
                  fill="#008A63"
                >
                  {trait.value}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
};

export default PlayerTraitsCard;