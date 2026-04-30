export type CoachStatMock = {
    label: string;
    value: string;
};

export type CoachRatingMock = {
    label: string;
    amount: string;
    value: number;
};

export type CoachTrophyMock = {
    id: string;
    title: string;
    country: string;
    season: string;
    result: string;
};

export type CoachCareerMock = {
    id: string;
    club: string;
    period: string;
};

export type CoachDetailsMock = {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    countryCode: string;
    stats: CoachStatMock[];
    club: {
        name: string;
        matches: string;
        ratings: CoachRatingMock[];
    };
    trophies: CoachTrophyMock[];
    career: CoachCareerMock[];
};