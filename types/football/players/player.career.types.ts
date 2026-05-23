import type {
    FootballBackendPaging,
    FootballPlayerFollow,
} from "./player.common.types";

export type PlayerCareerTotalsResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: PlayerCareerTotalsData;
    timestamp: string;
    path: string;
};

export type PlayerCareerTeam = {
    id: string;
    name: string;
    logo: string | null;
};

export type PlayerCareerRecord = {
    team: PlayerCareerTeam;
    from: string | null;
    to: string | null;
    isCurrent: boolean;
    matchesPlayed: number;
    goals: number;
};

export type PlayerCareerSection = {
    items: PlayerCareerRecord[];
    meta: FootballBackendPaging;
};

export type PlayerTransferItem = {
    id: string;
    date: string | null;
    type: string | null;
    fromTeam: PlayerCareerTeam;
    toTeam: PlayerCareerTeam;
};

export type PlayerTransferSection = {
    items: PlayerTransferItem[];
    meta: FootballBackendPaging;
};

export type PlayerCareerCache = {
    source: string;
    initialSyncCompleted: boolean;
    fullSyncFromSeason: number;
    fullSyncToSeason: number;
    currentStatsFreshUntil: string | null;
    transfersLastSyncedAt: string | null;
    lastSyncedAt: string | null;
    lastError: string | null;
};

export type PlayerCareerTotalsData = {
    playerId: string;
    activeSeasons: number[];
    seniorCareer: PlayerCareerSection;
    nationalTeams: PlayerCareerRecord[];
    transfers: PlayerTransferSection;
    cache: PlayerCareerCache;
    follow: FootballPlayerFollow;
};

export type PlayerCareerStat = {
    label: string;
    value: string;
};

export type PlayerCareerItem = {
    id: string;
    club: string;
    clubLogo: string | null;
    period: string;
    isPlaceholder?: boolean;
    stats: PlayerCareerStat[];
};

export type PlayerCareerGroup = {
    id: string;
    title: string;
    items: PlayerCareerItem[];
};