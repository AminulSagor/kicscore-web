import type {
    FootballPlayerTraitItem,
    PlayerTrait,
    PlayerTraitKey,
} from "@/types/football/players/player.types";

const PLAYER_TRAIT_ORDER: PlayerTraitKey[] = [
    "defensiveContribution",
    "goals",
    "shotAttempts",
    "touches",
    "chancesCreated",
    "aerialWon",
];

const DEFAULT_TRAIT_LABEL: Record<PlayerTraitKey, string> = {
    defensiveContribution: "DEFENSIVE CONTRIB.",
    goals: "GOALS",
    shotAttempts: "SHOT ATTEMPTS",
    touches: "TOUCHES",
    chancesCreated: "CHANCES CREATED",
    aerialWon: "AERIAL WON",
};

const CHART_CENTER = {
    x: 150,
    y: 150,
};

const CHART_VERTICES = [
    { x: 35, y: 90 },
    { x: 150, y: 25 },
    { x: 265, y: 90 },
    { x: 265, y: 210 },
    { x: 150, y: 275 },
    { x: 35, y: 210 },
];

const getSafeScore = (score: number) => {
    return Math.min(Math.max(score, 0), 100);
};

export const mapPlayerTraits = (
    traits: FootballPlayerTraitItem[] | null | undefined,
): PlayerTrait[] => {
    const traitList = Array.isArray(traits) ? traits : [];

    return PLAYER_TRAIT_ORDER.map((traitKey) => {
        const trait = traitList.find((item) => item.key === traitKey);

        return {
            key: traitKey,
            label: trait?.label ?? DEFAULT_TRAIT_LABEL[traitKey],
            value: getSafeScore(trait?.score ?? 0),
        };
    });
};

export const getPlayerTraitPolygonPoints = (traits: PlayerTrait[]) => {
    return CHART_VERTICES.map((vertex, index) => {
        const score = getSafeScore(traits[index]?.value ?? 0) / 100;

        const x = CHART_CENTER.x + (vertex.x - CHART_CENTER.x) * score;
        const y = CHART_CENTER.y + (vertex.y - CHART_CENTER.y) * score;

        return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
};