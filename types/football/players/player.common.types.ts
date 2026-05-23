export type PlayerDetailsTabKey = "profile" | "matches" | "stats" | "career";

export type FootballPlayerFollow = {
    isFollowed: boolean;
    entityType: "PLAYER";
    entityId: string;
};

export type FootballApiPaging = {
    current: number;
    total: number;
};

export type FootballBackendPaging = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};