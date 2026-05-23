import serviceServer from "@/service/base/service.server";
import type {
    FootballPlayerResponse,
    PlayerCareerTotalsResponse,
    PlayerRecentMatchesResponse,
    PlayerTraitsResponse,
    PlayerTrophiesResponse,
} from "@/types/football/players/player.types";

type GetFootballPlayerParams = {
    playerId: string;
    season: string;
};

type GetPlayerTrophiesParams = {
    playerId: string;
    page: number;
    limit: number;
};

type GetPlayerRecentMatchesParams = {
    playerId: string;
    season: string;
    teamId: string;
    lastFixtures: number;
    page: number;
    limit: number;
};

type GetPlayerCareerTotalsParams = {
    playerId: string;
    fromSeason: string;
    toSeason: string;
    page: number;
    limit: number;
};

type GetPlayerTraitsParams = {
    playerId: string;
    leagueId: string;
    season: string;
};

export const getFootballPlayer = async ({
    playerId,
    season,
}: GetFootballPlayerParams): Promise<FootballPlayerResponse> => {
    const response = await serviceServer.get<FootballPlayerResponse>(
        "/football/players",
        {
            params: {
                id: playerId,
                season,
            },
        },
    );

    return response.data;
};

export const getPlayerTrophies = async ({
    playerId,
    page,
    limit,
}: GetPlayerTrophiesParams): Promise<PlayerTrophiesResponse> => {
    const response = await serviceServer.get<PlayerTrophiesResponse>(
        "/football/trophies",
        {
            params: {
                player: playerId,
                page,
                limit,
            },
        },
    );

    return response.data;
};

export const getPlayerRecentMatches = async ({
    playerId,
    season,
    teamId,
    lastFixtures,
    page,
    limit,
}: GetPlayerRecentMatchesParams): Promise<PlayerRecentMatchesResponse> => {
    const response = await serviceServer.get<PlayerRecentMatchesResponse>(
        `/football/players/${playerId}/recent-matches`,
        {
            params: {
                season,
                team: teamId,
                last: lastFixtures,
                page,
                limit,
            },
        },
    );

    return response.data;
};

export const getPlayerCareerTotals = async ({
    playerId,
    fromSeason,
    toSeason,
    page,
    limit,
}: GetPlayerCareerTotalsParams): Promise<PlayerCareerTotalsResponse> => {
    const response = await serviceServer.get<PlayerCareerTotalsResponse>(
        `/football/players/${playerId}/career-totals`,
        {
            params: {
                fromSeason,
                toSeason,
                page,
                limit,
            },
        },
    );

    return response.data;
};

export const getPlayerTraits = async ({
    playerId,
    leagueId,
    season,
}: GetPlayerTraitsParams): Promise<PlayerTraitsResponse> => {
    const response = await serviceServer.get<PlayerTraitsResponse>(
        `/football/players/${playerId}/traits`,
        {
            params: {
                league: leagueId,
                season,
            },
        },
    );

    return response.data;
};