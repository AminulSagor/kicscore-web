export type TeamTrophyLeague = {
    id: number;
    name: string;
    type: string;
    logo: string | null;
    country: string;
    flag: string | null;
};

export type TeamTrophyResult = {
    count: number;
    seasons: string[];
};

export type TeamTrophyApiItem = {
    league: TeamTrophyLeague;
    winner: TeamTrophyResult;
    runnerUp: TeamTrophyResult;
    lastSyncedAt: string;
};

export type TeamTrophiesMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type TeamTrophiesPreviewResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        teamId: string;
        syncStatus: {
            initialSyncCompleted: boolean;
            syncInProgress: boolean;
            syncStartedAt: string | null;
            lastSyncedFromSeason: number | null;
            lastSyncedToSeason: number | null;
            lastSyncedAt: string | null;
            lastError: string | null;
        };
        items: TeamTrophyApiItem[];
        meta: TeamTrophiesMeta;
    };
    timestamp: string;
    path: string;
};

export type TeamTrophyAchievement = {
    id: string;
    count: number;
    title: string;
    years: string[];
};

export type TeamTrophy = {
    id: string;
    title: string;
    logo: string | null;
    achievements: TeamTrophyAchievement[];
    fullWidth?: boolean;
};