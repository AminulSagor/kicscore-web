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

export type FootballPlayerResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: FootballPlayerData;
    timestamp: string;
    path: string;
};

export type FootballPlayerSeasonData = {
    get: string;
    parameters: {
        id: string;
        season: string;
    };
    errors: unknown[] | Record<string, string>;
    results: number;
    paging: FootballApiPaging;
    response: FootballPlayerEntry[];
};

export type FootballPlayerData = FootballPlayerSeasonData & {
    follow: FootballPlayerFollow;
};

export type FootballPlayerEntry = {
    player: FootballPlayerInfo;
    statistics: FootballPlayerStatistic[];
};

export type FootballPlayerInfo = {
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
    injured: boolean;
    photo: string | null;
};

export type FootballPlayerStatistic = {
    team: {
        id: number;
        name: string;
        logo: string | null;
    };
    league: {
        id: number | null;
        name: string;
        country: string | null;
        logo: string | null;
        flag: string | null;
        season: number;
    };
    games: {
        appearences: number | null;
        lineups: number | null;
        minutes: number | null;
        number: number | null;
        position: string | null;
        rating: string | null;
        captain: boolean;
    };
    substitutes: {
        in: number | null;
        out: number | null;
        bench: number | null;
    };
    shots: {
        total: number | null;
        on: number | null;
    };
    goals: {
        total: number | null;
        conceded: number | null;
        assists: number | null;
        saves: number | null;
    };
    passes: {
        total: number | null;
        key: number | null;
        accuracy: number | null;
    };
    tackles: {
        total: number | null;
        blocks: number | null;
        interceptions: number | null;
    };
    duels: {
        total: number | null;
        won: number | null;
    };
    dribbles: {
        attempts: number | null;
        success: number | null;
        past: number | null;
    };
    fouls: {
        drawn: number | null;
        committed: number | null;
    };
    cards: {
        yellow: number | null;
        yellowred: number | null;
        red: number | null;
    };
    penalty: {
        won: number | null;
        commited: number | null;
        scored: number | null;
        missed: number | null;
        saved: number | null;
    };
};

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

export type PlayerRecentMatchesResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: PlayerRecentMatchesData;
    timestamp: string;
    path: string;
};

export type PlayerRecentMatchesData = {
    playerId: string;
    season: string;
    teamIds: string[];
    items: PlayerRecentMatchItem[];
    meta: FootballBackendPaging;
    follow: FootballPlayerFollow;
};

export type PlayerRecentMatchItem = {
    fixtureId: string;
    fixture: {
        fixture: {
            id: number;
            referee: string | null;
            timezone: string;
            date: string;
            timestamp: number;
            periods: {
                first: number | null;
                second: number | null;
            };
            venue: {
                id: number | null;
                name: string | null;
                city: string | null;
            };
            status: {
                long: string;
                short: string;
                elapsed: number | null;
                extra: number | null;
            };
        };
        league: {
            id: number;
            name: string;
            country: string | null;
            logo: string | null;
            flag: string | null;
            season: number;
            round: string | null;
            standings: boolean;
        };
        teams: {
            home: PlayerFixtureTeam;
            away: PlayerFixtureTeam;
        };
        goals: {
            home: number | null;
            away: number | null;
        };
        score: {
            halftime: PlayerFixtureScore;
            fulltime: PlayerFixtureScore;
            extratime: PlayerFixtureScore;
            penalty: PlayerFixtureScore;
        };
    };
    player: {
        minutes: number | null;
        rating: string | null;
        goals: number;
        assists: number;
        yellowCards: number;
        redCards: number;
        substitute: boolean;
        position: string | null;
        number: number | null;
        events: PlayerMatchEvent[];
        eventChips: string[];
    };
};

export type PlayerFixtureTeam = {
    id: number;
    name: string;
    logo: string | null;
    winner: boolean | null;
};

export type PlayerFixtureScore = {
    home: number | null;
    away: number | null;
};

export type PlayerMatchEvent = {
    type: string;
    detail: string;
    minute: string;
    role: string;
};

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

export type PlayerStat = {
    label: string;
    value: string;
};

export type PlayerTrait = {
    label: string;
    value: number;
};

export type PlayerTrophy = {
    id: string;
    title: string;
    country: string;
    season: string;
    result: string;
};

export type PlayerMatch = {
    id: string;
    date: string;
    league: string;
    opponent: string;
    score: string;
    goal: string;
    minute: string;
};

export type PlayerMatchGroup = {
    id: string;
    team: string;
    country: string;
    matches: PlayerMatch[];
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

export type PlayerDetails = {
    id: string;
    name: string;
    avatar: string | null;
    club: string;
    teamId: string | null;
    season: string;
    competitionLabel: string;
    isFollowed: boolean;
    stats: PlayerStat[];
    position: PlayerStat;
    seasonStats: PlayerStat[];
    traits: PlayerTrait[];
};

export type PlayerStatsData = {
    season: string;
    minutesPlayed: string;
    seasonStats: PlayerStat[];
    performanceGroups: PlayerPerformanceGroup[];
};