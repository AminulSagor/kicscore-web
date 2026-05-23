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
    traits: FootballPlayerTraitItem[],
): PlayerTrait[] => {
    return PLAYER_TRAIT_ORDER.flatMap((traitKey) => {
        const trait = traits.find((item) => item.key === traitKey);

        if (!trait) {
            return [];
        }

        return [
            {
                key: trait.key,
                label: trait.label,
                value: getSafeScore(trait.score),
            },
        ];
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