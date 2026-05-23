import type {
    FootballBackendPaging,
    FootballPlayerFollow,
} from "./player.common.types";
import type { FootballPlayerSeasonData } from "./player.details.types";

export type PlayerCareerTotalsResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: PlayerCareerTotalsData;
    timestamp: string;
    path: string;
};

export type PlayerCareerTotalsData = {
    items: PlayerCareerSeasonItem[];
    meta: FootballBackendPaging;
    follow: FootballPlayerFollow;
};

export type PlayerCareerSeasonItem = {
    season: number;
    player: FootballPlayerSeasonData;
};

export type PlayerCareerStat = {
    label: string;
    value: string;
};

export type PlayerCareerItem = {
    id: string;
    club: string;
    period: string;
    isPlaceholder?: boolean;
    stats: PlayerCareerStat[];
};

export type PlayerCareerGroup = {
    id: string;
    title: string;
    items: PlayerCareerItem[];
};