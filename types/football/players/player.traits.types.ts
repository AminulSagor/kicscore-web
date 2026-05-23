import type { FootballPlayerFollow } from "./player.common.types";

export type PlayerTraitKey =
    | "defensiveContribution"
    | "goals"
    | "shotAttempts"
    | "touches"
    | "chancesCreated"
    | "aerialWon";

export type FootballPlayerTraitItem = {
    key: PlayerTraitKey;
    label: string;
    score: number;
    rawValue: number;
    sourceMetric: string;
};

export type PlayerTraitsResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        playerId: string;
        about: string;
        traits: FootballPlayerTraitItem[];
        follow: FootballPlayerFollow;
    };
    timestamp: string;
    path: string;
};

export type PlayerTrait = {
    key: PlayerTraitKey;
    label: string;
    value: number;
};