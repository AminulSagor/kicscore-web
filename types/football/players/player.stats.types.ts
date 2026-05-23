import type { PlayerStat } from "./player.details.types";

export type PlayerPerformanceStat = {
    label: string;
    value: string;
    variant?: "default" | "warning";
};

export type PlayerPerformanceGroup = {
    id: string;
    title: string;
    stats: PlayerPerformanceStat[];
};

export type PlayerStatsData = {
    season: string;
    minutesPlayed: string;
    seasonStats: PlayerStat[];
    performanceGroups: PlayerPerformanceGroup[];
};