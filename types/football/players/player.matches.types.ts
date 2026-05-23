import type {
    FootballBackendPaging,
    FootballPlayerFollow,
} from "./player.common.types";

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