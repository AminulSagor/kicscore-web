import type { FootballPlayerEntry } from "@/types/football/players/player.types";

export type TeamSquadMeta = {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
};

export type TeamCoachCareerItem = {
    team: {
        id: number;
        name: string;
        logo: string | null;
    };
    start: string | null;
    end: string | null;
};

export type TeamCoachApiItem = {
    id: number;
    name: string;
    firstname: string | null;
    lastname: string | null;
    age: number | null;
    birth: {
        date: string | null;
        place: string | null;
        country: string | null;
    };
    nationality: string | null;
    height: string | null;
    weight: string | null;
    photo: string | null;
    team: {
        id: number;
        name: string;
        logo: string | null;
    };
    career: TeamCoachCareerItem[];
};

export type TeamCoachesResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        get: string;
        parameters: {
            team: string;
        };
        errors: unknown[] | Record<string, string>;
        results: number;
        paging: {
            current: number;
            total: number;
        };
        response: TeamCoachApiItem[];
        backendPaging: TeamSquadMeta;
    };
    timestamp: string;
    path: string;
};

export type TeamPlayersResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        get: string;
        parameters: {
            team: string;
            season: string;
        };
        errors: unknown[] | Record<string, string>;
        results: number;
        paging: {
            current: number;
            total: number;
        };
        response: FootballPlayerEntry[];
        backendPaging: TeamSquadMeta;
    };
    timestamp: string;
    path: string;
};

export type TeamSquadMember = {
    id: string;
    name: string;
    image: string | null;
    flag: string | null;
    country: string;
    number: string;
    age: string;
    link: string;
};

export type TeamSquadGroup = {
    title: string;
    players: TeamSquadMember[];
};