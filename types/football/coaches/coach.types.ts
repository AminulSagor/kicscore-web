export type CoachFollow = {
    isFollowed: boolean;
    entityType: "COACH";
    entityId: string;
};

export type CoachDetailsResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: CoachDetailsData;
    timestamp: string;
    path: string;
};

export type CoachDetailsData = {
    get: string;
    parameters: {
        id: string;
    };
    errors: unknown[] | Record<string, string>;
    results: number;
    paging: {
        current: number;
        total: number;
    };
    response: CoachApiItem[];
    follow: CoachFollow;
};

export type CoachApiItem = {
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
    } | null;
    career: CoachApiCareerItem[];
};

export type CoachApiCareerItem = {
    team: {
        id: number;
        name: string;
        logo: string | null;
    };
    start: string | null;
    end: string | null;
};

export type CoachTrophiesResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: CoachTrophiesData;
    timestamp: string;
    path: string;
};

export type CoachTrophiesData = {
    get: string;
    parameters: {
        coach: string;
    };
    errors: unknown[] | Record<string, string>;
    results: number;
    paging: {
        current: number;
        total: number;
    };
    response: CoachApiTrophy[];
    backendPaging: CoachBackendPaging;
};

export type CoachBackendPaging = {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
};

export type CoachApiTrophy = {
    league: string;
    country: string;
    season: string;
    place: string;
};

export type CoachCurrentRecordResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: CoachCurrentRecordData;
    timestamp: string;
    path: string;
};

export type CoachCurrentRecordData = {
    coachId: string;
    teamId: string;
    from: string;
    to: string;
    record: CoachRecord;
    follow: CoachFollow;
};

export type CoachRecord = {
    matches: number;
    wins: number;
    draws: number;
    losses: number;
};

export type CoachStat = {
    label: string;
    value: string;
};

export type CoachClubRating = {
    label: "Wins" | "Draw" | "Losses";
    amount: number;
    value: number;
};

export type CoachClub = {
    name: string;
    matches: number;
    ratings: CoachClubRating[];
};

export type CoachTrophy = {
    id: string;
    title: string;
    country: string;
    season: string;
    result: string;
};

export type CoachCareer = {
    id: string;
    club: string;
    period: string;
};

export type CoachDetails = {
    id: string;
    name: string;
    avatar: string | null;
    role: string;
    isFollowed: boolean;
    stats: CoachStat[];
    club: CoachClub;
    trophies: CoachTrophy[];
    career: CoachCareer[];
};