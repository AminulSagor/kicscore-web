import type {
    FootballApiPaging,
    FootballPlayerFollow,
} from "./player.common.types";
import type { PlayerTrait } from "./player.traits.types";

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

export type PlayerStat = {
    label: string;
    value: string;
};

export type PlayerDetails = {
    id: string;
    name: string;
    avatar: string | null;
    club: string;
    teamId: string | null;
    leagueId: string | null;
    season: string;
    competitionLabel: string;
    isFollowed: boolean;
    stats: PlayerStat[];
    position: PlayerStat;
    seasonStats: PlayerStat[];
    traits: PlayerTrait[];
};