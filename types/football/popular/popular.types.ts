export type PopularEntityType = "LEAGUE" | "TEAM" | "PLAYER" | "COACH";

export type PopularFootballItem = {
    entityType: PopularEntityType;
    entityId: string;
    entityName: string;
    entityLogo: string | null;
    followersCount: number;
};

export type PopularFootballMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type PopularFootballResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        items: PopularFootballItem[];
        meta: PopularFootballMeta;
    };
    timestamp: string;
    path: string;
};