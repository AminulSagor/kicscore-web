import type { FootballApiPaging } from "./player.common.types";

export type FootballTrophyItem = {
    league: string;
    country: string;
    season: string;
    place: string;
};

export type PlayerTrophiesResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        get: string;
        parameters: {
            player: string;
        };
        errors: unknown[] | Record<string, string>;
        results: number;
        paging: FootballApiPaging;
        response: FootballTrophyItem[];
        backendPaging: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    };
    timestamp: string;
    path: string;
};

export type PlayerTrophy = {
    id: string;
    title: string;
    country: string;
    season: string;
    result: string;
};