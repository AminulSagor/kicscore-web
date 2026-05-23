export type TeamLeagueFixtureCoverage = {
    events: boolean;
    lineups: boolean;
    statistics_fixtures: boolean;
    statistics_players: boolean;
};

export type TeamLeagueCoverage = {
    fixtures: TeamLeagueFixtureCoverage;
    standings: boolean;
    players: boolean;
    top_scorers: boolean;
    top_assists: boolean;
    top_cards: boolean;
    injuries: boolean;
    predictions: boolean;
    odds: boolean;
};

export type TeamLeagueSeason = {
    year: number;
    start: string;
    end: string;
    current: boolean;
    coverage: TeamLeagueCoverage;
};

export type TeamLeagueItem = {
    league: {
        id: number;
        name: string;
        type: string;
        logo: string | null;
    };
    country: {
        name: string;
        code: string | null;
        flag: string | null;
    };
    seasons: TeamLeagueSeason[];
};

export type TeamLeaguesResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        get: string;
        parameters: {
            season: string;
            team: string;
        };
        errors: unknown[] | Record<string, string>;
        results: number;
        paging: {
            current: number;
            total: number;
        };
        response: TeamLeagueItem[];
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