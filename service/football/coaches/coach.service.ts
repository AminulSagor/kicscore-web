import serviceServer from "@/service/base/service.server";
import type {
    CoachCurrentRecordResponse,
    CoachDetailsResponse,
    CoachTrophiesResponse,
} from "@/types/football/coaches/coach.types";

type GetCoachDetailsParams = {
    coachId: string;
};

type GetCoachTrophiesParams = {
    coachId: string;
    page: number;
    limit: number;
};

type GetCoachCurrentRecordParams = {
    coachId: string;
    teamId: string;
    fromDate: string;
    toDate: string;
};

export const getCoachDetails = async ({
    coachId,
}: GetCoachDetailsParams): Promise<CoachDetailsResponse> => {
    const response = await serviceServer.get<CoachDetailsResponse>(
        "/football/coaches",
        {
            params: {
                id: coachId,
            },
        },
    );

    return response.data;
};

export const getCoachTrophies = async ({
    coachId,
    page,
    limit,
}: GetCoachTrophiesParams): Promise<CoachTrophiesResponse> => {
    const response = await serviceServer.get<CoachTrophiesResponse>(
        "/football/trophies",
        {
            params: {
                coach: coachId,
                page,
                limit,
            },
        },
    );

    return response.data;
};

export const getCoachCurrentRecord = async ({
    coachId,
    teamId,
    fromDate,
    toDate,
}: GetCoachCurrentRecordParams): Promise<CoachCurrentRecordResponse> => {
    const response = await serviceServer.get<CoachCurrentRecordResponse>(
        `/football/coaches/${coachId}/current-record`,
        {
            params: {
                team: teamId,
                from: fromDate,
                to: toDate,
            },
        },
    );

    return response.data;
};