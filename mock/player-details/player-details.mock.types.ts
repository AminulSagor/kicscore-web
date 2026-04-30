export type PlayerDetailsTabKey = "profile" | "matches" | "stats" | "career";

export type PlayerStatMock = {
    label: string;
    value: string;
};

export type PlayerTraitMock = {
    label: string;
    value: number;
};

export type PlayerTrophyMock = {
    id: string;
    title: string;
    country: string;
    season: string;
    result: string;
};

export type PlayerMatchMock = {
    id: string;
    opponent: string;
    score: string;
    date: string;
    league: string;
    goal: string;
    minute: string;
};

export type PlayerMatchGroupMock = {
    id: string;
    team: string;
    country: string;
    matches: PlayerMatchMock[];
};

export type PlayerPerformanceStatMock = {
    label: string;
    value: string;
    variant?: "default" | "warning";
};

export type PlayerPerformanceGroupMock = {
    id: string;
    title: string;
    stats: PlayerPerformanceStatMock[];
};

export type PlayerCareerStatMock = {
    label: string;
    value: string;
};

export type PlayerCareerItemMock = {
    id: string;
    club: string;
    period: string;
    stats: PlayerCareerStatMock[];
    isPlaceholder?: boolean;
};

export type PlayerCareerGroupMock = {
    id: string;
    title: string;
    items: PlayerCareerItemMock[];
};

export type PlayerDetailsMock = {
    id: string;
    name: string;
    club: string;
    avatar?: string;
    stats: PlayerStatMock[];
    position: PlayerStatMock;
    season: string;
    seasonStats: PlayerStatMock[];
    traits: PlayerTraitMock[];
    trophies: PlayerTrophyMock[];
    matchGroups: PlayerMatchGroupMock[];
    performanceGroups: PlayerPerformanceGroupMock[];
    careerGroups: PlayerCareerGroupMock[];
};