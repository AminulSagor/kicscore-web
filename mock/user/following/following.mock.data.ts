import type {
    FollowingItemMock,
    FollowingTabKey,
    TrendingFollowingItemMock,
} from "./following.mock.types";

export const followingTabsMockData: { label: string; value: FollowingTabKey }[] =
    [
        { label: "Leagues", value: "leagues" },
        { label: "Players", value: "players" },
        { label: "Teams", value: "teams" },
        { label: "Coach", value: "coach" },
    ];

export const followingMockData: FollowingItemMock[] = [
    { id: "league-1", name: "Premier League", type: "leagues", iconLabel: "PL" },
    { id: "league-2", name: "LaLiga", type: "leagues", iconLabel: "LL" },
    { id: "league-3", name: "Serie A", type: "leagues", iconLabel: "SA" },
    { id: "league-4", name: "Champions League", type: "leagues", iconLabel: "CL" },
    { id: "league-5", name: "Bundesliga", type: "leagues", iconLabel: "BL" },

    {
        id: "player-1",
        name: "Cristiano Ronaldo",
        type: "players",
        iconLabel: "CR",
        subtitle: "Al Nassr FC",
    },
    {
        id: "player-2",
        name: "Player",
        type: "players",
        iconLabel: "P",
        subtitle: "Current Club",
    },
    {
        id: "player-3",
        name: "Player",
        type: "players",
        iconLabel: "P",
        subtitle: "Current Club",
    },

    { id: "team-1", name: "Bangladesh", type: "teams", popupType: "team", iconLabel: "B" },
    { id: "team-2", name: "Country/Club", type: "teams", popupType: "team-vs-team", iconLabel: "C" },
    { id: "team-3", name: "Country/Club", type: "teams", popupType: "team-vs-team", iconLabel: "C" },

    {
        id: "coach-1",
        name: "Cristiano Ronaldo",
        type: "coach",
        iconLabel: "CR",
        subtitle: "Al Nassr FC",
    },
    {
        id: "coach-2",
        name: "Coach",
        type: "coach",
        iconLabel: "C",
        subtitle: "Current Club",
    },
    {
        id: "coach-3",
        name: "Coach",
        type: "coach",
        iconLabel: "C",
        subtitle: "Current Club",
    },
];

export const trendingFollowingMockData: TrendingFollowingItemMock[] = [
    {
        id: "trending-league-1",
        name: "Premier League",
        type: "leagues",
        iconLabel: "PL",
        isFollowing: false,
    },
    {
        id: "trending-league-2",
        name: "LaLiga",
        type: "leagues",
        iconLabel: "LL",
        isFollowing: false,
    },
    {
        id: "trending-player-1",
        name: "Player",
        type: "players",
        iconLabel: "P",
        subtitle: "Current Club",
        isFollowing: false,
    },
    {
        id: "trending-player-2",
        name: "Player",
        type: "players",
        iconLabel: "P",
        subtitle: "Current Club",
        isFollowing: false,
    },
    {
        id: "trending-team-1",
        name: "Country/Club",
        type: "teams",
        popupType: "team",
        iconLabel: "C",
        isFollowing: false,
    },
    {
        id: "trending-team-2",
        name: "Country/Club",
        type: "teams",
        popupType: "team-vs-team",
        iconLabel: "C",
        isFollowing: false,
    },
    {
        id: "trending-coach-1",
        name: "Coach",
        type: "coach",
        iconLabel: "C",
        subtitle: "Current Club",
        isFollowing: false,
    },
    {
        id: "trending-coach-2",
        name: "Coach",
        type: "coach",
        iconLabel: "C",
        subtitle: "Current Club",
        isFollowing: false,
    },
];